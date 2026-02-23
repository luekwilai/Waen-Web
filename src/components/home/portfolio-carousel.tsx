"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ChevronLeft, ChevronRight, FolderOpen, Monitor, Smartphone } from "lucide-react"
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
    autoplayRef.current = setTimeout(() => go(current + 1, 1), 6000)
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

  if (total === 0) {
    return (
      <div className="text-center text-slate-500 py-12">
        <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
        <p>ยังไม่มีผลงานที่แสดง</p>
      </div>
    )
  }

  const project = projects[current]

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "20%" : "-20%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-20%" : "20%",
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <div className="w-full relative max-w-6xl mx-auto">
      
      {/* Navigation & Controls Overlay - Hidden on Mobile, Visible on Desktop */}
      <div className="hidden md:flex absolute top-1/2 -left-6 -translate-y-1/2 z-30">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-lime-400 hover:text-slate-950 hover:border-lime-400 transition-all hover:scale-110"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 z-30">
        <button
          onClick={next}
          className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-lime-400 hover:text-slate-950 hover:border-lime-400 transition-all hover:scale-110"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Main Carousel Area */}
      <div 
        className="relative w-full overflow-hidden rounded-[2rem] cursor-grab active:cursor-grabbing select-none bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 shadow-2xl dark:shadow-none"
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={project.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className="w-full min-h-[500px] md:min-h-[600px] flex flex-col lg:flex-row relative"
          >
            {/* Background Glow specific to slide */}
            <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-transparent to-transparent pointer-events-none" />

            {/* Left Content (Text) */}
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 lg:max-w-[45%]">
              <div className="mb-auto">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-600 dark:text-lime-400 mb-6">
                  <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
                  {project.category}
                </span>

                <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
                  {project.title}
                </h3>

                {project.description && (
                  <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed mb-8 font-light">
                    {project.description}
                  </p>
                )}

                {/* Device Support Icons */}
                <div className="flex items-center gap-4 mb-10 opacity-70">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <Monitor className="w-5 h-5" />
                    <span>Desktop</span>
                  </div>
                  {project.mobileImage && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                        <Smartphone className="w-5 h-5" />
                        <span>Mobile</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action Button */}
              {project.websiteUrl && (
                <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/10">
                  <Link
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-slate-900 dark:text-white font-bold hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Visit Live Website</span>
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-lime-400 group-hover:text-slate-950 transition-colors">
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Content (Images) */}
            <div className="flex-1 relative min-h-[300px] lg:min-h-full overflow-hidden bg-slate-200/50 dark:bg-slate-950/50 flex items-end justify-center lg:justify-end pt-12 px-8 lg:px-0">
               {/* Decorative background shape */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-t from-lime-400/20 to-transparent blur-3xl rounded-full opacity-50 pointer-events-none" />

              {/* Desktop Image Container */}
              <div className="relative w-full max-w-[500px] lg:max-w-none lg:w-[120%] lg:-translate-x-[10%] rounded-t-2xl shadow-2xl border-t border-x border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden group">
                
                {/* Minimal Browser Chrome */}
                <div className="h-6 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                   <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                   <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                </div>

                <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-950 overflow-hidden">
                  {project.desktopImage ? (
                    <Image
                      src={project.desktopImage}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-[15000ms] ease-linear group-hover:object-bottom"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Monitor className="w-12 h-12 text-slate-300 dark:text-slate-800" />
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Image Container - Floating over desktop */}
              {project.mobileImage && (
                <div className="absolute bottom-4 left-4 lg:left-[-10%] lg:bottom-12 w-[28%] max-w-[140px] aspect-[9/19] rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-slate-900 dark:border-black bg-slate-900 shadow-2xl overflow-hidden z-20 hover:-translate-y-2 transition-transform duration-500">
                  <div className="absolute top-0 inset-x-0 h-4 bg-slate-900 rounded-b-xl w-[40%] mx-auto z-30" />
                  <div className="relative w-full h-full bg-slate-950 overflow-hidden group">
                    <Image
                      src={project.mobileImage}
                      alt={`${project.title} mobile`}
                      fill
                      className="object-cover object-top transition-transform duration-[15000ms] ease-linear group-hover:object-bottom"
                      sizes="20vw"
                      unoptimized
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination & Mobile Controls */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        
        {/* Mobile Nav */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
            {String(current + 1).padStart(2, "0")} <span className="text-slate-400">/</span> {String(total).padStart(2, "0")}
          </span>
          <button onClick={next} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Counter */}
        <div className="hidden md:block text-sm font-bold font-mono text-slate-900 dark:text-white">
            {String(current + 1).padStart(2, "0")} <span className="text-slate-400">/</span> {String(total).padStart(2, "0")}
        </div>

        {/* Custom Progress Dots */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 py-2 px-4 rounded-full border border-slate-200 dark:border-white/5 shadow-sm">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              className="relative py-2 px-1 group"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div 
                className={`transition-all duration-500 rounded-full ${
                  i === current
                    ? "w-8 h-2 bg-lime-500"
                    : "w-2 h-2 bg-slate-200 dark:bg-slate-700 group-hover:bg-slate-400 dark:group-hover:bg-slate-500"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

