import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function GET(request: Request) {
  try {
    const isProduction = process.env.NODE_ENV === "production"
    const seedToken = process.env.SEED_TOKEN

    if (isProduction && !seedToken) {
      return NextResponse.json(
        { error: "Seed endpoint is disabled in production" },
        { status: 403 }
      )
    }

    if (seedToken) {
      const { searchParams } = new URL(request.url)
      const token = searchParams.get("token")

      if (token !== seedToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    // Check if admin exists, if not create one
    let admin = await prisma.user.findUnique({
      where: { email: "admin@waenweb.com" }
    })
    
    if (!admin) {
      const hashedPassword = await bcrypt.hash("admin123", 10)
      admin = await prisma.user.create({
        data: {
          email: "admin@waenweb.com",
          name: "Admin",
          password: hashedPassword,
          role: "ADMIN"
        }
      })
      console.log("Admin created: admin@waenweb.com / admin123")
    }

    // Create sample projects
    const sampleProjects = [
      {
        title: "A-FACTORY",
        category: "E-Commerce / Dental Equipment",
        description: "เว็บไซต์ขายอุปกรณ์ทันตกรรมครบวงจร",
        desktopImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
        mobileImage: "",
        websiteUrl: "https://a-factoryonline.com",
        isActive: true
      },
      {
        title: "Flying Turtle Coffee",
        category: "Corporate / Brand Website",
        description: "เว็บไซต์แบรนด์กาแฟหุ่นยนต์",
        desktopImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
        mobileImage: "",
        websiteUrl: "",
        isActive: true
      },
      {
        title: "Grasshopper Collective",
        category: "Landing Page / Cannabis",
        description: "Landing page สำหรับร้านกัญชา",
        desktopImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        mobileImage: "",
        websiteUrl: "",
        isActive: true
      }
    ]

    const created = []
    for (const project of sampleProjects) {
      const p = await prisma.project.create({ data: project })
      created.push(p)
    }

    return NextResponse.json({ 
      success: true, 
      message: "Sample data seeded",
      admin: admin ? {
        email: admin.email
      } : null,
      projects: created.length
    })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json(
      { error: "Failed to seed data", details: String(error) },
      { status: 500 }
    )
  }
}
