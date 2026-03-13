import { prisma } from "@/lib/prisma"
import { PortfolioCarousel } from "@/components/home/portfolio-carousel"

export async function PortfolioSection() {
  const projects = await prisma.project.findMany({
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
  })

  return <PortfolioCarousel projects={projects} />
}
