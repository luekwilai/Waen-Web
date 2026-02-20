import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PUT update inquiry status
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    const inquiry = await prisma.inquiry.update({
      where: { id },
      data
    })
    return NextResponse.json({ inquiry })
  } catch (error) {
    console.error("Failed to update inquiry:", error)
    return NextResponse.json(
      { error: "Failed to update inquiry" },
      { status: 500 }
    )
  }
}

// DELETE inquiry
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.inquiry.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete inquiry:", error)
    return NextResponse.json(
      { error: "Failed to delete inquiry" },
      { status: 500 }
    )
  }
}
