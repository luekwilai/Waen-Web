import { list, put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { requireAdminApiSession } from "@/lib/admin-access"
import { prisma } from "@/lib/prisma"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
])
const ALLOWED_EXTENSIONS = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
])

type MediaItem = {
  url: string
  pathname: string
  uploadedAt: string | null
  source: "blob" | "db"
}

function sanitizeFilename(value: string) {
  const trimmed = value.trim().toLowerCase()
  const withoutExtension = trimmed.replace(/\.[^.]+$/, "")
  const safeBase = withoutExtension
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

  return safeBase || "upload"
}

async function hasValidFileSignature(file: File, mimeType: string) {
  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer())

  if (mimeType === "image/png") {
    return bytes.length >= 8 &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a
  }

  if (mimeType === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
  }

  if (mimeType === "image/gif") {
    const signature = String.fromCharCode(...bytes.slice(0, 6))
    return signature === "GIF87a" || signature === "GIF89a"
  }

  if (mimeType === "image/webp") {
    const riff = String.fromCharCode(...bytes.slice(0, 4))
    const webp = String.fromCharCode(...bytes.slice(8, 12))
    return riff === "RIFF" && webp === "WEBP"
  }

  return false
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
    const clientIp = getClientIp(request)
    const rateLimit = checkRateLimit({
      key: `upload:${clientIp}`,
      limit: 20,
      windowMs: 15 * 60 * 1000,
    })

    if (!rateLimit.allowed) {
      return NextResponse.json({ error: "Too many upload requests. Please try again later." }, { status: 429 })
    }

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

    if (!(await hasValidFileSignature(file, file.type))) {
      return NextResponse.json({ error: "File content does not match the declared image type." }, { status: 400 })
    }

    const extension = ALLOWED_EXTENSIONS.get(file.type)
    if (!extension) {
      return NextResponse.json({ error: "Unsupported file extension." }, { status: 400 })
    }

    const safeFilename = sanitizeFilename(file.name)

    const blob = await put(`projects/${Date.now()}-${safeFilename}.${extension}`, file, {
      access: "public",
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("Failed to upload image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
