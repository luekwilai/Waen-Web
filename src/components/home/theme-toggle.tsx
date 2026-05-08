"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-10 h-10" />

  const isDark = theme === "dark" || (theme === "system" && resolvedTheme === "dark")

  // Properties for sun and moon animation
  const properties = {
    sun: {
      r: 5,
      rotate: 0,
      cx: 30,
      cy: -4,
      raysOpacity: 1,
      raysScale: 1,
      circleColor: "#f59e0b", // amber-500
    },
    moon: {
      r: 9,
      rotate: 90,
      cx: 20,  // ขยับไปทางขวาเพื่อสร้างเสี้ยว
      cy: 4,   // ลงมาตรงกลางเล็กน้อย
      raysOpacity: 0,
      raysScale: 0.5,
      circleColor: "#818cf8", // indigo-400
    },
  }

  const { r, rotate, cx, cy, raysOpacity, raysScale, circleColor } = isDark
    ? properties.moon
    : properties.sun

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 overflow-hidden focus:outline-none"
      aria-label="Toggle theme"
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDark
            ? "linear-gradient(to top right, rgba(129, 140, 248, 0.4), rgba(168, 85, 247, 0.4))"
            : "linear-gradient(to top right, rgba(251, 191, 36, 0.4), rgba(251, 146, 60, 0.4))",
        }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="relative z-10"
        animate={{ rotate }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        style={{ transformOrigin: "center" }}
      >
        {/* Mask for moon crescent effect */}
        <mask id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx={cx} cy={cy} r="9" fill="black" />
        </mask>

        {/* Main circle (sun when small, moon when large with mask) */}
        <motion.circle
          cx="12"
          cy="12"
          animate={{
            r,
            fill: circleColor,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          mask="url(#moon-mask)"
        />

        {/* Sun rays */}
        <motion.g
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{
            opacity: raysOpacity,
            scale: raysScale,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{ transformOrigin: "center" }}
          className="text-amber-500"
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
      </motion.svg>
    </motion.button>
  )
}
