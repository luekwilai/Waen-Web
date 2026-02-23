import Link from "next/link"
import Image from "next/image"
import { ArrowRight, FolderOpen } from "lucide-react"
import { SpotlightCard } from "@/components/spotlight-card"
import { ExternalLink, Github, Loader2, MonitorSmartphone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export async function PortfolioSection() {
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  })

  if (projects.length === 0) {
    return (
      <div className="text-center text-slate-500 py-12">
        <p>ยังไม่มีผลงานที่แสดง</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <SpotlightCard key={project.id} className="overflow-hidden bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-lime-500/50 hover:shadow-xl dark:hover:shadow-lime-500/5 transition-all duration-300 group shadow-sm">
          <div className="relative aspect-[16/10] bg-slate-100/50 dark:bg-slate-900/50 p-4 md:p-6 overflow-hidden flex items-end justify-center">
            
            {/* Desktop Mockup */}
            <div className="relative w-full h-full bg-white dark:bg-slate-950 rounded-t-lg shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-transform duration-700 group-hover:-translate-y-1">
              {/* Browser Header */}
              <div className="h-5 md:h-6 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-3 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-400/80" />
                <div className="w-2 h-2 rounded-full bg-amber-400/80" />
                <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
              </div>
              {/* Desktop Image */}
              <div className="relative w-full h-[calc(100%-1.25rem)] md:h-[calc(100%-1.5rem)] overflow-hidden bg-slate-50 dark:bg-slate-950">
                {project.desktopImage ? (
                  <Image
                    src={project.desktopImage}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-all duration-[20000ms] ease-linear group-hover:object-bottom"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                    <FolderOpen className="w-8 h-8 md:w-12 md:h-12" />
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Mockup */}
            {project.mobileImage && (
              <div className="absolute -bottom-2 right-4 md:right-8 w-[24%] md:w-[20%] aspect-[9/19] bg-slate-950 rounded-[16px] md:rounded-[24px] shadow-2xl border-[3px] md:border-[6px] border-slate-800 overflow-hidden z-10 transform translate-y-4 transition-transform duration-700 ease-out group-hover:-translate-y-2">
                {/* Mobile Notch */}
                <div className="absolute top-0 inset-x-0 h-3 md:h-4 bg-slate-800 rounded-b-xl w-1/2 mx-auto z-20" />
                <div className="relative w-full h-full bg-slate-900 overflow-hidden">
                  <Image
                    src={project.mobileImage}
                    alt={`${project.title} mobile`}
                    fill
                    className="object-cover object-top transition-all duration-[20000ms] ease-linear group-hover:object-bottom"
                    sizes="20vw"
                    unoptimized
                  />
                </div>
              </div>
            )}
          </div>

          <CardContent className="p-6 bg-white dark:bg-slate-950 relative z-20 border-t border-slate-100 dark:border-white/5">
            <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2 transition-colors group-hover:text-lime-600 dark:group-hover:text-lime-400">{project.title}</h3>
            <p className="text-lime-600 dark:text-lime-400 text-xs font-semibold uppercase tracking-wider mb-3">{project.category}</p>
            {project.description && (
              <p className="text-slate-600 dark:text-slate-400 text-sm font-light leading-relaxed mb-4 line-clamp-2">{project.description}</p>
            )}
            {project.websiteUrl && (
              <Link
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-slate-900 dark:text-white hover:text-lime-600 dark:hover:text-lime-400 text-sm font-medium transition-colors"
              >
                เข้าชมเว็บไซต์
                <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </CardContent>
        </SpotlightCard>
      ))}
    </div>
  )
}
