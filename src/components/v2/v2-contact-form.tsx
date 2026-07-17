"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react"

type FormData = { name: string; email: string; company: string; message: string }
const initialForm: FormData = { name: "", email: "", company: "", message: "" }

export function V2ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handlePackage = (event: Event) => {
      const packageName = (event as CustomEvent<{ packageName: string }>).detail.packageName
      setForm((current) => ({ ...current, message: `สนใจแพ็กเกจ: ${packageName}\n\n` }))
    }
    window.addEventListener("v2-package-selected", handlePackage)
    return () => window.removeEventListener("v2-package-selected", handlePackage)
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data?.error || "ส่งข้อความไม่สำเร็จ")
      setForm(initialForm)
      setConsent(false)
      setStatus("success")
      setMessage(data?.emailSent === false ? "บันทึกข้อความแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด" : "ส่งข้อความเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด")
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง")
    }
  }

  const fieldClass = "h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#9ee800] focus:bg-white/[0.07]"

  return (
    <form onSubmit={handleSubmit} aria-busy={status === "loading"} className="rounded-[28px] border border-white/12 bg-white/[0.04] p-5 sm:p-7">
      {message ? (
        <div role={status === "error" ? "alert" : "status"} aria-live="polite" className={`mb-5 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${status === "error" ? "border-red-400/30 bg-red-400/10 text-red-200" : "border-[#9ee800]/30 bg-[#9ee800]/10 text-[#dfff9d]"}`}>
          {status === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}
          {message}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-semibold text-white/60">
          ชื่อ <span className="sr-only">จำเป็น</span>
          <input className={fieldClass} value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="ชื่อ-นามสกุล" required />
        </label>
        <label className="grid gap-2 text-xs font-semibold text-white/60">
          อีเมล <span className="sr-only">จำเป็น</span>
          <input className={fieldClass} type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="you@email.com" required />
        </label>
      </div>
      <label className="mt-4 grid gap-2 text-xs font-semibold text-white/60">
        บริษัท (ถ้ามี)
        <input className={fieldClass} value={form.company} onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))} placeholder="ชื่อบริษัทของคุณ" />
      </label>
      <label className="mt-4 grid gap-2 text-xs font-semibold text-white/60">
        รายละเอียดโปรเจกต์ <span className="sr-only">จำเป็น</span>
        <textarea className="min-h-32 w-full resize-y rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#9ee800] focus:bg-white/[0.07]" value={form.message} onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))} placeholder="เล่าความต้องการ งบประมาณ หรือเว็บไซต์ที่ชอบให้เราฟัง" required />
      </label>
      <label className="mt-4 flex items-start gap-3 text-xs leading-5 text-white/45">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-1 h-4 w-4 accent-[#9ee800]" />
        <span>ฉันยินยอมให้ WAENWEB ใช้ข้อมูลนี้เพื่อติดต่อกลับตาม <Link href="/privacy-policy" className="text-white/75 underline underline-offset-2">นโยบายความเป็นส่วนตัว</Link></span>
      </label>
      <button type="submit" disabled={!consent || status === "loading"} className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#9ee800] px-5 font-black text-[#111311] transition hover:bg-[#b5f52c] disabled:cursor-not-allowed disabled:opacity-50">
        {status === "loading" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowUpRight className="h-4 w-4" />}
        {status === "loading" ? "กำลังส่ง..." : "ส่งรายละเอียดให้เรา"}
      </button>
    </form>
  )
}
