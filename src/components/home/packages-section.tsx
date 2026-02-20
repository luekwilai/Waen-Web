"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-950/50 animate-pulse">
            <CardContent className="p-8 h-80" />
          </Card>
        ))}
      </div>
    )
  }

  if (packages.length === 0) {
    return (
      <p className="text-center text-slate-500 py-12">ยังไม่มีแพ็คเกจที่แสดง</p>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {packages.map((pkg) => (
        <Card
          key={pkg.id}
          className={`${
            pkg.isPopular
              ? "border-lime-500/50 bg-slate-50 dark:bg-slate-900"
              : "border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-950/50"
          } relative transition-colors`}
        >
          {pkg.isPopular && (
            <div className="absolute -top-3 right-6">
              <Badge className="bg-lime-500 dark:bg-lime-400 text-white dark:text-slate-950">Popular</Badge>
            </div>
          )}
          <CardContent className="p-8">
            <h3 className="text-xl font-medium text-slate-900 dark:text-white">{pkg.name}</h3>
            <p className="mt-4 flex items-baseline">
              <span className="text-4xl font-semibold text-slate-900 dark:text-white">
                ฿{pkg.price.toLocaleString()}
              </span>
            </p>
            {pkg.description && (
              <p className="mt-4 text-slate-600 dark:text-slate-400 font-light">{pkg.description}</p>
            )}
            <ul className="mt-8 space-y-4">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-5 h-5 text-lime-600 dark:text-lime-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5">
              {pkg.duration && (
                <Badge variant="secondary" className="mb-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  ระยะเวลา: {pkg.duration}
                </Badge>
              )}
              <Button
                className="w-full bg-lime-500 hover:bg-lime-600 dark:bg-lime-400 dark:hover:bg-lime-300 text-white dark:text-slate-950 font-medium"
                onClick={() => handleSelect(pkg.name)}
              >
                เลือกแพ็คเกจนี้
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
