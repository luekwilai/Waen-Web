"use client"

import { ArrowUpRight, BadgeCheck, Check, Clock3 } from "lucide-react"

export type V2Package = {
  id: string
  name: string
  nameEn: string | null
  price: number
  description: string | null
  features: string[]
  duration: string | null
  isPopular: boolean
}

export function V2Packages({ packages }: { packages: V2Package[] }) {
  function selectPackage(packageName: string) {
    window.dispatchEvent(new CustomEvent("v2-package-selected", { detail: { packageName } }))
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    document.getElementById("contact")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <div>
      <div className="grid items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
        {packages.map((item, index) => {
          const popular = item.isPopular
          const mutedText = popular ? "text-black/62" : "text-white/52"
          const divider = popular ? "border-black/15" : "border-white/10"

          return (
            <article
              key={item.id}
              className={`group relative flex min-h-[540px] flex-col overflow-hidden rounded-[30px] border p-6 transition duration-300 sm:p-8 ${popular ? "border-[#9ee800] bg-[#9ee800] text-[#111311] shadow-[0_28px_90px_rgba(158,232,0,0.16)] lg:-translate-y-3" : "border-white/12 bg-[#191c19] text-white hover:-translate-y-1 hover:border-[#9ee800]/45 hover:bg-[#1d201d]"}`}
            >
              <div aria-hidden="true" className={`pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border ${popular ? "border-black/10" : "border-white/[0.06]"}`} />
              <div aria-hidden="true" className={`pointer-events-none absolute -right-3 -top-7 h-24 w-24 rounded-full border ${popular ? "border-black/10" : "border-white/[0.06]"}`} />

              <div className="relative flex items-start justify-between gap-4">
                <span aria-hidden="true" className={`font-mono text-xs font-bold tracking-[0.16em] ${popular ? "text-black/60" : "text-white/55"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {popular ? (
                  <span className="flex min-h-8 items-center gap-1.5 rounded-full bg-[#111311] px-3.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#9ee800]">
                    <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> แนะนำ
                  </span>
                ) : null}
              </div>

              <div className="relative mt-9">
                <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${popular ? "text-black/65" : "text-[#9ee800]"}`}>
                  {item.nameEn || "Website package"}
                </p>
                <h3 className="mt-3 text-[1.7rem] font-black leading-tight tracking-[-0.035em] sm:text-3xl">{item.name}</h3>
                <p className={`mt-4 min-h-14 max-w-sm text-sm leading-7 ${mutedText}`}>
                  {item.description || "แพ็กเกจสำหรับธุรกิจที่ต้องการเว็บไซต์พร้อมใช้งานจริง"}
                </p>
              </div>

              <div className={`relative mt-7 border-t pt-7 ${divider}`}>
                <p className={`text-xs font-bold ${popular ? "text-black/65" : "text-white/60"}`}>ราคาเริ่มต้น</p>
                <div className="mt-2 flex items-start gap-1.5">
                  <span className="mt-1.5 text-xl font-black">฿</span>
                  <p className="font-mono text-[clamp(2.75rem,4vw,4rem)] font-black leading-none tracking-[-0.07em] tabular-nums">{item.price.toLocaleString("th-TH")}</p>
                </div>
                {item.duration ? (
                  <p className={`mt-4 inline-flex min-h-8 items-center gap-2 rounded-full px-3 text-xs font-bold ${popular ? "bg-black/[0.08] text-black/60" : "bg-white/[0.06] text-white/55"}`}>
                    <Clock3 className="h-3.5 w-3.5" aria-hidden="true" /> ระยะเวลาดำเนินงาน {item.duration}
                  </p>
                ) : null}
              </div>

              <div className={`relative my-7 h-px border-t ${divider}`} />
              <div className="relative flex-1">
                <p className={`mb-4 text-xs font-bold ${popular ? "text-black/65" : "text-white/60"}`}>สิ่งที่คุณจะได้รับ</p>
                <ul className="space-y-3">
                  {item.features.slice(0, 7).map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-6">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${popular ? "bg-[#111311] text-[#9ee800]" : "bg-[#9ee800]/12 text-[#9ee800]"}`}>
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className={popular ? "text-black/72" : "text-white/68"}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => selectPackage(item.name)}
                className={`relative mt-8 flex min-h-14 cursor-pointer items-center justify-between rounded-2xl px-5 font-black transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ee800] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111311] active:scale-[0.98] ${popular ? "bg-[#111311] text-white hover:bg-black" : "bg-white text-[#111311] hover:bg-[#9ee800]"}`}
              >
                <span>เลือกแพ็กเกจนี้</span>
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${popular ? "bg-white/10" : "bg-black/[0.06]"}`}>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </article>
          )
        })}
      </div>
    </div>
  )
}
