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

// Public, read-only list of active projects (used by the standalone /home-2 preview).
export const getPublicProjects = unstable_cache(
  async () =>
    prisma.project.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        title: true,
        category: true,
        description: true,
        desktopImage: true,
        mobileImage: true,
        websiteUrl: true,
      },
    }),
  ["public-projects"],
  { revalidate: 60, tags: ["projects"] }
)

// Public, read-only list of featured projects with metrics (Case Study section on home page).
export const getFeaturedProjects = unstable_cache(
  async () =>
    prisma.project.findMany({
      where: { isActive: true, isFeatured: true },
      orderBy: { sortOrder: "asc" },
      take: 2,
      select: {
        id: true,
        title: true,
        category: true,
        description: true,
        desktopImage: true,
        websiteUrl: true,
        metrics: true,
      },
    }),
  ["featured-projects"],
  { revalidate: 60, tags: ["projects"] }
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

export const getSiteSettings = unstable_cache(
  async (): Promise<Record<string, string>> => {
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
  },
  ["site-settings-v2"],
  { revalidate: 300, tags: ["site-settings"] }
)

// Public package data for the isolated V2 experience.
export const getPublicPackages = unstable_cache(
  async () =>
    prisma.package.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        nameEn: true,
        price: true,
        description: true,
        features: true,
        duration: true,
        isPopular: true,
      },
    }),
  ["public-packages"],
  { revalidate: 60, tags: ["packages"] }
)
