"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, PenTool, Code2, Rocket, CheckCircle } from "lucide-react"
import { SpotlightCard } from "@/components/spotlight-card"

const steps = [
  {
    num: "01",
    title: "พูดคุยและวางแผน",
    description: "เราเริ่มต้นด้วยการรับฟังความต้องการของคุณอย่างละเอียด วิเคราะห์กลุ่มเป้าหมาย และวางโครงสร้างเว็บไซต์ร่วมกัน",
    icon: MessageSquare,
    tags: ["รับฟังความต้องการ", "วิเคราะห์ธุรกิจ", "วางโครงสร้าง"],
    duration: "1–2 วัน",
    gradient: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/20",
    light: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    num: "02",
    title: "ออกแบบ UI/UX",
    description: "สร้าง Mockup และ Prototype ให้เห็นภาพรวมก่อนการพัฒนา รับรีวิวและแก้ไขได้จนกว่าจะพอใจ",
    icon: PenTool,
    tags: ["Wireframe", "Mockup Design", "ปรับแก้ได้ไม่จำกัด"],
    duration: "2–4 วัน",
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
    light: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    num: "03",
    title: "พัฒนาเว็บไซต์",
    description: "ลงมือพัฒนาด้วย WordPress และเทคโนโลยีที่ทันสมัย พร้อมระบบจัดการหลังบ้านที่ใช้งานง่าย",
    icon: Code2,
    tags: ["WordPress CMS", "Responsive", "SEO Ready"],
    duration: "5–10 วัน",
    gradient: "from-lime-500 to-emerald-600",
    glow: "shadow-lime-500/20",
    light: "bg-lime-500/10 text-lime-700 dark:text-lime-400",
  },
  {
    num: "04",
    title: "ส่งมอบและดูแล",
    description: "ทดสอบระบบครบถ้วน นำขึ้น Hosting จริง สอนการใช้งาน และให้บริการดูแลต่อเนื่องฟรี 3 เดือน",
    icon: Rocket,
    tags: ["ทดสอบระบบ", "ดูแลฟรี 3 เดือน", "สอนการใช้งาน"],
    duration: "1–2 วัน",
    gradient: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/20",
    light: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
]

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const windowMid = window.innerHeight * 0.6
      let best = -1
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (rect.top < windowMid) best = i
      })
      setActiveIndex(best)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto">
      {/* Vertical spine line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block pointer-events-none">
        <div className="h-full bg-gradient-to-b from-transparent via-slate-200 dark:via-white/10 to-transparent" />
      </div>

      <div className="space-y-16 md:space-y-24">
        {steps.map((step, index) => {
          const isLeft = index % 2 === 0
          const isActive = index <= activeIndex
          const isCurrent = index === activeIndex
          const Icon = step.icon

          return (
            <div
              key={step.num}
              ref={(el) => { itemRefs.current[index] = el }}
              className={`relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-8 transition-all duration-700 ${
                isActive ? "opacity-100" : "opacity-40"
              }`}
            >
              {/* Left Column (Col 1) */}
              <div className="flex justify-end text-right">
                {isLeft ? (
                  <div className="w-full max-w-md">
                    <StepCard step={step} isActive={isActive} align="right" />
                  </div>
                ) : (
                  <div className="hidden md:flex w-full max-w-md justify-end">
                    <DurationBadge duration={step.duration} light={step.light} isActive={isActive} />
                  </div>
                )}
              </div>

              {/* Center Column (Col 2) */}
              <div className="flex md:flex-col items-center justify-start md:justify-center gap-4 md:gap-0">
                {/* Step number above node (desktop) */}
                <div className="hidden md:flex flex-col items-center mb-4">
                  <span className={`text-xs font-black uppercase tracking-[0.2em] transition-colors duration-500 ${isActive ? "text-slate-400 dark:text-slate-500" : "text-slate-300 dark:text-slate-700"}`}>
                    STEP
                  </span>
                  <span className={`text-4xl font-black leading-none transition-colors duration-500 ${isActive ? "text-slate-900 dark:text-white" : "text-slate-200 dark:text-slate-800"}`}>
                    {step.num}
                  </span>
                </div>

                {/* Icon node */}
                <div className="relative shrink-0">
                  {isCurrent && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${step.gradient} blur-xl opacity-40 animate-pulse`} />
                  )}
                  <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                    isActive
                      ? `bg-white dark:bg-slate-900 border-transparent shadow-xl ${step.glow}`
                      : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/8"
                  }`}>
                    {isActive && (
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${step.gradient} opacity-10`} />
                    )}
                    <Icon className={`w-7 h-7 md:w-8 md:h-8 relative z-10 transition-colors duration-500 ${isActive ? step.light.split(" ")[1] + " " + step.light.split(" ")[2] : "text-slate-400 dark:text-slate-600"}`} />
                  </div>
                  {isActive && index < steps.length - 1 && (
                    <div className="hidden md:flex absolute -bottom-16 left-1/2 -translate-x-1/2 h-12 w-px bg-gradient-to-b from-lime-400/60 to-transparent" />
                  )}
                </div>

                {/* Mobile: step num */}
                <div className="md:hidden">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Step {step.num}</span>
                  <div className="font-black text-2xl text-slate-900 dark:text-white leading-tight">{step.title}</div>
                </div>
              </div>

              {/* Right Column (Col 3) */}
              <div className="hidden md:flex justify-start text-left">
                {!isLeft ? (
                  <div className="w-full max-w-md">
                    <StepCard step={step} isActive={isActive} align="left" />
                  </div>
                ) : (
                  <div className="hidden md:flex w-full max-w-md justify-start">
                    <DurationBadge duration={step.duration} light={step.light} isActive={isActive} />
                  </div>
                )}
              </div>

              {/* Mobile card (shown below icon row) */}
              <div className="md:hidden col-span-1">
                <MobileStepCard step={step} isActive={isActive} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Final checkmark */}
      <div className={`hidden md:flex flex-col items-center mt-16 gap-3 transition-all duration-700 ${activeIndex >= steps.length - 1 ? "opacity-100" : "opacity-30"}`}>
        <div className="w-14 h-14 rounded-full bg-lime-400 flex items-center justify-center shadow-xl shadow-lime-500/30">
          <CheckCircle className="w-7 h-7 text-slate-950" />
        </div>
        <span className="text-sm font-bold text-slate-900 dark:text-white">เว็บไซต์ของคุณพร้อมใช้งาน!</span>
        <span className="text-xs text-slate-500">ภายใน 7–14 วันทำการ</span>
      </div>
    </div>
  )
}

function StepCard({ step, isActive, align }: { step: typeof steps[0]; isActive: boolean, align: "left" | "right" }) {
  return (
    <SpotlightCard className={`hidden md:block rounded-2xl border p-6 transition-all duration-500 ${
      isActive
        ? "bg-white dark:bg-slate-900/80 border-slate-200 dark:border-white/10 shadow-xl"
        : "bg-slate-50/50 dark:bg-slate-900/20 border-slate-200/50 dark:border-white/5"
    } ${align === "right" ? "text-right" : "text-left"}`}>
      <h3 className={`text-xl font-black mb-2 transition-colors duration-500 ${isActive ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-600"}`}>
        {step.title}
      </h3>
      <p className={`text-sm leading-relaxed mb-4 transition-colors duration-500 ${isActive ? "text-slate-500 dark:text-slate-400" : "text-slate-300 dark:text-slate-700"}`}>
        {step.description}
      </p>
      <div className={`flex flex-wrap gap-2 ${align === "right" ? "justify-end" : "justify-start"}`}>
        {step.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-500 ${
              isActive ? step.light : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </SpotlightCard>
  )
}

function MobileStepCard({ step, isActive }: { step: typeof steps[0]; isActive: boolean }) {
  return (
    <SpotlightCard className="h-full bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-white/10 p-8 sm:p-10 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-xl dark:hover:shadow-lime-500/5 hover:-translate-y-2 transition-all duration-300">
      <p className={`text-sm leading-relaxed mb-3 transition-colors duration-500 ${isActive ? "text-slate-500 dark:text-slate-400" : "text-slate-300 dark:text-slate-600"}`}>
        {step.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {step.tags.map((tag) => (
          <span key={tag} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isActive ? step.light : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
            {tag}
          </span>
        ))}
      </div>
    </SpotlightCard>
  )
}

function DurationBadge({ duration, light, isActive }: { duration: string; light: string; isActive: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all duration-500 ${
      isActive
        ? `${light} border-current/20`
        : "bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-white/5"
    }`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      ใช้เวลา {duration}
    </div>
  )
}
