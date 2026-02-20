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

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 transition-all overflow-hidden group focus:outline-none"
      aria-label="Toggle theme"
    >
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-amber-200/40 to-orange-400/40 dark:from-indigo-500/40 dark:to-purple-500/40" />
      
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-amber-500 dark:text-indigo-400 transition-colors duration-500 relative z-10"
        animate={{ rotate: isDark ? 40 : 90 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <mask id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <motion.circle
            cx="12"
            cy="4"
            r="9"
            fill="black"
            initial={false}
            animate={{
              cx: isDark ? 12 : 30,
              cy: isDark ? 4 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill={isDark ? "currentColor" : "none"}
          mask="url(#moon-mask)"
          initial={false}
          animate={{
            r: isDark ? 9 : 5,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
        <motion.g
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
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
    </button>
  )
}
