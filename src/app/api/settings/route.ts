import { NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"
import { requireAdminApiSession } from "@/lib/admin-access"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) return adminCheck.response

  try {
    const rows = await prisma.siteSetting.findMany()
    const settings: Record<string, string> = {}
    for (const row of rows) {
      settings[row.key] = row.value
    }
    return NextResponse.json({ settings })
  } catch (error) {
    console.error("Failed to fetch settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const adminCheck = await requireAdminApiSession()
  if (adminCheck.response) return adminCheck.response

  try {
    const body = (await request.json()) as Record<string, string>

    await prisma.$transaction(
      Object.entries(body).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    )

    revalidateTag("site-settings", "max")
    revalidatePath("/")
    revalidatePath("/admin/settings")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to update settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
