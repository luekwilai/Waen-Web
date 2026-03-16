import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { z } from "zod"
import { requireAdminApiSession } from "@/lib/admin-access"
import { prisma } from "@/lib/prisma"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"

type InquiryPayload = {
  name: string
  email: string
  company?: string | null
  message: string
}

type InquiryEmailResult = {
  emailSent: boolean
  error?: string
}

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
  email: z.email("Invalid email address").transform((value) => value.trim().toLowerCase()),
  company: z.string().trim().max(120, "Company is too long").optional().nullable().transform((value) => value || null),
  message: z.string().trim().min(10, "Message is too short").max(5000, "Message is too long"),
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

  const fromEmail = process.env.RESEND_FROM_EMAIL || "WAENWEB <onboarding@resend.dev>"
  const subject = `New inquiry from ${inquiry.name}`
  const company = inquiry.company?.trim() || "-"
  const messageHtml = escapeHtml(inquiry.message).replace(/\n/g, "<br />")

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [recipientEmail],
      reply_to: inquiry.email,
      subject,
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

    const body = await request.json()
    const parsed = inquirySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || "Invalid inquiry payload",
        },
        { status: 400 }
      )
    }

    const data: InquiryPayload = parsed.data
    const inquiry = await prisma.inquiry.create({ data })

    let emailSent = false
    let emailErrorMessage: string | null = null

    try {
      const contactEmailSetting = await prisma.siteSetting.findUnique({
        where: { key: "contact.email" },
        select: { value: true },
      })

      const recipientEmail = contactEmailSetting?.value?.trim()
      if (recipientEmail) {
        const emailResult = await sendInquiryNotification(recipientEmail, {
          id: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
          company: inquiry.company,
          message: inquiry.message,
        })
        emailSent = emailResult.emailSent
        emailErrorMessage = emailResult.error ?? null
      } else {
        emailErrorMessage = "Missing contact.email setting"
      }
    } catch (error) {
      console.error("Failed to send inquiry notification email:", error)
      emailErrorMessage = error instanceof Error ? error.message : "Unknown email delivery error"
    }

    revalidateTag("inquiries", "max")
    revalidateTag("dashboard-stats", "max")

    return NextResponse.json({ inquiry, emailSent, emailError: emailErrorMessage }, { status: 201 })
  } catch (error) {
    console.error("Failed to create inquiry:", error)
    return NextResponse.json(
      { error: "Failed to create inquiry" },
      { status: 500 }
    )
  }
}
