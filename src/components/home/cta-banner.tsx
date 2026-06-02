import Link from "next/link"
import { ScrollReveal } from "@/components/home/scroll-reveal"
import { ArrowRight, MessageSquare } from "lucide-react"

export function CtaBanner({ contactLine = "thawatsak" }: { contactLine?: string }) {
  return (
    <section className="py-12 md:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-lime-400/30 bg-gradient-to-br from-lime-400/15 via-emerald-400/10 to-transparent dark:from-lime-400/10 dark:via-emerald-400/[0.06] px-6 py-10 sm:px-12 sm:py-14">
            {/* Decorative glow */}
            <div className="absolute -top-16 -right-10 w-72 h-72 bg-lime-400/20 dark:bg-lime-400/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-emerald-400/15 dark:bg-emerald-400/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-lime-700 dark:text-lime-300 uppercase tracking-widest mb-3">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-lime-500 opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-600 dark:bg-lime-400" />
                  </span>
                  ปรึกษาฟรี ไม่มีข้อผูกมัด
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3 leading-[1.1]">
                  พร้อมเริ่ม<span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-500 dark:from-lime-400 dark:to-emerald-400">โปรเจกต์</span>ของคุณแล้วหรือยัง?
                </h2>
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 font-light max-w-xl mx-auto lg:mx-0">
                  เล่าไอเดียให้เราฟัง แล้วเราจะช่วยวางแผนและประเมินราคาให้ฟรี
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
                <Link
                  href="#contact"
                  className="btn-shine group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-lime-400 to-lime-300 hover:from-lime-300 hover:to-lime-200 text-slate-950 transition-all font-black rounded-full py-3.5 px-8 shadow-[0_10px_40px_-10px_rgba(163,230,53,0.55)] hover:-translate-y-1 text-sm ring-1 ring-inset ring-white/40 whitespace-nowrap"
                >
                  ติดต่อเรา
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={`https://line.me/ti/p/~${contactLine}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center justify-center gap-2 bg-white/70 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] text-slate-900 dark:text-white transition-all font-semibold rounded-full py-3.5 px-7 border border-slate-300 dark:border-white/15 hover:border-lime-400/50 hover:-translate-y-1 text-sm backdrop-blur-sm whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                  ทักผ่าน Line
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
