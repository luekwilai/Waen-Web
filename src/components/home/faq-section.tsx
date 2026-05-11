"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const FAQS = [
  {
    q: "ทำเว็บไซต์ใช้เวลานานแค่ไหน?",
    a: "โดยทั่วไปใช้เวลา 7–21 วันทำการ ขึ้นอยู่กับความซับซ้อนของเว็บ แพ็คเกจ Basic เสร็จภายใน 7 วัน แพ็คเกจ Pro ประมาณ 14–21 วัน หลังจากลูกค้าส่ง content ครบ",
  },
  {
    q: "ราคาเริ่มต้นเท่าไหร่?",
    a: "ราคาเริ่มต้นที่ 3,900 บาท สำหรับเว็บไซต์ WordPress พื้นฐาน มีหน้าหลัก, เกี่ยวกับเรา, บริการ และติดต่อ พร้อมระบบ SEO เบื้องต้นและรองรับมือถือ",
  },
  {
    q: "หลังจากส่งมอบงานแล้วสามารถแก้ไขได้ไหม?",
    a: "ได้ครับ ทุกแพ็คเกจมีระยะดูแลฟรี 3 เดือนหลังส่งมอบ ครอบคลุมการแก้ไขข้อมูล, อัปเดต Plugin และแก้บัค หลังจากนั้นมีบริการดูแลรายเดือนเพิ่มเติม",
  },
  {
    q: "ต้องเตรียมอะไรบ้างก่อนเริ่มทำเว็บ?",
    a: "ลูกค้าต้องเตรียม: (1) โลโก้บริษัท (2) ข้อความ/content ที่ต้องการแสดง (3) รูปภาพสินค้าหรือบริการ (4) ชื่อโดเมนที่ต้องการ หากไม่มีผมสามารถช่วยแนะนำและจัดหาได้",
  },
  {
    q: "รับทำเว็บร้านค้าออนไลน์ได้ไหม?",
    a: "รับครับ ทำ E-Commerce ด้วย WooCommerce บน WordPress รองรับระบบตะกร้าสินค้า, ชำระเงินออนไลน์ (บัตรเครดิต, โอนเงิน, QR Code), จัดการสินค้า และออเดอร์",
  },
  {
    q: "ทำแล้วติดหน้าแรก Google ได้จริงไหม?",
    a: "ทุกเว็บที่ทำจะได้รับการตั้งค่า SEO พื้นฐาน เช่น meta tag, sitemap, schema markup และ page speed optimization การติดหน้าแรก Google ขึ้นอยู่กับหลายปัจจัยและต้องใช้เวลา แต่เว็บที่มีพื้นฐาน SEO ดีจะมีโอกาสสูงกว่า",
  },
  {
    q: "ชำระเงินอย่างไร?",
    a: "ชำระผ่านโอนเงิน หรือ QR PromptPay แบ่งจ่าย 2 งวด คือ 50% ก่อนเริ่มงาน และอีก 50% เมื่องานเสร็จสมบูรณ์ก่อนส่งมอบ",
  },
  {
    q: "มีค่าบำรุงรักษารายปีไหม?",
    a: "มีค่า Hosting และโดเมนรายปี ซึ่งลูกค้าสามารถจัดการเองหรือให้ทีมงานช่วยดูแลก็ได้ ราคา Hosting เริ่มต้นประมาณ 1,500–3,000 บาท/ปี และโดเมน .com ประมาณ 600 บาท/ปี",
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 md:py-28 border-t border-slate-200 dark:border-white/5 relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
            FAQ
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            คำถาม<span className="text-lime-500 dark:text-lime-400">ที่พบบ่อย</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-light">
            ตอบทุกข้อสงสัยก่อนตัดสินใจ
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`group rounded-2xl border transition-all duration-300 overflow-hidden
                  ${isOpen
                    ? "border-lime-400/40 dark:border-lime-400/20 bg-lime-50/50 dark:bg-lime-400/[0.04] shadow-md shadow-lime-500/5"
                    : "border-slate-200 dark:border-white/8 bg-white dark:bg-slate-900/40 hover:border-lime-400/30 dark:hover:border-lime-400/15"
                  }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold text-sm sm:text-base leading-snug transition-colors ${isOpen ? "text-lime-700 dark:text-lime-300" : "text-slate-800 dark:text-white"}`}>
                    {faq.q}
                  </span>
                  <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-lime-400 text-slate-950 rotate-0" : "bg-slate-100 dark:bg-white/8 text-slate-500 dark:text-slate-400"}`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}>
                  <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
