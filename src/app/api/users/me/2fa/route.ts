import { NextResponse } from "next/server"
import { requireAdminApiSession } from "@/lib/admin-access"
import { prisma } from "@/lib/prisma"
import { generateOtpAuthUrl, generateTotpSecret, verifyTotpToken } from "@/lib/totp"

const ISSUER = "WAENWEB"

async function findCurrentUser(input: { id?: string; email?: string | null }) {
  if (input.id) {
    return prisma.user.findUnique({ where: { id: input.id } })
  }

  if (input.email) {
    return prisma.user.findUnique({ where: { email: input.email } })
  }

  return null
}

export async function POST() {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const user = await findCurrentUser({
      id: adminCheck.user?.id,
      email: adminCheck.user?.email,
    })
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const secret = generateTotpSecret()
    const otpauthUrl = generateOtpAuthUrl({
      issuer: ISSUER,
      accountName: user.email,
      secret,
    })

    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorTempSecret: secret,
      },
    })

    return NextResponse.json({
      secret,
      otpauthUrl,
      twoFactorEnabled: user.twoFactorEnabled,
    })
  } catch (error) {
    console.error("Failed to setup 2FA:", error)
    return NextResponse.json({ error: "Failed to setup 2FA" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const data = await request.json()
    const token = String(data.token || "")

    const user = await findCurrentUser({
      id: adminCheck.user?.id,
      email: adminCheck.user?.email,
    })
    if (!user || !user.twoFactorTempSecret) {
      return NextResponse.json({ error: "ยังไม่ได้เริ่มตั้งค่า 2FA" }, { status: 400 })
    }

    if (!verifyTotpToken({ token, secret: user.twoFactorTempSecret })) {
      return NextResponse.json({ error: "รหัสยืนยันไม่ถูกต้อง" }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorEnabled: true,
        twoFactorSecret: user.twoFactorTempSecret,
        twoFactorTempSecret: null,
      },
    })

    return NextResponse.json({ twoFactorEnabled: updatedUser.twoFactorEnabled })
  } catch (error) {
    console.error("Failed to verify 2FA:", error)
    return NextResponse.json({ error: "Failed to verify 2FA" }, { status: 500 })
  }
}

export async function DELETE() {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const user = await findCurrentUser({
      id: adminCheck.user?.id,
      email: adminCheck.user?.email,
    })

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
        twoFactorTempSecret: null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to disable 2FA:", error)
    return NextResponse.json({ error: "Failed to disable 2FA" }, { status: 500 })
  }
}
