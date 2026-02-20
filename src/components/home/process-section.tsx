"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, PenTool, Code, Rocket } from "lucide-react"

const steps = [
  {
    title: "พูดคุยและวางแผน",
    description: "รับฟังความต้องการ วิเคราะห์กลุ่มเป้าหมาย และวางโครงสร้างเว็บไซต์",
    icon: MessageSquare,
    color: "from-blue-400 to-indigo-500",
    shadow: "shadow-blue-500/20"
  },
  {
    title: "ออกแบบ UI/UX",
    description: "สร้าง Prototype เพื่อให้เห็นภาพรวมและรูปแบบการใช้งานจริง",
    icon: PenTool,
    color: "from-indigo-400 to-purple-500",
    shadow: "shadow-indigo-500/20"
  },
  {
    title: "พัฒนาเว็บไซต์",
    description: "เขียนโค้ดด้วยเทคโนโลยีล่าสุด พร้อมระบบจัดการหลังบ้าน",
    icon: Code,
    color: "from-purple-400 to-pink-500",
    shadow: "shadow-purple-500/20"
  },
  {
    title: "ส่งมอบและดูแล",
    description: "ทดสอบระบบ นำขึ้นใช้งานจริง พร้อมบริการดูแลหลังการขาย",
    icon: Rocket,
    color: "from-pink-400 to-rose-500",
    shadow: "shadow-pink-500/20"
  },
]

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate how far the container is from the vertical center of the screen
      const centerLine = windowHeight / 2
      const progress = (centerLine - rect.top) / rect.height

      // Map progress (0 to 1) to step index (0 to 3)
      let index = Math.floor(progress * steps.length * 1.2)
      if (index < 0) index = 0
      if (index > steps.length - 1) index = steps.length - 1
        
      setActiveIndex(index)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Init
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative max-w-6xl mx-auto py-20">
      {/* Desktop SVG Line */}
      <div className="hidden md:block absolute top-[100px] left-[12%] right-[12%] h-2 pointer-events-none z-0">
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Base dashed line */}
          <line
            x1="0" y1="50%" x2="100%" y2="50%"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="8 8"
            className="text-slate-200 dark:text-white/10 transition-colors duration-500"
          />
          {/* Animated glowing line */}
          <line
            x1="0" y1="50%" x2="100%" y2="50%"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="8 8"
            className="text-lime-500 dark:text-lime-400 transition-all duration-700 ease-out drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]"
            style={{ 
              clipPath: `inset(0 ${100 - (activeIndex / (steps.length - 1)) * 100}% 0 0)`
            }}
          />
        </svg>
      </div>

      {/* Mobile SVG Line */}
      <div className="md:hidden absolute top-[10%] bottom-[10%] left-10 w-2 pointer-events-none z-0">
        <svg height="100%" width="100%" className="overflow-visible">
          <line
            x1="50%" y1="0" x2="50%" y2="100%"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="8 8"
            className="text-slate-200 dark:text-white/10 transition-colors duration-500"
          />
          <line
            x1="50%" y1="0" x2="50%" y2="100%"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="8 8"
            className="text-lime-500 dark:text-lime-400 transition-all duration-700 ease-out drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]"
            style={{ 
              clipPath: `inset(0 0 ${100 - (activeIndex / (steps.length - 1)) * 100}% 0)`
            }}
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
        {steps.map((step, index) => {
          const isActive = index <= activeIndex
          const isCurrent = index === activeIndex
          const Icon = step.icon
          
          return (
            <div 
              key={step.title}
              className={`relative flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-8 transition-all duration-700 ease-out group ${
                isActive ? "opacity-100 translate-y-0" : "opacity-30 md:translate-y-8 translate-x-4 md:translate-x-0"
              }`}
            >
              {/* Icon Container */}
              <div className="relative shrink-0">
                {/* Ping animation for current step */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-2xl bg-lime-500 dark:bg-lime-400 animate-ping opacity-25" />
                )}
                
                {/* Active glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${step.color} blur-xl transition-opacity duration-500 ${
                  isActive ? "opacity-30 dark:opacity-40" : "opacity-0"
                }`} />
                
                {/* Main Icon Box */}
                <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center border transition-all duration-500 bg-white dark:bg-slate-900 ${
                  isActive 
                    ? `border-lime-500 dark:border-lime-400 shadow-xl ${step.shadow} scale-110` 
                    : "border-slate-200 dark:border-white/10 shadow-sm scale-100"
                }`}>
                  <Icon className={`w-8 h-8 md:w-10 md:h-10 transition-colors duration-500 ${
                    isActive ? "text-lime-600 dark:text-lime-400" : "text-slate-400 dark:text-slate-500"
                  }`} />
                  
                  {/* Step Number Badge */}
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500 ${
                    isActive 
                      ? "bg-lime-500 dark:bg-lime-400 border-white dark:border-slate-950 text-white dark:text-slate-950" 
                      : "bg-slate-100 dark:bg-slate-800 border-white dark:border-slate-950 text-slate-500 dark:text-slate-400"
                  }`}>
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 md:px-2">
                <h3 className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-500 ${
                  isActive ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm md:text-base leading-relaxed transition-colors duration-500 ${
                  isActive ? "text-slate-600 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
