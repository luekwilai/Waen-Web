"use client"

import { motion, AnimatePresence, animate } from "framer-motion"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Reset state on pathname change (although template.tsx handles remounting, this is an extra safety net)
    setIsLoading(true)
    setProgress(0)
    document.body.style.overflow = "hidden" // Prevent scrolling during transition

    const controls = animate(0, 100, {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1], // Smooth snappy easing
      onUpdate: (value) => {
        setProgress(Math.round(value))
      },
      onComplete: () => {
        // Slight delay at 100% before lifting the curtain
        setTimeout(() => {
          setIsLoading(false)
          document.body.style.overflow = "" // Restore scrolling
        }, 200)
      }
    })

    return () => {
      controls.stop()
      document.body.style.overflow = ""
    }
  }, [pathname])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="transition-overlay"
            className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-slate-950 overflow-hidden origin-top"
            initial={{ height: "100vh" }}
            exit={{ height: 0 }} // Sweeps up
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Decorative background text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <span className="text-[20vw] font-black text-white whitespace-nowrap select-none">
                WAENWEB
              </span>
            </div>

            {/* Percentage & Progress Bar */}
            <motion.div 
              className="relative z-10 flex flex-col items-center"
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter tabular-nums">
                {progress}%
              </div>
              
              <div className="w-48 md:w-64 h-1.5 bg-white/10 rounded-full mt-6 overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-lime-400 rounded-full shadow-[0_0_15px_rgba(163,230,53,0.5)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 40 : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="flex-1 flex flex-col w-full h-full"
      >
        {children}
      </motion.div>
    </>
  )
}
