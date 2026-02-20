"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export function AnimatedBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const xOffset = useTransform(smoothX, [-0.5, 0.5], [-80, 80])
  const yOffset = useTransform(smoothY, [-0.5, 0.5], [-80, 80])

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mouseX.set(e.clientX / innerWidth - 0.5)
      mouseY.set(e.clientY / innerHeight - 0.5)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div className="fixed inset-0 z-[0] overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950 transition-colors duration-700" aria-hidden>
      
      {/* Mesh Gradient Blobs */}
      <motion.div 
        className="absolute inset-0 opacity-60 dark:opacity-40 scale-[1.15]"
        style={{ x: xOffset, y: yOffset }}
      >
        
        {/* Blob 1 - Top Left */}
        <motion.div
          className="absolute w-[30vw] h-[30vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[60px]"
          style={{
            background: isDark ? "rgba(132, 204, 22, 0.4)" : "rgba(163, 230, 53, 0.6)", // Lime
            top: "-10%",
            left: "-10%",
          }}
          animate={{
            x: ["0%", "20%", "0%"],
            y: ["0%", "30%", "0%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob 2 - Top Right */}
        <motion.div
          className="absolute w-[25vw] h-[25vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[60px]"
          style={{
            background: isDark ? "rgba(99, 102, 241, 0.4)" : "rgba(129, 140, 248, 0.5)", // Indigo
            top: "0%",
            right: "-10%",
          }}
          animate={{
            x: ["0%", "-30%", "0%"],
            y: ["0%", "20%", "0%"],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Blob 3 - Bottom Left */}
        <motion.div
          className="absolute w-[35vw] h-[35vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px]"
          style={{
            background: isDark ? "rgba(20, 184, 166, 0.3)" : "rgba(45, 212, 191, 0.4)", // Teal
            bottom: "-20%",
            left: "-10%",
          }}
          animate={{
            x: ["0%", "30%", "0%"],
            y: ["0%", "-20%", "0%"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Blob 4 - Bottom Right */}
        <motion.div
          className="absolute w-[30vw] h-[30vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[70px]"
          style={{
            background: isDark ? "rgba(244, 63, 94, 0.25)" : "rgba(251, 113, 133, 0.4)", // Rose
            bottom: "-10%",
            right: "-20%",
          }}
          animate={{
            x: ["0%", "-20%", "0%"],
            y: ["0%", "-40%", "0%"],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
        {/* Blob 5 - Center roaming */}
        <motion.div
          className="absolute w-[20vw] h-[20vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px]"
          style={{
            background: isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(167, 139, 250, 0.5)", // Violet
            top: "30%",
            left: "30%",
          }}
          animate={{
            x: ["-20%", "40%", "-20%"],
            y: ["-20%", "30%", "-20%"],
            scale: [0.8, 1.5, 0.8],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Noise Overlay (Optional: makes gradient look richer and less banded) */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Horizontal scan lines (subtle) */}
      <div
        className="absolute inset-0 opacity-[0.025] transition-opacity duration-700"
        style={{
          backgroundImage: isDark
            ? "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)"
            : "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 3px)",
          backgroundSize: "100% 6px",
        }}
      />
    </div>
  )
}
