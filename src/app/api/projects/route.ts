import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { sortOrder: 'asc' }
    })
    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Failed to fetch projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}

// POST create new project
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const project = await prisma.project.create({ data })
    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error("Failed to create project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
