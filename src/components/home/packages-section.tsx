import { prisma } from "@/lib/prisma"
import { PackagesSectionClient, type PackageItem } from "@/components/home/packages-section-client"

const toFeatureArray = (features: string | null) =>
  features
    ? features
        .split("\n")
        .map((feature) => feature.trim())
        .filter(Boolean)
    : []

export async function PackagesSection() {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  })

  const normalizedPackages: PackageItem[] = packages.map((pkg) => ({
    ...pkg,
    features: toFeatureArray(pkg.features),
  }))

  return <PackagesSectionClient packages={normalizedPackages} />
}

