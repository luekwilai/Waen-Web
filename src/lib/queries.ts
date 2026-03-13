import { unstable_cache } from "next/cache"
import { prisma } from "./prisma"

export const getDashboardStats = unstable_cache(
  async () => {
    const [projects, packages, inquiries, newInquiries, users] = await Promise.all([
      prisma.project.count(),
      prisma.package.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "NEW" } }),
      prisma.user.count(),
    ])
    return { projects, packages, inquiries, newInquiries, users }
  },
  ["dashboard-stats"],
  { revalidate: 60, tags: ["dashboard-stats"] }
)

export const getAdminProjects = unstable_cache(
  async () =>
    prisma.project.findMany({ orderBy: { sortOrder: "asc" } }),
  ["admin-projects"],
  { revalidate: 30, tags: ["projects"] }
)

export const getAdminPackages = unstable_cache(
  async () =>
    prisma.package.findMany({ orderBy: { sortOrder: "asc" } }),
  ["admin-packages"],
  { revalidate: 30, tags: ["packages"] }
)

export const getAdminInquiries = unstable_cache(
  async () =>
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } }),
  ["admin-inquiries"],
  { revalidate: 10, tags: ["inquiries"] }
)

export async function getAdminUsers() {
  return prisma.user.findMany({ orderBy: { createdAt: "desc" } })
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteSetting.findMany()
    const settings: Record<string, string> = {}
    for (const row of rows) {
      settings[row.key] = row.value
    }
    return settings
  } catch {
    return {}
  }
}
