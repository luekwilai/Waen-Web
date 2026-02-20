import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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

// PUT update package
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    const pkg = await prisma.package.update({
      where: { id },
      data: {
        ...data,
        features: toFeatureString(data.features),
      }
    })

    const normalizedPackage = {
      ...pkg,
      features: toFeatureArray(pkg.features),
    }

    return NextResponse.json({ package: normalizedPackage })
  } catch (error) {
    console.error("Failed to update package:", error)
    return NextResponse.json(
      { error: "Failed to update package" },
      { status: 500 }
    )
  }
}

// DELETE package
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.package.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete package:", error)
    return NextResponse.json(
      { error: "Failed to delete package" },
      { status: 500 }
    )
  }
}
