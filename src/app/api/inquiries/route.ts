import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { z } from "zod"
import { requireAdminApiSession } from "@/lib/admin-access"
import { prisma } from "@/lib/prisma"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"
import { calculateQuote, FEATURES, MAX_PAGE_COUNT, MIN_PAGE_COUNT } from "@/components/creative-home/calculator-model"

type InquiryPayload = {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  message: string
}

const MAX_BODY_BYTES = 32 * 1024
const packageCatalog: Record<string, { total: number; features: string[] }> = {
  Startup: { total: 16000, features: ["เว็บไซต์ไม่เกิน 3 หน้า", "รองรับมือถือและแท็บเล็ต", "ดูแลฟรี 3 เดือน", "แก้ไขได้ 1 จุดใหญ่", "ติดตั้งเครื่องมือรองรับ PDPA"] },
  Business: { total: 25900, features: ["เว็บไซต์ไม่เกิน 5 หน้า", "รองรับมือถือและแท็บเล็ต", "วางโครงสร้าง SEO พื้นฐาน", "ดูแลฟรี 3 เดือน", "แก้ไขได้ 3 จุดใหญ่"] },
  "E-Commerce": { total: 35900, features: ["เว็บไซต์ไม่เกิน 5 หน้าหลัก", "รองรับมือถือและแท็บเล็ต", "ระบบตะกร้าสินค้า 10 SKU", "วางโครงสร้าง SEO", "แก้ไขได้ 5 จุดใหญ่"] },
}

type InquiryEmailResult = {
  emailSent: boolean
  error?: string
}

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
  email: z.string().trim().pipe(z.email("Invalid email address")).transform((value) => value.toLowerCase()),
  company: z.string().trim().max(120, "Company is too long").optional().nullable().transform((value) => value || null),
  message: z.string().trim().max(5000, "Message is too long").optional(),
  details: z.string().trim().max(2000, "Details are too long").optional(),
  phone: z.string().trim().max(100).optional(),
  contact: z.string().trim().max(100).optional(),
  business: z.string().trim().max(120).optional(),
  budget: z.string().trim().max(100).optional(),
  timeline: z.string().trim().max(100).optional(),
  selection: z.unknown().optional(),
})

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

async function sendInquiryNotification(recipientEmail: string, inquiry: InquiryPayload & { id: string }): Promise<InquiryEmailResult> {
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    return {
      emailSent: false,
      error: "Missing RESEND_API_KEY",
    }
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (!fromEmail) return { emailSent: false, error: "Missing RESEND_FROM_EMAIL" }
  const subject = `New inquiry from ${inquiry.name}`
  const company = inquiry.company?.trim() || "-"
  const messageHtml = escapeHtml(inquiry.message).replace(/\n/g, "<br />")

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(10_000),
    body: JSON.stringify({
      from: fromEmail,
      to: [recipientEmail],
      reply_to: inquiry.email,
      subject,
      text: `New inquiry from WAENWEB\n\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nCompany: ${company}\nInquiry ID: ${inquiry.id}\n\n${inquiry.message}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
          <h2 style="margin:0 0 16px">New inquiry from WAENWEB contact form</h2>
          <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company)}</p>
          <p><strong>Inquiry ID:</strong> ${escapeHtml(inquiry.id)}</p>
          <div style="margin-top:16px;padding:16px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0">
            <strong>Message</strong>
            <div style="margin-top:8px">${messageHtml}</div>
          </div>
        </div>
      `,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    return {
      emailSent: false,
      error: `Failed to send inquiry email: ${errorText}`,
    }
  }

  return { emailSent: true }
}

// GET all inquiries
export async function GET() {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ inquiries })
  } catch (error) {
    console.error("Failed to fetch inquiries:", error)
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    )
  }
}

