import Image from "next/image"
import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"
import { getFeaturedProjects } from "@/lib/queries"
import { normalizeMetrics } from "@/lib/project-metrics"
import { ScrollReveal } from "@/components/home/scroll-reveal"

export async function CaseStudySection() {
  const projects = await getFeaturedProjects()
  if (projects.length === 0) return null

  return (
    <section
      id="case-studies"
      className="py-20 md:py-28 border-t border-slate-200 dark:border-white/5 relative z-10 overflow-hidden"
    >
      {/* background accent */}
      <div className="absolute top-1/4 left-0 w-[420px] h-[420px] bg-lime-400/5 dark:bg-lime-400/[0.04] rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
            Case Study
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            ผลลัพธ์ที่<span className="text-lime-500 dark:text-lime-400">วัดได้</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-light max-w-xl mx-auto">
            ไม่ใช่แค่เว็บสวย แต่ทำงานได้จริง — นี่คือตัวเลขจากงานที่เราส่งมอบ
          </p>
        </ScrollReveal>

        <div className="space-y-10 md:space-y-16">
          {projects.map((project, index) => {
            const metrics = normalizeMetrics(project.metrics)
            const imageRight = index % 2 === 1
            return (
              <ScrollReveal key={project.id} delay={index * 100}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                  {/* Screenshot */}
                  <div className={`relative ${imageRight ? "lg:order-2" : ""}`}>
                    <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-lime-400/20 via-emerald-400/10 to-transparent blur-xl pointer-events-none" />
                    <div className="relative overflow-hidden rounded-[22px] border border-slate-200/80 dark:border-white/8 bg-white dark:bg-slate-900/80 shadow-xl">
                      <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-950 overflow-hidden">
                        {/* Browser bar */}
                        <div className="absolute inset-x-0 top-0 h-7 bg-slate-100/98 dark:bg-slate-950/98 border-b border-slate-200 dark:border-slate-800 z-10 flex items-center px-3 gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                          </div>
                          {project.websiteUrl && (
                            <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-800 rounded-full text-[9px] text-slate-400 flex items-center px-2 overflow-hidden">
                              <span className="truncate">{project.websiteUrl}</span>
                            </div>
                          )}
                        </div>
                        {project.desktopImage && (
                          <Image
                            src={project.desktopImage}
                            alt={project.title}
                            fill
                            className="object-cover object-top pt-7"
                            sizes="(max-width: 1023px) 100vw, 50vw"
                            quality={75}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={imageRight ? "lg:order-1" : ""}>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-lime-600 dark:text-lime-400 mb-3">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {project.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-7 max-w-lg">
                        {project.description}
                      </p>
                    )}

                    {/* Stat chips */}
                    {metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-7">
                        {metrics.map((metric, i) => (
                          <div
                            key={i}
                            className="rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-slate-900/60 px-4 py-4 text-center shadow-sm"
                          >
                            <div className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-br from-lime-500 to-emerald-500 dark:from-lime-300 dark:to-emerald-400 bg-clip-text text-transparent leading-none">
                              {metric.value}
                            </div>
                            <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {project.websiteUrl && (
                      <Link
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                      >
                        เข้าชมเว็บไซต์จริง
                        <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/8 flex items-center justify-center group-hover:bg-lime-400 group-hover:text-slate-950 transition-colors">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
