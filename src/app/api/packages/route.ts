import { NextResponse } from "next/server"
import { requireAdminApiSession } from "@/lib/admin-access"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

const toFeatureArray = (features: string | null) =>
  features
    ? features
        .split("\n")
        .map((feature) => feature.trim())
        .filter(Boolean)
    : []

const toFeatureString = (features: unknown) => {
  if (Array.isArray(features)) {
    return features.map((feature) => String(feature).trim()).filter(Boolean).join("\n")
  }

  if (typeof features === "string") {
    return features
  }

  return null
}

// GET all packages
export async function GET() {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const packages = await prisma.package.findMany({
      orderBy: { sortOrder: 'asc' }
    })
    const normalizedPackages = packages.map((pkg) => ({
      ...pkg,
      features: toFeatureArray(pkg.features),
    }))

    return NextResponse.json({ packages: normalizedPackages })
  } catch (error) {
    console.error("Failed to fetch packages:", error)
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    )
  }
}

// PATCH reorder packages
export async function PATCH(request: Request) {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const data = (await request.json()) as { packageIds?: string[] }

    if (!Array.isArray(data.packageIds) || data.packageIds.length === 0) {
      return NextResponse.json(
        { error: "Invalid package order payload" },
        { status: 400 }
      )
    }

    await prisma.$transaction(
      data.packageIds.map((id, index) =>
        prisma.package.update({
          where: { id },
          data: { sortOrder: index + 1 },
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to reorder packages:", error)
    return NextResponse.json(
      { error: "Failed to reorder packages" },
      { status: 500 }
    )
  }
}

// POST create new package
export async function POST(request: Request) {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const data = await request.json()
    const pkg = await prisma.package.create({
      data: {
        ...data,
        features: toFeatureString(data.features),
      },
    })

    const normalizedPackage = {
      ...pkg,
      features: toFeatureArray(pkg.features),
    }

    return NextResponse.json({ package: normalizedPackage }, { status: 201 })
  } catch (error) {
    console.error("Failed to create package:", error)
    return NextResponse.json(
      { error: "Failed to create package" },
      { status: 500 }
    )
  }
}
