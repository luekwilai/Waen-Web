"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  ["ทำเว็บไซต์ใช้เวลานานแค่ไหน?", "โดยทั่วไปใช้เวลา 7–21 วันทำการ ขึ้นอยู่กับความซับซ้อนและความพร้อมของเนื้อหา โดยทีมงานจะแจ้งกรอบเวลาที่ชัดเจนก่อนเริ่มงาน"],
  ["ราคาเริ่มต้นเท่าไหร่?", "ราคาเริ่มต้น 3,900 บาทสำหรับเว็บไซต์ WordPress พื้นฐาน พร้อมรองรับมือถือและตั้งค่า SEO เบื้องต้น"],
  ["หลังส่งมอบแล้วแก้ไขเนื้อหาเองได้ไหม?", "ได้ครับ เราสอนการใช้งานระบบหลังบ้าน และทุกแพ็กเกจมีช่วงดูแลหลังส่งมอบตามเงื่อนไขของแพ็กเกจ"],
  ["รับทำเว็บร้านค้าออนไลน์หรือระบบเฉพาะทางไหม?", "รับทำทั้ง WooCommerce ระบบชำระเงินออนไลน์ และระบบเว็บตามความต้องการ โดยประเมินขอบเขตและราคาเป็นรายโปรเจกต์"],
  ["เว็บไซต์จะติดหน้าแรก Google ไหม?", "ทุกเว็บได้รับการตั้งค่า SEO พื้นฐานและปรับประสิทธิภาพ แต่ผลการจัดอันดับขึ้นอยู่กับการแข่งขัน คุณภาพเนื้อหา และการทำ SEO อย่างต่อเนื่อง"],
]

export function V2Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {faqs.map(([question, answer], index) => {
        const expanded = open === index
        const triggerId = `v2-faq-trigger-${index}`
        const panelId = `v2-faq-panel-${index}`
        return (
          <div key={question}>
            <button id={triggerId} type="button" onClick={() => setOpen(expanded ? null : index)} aria-expanded={expanded} aria-controls={panelId} className="flex w-full items-center justify-between gap-6 py-6 text-left"><span className="text-base font-black text-[#111311] sm:text-lg">{question}</span><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/15 transition ${expanded ? "rotate-45 bg-[#9ee800]" : "bg-transparent"}`}><Plus className="h-4 w-4" /></span></button>
            <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!expanded}><p className="max-w-3xl pb-6 pr-14 text-sm leading-7 text-black/55 sm:text-base">{answer}</p></div>
          </div>
        )
      })}
    </div>
  )
}
