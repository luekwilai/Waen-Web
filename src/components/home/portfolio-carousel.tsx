"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, FolderOpen, Monitor, Smartphone } from "lucide-react"
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
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef(0)
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const total = projects.length

  const go = useCallback(
    (idx: number, dir: number) => {
      setDirection(dir)
      setCurrent((idx + total) % total)
    },
    [total]
  )

  const prev = () => go(current - 1, -1)
  const next = () => go(current + 1, 1)

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setTimeout(() => go(current + 1, 1), 5000)
    return () => { if (autoplayRef.current) clearTimeout(autoplayRef.current) }
  }, [current, go])

  // Touch / drag
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    dragStart.current = "touches" in e ? e.touches[0].clientX : e.clientX
  }
  const onDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    setIsDragging(false)
    const end = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX
    const diff = dragStart.current - end
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
  }

  const project = projects[current]

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  }

  if (total === 0) {
    return (
      <div className="text-center text-slate-500 py-12">
        <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
        <p>ยังไม่มีผลงานที่แสดง</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Main Carousel */}
      <div
        className="relative w-full overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={project.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="w-full"
          >
            {/* Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl dark:shadow-none">
              {/* Left — Mockup Preview */}
              <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-6 md:p-10 flex items-center justify-center min-h-[280px] md:min-h-[420px] overflow-hidden">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 via-transparent to-emerald-400/5 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-lime-400/10 rounded-full blur-[80px] pointer-events-none" />

                {/* Desktop Mockup */}
                <div className="relative w-full max-w-[480px] group">
                  <div className="relative bg-white dark:bg-slate-950 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    {/* Browser bar */}
                    <div className="h-8 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <div className="flex-1 mx-3 h-4 bg-slate-200 dark:bg-slate-700 rounded-full text-[9px] text-slate-400 flex items-center px-2 truncate">
                        {project.websiteUrl ?? "https://example.com"}
                      </div>
                    </div>
                    {/* Screenshot */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-50 dark:bg-slate-950">
                      {project.desktopImage ? (
                        <Image
                          src={project.desktopImage}
                          alt={project.title}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                          <Monitor className="w-16 h-16" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Mockup overlay */}
                  {project.mobileImage && (
                    <div className="absolute -bottom-4 -right-2 md:-right-6 w-[22%] aspect-[9/19] bg-slate-950 rounded-[14px] shadow-2xl border-[3px] border-slate-700 overflow-hidden z-10">
                      <div className="absolute top-0 inset-x-0 h-3 bg-slate-800 rounded-b-lg w-1/2 mx-auto z-20" />
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={project.mobileImage}
                          alt={`${project.title} mobile`}
                          fill
                          className="object-cover object-top"
                          sizes="15vw"
                          unoptimized
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right — Info */}
              <div className="flex flex-col justify-between p-8 md:p-10">
                <div>
                  {/* Category badge */}
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-lime-600 dark:text-lime-400 bg-lime-50 dark:bg-lime-400/10 border border-lime-200 dark:border-lime-400/20 px-3 py-1 rounded-full mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
                    {project.category}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  )}

                  {/* Device icons */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                      <Monitor className="w-4 h-4" />
                      <span>Desktop</span>
                    </div>
                    {project.mobileImage && (
                      <>
                        <span className="text-slate-200 dark:text-slate-700">•</span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                          <Smartphone className="w-4 h-4" />
                          <span>Mobile</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {project.websiteUrl && (
                    <Link
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-sm px-6 py-3 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-500/30"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      เข้าชมเว็บไซต์
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next Buttons */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:bg-lime-400 hover:text-slate-950 hover:border-lime-400 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:bg-lime-400 hover:text-slate-950 hover:border-lime-400 transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots + Counter */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-8 h-2 bg-lime-500 dark:bg-lime-400"
                  : "w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => go(i, i > current ? 1 : -1)}
            className={`flex-shrink-0 relative w-20 h-14 md:w-28 md:h-18 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              i === current
                ? "border-lime-500 dark:border-lime-400 shadow-lg shadow-lime-500/20 scale-105"
                : "border-transparent opacity-50 hover:opacity-80"
            }`}
          >
            {p.desktopImage ? (
              <Image
                src={p.desktopImage}
                alt={p.title}
                fill
                className="object-cover object-top"
                sizes="112px"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-slate-400" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
