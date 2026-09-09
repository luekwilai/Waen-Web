import { NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"
import { requireAdminApiSession } from "@/lib/admin-access"
import { prisma } from "@/lib/prisma"
import { PARTICLE_SETTING_KEY, validateParticleConfig } from "@/components/creative-home/particle-config"

export const dynamic = "force-dynamic"

const MAX_BODY_BYTES = 64 * 1024

async function readConfig(request: Request) {
  const declaredLength = request.headers.get("content-length")
  if (declaredLength && Number(declaredLength) > MAX_BODY_BYTES) return { error: "Request body is too large", status: 413 as const }
  let text: string
  try {
    text = await request.text()
    if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) return { error: "Request body is too large", status: 413 as const }
    const result = validateParticleConfig(JSON.parse(text))
    return "config" in result ? { config: result.config } : { error: result.error, status: 400 as const }
  } catch {
    return { error: "Invalid JSON body", status: 400 as const }
  }
}

export async function GET() {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: PARTICLE_SETTING_KEY }, select: { value: true } })
    if (!row) return NextResponse.json({ config: {} })
    const result = validateParticleConfig(JSON.parse(row.value))
    return NextResponse.json({ config: "config" in result ? result.config : {} })
  } catch (error) {
    console.error("Failed to fetch particle background setting:", error)
    return NextResponse.json({ error: "Failed to fetch particle background setting" }, { status: 503 })
  }
}

export async function PUT(request: Request) {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) return adminCheck.response
  const body = await readConfig(request)
  if (!('config' in body)) return NextResponse.json({ error: body.error }, { status: body.status })
  try {
    await prisma.siteSetting.upsert({
      where: { key: PARTICLE_SETTING_KEY },
      update: { value: JSON.stringify(body.config) },
      create: { key: PARTICLE_SETTING_KEY, value: JSON.stringify(body.config) },
    })
    revalidateTag("particle-background", { expire: 0 })
    revalidateTag("site-settings", "max")
    revalidatePath("/")
    return NextResponse.json({ config: body.config })
  } catch (error) {
    console.error("Failed to update particle background setting:", error)
    return NextResponse.json({ error: "Failed to update particle background setting" }, { status: 500 })
  }
}
