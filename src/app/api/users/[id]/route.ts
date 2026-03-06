import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { requireAdminApiSession } from "@/lib/admin-access"
import { prisma } from "@/lib/prisma"
import { isValidEmail, normalizeEmail, sanitizeUser } from "@/lib/user-management"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const { id } = await params
    const data = await request.json()
    const email = normalizeEmail(String(data.email || ""))
    const name = typeof data.name === "string" ? data.name.trim() || null : null
    const password = typeof data.password === "string" ? data.password.trim() : ""

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "กรุณากรอกอีเมลให้ถูกต้อง" }, { status: 400 })
    }

    if (password && password.length < 8) {
      return NextResponse.json({ error: "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร" }, { status: 400 })
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id },
      },
    })

    if (existingUser) {
      return NextResponse.json({ error: "อีเมลนี้ถูกใช้งานแล้ว" }, { status: 409 })
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        email,
        name,
        ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
      },
    })

    return NextResponse.json({ user: sanitizeUser(user) })
  } catch (error) {
    console.error("Failed to update user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const { id } = await params

    if (adminCheck.user?.id === id) {
      return NextResponse.json({ error: "ไม่สามารถลบบัญชีที่กำลังใช้งานอยู่ได้" }, { status: 400 })
    }

    const adminCount = await prisma.user.count({
      where: { role: "ADMIN" },
    })

    if (adminCount <= 1) {
      return NextResponse.json({ error: "ต้องมีผู้ดูแลระบบอย่างน้อย 1 บัญชี" }, { status: 400 })
    }

    await prisma.user.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
