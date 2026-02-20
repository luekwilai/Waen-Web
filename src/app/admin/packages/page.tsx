import { PackagesPageClient } from "@/components/admin/packages-page-client"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/get-session"
import { getAdminPackages } from "@/lib/queries"

export default async function AdminPackagesPage() {
  const [session, packages] = await Promise.all([
    getSession(),
    getAdminPackages(),
  ])

  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/admin/login")
  }

  const initialPackages = packages.map((pkg) => ({
    ...pkg,
    features: pkg.features
      ? pkg.features
          .split("\n")
          .map((feature) => feature.trim())
          .filter(Boolean)
      : [],
  }))

  return <PackagesPageClient initialPackages={initialPackages} />
}
