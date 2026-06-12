import { ProjectsPageClient, type AdminProject } from "@/components/admin/projects-page-client"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/get-session"
import { getAdminProjects } from "@/lib/queries"
import { normalizeMetrics } from "@/lib/project-metrics"

export default async function AdminProjectsPage() {
  const [session, projects] = await Promise.all([
    getSession(),
    getAdminProjects(),
  ])

  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/admin/login")
  }

  const initialProjects: AdminProject[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    desktopImage: p.desktopImage,
    mobileImage: p.mobileImage,
    websiteUrl: p.websiteUrl,
    metrics: normalizeMetrics(p.metrics),
    isFeatured: p.isFeatured,
    isActive: p.isActive,
  }))

  return <ProjectsPageClient initialProjects={initialProjects} />
}
