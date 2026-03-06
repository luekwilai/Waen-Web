import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { requireAdminApiSession } from "@/lib/admin-access"
import { prisma } from "@/lib/prisma"
import { isValidEmail, normalizeEmail, sanitizeUser } from "@/lib/user-management"

export async function GET() {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({
      users: users.map((user) => sanitizeUser(user)),
    })
  } catch (error) {
    console.error("Failed to fetch users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const data = await request.json()
    const email = normalizeEmail(String(data.email || ""))
    const name = typeof data.name === "string" ? data.name.trim() || null : null
    const password = typeof data.password === "string" ? data.password.trim() : ""

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "กรุณากรอกอีเมลให้ถูกต้อง" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "อีเมลนี้ถูกใช้งานแล้ว" }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "ADMIN",
      },
    })

    return NextResponse.json({ user: sanitizeUser(user) }, { status: 201 })
  } catch (error) {
    console.error("Failed to create user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
