"use client"

import React, { useEffect, useRef, useState } from "react"
import { Check, Copy, Play } from "lucide-react"

type Tab = {
  id: string
  name: string
  dot: string
  lines: React.ReactNode[]
  raw: string
}

const TABS: Tab[] = [
  {
    id: "index",
    name: "index.tsx",
    dot: "bg-lime-400",
    raw: `// WAENWEB — Professional Web Design

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface WebsiteProps {
  title: string
  responsive: boolean
}

export default function Website({title}: WebsiteProps) {
  return (
    <main className="min-h-screen">
      <Hero title={title} />
    </main>
  )
}`,
    lines: [
      <><span className="text-slate-500">{"// WAENWEB — Professional Web Design"}</span></>,
      <></>,
      <><span className="text-pink-400">import</span> <span className="text-sky-300">React</span><span className="text-slate-300">,</span> {'{'} <span className="text-sky-300">useState</span> {'}'} <span className="text-pink-400">from</span> <span className="text-amber-300">&apos;react&apos;</span></>,
      <><span className="text-pink-400">import</span> {'{'} <span className="text-sky-300">motion</span> {'}'} <span className="text-pink-400">from</span> <span className="text-amber-300">&apos;framer-motion&apos;</span></>,
      <></>,
      <><span className="text-purple-400">interface</span> <span className="text-amber-300">WebsiteProps</span> {'{'}</>,
      <><span className="text-slate-400 pl-4">title</span><span className="text-slate-300">:</span> <span className="text-sky-400">string</span></>,
      <><span className="text-slate-400 pl-4">responsive</span><span className="text-slate-300">:</span> <span className="text-sky-400">boolean</span></>,
      <>{'}'}</>,
      <></>,
      <><span className="text-pink-400">export default function</span> <span className="text-amber-300">Website</span>({'{'}<span className="text-slate-300">title</span>{'}'}<span className="text-slate-300">:</span> <span className="text-sky-300">WebsiteProps</span>) {'{'}</>,
      <><span className="text-pink-400 pl-4">return</span> <span className="text-slate-300">(</span></>,
      <><span className="text-slate-300 pl-8">&lt;</span><span className="text-sky-400">main</span> <span className="text-purple-300">className</span><span className="text-slate-300">=</span><span className="text-amber-300">&quot;min-h-screen&quot;</span><span className="text-slate-300">&gt;</span></>,
      <><span className="inline-block border-r-2 pr-0.5 whitespace-nowrap animate-cursor-blink"><span className="text-slate-300 pl-12">&lt;</span><span className="text-sky-400">Hero</span> <span className="text-purple-300">title</span><span className="text-slate-300">={'{'}title{'}'}</span> <span className="text-slate-300">/&gt;</span></span></>,
      <><span className="text-slate-300 pl-8">&lt;/</span><span className="text-sky-400">main</span><span className="text-slate-300">&gt;</span></>,
      <><span className="text-slate-300 pl-4">)</span></>,
      <>{'}'}</>,
    ],
  },
  {
    id: "styles",
    name: "styles.css",
    dot: "bg-sky-400",
    raw: `/* WAENWEB — Global Styles */

:root {
  --brand: #a3e635;
  --brand-dark: #65a30d;
  --bg: #020817;
}

.hero {
  min-height: 100svh;
  background: radial-gradient(
    circle at 20% 10%,
    rgba(163, 230, 53, 0.15),
    transparent
  );
}

.btn-primary {
  background: var(--brand);
  border-radius: 9999px;
  transition: all 0.3s ease;
}`,
    lines: [
      <><span className="text-slate-500">{"/* WAENWEB — Global Styles */"}</span></>,
      <></>,
      <><span className="text-pink-400">:root</span> {'{'}</>,
      <><span className="text-purple-300 pl-4">--brand</span><span className="text-slate-300">:</span> <span className="text-amber-300">#a3e635</span>;</>,
      <><span className="text-purple-300 pl-4">--brand-dark</span><span className="text-slate-300">:</span> <span className="text-amber-300">#65a30d</span>;</>,
      <><span className="text-purple-300 pl-4">--bg</span><span className="text-slate-300">:</span> <span className="text-amber-300">#020817</span>;</>,
      <>{'}'}</>,
      <></>,
      <><span className="text-sky-400">.hero</span> {'{'}</>,
      <><span className="text-purple-300 pl-4">min-height</span><span className="text-slate-300">:</span> <span className="text-amber-300">100svh</span>;</>,
      <><span className="text-purple-300 pl-4">background</span><span className="text-slate-300">:</span> <span className="text-sky-300">radial-gradient</span>(</>,
      <><span className="text-slate-300 pl-8">circle at </span><span className="text-amber-300">20% 10%</span><span className="text-slate-300">,</span></>,
      <><span className="text-slate-300 pl-8">rgba(</span><span className="text-amber-300">163, 230, 53, 0.15</span><span className="text-slate-300">),</span></>,
      <><span className="text-slate-300 pl-8">transparent</span></>,
      <><span className="text-slate-300 pl-4">);</span></>,
      <>{'}'}</>,
      <></>,
    ],
  },
  {
    id: "tailwind",
    name: "tailwind.config",
    dot: "bg-cyan-400",
    raw: `// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7fee7',
          400: '#a3e635',
          600: '#65a30d',
        },
      },
    },
  },
} satisfies Config`,
    lines: [
      <><span className="text-slate-500">{"// tailwind.config.ts"}</span></>,
      <><span className="text-pink-400">import type</span> {'{'} <span className="text-sky-300">Config</span> {'}'} <span className="text-pink-400">from</span> <span className="text-amber-300">&apos;tailwindcss&apos;</span></>,
      <></>,
      <><span className="text-pink-400">export default</span> {'{'}</>,
      <><span className="text-purple-300 pl-4">content</span><span className="text-slate-300">:</span> [<span className="text-amber-300">&apos;./src/**/*.{"{"}ts,tsx{"}"}&apos;</span>],</>,
      <><span className="text-purple-300 pl-4">theme</span><span className="text-slate-300">:</span> {'{'}</>,
      <><span className="text-purple-300 pl-8">extend</span><span className="text-slate-300">:</span> {'{'}</>,
      <><span className="text-purple-300 pl-12">colors</span><span className="text-slate-300">:</span> {'{'}</>,
      <><span className="text-sky-400" style={{ paddingLeft: "4rem" }}>brand</span><span className="text-slate-300">:</span> {'{'}</>,
      <><span className="text-purple-300" style={{ paddingLeft: "5rem" }}>50</span><span className="text-slate-300">:</span> <span className="text-amber-300">&apos;#f7fee7&apos;</span>,</>,
      <><span className="text-purple-300" style={{ paddingLeft: "5rem" }}>400</span><span className="text-slate-300">:</span> <span className="text-amber-300">&apos;#a3e635&apos;</span>,</>,
      <><span className="text-purple-300" style={{ paddingLeft: "5rem" }}>600</span><span className="text-slate-300">:</span> <span className="text-amber-300">&apos;#65a30d&apos;</span>,</>,
      <><span className="text-slate-300" style={{ paddingLeft: "4rem" }}>{"},"}</span></>,
      <><span className="text-slate-300 pl-12">{"},"}</span></>,
      <><span className="text-slate-300 pl-8">{"},"}</span></>,
      <><span className="text-slate-300 pl-4">{"},"}</span></>,
      <>{'}'} <span className="text-pink-400">satisfies</span> <span className="text-sky-300">Config</span></>,
    ],
  },
]

