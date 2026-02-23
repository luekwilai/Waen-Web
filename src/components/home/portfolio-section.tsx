import { prisma } from "@/lib/prisma"
import { PortfolioCarousel } from "@/components/home/portfolio-carousel"

export async function PortfolioSection() {
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  })

  return <PortfolioCarousel projects={projects} />
}
