"use client"

import { useState, useRef, useCallback, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, FolderOpen, MonitorSmartphone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Project = {
  id: string
  title: string
  category: string
  description: string | null
  desktopImage: string | null
  mobileImage: string | null
  websiteUrl: string | null
  sortOrder: number
  isActive: boolean
}

export function PortfolioCarousel({ projects }: { projects: Project[] }) {
  const [cardsPerView, setCardsPerView] = useState(1)
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef<number | null>(null)

  const total = projects.length
  const hasProjects = total > 0

  useEffect(() => {
    const calculateCardsPerView = () => {
      if (window.innerWidth >= 1280) return 3
      if (window.innerWidth >= 768) return 2
      return 1
    }

    const apply = () => setCardsPerView(calculateCardsPerView())
    apply()
    window.addEventListener("resize", apply)
    return () => window.removeEventListener("resize", apply)
  }, [])

  const pageCount = total <= cardsPerView ? 1 : total

  useEffect(() => {
    setPage((prev) => Math.min(prev, Math.max(0, pageCount - 1)))
  }, [pageCount])

  const pages = useMemo(() => {
    if (!hasProjects) return [] as Project[][]

    if (total <= cardsPerView) return [projects]

    return Array.from({ length: pageCount }, (_, pageIndex) => {
      const start = pageIndex
      return Array.from({ length: cardsPerView }, (_, slot) => {
        return projects[(start + slot) % total]
      })
    })
  }, [cardsPerView, hasProjects, pageCount, projects, total])

  const prev = useCallback(() => {
    setDirection(-1)
    setPage((prevPage) => (prevPage - 1 + pageCount) % pageCount)
  }, [pageCount])

  const next = useCallback(() => {
    setDirection(1)
    setPage((prevPage) => (prevPage + 1) % pageCount)
  }, [pageCount])

  const goTo = useCallback((idx: number, cur: number) => {
    setDirection(idx > cur ? 1 : -1)
    setPage((idx + pageCount) % pageCount)
  }, [pageCount])

  useEffect(() => {
    if (pageCount <= 1 || isPaused || isDragging) return
    const id = setInterval(() => { setDirection(1); setPage((p) => (p + 1) % pageCount) }, 5000)
    return () => clearInterval(id)
  }, [isDragging, isPaused, pageCount])

  // Preload adjacent page images
  useEffect(() => {
    if (!hasProjects || typeof window === "undefined") return

    const preload = (src: string | null) => {
      if (!src) return
      const img = new window.Image()
      img.src = src
    }

    const nextPage = pages[(page + 1) % pageCount] ?? []
    const prevPage = pages[(page - 1 + pageCount) % pageCount] ?? []
    ;[...nextPage, ...prevPage].forEach((project) => {
      preload(project.desktopImage)
      preload(project.mobileImage)
    })
  }, [hasProjects, page, pageCount, pages])

  const onPointerStart = (clientX: number) => {
    setIsDragging(true)
    setIsPaused(true)
    dragStartX.current = clientX
  }

  const onPointerEnd = (clientX: number) => {
    if (!isDragging) return

    const startX = dragStartX.current
    dragStartX.current = null
    setIsDragging(false)
    setIsPaused(false)

    if (startX === null) return
    const delta = startX - clientX
    if (Math.abs(delta) < 50) return
    if (delta > 0) next()
    else prev()
  }

  if (!hasProjects) {
    return (
      <div className="text-center text-slate-500 py-12">
        <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
        <p>ยังไม่มีผลงานที่แสดง</p>
      </div>
    )
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-40%" : "40%", opacity: 0, scale: 0.97 }),
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
    }),
  }

  return (
    <div className="w-full relative">
      {/* Ambient glow */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[120%] pointer-events-none overflow-hidden">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-lime-400/10 dark:bg-lime-400/8 rounded-full blur-[100px]" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-emerald-400/8 dark:bg-emerald-400/6 rounded-full blur-[80px]" />
      </div>

      {/* Nav arrows */}
      <div className="hidden md:flex absolute top-[42%] left-4 -translate-y-1/2 z-20">
        <motion.button
          onClick={prev}
          disabled={pageCount <= 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-lime-400 hover:text-slate-950 hover:border-lime-400 hover:shadow-lime-400/25 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
      </div>
      <div className="hidden md:flex absolute top-[42%] right-4 -translate-y-1/2 z-20">
        <motion.button
          onClick={next}
          disabled={pageCount <= 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-lime-400 hover:text-slate-950 hover:border-lime-400 hover:shadow-lime-400/25 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Slide track */}
      <div
        className="relative overflow-hidden select-none px-4 sm:px-6 lg:px-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setIsDragging(false); dragStartX.current = null }}
        onMouseDown={(e) => onPointerStart(e.clientX)}
        onMouseUp={(e) => onPointerEnd(e.clientX)}
        onTouchStart={(e) => onPointerStart(e.touches[0].clientX)}
        onTouchEnd={(e) => onPointerEnd(e.changedTouches[0].clientX)}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 py-4">
              {(pages[page] ?? []).map((project, slot) => {
                const isPriority = slot < cardsPerView
                return (
                  <motion.div
                    key={`${project.id}-${page}-${slot}`}
                    custom={slot}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="group relative h-full"
                  >
                    {/* Hover glow ring */}
                    <div className="absolute -inset-px rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-lime-400/30 via-emerald-400/15 to-transparent blur-sm pointer-events-none z-0" />

                    <div className="relative z-10 h-full flex flex-col overflow-hidden rounded-[22px] border border-slate-200/80 dark:border-white/8 bg-white dark:bg-slate-900/80 shadow-lg group-hover:shadow-2xl group-hover:shadow-lime-500/10 group-hover:-translate-y-2 transition-all duration-500">
                      {/* Screenshot */}
                      <div className="relative aspect-[16/9] bg-slate-100 dark:bg-slate-950 overflow-hidden flex-shrink-0">
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

                        {project.desktopImage ? (
                          <Image
                            src={project.desktopImage}
                            alt={project.title}
                            fill
                            className="object-cover object-top pt-7 transition-all duration-[12000ms] ease-linear group-hover:object-bottom"
                            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                            priority={isPriority}
                            loading={isPriority ? "eager" : "lazy"}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                            <FolderOpen className="w-10 h-10" />
                          </div>
                        )}

                        {/* Bottom gradient */}
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/25 to-transparent pointer-events-none z-10" />

                        {/* Mobile mockup */}
                        {project.mobileImage && (
                          <motion.div
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: slot * 0.1 + 0.35, duration: 0.45 }}
                            className="absolute bottom-3 right-3 w-[22%] aspect-[9/19] rounded-[14px] border-[3px] border-slate-900 bg-slate-900 overflow-hidden shadow-2xl z-20"
                          >
                            <div className="absolute top-0 inset-x-0 h-2.5 bg-slate-900 rounded-b-md w-1/2 mx-auto z-10" />
                            <Image
                              src={project.mobileImage}
                              alt={`${project.title} mobile`}
                              fill
                              className="object-cover object-top transition-all duration-[12000ms] ease-linear group-hover:object-bottom"
                              sizes="(max-width: 767px) 22vw, (max-width: 1279px) 11vw, 8vw"
                              loading={isPriority ? "eager" : "lazy"}
                            />
                          </motion.div>
                        )}
                      </div>

                      {/* Card body */}
                      <div className="p-5 md:p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-lime-600 dark:text-lime-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
                            <MonitorSmartphone className="w-3.5 h-3.5" />
                            {project.category}
                          </span>
                        </div>

                        <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-2 line-clamp-2 tracking-tight">
                          {project.title}
                        </h3>

                        {project.description && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-5">
                            {project.description}
                          </p>
                        )}

                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/6">
                          {project.websiteUrl ? (
                            <Link
                              href={project.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              เข้าชมเว็บไซต์
                              <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/8 flex items-center justify-center group-hover/link:bg-lime-400 group-hover/link:text-slate-950 transition-colors">
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </Link>
                          ) : (
                            <span className="text-sm text-slate-400">ไม่มีลิงก์เว็บไซต์</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={prev} disabled={pageCount <= 1} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-lime-400 hover:text-slate-950 hover:border-lime-400 transition-all disabled:opacity-40">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {String(page + 1).padStart(2, "0")} <span className="text-slate-400">/</span> {String(pageCount).padStart(2, "0")}
          </span>
          <button onClick={next} disabled={pageCount <= 1} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-lime-400 hover:text-slate-950 hover:border-lime-400 transition-all disabled:opacity-40">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="hidden md:block text-sm font-bold font-mono text-slate-900 dark:text-white tabular-nums">
          {String(page + 1).padStart(2, "0")} <span className="text-slate-400">/</span> {String(pageCount).padStart(2, "0")}
        </div>

        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 py-2 px-4 rounded-full border border-slate-200 dark:border-white/5 shadow-sm">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, page)}
              disabled={pageCount <= 1}
              className="relative py-2 px-1 group"
              aria-label={`Go to page ${i + 1}`}
            >
              <div className={`transition-all duration-500 rounded-full ${
                i === page
                  ? "w-8 h-2 bg-lime-500"
                  : "w-2 h-2 bg-slate-200 dark:bg-slate-700 group-hover:bg-slate-400 dark:group-hover:bg-slate-500"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
