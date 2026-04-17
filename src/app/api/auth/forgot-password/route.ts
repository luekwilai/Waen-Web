import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"
import { verifyRecaptchaToken } from "@/lib/recaptcha"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, recaptchaToken } = body

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "กรุณาระบุอีเมล" },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptchaToken(recaptchaToken || "")
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: "การยืนยัน reCAPTCHA ล้มเหลว กรุณาลองใหม่อีกครั้ง" },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })

    // Don't reveal if user exists or not for security
    if (!user) {
      return NextResponse.json(
        { message: "หากอีเมลนี้มีอยู่ในระบบ คุณจะได้รับลิงก์สำหรับรีเซ็ตรหัสผ่าน" },
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Save token to user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    // Send email using Resend
    const resendApiKey = process.env.RESEND_API_KEY
    const resendFromEmail = process.env.RESEND_FROM_EMAIL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://waenweb.com"

    if (resendApiKey && resendFromEmail) {
      const resetUrl = `${appUrl}/admin/reset-password?token=${resetToken}`

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: resendFromEmail,
          to: user.email,
          subject: "รีเซ็ตรหัสผ่าน - WAENWEB Admin",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #333;">รีเซ็ตรหัสผ่าน</h2>
              <p>คุณได้รับอีเมลนี้เนื่องจากมีการขอรีเซ็ตรหัสผ่านสำหรับบัญชีของคุณ</p>
              <p>กรุณาคลิกลิงก์ด้านล่างเพื่อรีเซ็ตรหัสผ่าน:</p>
              <a href="${resetUrl}" style="display: inline-block; background-color: #84cc16; color: #0f172a; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 16px 0;">
                รีเซ็ตรหัสผ่าน
              </a>
              <p style="color: #666; font-size: 14px;">ลิงก์นี้จะหมดอายุใน 1 ชั่วโมง</p>
              <p style="color: #666; font-size: 14px;">หากคุณไม่ได้ขอรีเซ็ตรหัสผ่าน กรุณาละเว้นอีเมลนี้</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="color: #999; font-size: 12px;">WAENWEB Admin System</p>
            </div>
          `,
        }),
      })
    }

    return NextResponse.json(
      { message: "หากอีเมลนี้มีอยู่ในระบบ คุณจะได้รับลิงก์สำหรับรีเซ็ตรหัสผ่าน" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    )
  }
}
