"use client"

import React, { useEffect, useRef, useState } from "react"
import { CheckCircle2, Lock, Play, RefreshCw } from "lucide-react"

type TabId = "app" | "style" | "tailwind"

const TABS: { id: TabId; name: string; dot: string }[] = [
  { id: "app", name: "index.tsx", dot: "bg-lime-400" },
  { id: "style", name: "styles.css", dot: "bg-lime-300" },
  { id: "tailwind", name: "tailwind.config.js", dot: "bg-indigo-400" },
]

export function HeroCodeEditor() {
  const [codeTab, setCodeTab] = useState<TabId>("app")
  const [running, setRunning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState("Compiling project...")
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const editorRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const runPreview = () => {
    if (running) return
    setRunning(true)
    setShowResult(false)
    setProgress(0)
    setProgressText("Initializing secure compiler...")

    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        const next = p + 5
        if (next === 25) setProgressText("Bundling Tailwind v4 nodes...")
        if (next === 55) setProgressText("Optimizing SEO Semantic HTML...")
        if (next === 80) setProgressText("Verifying PDPA cookie consent rules...")
        if (next === 95) setProgressText("Finalizing responsive UI layouts...")
        if (next >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setRunning(false)
          setShowResult(true)
          return 100
        }
        return next
      })
    }, 80)
  }

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Keyboard shortcuts: 1/2/3 switch tabs
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === "1") setCodeTab("app")
      if (e.key === "2") setCodeTab("style")
      if (e.key === "3") setCodeTab("tailwind")
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [])

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
      className="relative w-full max-w-[680px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/30 dark:shadow-black/60 border border-white/10 bg-slate-900/90 z-10 transition-transform duration-300"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Browser top bar */}
      <div className="bg-[#0d1117]/80 px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-lime-500/80" />
        </div>
        <div className="flex items-center bg-[#0d1117] px-4 py-1 rounded-md text-xs font-mono text-slate-400 border border-white/10">
          <Lock className="w-3 h-3 text-lime-400 mr-1.5" />
          <span>https://waenweb.com/live</span>
        </div>
        <div className="w-14" />
      </div>

      {/* IDE tabs + Run control */}
      <div className="bg-[#0d1117]/40 flex items-center justify-between border-b border-white/10 px-3 py-2 gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {TABS.map((t) => {
            const isActive = codeTab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setCodeTab(t.id)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-medium border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? "bg-slate-800 text-slate-100 border-white/10"
                    : "text-slate-500 hover:text-slate-300 border-transparent"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${t.dot}`} />
                {t.name}
              </button>
            )
          })}
        </div>

        <button
          onClick={runPreview}
          className="shrink-0 px-3 py-1.5 rounded-lg bg-lime-400/10 hover:bg-lime-400/25 border border-lime-400/30 text-lime-300 font-mono text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-lime-300 text-lime-300" /> RUN PREVIEW
        </button>
      </div>

      {/* Code field */}
      {!showResult && !running && (
        <div className="h-[380px] p-5 font-mono text-xs overflow-y-auto relative bg-[#0d1117] animate-fade-in">
          {/* File 1: index.tsx */}
          {codeTab === "app" && (
            <div className="space-y-1 leading-6">
              <div><span className="text-amber-400">import</span> <span className="text-cyan-400">React</span> <span className="text-amber-400">from</span> <span className="text-lime-300">&apos;react&apos;</span>;</div>
              <div><span className="text-amber-400">import</span> <span className="text-cyan-400">{"{ CraftedWebsite, PerformanceCore }"}</span> <span className="text-amber-400">from</span> <span className="text-lime-300">&apos;@waenweb-studio/creative&apos;</span>;</div>
              <br />
              <div><span className="text-rose-400">export default function</span> <span className="text-indigo-300">WAENWEB_Core</span>() {"{"}</div>
              <div>&nbsp;&nbsp;<span className="text-amber-400">return</span> (</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">&lt;</span><span className="text-emerald-400">CraftedWebsite</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lime-400">speedOptimization</span>=<span className="text-sky-300">{"{true}"}</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lime-400">customUIRating</span>=<span className="text-emerald-400">&quot;100%&quot;</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lime-400">advancedSEO</span>=<span className="text-sky-300">{"{true}"}</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lime-400">pdpaCompliant</span>=<span className="text-sky-300">{"{true}"}</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">&gt;</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">&lt;</span><span className="text-lime-400">PerformanceCore</span> <span className="text-lime-400">score</span>=<span className="text-sky-300">{"{100}"}</span> <span className="text-cyan-400">/&gt;</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">{"// ลองคลิกปุ่ม RUN PREVIEW ด้านบนเพื่อดูรันผลลัพธ์"}</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">&lt;/</span><span className="text-emerald-400">CraftedWebsite</span><span className="text-cyan-400">&gt;</span></div>
              <div>&nbsp;&nbsp;&nbsp;);</div>
              <div>{"}"}</div>
            </div>
          )}

          {/* File 2: styles.css */}
          {codeTab === "style" && (
            <div className="space-y-1 leading-6">
              <div><span className="text-rose-400">.neon-glowing-lime</span> {"{"}</div>
              <div>&nbsp;&nbsp;<span className="text-amber-400">box-shadow</span>: <span className="text-cyan-300">0 0 30px rgba(163, 230, 53, 0.35);</span></div>
              <div>&nbsp;&nbsp;<span className="text-amber-400">border-color</span>: <span className="text-cyan-300">#a3e635;</span></div>
              <div>{"}"}</div>
              <br />
              <div><span className="text-rose-400">.glassmorphism-luxury</span> {"{"}</div>
              <div>&nbsp;&nbsp;<span className="text-amber-400">background</span>: <span className="text-cyan-300">rgba(15, 23, 42, 0.8);</span></div>
              <div>&nbsp;&nbsp;<span className="text-amber-400">backdrop-filter</span>: <span className="text-cyan-300">blur(24px);</span></div>
              <div>&nbsp;&nbsp;<span className="text-amber-400">border</span>: <span className="text-cyan-300">1px solid rgba(255, 255, 255, 0.08);</span></div>
              <div>{"}"}</div>
            </div>
          )}

          {/* File 3: tailwind.config.js */}
          {codeTab === "tailwind" && (
            <div className="space-y-1 leading-6">
              <div><span className="text-amber-400">module.exports</span> = {"{"}</div>
              <div>&nbsp;&nbsp;<span className="text-lime-400">theme</span>: {"{"}</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lime-400">extend</span>: {"{"}</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-lime-400">colors</span>: {"{"}</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">&apos;waenweb-lime&apos;</span>: <span className="text-cyan-300">&apos;#a3e635&apos;</span>,</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">&apos;waenweb-green&apos;</span>: <span className="text-cyan-300">&apos;#4ade80&apos;</span>,</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">&apos;waenweb-emerald&apos;</span>: <span className="text-cyan-300">&apos;#34d399&apos;</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</div>
              <div>&nbsp;&nbsp;{"}"}</div>
              <div>{"}"}</div>
            </div>
          )}

          {/* Floating guide hint */}
          <div className="absolute bottom-4 right-4 bg-[#0d1117]/90 px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-slate-400 pointer-events-none flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
            <span>ลองคลิกปุ่ม &quot;RUN PREVIEW&quot; เพื่อดูระบบทำงาน</span>
          </div>
        </div>
      )}

      {/* Running / loading simulator */}
      {running && (
        <div className="h-[380px] flex flex-col items-center justify-center p-8 bg-[#0d1117] animate-fade-in">
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-white/10" />
            <div className="absolute inset-0 rounded-full border-4 border-t-lime-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          </div>
          <div className="text-sm font-semibold text-slate-100 font-mono mb-2">{progressText}</div>
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-lime-400 transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Workspace preview result */}
      {showResult && (
        <div className="h-[380px] bg-[#0d1117] p-6 relative flex flex-col justify-between overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-950 bg-lime-400 px-2.5 py-1 rounded">WAENWEB STUDIO</span>
              <span className="text-[10px] text-lime-300 border border-lime-400/30 px-2 py-0.5 rounded bg-lime-400/5">Secure Connection</span>
            </div>
            <button
              onClick={() => setShowResult(false)}
              className="text-slate-400 hover:text-slate-100 text-xs flex items-center gap-1 bg-[#0d1117]/60 px-2.5 py-1 rounded border border-white/10 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> แก้ไขโค้ดใหม่
            </button>
          </div>

          {/* Simulated interactive web module */}
          <div className="bg-slate-900/85 backdrop-blur border border-white/10 rounded-xl p-5 shadow-xl max-w-md mx-auto my-auto w-full text-center">
            <div className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center mx-auto mb-3 border border-lime-400/40">
              <CheckCircle2 className="w-6 h-6 text-lime-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 mb-1">สร้างเสร็จพร้อมออนไลน์</h3>
            <p className="text-xs text-slate-400 mb-4">ระบบจัดเตรียมและจำลองหน้าโปรเจกต์เสมือนจริงของธุรกิจคุณ</p>

            <div className="flex justify-center gap-3 text-[10px] font-bold">
              <span className="px-2.5 py-1.5 rounded bg-white/5 text-lime-300 border border-lime-400/20">Speed Optimized</span>
              <span className="px-2.5 py-1.5 rounded bg-white/5 text-slate-100 hover:bg-lime-400 hover:text-slate-950 transition-colors cursor-pointer">Live Preview</span>
            </div>
          </div>

          {/* Simulated stats dashboard */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#0d1117]/50 rounded-lg p-2 text-center border border-white/10">
              <span className="block text-[10px] text-slate-400">PageSpeed</span>
              <span className="text-xs font-bold text-lime-400">100 / 100</span>
            </div>
            <div className="bg-[#0d1117]/50 rounded-lg p-2 text-center border border-white/10">
              <span className="block text-[10px] text-slate-400">SEO Ready</span>
              <span className="text-xs font-bold text-lime-300">Perfect score</span>
            </div>
            <div className="bg-[#0d1117]/50 rounded-lg p-2 text-center border border-white/10">
              <span className="block text-[10px] text-slate-400">Security</span>
              <span className="text-xs font-bold text-indigo-300">WAF Guard</span>
            </div>
          </div>
        </div>
      )}

      {/* Status bar */}
      <div className="flex items-center justify-between bg-lime-400 text-slate-950 px-4 py-1.5 text-[10px] font-mono font-bold tracking-wide">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
            main
          </span>
          <span>{TABS.find((t) => t.id === codeTab)?.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">
            Press <kbd className="px-1 rounded bg-slate-950/20">1</kbd>{" "}
            <kbd className="px-1 rounded bg-slate-950/20">2</kbd>{" "}
            <kbd className="px-1 rounded bg-slate-950/20">3</kbd>
          </span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  )
}
