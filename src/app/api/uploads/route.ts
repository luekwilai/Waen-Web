import { list, put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { requireAdminApiSession } from "@/lib/admin-access"
import { prisma } from "@/lib/prisma"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
])

type MediaItem = {
  url: string
  pathname: string
  uploadedAt: string | null
  source: "blob" | "db"
}

function isImageLikeUrl(value: string | null | undefined) {
  if (!value) return false
  return /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(value) || value.startsWith("http") || value.startsWith("/")
}

async function getReferencedImageUrls(): Promise<MediaItem[]> {
  const items = new Map<string, MediaItem>()

  try {
    const [projects, settings] = await Promise.all([
      prisma.project.findMany({
        select: { desktopImage: true, mobileImage: true, updatedAt: true },
      }),
      prisma.siteSetting.findMany({
        select: { value: true, updatedAt: true },
      }),
    ])

    for (const project of projects) {
      for (const value of [project.desktopImage, project.mobileImage]) {
        if (!isImageLikeUrl(value) || !value) continue
        items.set(value, {
          url: value,
          pathname: value,
          uploadedAt: project.updatedAt.toISOString(),
          source: "db",
        })
      }
    }

    for (const setting of settings) {
      if (!isImageLikeUrl(setting.value)) continue
        items.set(setting.value, {
          url: setting.value,
          pathname: setting.value,
          uploadedAt: setting.updatedAt.toISOString(),
          source: "db",
        })
    }
  } catch (error) {
    console.error("Failed to load referenced image URLs:", error)
  }

  return Array.from(items.values())
}

export async function GET() {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  const items = new Map<string, MediaItem>()

  try {
    const result = await list({ limit: 1000 })
    for (const blob of result.blobs) {
      if (!isImageLikeUrl(blob.url)) continue
      items.set(blob.url, {
        url: blob.url,
        pathname: blob.pathname,
        uploadedAt: blob.uploadedAt ? new Date(blob.uploadedAt).toISOString() : null,
        source: "blob",
      })
    }
  } catch (error) {
    console.error("Failed to list blob images:", error)
  }

  for (const item of await getReferencedImageUrls()) {
    if (!items.has(item.url)) {
      items.set(item.url, item)
    }
  }

  return NextResponse.json({
    items: Array.from(items.values()).sort((a, b) => {
      if (!a.uploadedAt && !b.uploadedAt) return a.pathname.localeCompare(b.pathname)
      if (!a.uploadedAt) return 1
      if (!b.uploadedAt) return -1
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    }),
  })
}

export async function POST(request: Request) {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) {
    return adminCheck.response
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 })
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Use JPG, PNG, WEBP, or GIF." },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size must not exceed 5MB." }, { status: 400 })
    }

    const blob = await put(`projects/${Date.now()}-${file.name}`, file, {
      access: "public",
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("Failed to upload image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
