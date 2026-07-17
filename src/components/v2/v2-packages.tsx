"use client"

import { ArrowUpRight, Check } from "lucide-react"

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
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {packages.map((item) => (
        <article key={item.id} className={`relative flex min-h-[480px] flex-col rounded-[28px] border p-6 sm:p-8 ${item.isPopular ? "border-[#9ee800] bg-[#9ee800] text-[#111311]" : "border-white/12 bg-white/[0.035] text-white"}`}>
          {item.isPopular ? <span className="absolute right-5 top-5 rounded-full bg-[#111311] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9ee800]">ยอดนิยม</span> : null}
          <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${item.isPopular ? "text-black/55" : "text-[#9ee800]"}`}>{item.nameEn || "Website package"}</p>
          <h3 className="mt-3 text-2xl font-black">{item.name}</h3>
          <p className={`mt-3 min-h-12 text-sm leading-6 ${item.isPopular ? "text-black/60" : "text-white/45"}`}>{item.description || "แพ็กเกจสำหรับธุรกิจที่ต้องการเว็บไซต์พร้อมใช้งานจริง"}</p>
          <div className={`my-7 border-y py-6 ${item.isPopular ? "border-black/15" : "border-white/10"}`}>
            <span className="text-sm font-semibold opacity-55">เริ่มต้น</span>
            <p className="mt-1 text-5xl font-black tracking-[-0.05em]">฿{item.price.toLocaleString("th-TH")}</p>
            {item.duration ? <p className="mt-2 text-xs opacity-50">ระยะเวลา {item.duration}</p> : null}
          </div>
          <ul className="flex-1 space-y-3">
            {item.features.slice(0, 7).map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm leading-6"><Check className="mt-1 h-4 w-4 shrink-0" /> <span className={item.isPopular ? "text-black/70" : "text-white/65"}>{feature}</span></li>
            ))}
          </ul>
          <button type="button" onClick={() => selectPackage(item.name)} className={`mt-7 flex h-12 items-center justify-center gap-2 rounded-xl font-black transition hover:-translate-y-0.5 ${item.isPopular ? "bg-[#111311] text-white" : "bg-white text-[#111311]"}`}>
            เลือกแพ็กเกจนี้ <ArrowUpRight className="h-4 w-4" />
          </button>
        </article>
      ))}
    </div>
  )
}
