import { NextResponse } from "next/server"
import { getPublicProjects } from "@/lib/queries"

// Public, read-only endpoint returning active portfolio projects.
// Consumed by the standalone /home-2 preview page (no auth required).
export async function GET() {
  try {
    const projects = await getPublicProjects()
    return NextResponse.json(
      { projects },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    )
  } catch (error) {
    console.error("Failed to fetch public projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}