// POST create new inquiry (from contact form)
export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request)
    const rateLimit = checkRateLimit({
      key: `inquiry:${clientIp}`,
      limit: 5,
      windowMs: 15 * 60 * 1000,
    })

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many inquiry requests. Please try again later." },
        { status: 429 }
      )
    }

    const contentLength = request.headers.get("content-length")
    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) return NextResponse.json({ error: "Request body is too large" }, { status: 413 })
    const raw = await request.text()
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return NextResponse.json({ error: "Request body is too large" }, { status: 413 })
    let body: unknown
    try { body = JSON.parse(raw) } catch { return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 }) }
    if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ error: "Invalid inquiry payload" }, { status: 400 })
    const parsed = inquirySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || "Invalid inquiry payload",
        },
        { status: 400 }
      )
    }

    const input = parsed.data as typeof parsed.data & { phone?: string; contact?: string; business?: string; budget?: string; timeline?: string; details?: string; selection?: unknown }
    const primaryMessage = input.message || input.details || ""
    if (primaryMessage.trim().length < 10) return NextResponse.json({ error: "Message is too short" }, { status: 400 })
    if (primaryMessage.trim().length > 5000) return NextResponse.json({ error: "Message is too long" }, { status: 400 })
    let selectionSummary = ""
    if (input.selection !== undefined) {
      const selection = input.selection
      if (!selection || typeof selection !== "object" || Array.isArray(selection)) return NextResponse.json({ error: "Invalid selection" }, { status: 400 })
      const selected = selection as Record<string, unknown>
      if (selected.kind === "package") {
        if (typeof selected.name !== "string" || !Object.hasOwn(packageCatalog, selected.name)) return NextResponse.json({ error: "Invalid package" }, { status: 400 })
        const item = packageCatalog[selected.name]; selectionSummary = `แพ็กเกจ: ${selected.name} (฿${item.total.toLocaleString()})\n${item.features.join("\n")}\nราคาเบื้องต้นไม่รวม Hosting และ Domain`
      } else if (selected.kind === "custom") {
        if (typeof selected.pageCount !== "number" || selected.pageCount < MIN_PAGE_COUNT || selected.pageCount > MAX_PAGE_COUNT || !Number.isInteger(selected.pageCount) || !Array.isArray(selected.featureIds) || selected.featureIds.length > FEATURES.length || selected.featureIds.some(id => typeof id !== "string" || !FEATURES.some(feature => feature.id === id))) return NextResponse.json({ error: "Invalid custom package" }, { status: 400 })
        const quote = calculateQuote(selected.pageCount, selected.featureIds)
        selectionSummary = `แพ็กเกจสั่งทำ: ${quote.pageCount} หน้า (฿${quote.total.toLocaleString()})\n${quote.items.map(item => item.label).join("\n")}\nราคาเบื้องต้นไม่รวม Hosting และ Domain`
      } else return NextResponse.json({ error: "Invalid selection" }, { status: 400 })
    }
    const extras = [input.contact && `โทรศัพท์ / LINE: ${input.contact}`, input.business && `ธุรกิจ / แบรนด์: ${input.business}`, input.budget && `งบประมาณ: ${input.budget}`, input.timeline && `กำหนดการ: ${input.timeline}`, selectionSummary].filter(Boolean).join("\n")
    const data: InquiryPayload = { name: input.name, email: input.email, phone: input.contact || input.phone || null, company: input.company || input.business || null, message: [primaryMessage, extras].filter(Boolean).join("\n\n") }
    const inquiry = await prisma.inquiry.create({ data })

    let emailSent = false

    try {
      const recipientEmail = process.env.INQUIRY_TO_EMAIL?.trim() || "thawatsak28@gmail.com"
      if (recipientEmail) {
        const emailResult = await sendInquiryNotification(recipientEmail, {
          id: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          company: inquiry.company,
          message: inquiry.message,
        })
        emailSent = emailResult.emailSent
        if (!emailResult.emailSent) console.error("Inquiry notification was not sent:", emailResult.error || "provider rejected request")
      } else {
        console.error("Inquiry notification was not sent: missing recipient")
      }
    } catch (error) {
      console.error("Failed to send inquiry notification email:", error)
    }

    revalidateTag("inquiries", "max")
    revalidateTag("dashboard-stats", "max")

    return NextResponse.json({ id: inquiry.id, emailSent }, { status: 201 })
  } catch (error) {
    console.error("Failed to create inquiry:", error)
    return NextResponse.json(
      { error: "Failed to create inquiry" },
      { status: 500 }
    )
  }
}
