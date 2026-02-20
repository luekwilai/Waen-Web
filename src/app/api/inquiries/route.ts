import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all inquiries
export async function GET() {
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
    const data = await request.json()
    const inquiry = await prisma.inquiry.create({ data })
    return NextResponse.json({ inquiry }, { status: 201 })
  } catch (error) {
    console.error("Failed to create inquiry:", error)
    return NextResponse.json(
      { error: "Failed to create inquiry" },
      { status: 500 }
    )
  }
}
