import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { requireAdminApiSession } from "@/lib/admin-access"
import { prisma } from "@/lib/prisma"
import { normalizeMetrics } from "@/lib/project-metrics"

// GET all projects
export async function GET() {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

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

// PATCH reorder projects
export async function PATCH(request: Request) {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const data = (await request.json()) as { projectIds?: string[] }

    if (!Array.isArray(data.projectIds) || data.projectIds.length === 0) {
      return NextResponse.json(
        { error: "Invalid project order payload" },
        { status: 400 }
      )
    }

    await prisma.$transaction(
      data.projectIds.map((id, index) =>
        prisma.project.update({
          where: { id },
          data: { sortOrder: index + 1 },
        })
      )
    )

    revalidateTag("projects", "max")
    revalidateTag("dashboard-stats", "max")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to reorder projects:", error)
    return NextResponse.json(
      { error: "Failed to reorder projects" },
      { status: 500 }
    )
  }
}

// POST create new project
export async function POST(request: Request) {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const data = await request.json()
    if ("metrics" in data) {
      data.metrics = normalizeMetrics(data.metrics)
    }
    if ("examplePackageId" in data && !data.examplePackageId) {
      data.examplePackageId = null
    }
    const project = await prisma.project.create({ data })

    revalidateTag("projects", "max")
    revalidateTag("dashboard-stats", "max")

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error("Failed to create project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
