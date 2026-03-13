import { NextResponse } from "next/server"
import { requireAdminApiSession } from "@/lib/admin-access"
import { prisma } from "@/lib/prisma"

type InquiryPayload = {
  name: string
  email: string
  company?: string | null
  message: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

async function sendInquiryNotification(recipientEmail: string, inquiry: InquiryPayload & { id: string }) {
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    return false
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
    throw new Error(`Failed to send inquiry email: ${errorText}`)
  }

  return true
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
    const data = (await request.json()) as InquiryPayload
    const inquiry = await prisma.inquiry.create({ data })

    let emailSent = false

    try {
      const contactEmailSetting = await prisma.siteSetting.findUnique({
        where: { key: "contact.email" },
        select: { value: true },
      })

      const recipientEmail = contactEmailSetting?.value?.trim()
      if (recipientEmail) {
        emailSent = await sendInquiryNotification(recipientEmail, {
          id: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
          company: inquiry.company,
          message: inquiry.message,
        })
      }
    } catch (emailError) {
      console.error("Failed to send inquiry notification email:", emailError)
    }

    return NextResponse.json({ inquiry, emailSent }, { status: 201 })
  } catch (error) {
    console.error("Failed to create inquiry:", error)
    return NextResponse.json(
      { error: "Failed to create inquiry" },
      { status: 500 }
    )
  }
}
