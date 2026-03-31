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
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-black/5 bg-white/88 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-[28px] dark:border-white/10 dark:bg-slate-950/88 dark:shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:p-6 lg:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-3xl space-y-3.5">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400 sm:text-xs">
              PDPA & Cookie Consent
            </p>
            <h3 className="max-w-[44rem] text-[1.28rem] font-semibold leading-[1.42] tracking-[-0.03em] text-slate-950 dark:text-white sm:text-[1.58rem]">
              เราใช้คุกกี้ที่จำเป็นต่อการทำงานของเว็บไซต์ และอาจใช้คุกกี้ด้านการวิเคราะห์เพื่อพัฒนาประสบการณ์ใช้งาน
            </h3>
            <p className="max-w-[41rem] text-[14px] font-normal leading-7 text-slate-500 dark:text-slate-400 sm:text-[15px] sm:leading-7">
              คุณสามารถเลือกยอมรับเฉพาะคุกกี้ที่จำเป็น หรือยอมรับทั้งหมดได้ ข้อมูลเพิ่มเติมอ่านได้ใน
              {" "}
              <Link href="/privacy-policy" className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-[5px] transition-colors hover:text-slate-950 dark:text-slate-200 dark:decoration-slate-600 dark:hover:text-white">
                นโยบายความเป็นส่วนตัว
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
            <button
              type="button"
              onClick={() => saveConsent("essential")}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300/80 bg-white/70 px-5 py-3 text-sm font-medium leading-5 text-slate-700 transition-all hover:border-slate-400 hover:bg-white dark:border-white/15 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:bg-white/[0.06] sm:px-6"
            >
              ใช้เฉพาะที่จำเป็น
            </button>
            <button
              type="button"
              onClick={() => saveConsent("all")}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium leading-5 text-white transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 sm:px-6"
            >
              ยอมรับทั้งหมด
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
