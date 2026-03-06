import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { requireAdminApiSession } from "@/lib/admin-access"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
])

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
