"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const effectiveTheme = mounted ? resolvedTheme : "light"
  const isDark = effectiveTheme !== "light"

  return (
    <div 
      className="fixed inset-0 z-[0] overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950" 
      aria-hidden
    >
      {/* Static gradient blobs - no animation, smaller blur */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30">
        {/* Blob 1 - top left */}
        <div
          className="absolute w-[25vw] h-[25vw] rounded-full mix-blend-multiply dark:mix-blend-screen blur-[30px]"
          style={{
            background: isDark ? "rgba(132, 204, 22, 0.25)" : "rgba(163, 230, 53, 0.35)",
            top: "-5%",
            left: "-5%",
          }}
        />
        {/* Blob 2 - top right */}
        <div
          className="absolute w-[20vw] h-[20vw] rounded-full mix-blend-multiply dark:mix-blend-screen blur-[30px]"
          style={{
            background: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(129, 140, 248, 0.3)",
            top: "5%",
            right: "-5%",
          }}
        />
        {/* Blob 3 - bottom left - hidden on mobile */}
        <div
          className="absolute w-[30vw] h-[30vw] rounded-full mix-blend-multiply dark:mix-blend-screen blur-[40px] hidden sm:block"
          style={{
            background: isDark ? "rgba(20, 184, 166, 0.15)" : "rgba(45, 212, 191, 0.25)",
            bottom: "-10%",
            left: "-5%",
          }}
        />
      </div>

      {/* Simple dot pattern - static, no mask animation */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  )
}
