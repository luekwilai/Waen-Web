"use client"

import { useEffect } from "react"

export function UnicornBackground() {
  useEffect(() => {
    // Load Unicorn Studio script
    const loadUnicornStudio = () => {
      if (window.UnicornStudio) {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => window.UnicornStudio.init())
        } else {
          window.UnicornStudio.init()
        }
        return
      }

      window.UnicornStudio = { 
        isInitialized: false,
        init: () => {}
      }
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.6/dist/unicornStudio.umd.js"
      script.onload = () => {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => window.UnicornStudio.init())
        } else {
          window.UnicornStudio.init()
        }
      }
      document.head.appendChild(script)
    }

    loadUnicornStudio()
  }, [])

  return (
    <div 
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Unicorn Studio iframe with reduced opacity for readability */}
      <div 
        data-us-project="YrBgWUYCpka7TqbCXHEA"
        className="w-full h-full opacity-60 dark:opacity-50"
        style={{ width: "100%", height: "100%" }}
      />
      
      {/* Hide Unicorn Studio watermark */}
      <style jsx global>{`
        [data-us-project="YrBgWUYCpka7TqbCXHEA"] + div,
        [class*="unicorn-studio"],
        div[style*="unicorn.studio"],
        a[href*="unicorn.studio"] {
          display: none !important;
        }
      `}</style>
    </div>
  )
}

// TypeScript declaration
declare global {
  interface Window {
    UnicornStudio: {
      init: () => void
      isInitialized: boolean
    }
  }
}
