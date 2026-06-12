import { ProjectsPageClient, type AdminProject, type PackageOption } from "@/components/admin/projects-page-client"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/get-session"
import { getAdminProjects, getAdminPackages } from "@/lib/queries"
import { normalizeMetrics } from "@/lib/project-metrics"

export default async function AdminProjectsPage() {
  const [session, projects, packages] = await Promise.all([
    getSession(),
    getAdminProjects(),
    getAdminPackages(),
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
    examplePackageId: p.examplePackageId,
    isActive: p.isActive,
  }))

  const packageOptions: PackageOption[] = packages.map((p) => ({ id: p.id, name: p.name }))

  return <ProjectsPageClient initialProjects={initialProjects} packages={packageOptions} />
}
