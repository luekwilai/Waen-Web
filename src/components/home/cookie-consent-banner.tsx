"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type CookieConsent = "essential" | "all" | null

const consentStorageKey = "waenweb-cookie-consent"

export function CookieConsentBanner() {
  const [consent, setConsent] = useState<CookieConsent | "loading">("loading")

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(consentStorageKey)

    if (savedConsent === "essential" || savedConsent === "all") {
      setConsent(savedConsent)
      return
    }

    setConsent(null)
  }, [])

  const saveConsent = (value: Exclude<CookieConsent, null>) => {
    window.localStorage.setItem(consentStorageKey, value)
    setConsent(value)
  }

  if (consent === "loading" || consent !== null) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/95 dark:shadow-black/30 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime-600 dark:text-lime-400">
              PDPA & Cookie Consent
            </p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              เราใช้คุกกี้ที่จำเป็นต่อการทำงานของเว็บไซต์ และอาจใช้คุกกี้ด้านการวิเคราะห์เพื่อพัฒนาประสบการณ์ใช้งาน
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              คุณสามารถเลือกยอมรับเฉพาะคุกกี้ที่จำเป็น หรือยอมรับทั้งหมดได้ ข้อมูลเพิ่มเติมอ่านได้ใน
              {" "}
              <Link href="/privacy-policy" className="font-semibold text-lime-600 transition-colors hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300">
                นโยบายความเป็นส่วนตัว
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => saveConsent("essential")}
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10"
            >
              ใช้เฉพาะที่จำเป็น
            </button>
            <button
              type="button"
              onClick={() => saveConsent("all")}
              className="inline-flex h-11 items-center justify-center rounded-full bg-lime-400 px-5 text-sm font-bold text-slate-950 transition-colors hover:bg-lime-300"
            >
              ยอมรับทั้งหมด
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
