"use client"

import { motion } from "framer-motion"

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex-1 flex flex-col w-full h-full overflow-x-clip">
      <motion.div
        className="pointer-events-none fixed inset-0 z-[9999] origin-top bg-slate-950/100"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        style={{ willChange: "transform" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        className="flex-1 flex flex-col w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
