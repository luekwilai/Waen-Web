"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle2, Sparkles } from "lucide-react"

type ContactFormData = {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: ""
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      const packageName = (e as CustomEvent<{ packageName: string }>).detail.packageName
      setFormData((prev) => ({ ...prev, message: `สนใจแพ็คเกจ: ${packageName}\n\n` }))
    }
    window.addEventListener("package-selected", handler)
    return () => window.removeEventListener("package-selected", handler)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess(true)
        setFormData(initialFormData)
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error("Failed to submit:", error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl border-slate-200/50 dark:border-white/10 shadow-2xl shadow-slate-200/50 dark:shadow-[0_0_40px_-15px_rgba(163,230,53,0.15)] transition-all overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-lime-400/20 dark:bg-lime-400/10 rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/20 dark:bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />

      <CardContent className="p-8 md:p-10 relative z-10">
        {success && (
          <div className="mb-8 p-4 bg-lime-50 dark:bg-lime-400/10 border border-lime-200 dark:border-lime-400/30 rounded-xl text-lime-700 dark:text-lime-400 font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <CheckCircle2 className="w-5 h-5" />
            <p>ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 font-medium ml-1">ชื่อ *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white transition-all h-12 px-4 rounded-xl focus-visible:ring-lime-500 dark:focus-visible:ring-lime-400 focus-visible:bg-white dark:focus-visible:bg-slate-900 shadow-sm"
                placeholder="ชื่อ-นามสกุล"
              />
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium ml-1">อีเมล *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white transition-all h-12 px-4 rounded-xl focus-visible:ring-lime-500 dark:focus-visible:ring-lime-400 focus-visible:bg-white dark:focus-visible:bg-slate-900 shadow-sm"
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 font-medium ml-1">เบอร์โทร</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white transition-all h-12 px-4 rounded-xl focus-visible:ring-lime-500 dark:focus-visible:ring-lime-400 focus-visible:bg-white dark:focus-visible:bg-slate-900 shadow-sm"
                placeholder="08x-xxx-xxxx"
              />
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="company" className="text-slate-700 dark:text-slate-300 font-medium ml-1">บริษัท (ถ้ามี)</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white transition-all h-12 px-4 rounded-xl focus-visible:ring-lime-500 dark:focus-visible:ring-lime-400 focus-visible:bg-white dark:focus-visible:bg-slate-900 shadow-sm"
                placeholder="ชื่อบริษัทของคุณ"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="message" className="text-slate-700 dark:text-slate-300 font-medium ml-1">ข้อความ *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              required
              rows={4}
              className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white transition-all p-4 rounded-xl focus-visible:ring-lime-500 dark:focus-visible:ring-lime-400 focus-visible:bg-white dark:focus-visible:bg-slate-900 shadow-sm resize-none"
              placeholder="รายละเอียดโปรเจคที่คุณต้องการปรึกษา..."
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={submitting}
              className="relative w-full h-14 bg-slate-900 hover:bg-slate-800 dark:bg-lime-400 dark:hover:bg-lime-300 text-white dark:text-slate-950 text-base font-semibold rounded-xl overflow-hidden group shadow-xl shadow-slate-900/10 dark:shadow-lime-400/20 transition-all hover:shadow-slate-900/20 dark:hover:shadow-lime-400/40 hover:-translate-y-0.5"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 dark:via-white/40 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
              
              <span className="relative flex items-center justify-center gap-2">
                {submitting ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    กำลังส่งข้อความ...
                  </>
                ) : (
                  <>
                    ส่งข้อความ
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </span>
            </Button>
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4 font-medium">
              * ข้อมูลของคุณจะถูกเก็บเป็นความลับและไม่ถูกนำไปเผยแพร่
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
