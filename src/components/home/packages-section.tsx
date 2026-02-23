"use client"

import { SpotlightCard } from "@/components/spotlight-card"
import { CheckCircle, Clock, ArrowRight, Zap } from "lucide-react"
import { useEffect, useState } from "react"

type Package = {
  id: string
  name: string
  nameEn: string | null
  price: number
  description: string | null
  features: string[]
  duration: string | null
  isPopular: boolean
  isActive: boolean
  sortOrder: number
}

export function PackagesSection() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((data) => {
        const active = (data.packages as Package[]).filter((p) => p.isActive)
        setPackages(active)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleSelect = (packageName: string) => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
    const event = new CustomEvent("package-selected", { detail: { packageName } })
    window.dispatchEvent(event)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-950/50 animate-pulse h-96" />
        ))}
      </div>
    )
  }

  if (packages.length === 0) {
    return <p className="text-center text-slate-500 py-12">ยังไม่มีแพ็คเกจที่แสดง</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {packages.map((pkg) => (
        pkg.isPopular ? (
          /* ===== POPULAR CARD — full dark with lime accent ===== */
          <SpotlightCard
            key={pkg.id}
            className="flex-1 relative rounded-3xl bg-slate-900 dark:bg-slate-950 border border-lime-500/30 shadow-2xl shadow-lime-500/10 flex flex-col h-full lg:order-none"
          >
            {/* Top glow line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lime-400 to-transparent rounded-t-3xl" />

            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-flex items-center gap-1.5 bg-lime-400 text-slate-950 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-lime-500/30">
                <Zap className="w-3 h-3" />
                ยอดนิยม
              </span>
            </div>

            <div className="p-8 pt-10 flex flex-col flex-grow">
              {/* Name */}
              <div className="mb-6">
                <p className="text-lime-400 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-2">{pkg.nameEn ?? "Popular"}</p>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{pkg.name}</h3>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="flex items-end gap-2">
                  <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter leading-none">
                    ฿{pkg.price.toLocaleString()}
                  </span>
                </div>
                {pkg.description && (
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">{pkg.description}</p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-grow mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-lime-400" />
                    </span>
                    <span className="text-slate-300 text-sm leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Duration + CTA */}
              {pkg.duration && (
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  ระยะเวลา: {pkg.duration}
                </div>
              )}
              <button
                onClick={() => handleSelect(pkg.name)}
                className="w-full bg-lime-400 hover:bg-lime-300 text-slate-950 font-black text-base py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-500/30 flex items-center justify-center gap-2"
              >
                เลือกแพ็คเกจนี้
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </SpotlightCard>
        ) : (
          /* ===== REGULAR CARD ===== */
          <SpotlightCard
            key={pkg.id}
            className={`flex-1 relative z-10 bg-white dark:bg-slate-900 rounded-3xl p-8 xl:p-10 border transition-all duration-300 flex flex-col ${
              pkg.isPopular
                ? "border-lime-500 shadow-2xl shadow-lime-500/10 dark:shadow-lime-500/5"
                : "border-slate-200 dark:border-white/10 hover:border-lime-500/50 hover:shadow-xl dark:hover:shadow-lime-500/5"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Name */}
              <div className="mb-6">
                <p className="text-lime-600 dark:text-lime-400 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-2">{pkg.nameEn ?? "Package"}</p>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{pkg.name}</h3>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-slate-100 dark:border-white/8">
                <div className="flex items-end gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                    ฿{pkg.price.toLocaleString()}
                  </span>
                </div>
                {pkg.description && (
                  <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{pkg.description}</p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-grow mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-lime-500 dark:text-lime-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300 text-sm leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Duration + CTA */}
              {pkg.duration && (
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  ระยะเวลา: {pkg.duration}
                </div>
              )}
              <button
                onClick={() => handleSelect(pkg.name)}
                className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-white/8 dark:hover:bg-white/12 text-slate-900 dark:text-white font-bold text-base py-4 rounded-2xl transition-all duration-200 border border-slate-200 dark:border-white/10 hover:-translate-y-0.5"
              >
                เลือกแพ็คเกจนี้
              </button>
            </div>
          </SpotlightCard>
        )
      ))}
    </div>
  )
}

