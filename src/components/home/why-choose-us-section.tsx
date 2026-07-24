import { ScrollReveal } from "@/components/home/scroll-reveal"
import {
  Palette,
  Zap,
  Smartphone,
  Headphones,
  ShieldCheck,
  Clock,
  type LucideIcon,
} from "lucide-react"

type Reason = {
  icon: LucideIcon
  title: string
  desc: string
}

const REASONS: Reason[] = [
  {
    icon: Palette,
    title: "ออกแบบเฉพาะธุรกิจคุณ",
    desc: "ดีไซน์ใหม่ทุกพิกเซลให้สะท้อนแบรนด์ของคุณ ไม่ใช้เทมเพลตซ้ำใคร",
  },
  {
    icon: Zap,
    title: "โหลดไว + SEO ติดหน้าแรก",
    desc: "ปรับความเร็วและ SEO พื้นฐานครบตั้งแต่วันแรก พร้อมให้ Google จัดอันดับ",
  },
  {
    icon: Smartphone,
    title: "รองรับทุกหน้าจอ",
    desc: "ทดสอบบนมือถือและแท็บเล็ตจริงก่อนส่งมอบทุกครั้ง ไม่ใช่แค่จำลอง",
  },
  {
    icon: Headphones,
    title: "ดูแลฟรีหลังส่งมอบ",
    desc: "ดูแลและแก้ไขให้ฟรี 3 เดือนทุกแพ็คเกจ มีปัญหาเมื่อไหร่ทักได้เลย",
  },
  {
    icon: ShieldCheck,
    title: "ราคาโปร่งใส ไม่มีแฝง",
    desc: "บอกราคาชัดเจนตั้งแต่ต้น จ่ายครั้งเดียวจบ ไม่มีค่าใช้จ่ายซ่อนเร้น",
  },
  {
    icon: Clock,
    title: "ส่งงานตรงเวลา",
    desc: "ทำงานเป็นระบบ มี timeline ชัดเจน ส่งมอบงานตามกำหนดที่ตกลงกัน",
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-20 md:py-28 border-t border-slate-200 dark:border-white/5 relative z-10 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-1/4 left-0 w-[380px] h-[380px] bg-lime-400/5 dark:bg-lime-400/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
            ทำไมต้องเลือกเรา
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            ทำเว็บกับเรา <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-500 dark:from-lime-400 dark:to-emerald-400">คุ้มค่า</span> กว่า
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-light max-w-xl mx-auto">
            เราไม่ได้แค่ทำเว็บให้เสร็จ แต่ตั้งใจให้เว็บของคุณสร้างผลลัพธ์ทางธุรกิจจริง
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {REASONS.map((r, i) => {
            const Icon = r.icon
            return (
              <ScrollReveal key={r.title} delay={i * 40}>
                <div className="group h-full flex gap-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/8 rounded-2xl p-5 sm:p-6 hover:-translate-y-1 hover:border-lime-400/50 dark:hover:border-lime-400/30 hover:shadow-xl hover:shadow-lime-500/10 dark:hover:shadow-lime-400/5 transition-all duration-300">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-lime-400/25 to-emerald-400/10 dark:from-lime-400/20 dark:to-emerald-400/5 flex items-center justify-center text-lime-600 dark:text-lime-400 ring-1 ring-inset ring-lime-400/20 dark:ring-lime-400/15 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-lime-700 dark:group-hover:text-lime-300 transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Guarantee highlight */}
        <ScrollReveal delay={120}>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center rounded-2xl border border-lime-400/30 bg-lime-50/70 dark:bg-lime-400/10 px-6 py-5">
            <ShieldCheck className="w-7 h-7 text-lime-600 dark:text-lime-400 shrink-0" />
            <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100">
              การันตีงานคุณภาพ — แก้ไขจนกว่าคุณจะพอใจก่อนส่งมอบงานจริง
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
