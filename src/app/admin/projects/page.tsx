import { ProjectsPageClient } from "@/components/admin/projects-page-client"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/get-session"
import { getAdminProjects } from "@/lib/queries"

export default async function AdminProjectsPage() {
  const [session, projects] = await Promise.all([
    getSession(),
    getAdminProjects(),
  ])

  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/admin/login")
  }

  return <ProjectsPageClient initialProjects={projects} />
}