export function HeroCodeEditor() {
  const [activeId, setActiveId] = useState<string>(TABS[0].id)
  const [copied, setCopied] = useState(false)
  const [hoverLine, setHoverLine] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const [ranOnce, setRanOnce] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const active = TABS.find((t) => t.id === activeId) ?? TABS[0]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(active.raw)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ignore */
    }
  }

  const onRun = () => {
    setRunning(true)
    setTimeout(() => {
      setRunning(false)
      setRanOnce(true)
      setTimeout(() => setRanOnce(false), 2400)
    }, 900)
  }

  // Keyboard shortcuts: 1/2/3 switch tabs, C copy
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === "1") setActiveId("index")
      if (e.key === "2") setActiveId("styles")
      if (e.key === "3") setActiveId("tailwind")
      if ((e.key === "c" || e.key === "C") && !e.metaKey && !e.ctrlKey) copy()
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active.id, active.raw])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = editorRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ x: py * -4, y: px * 6 })
  }
  const onLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <div
      ref={editorRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full max-w-[490px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/30 dark:shadow-black/60 border border-white/10 z-10 transition-transform duration-300"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Title bar */}
      <div className="flex items-center bg-slate-800 dark:bg-[#1e1e2e]">
        <div className="flex items-center gap-1.5 px-4 py-3.5 shrink-0">
          <button
            aria-label="close"
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
          />
          <button
            aria-label="minimize"
            className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-400 transition-colors"
          />
          <button
            aria-label="maximize"
            className="w-3 h-3 rounded-full bg-lime-500 hover:bg-lime-400 transition-colors"
          />
        </div>
        <div className="flex text-xs flex-1 min-w-0">
          {TABS.map((t) => {
            const isActive = t.id === active.id
            return (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`px-4 py-3.5 border-r border-white/5 font-medium flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? "bg-[#0d1117] text-slate-200"
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${t.dot}`} />
                {t.name}
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-1 pr-3">
          <button
            onClick={copy}
            title="Copy code (C)"
            className="group/btn relative flex items-center gap-1.5 text-[11px] font-medium text-slate-400 hover:text-lime-300 transition-colors px-2.5 py-1.5 rounded-md hover:bg-white/[0.06]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-lime-400" />
                <span className="text-lime-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
          <button
            onClick={onRun}
            title="Run code"
            className="flex items-center gap-1.5 text-[11px] font-semibold text-lime-300 hover:text-lime-200 transition-colors px-2.5 py-1.5 rounded-md bg-lime-400/10 hover:bg-lime-400/20 border border-lime-400/20"
          >
            <Play className={`w-3 h-3 ${running ? "animate-pulse" : ""}`} fill="currentColor" />
            <span className="hidden sm:inline">{running ? "..." : "Run"}</span>
          </button>
        </div>
      </div>

      {/* Code body */}
      <div className="relative bg-[#0d1117] px-0 py-5 font-mono text-[12.5px] leading-6 select-none min-h-[400px]">
        {active.lines.map((code, idx) => {
          const num = idx + 1
          const isHover = hoverLine === num
          return (
            <div
              key={`${active.id}-${num}`}
              onMouseEnter={() => setHoverLine(num)}
              onMouseLeave={() => setHoverLine(null)}
              className={`group/line flex items-start px-4 transition-colors relative ${
                isHover ? "bg-lime-400/[0.04]" : "hover:bg-white/[0.02]"
              }`}
            >
              {isHover && (
                <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-lime-400" />
              )}
              <span
                className={`select-none w-7 shrink-0 text-right mr-5 text-[11px] leading-6 tabular-nums ${
                  isHover ? "text-lime-400" : "text-slate-600"
                }`}
              >
                {num}
              </span>
              <span className="text-slate-300 flex-1">{code}</span>
            </div>
          )
        })}

        {/* Run output toast */}
        {(running || ranOnce) && (
          <div className="absolute right-4 top-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-400/15 border border-lime-400/30 backdrop-blur-sm text-[11px] font-semibold text-lime-300 animate-fade-in">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-lime-400" />
            </span>
            {running ? "Compiling..." : "✓ Build succeeded"}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between bg-lime-400 text-slate-950 px-4 py-1.5 text-[10px] font-mono font-bold tracking-wide">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
            main
          </span>
          <span>{active.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">
            Press <kbd className="px-1 rounded bg-slate-950/20">1</kbd>{" "}
            <kbd className="px-1 rounded bg-slate-950/20">2</kbd>{" "}
            <kbd className="px-1 rounded bg-slate-950/20">3</kbd>
          </span>
          <span>UTF-8</span>
          <span>Ln {active.lines.length}, Col 1</span>
        </div>
      </div>
    </div>
  )
}
