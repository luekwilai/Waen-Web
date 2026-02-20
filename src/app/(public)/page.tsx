import Link from "next/link"
import { ContactForm } from "@/components/home/contact-form"
import { PortfolioSection } from "@/components/home/portfolio-section"
import { PackagesSection } from "@/components/home/packages-section"
import { ProcessSection } from "@/components/home/process-section"
import { AnimatedBackground } from "@/components/home/animated-background"
import { ScrollReveal } from "@/components/home/scroll-reveal"
import { SiteHeader } from "@/components/home/site-header"
import { SiteFooter } from "@/components/home/site-footer"
import { SpotlightCard } from "@/components/spotlight-card"
import {
  Smartphone,
  Search,
  ShoppingCart,
  ShieldCheck,
  Headphones,
  Clock,
  ArrowRight,
  Star,
  Mail,
  MessageSquare,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      <AnimatedBackground />
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative flex flex-col text-center pt-44 pb-36 px-6 items-center overflow-hidden">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-lime-400/10 dark:border-lime-400/5 animate-spin-slow pointer-events-none" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full border border-lime-400/15 dark:border-lime-400/8 pointer-events-none" style={{ animation: "spin-slow 15s linear infinite reverse" }} />

        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lime-500/30 bg-lime-400/10 dark:border-lime-400/20 dark:bg-lime-400/5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-500 dark:bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-600 dark:bg-lime-500" />
            </span>
            <span className="text-xs font-semibold text-lime-600 dark:text-lime-300 uppercase tracking-widest">
              รับทำเว็บไซต์ด้วย WordPress
            </span>
          </div>
        </div>

        <h1 className="animate-fade-up animation-delay-100 text-6xl md:text-8xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 max-w-5xl leading-[1.1]">
          WAENWEB
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600 dark:from-lime-400 dark:to-emerald-500">รับทำเว็บไซต์มืออาชีพ</span>
        </h1>

        <p className="animate-fade-up animation-delay-200 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-6 font-light leading-relaxed">
          สร้างเว็บไซต์ที่ตอบโจทย์ธุรกิจของคุณ ด้วยทีมงานมืออาชีพ
          และเทคโนโลยีที่ทันสมัย รองรับทุกการแสดงผล
        </p>

        <div className="animate-fade-up animation-delay-300 flex items-center gap-3 mb-12">
          <div className="flex -space-x-2">
            {["A","B","C","D"].map((l) => (
              <div key={l} className="w-8 h-8 rounded-full bg-gradient-to-br from-lime-400 to-emerald-500 border-2 border-white dark:border-slate-950 flex items-center justify-center text-xs font-bold text-slate-900">{l}</div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-400">ลูกค้ากว่า <span className="text-slate-900 dark:text-white font-semibold">50+</span> ราย</span>
        </div>

        <div className="animate-fade-up animation-delay-400 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-lime-400 hover:bg-lime-300 text-slate-950 transition-all font-bold rounded-full py-4 px-8 shadow-lg shadow-lime-500/20 hover:shadow-lime-500/40 hover:-translate-y-1"
          >
            ปรึกษาฟรี
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            href="#portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-200 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white transition-all font-medium rounded-full py-4 px-8 border border-slate-300 dark:border-white/10 hover:-translate-y-1"
          >
            ดูผลงานของเรา
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-lime-400 to-transparent rounded-full" />
        </div>
      </section>

      {/* Stats Section */}
      <div className="border-y border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-200 dark:divide-white/5 text-center">
            {[
              { label: "โปรเจคที่สำเร็จ", value: "50+" },
              { label: "ความพึงพอใจ", value: "100%" },
              { label: "ดูแลฟรี (เดือน)", value: "3" },
              { label: "Support", value: "24/7" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-lime-600 dark:text-lime-400">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-28 border-t border-slate-200 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <span className="text-xs font-semibold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-3 block">บริการของเรา</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">ครบทุกบริการ ในที่เดียว</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light max-w-xl mx-auto">
              เราให้บริการครอบคลุม ทั้งการออกแบบ พัฒนา และดูแลเว็บไซต์
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Smartphone className="w-6 h-6" />, title: "Responsive Design", desc: "ออกแบบเว็บไซต์ให้รองรับการแสดงผลทุกอุปกรณ์ ทั้ง PC, Tablet และ Mobile", delay: 0 },
              { icon: <Search className="w-6 h-6" />, title: "SEO Optimization", desc: "ปรับแต่งโครงสร้างเว็บไซต์ให้รองรับหลักการ SEO เพื่อเพิ่มโอกาสติดอันดับ Google", delay: 100 },
              { icon: <ShoppingCart className="w-6 h-6" />, title: "E-Commerce", desc: "ระบบร้านค้าออนไลน์ครบวงจร จัดการสินค้า ออเดอร์ และการชำระเงิน", delay: 200 },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "PDPA Compliance", desc: "ติดตั้งระบบ Cookie Consent และ Privacy Policy รองรับกฎหมาย PDPA", delay: 300 },
              { icon: <Headphones className="w-6 h-6" />, title: "ดูแลหลังการขาย", desc: "บริการดูแลรักษาเว็บไซต์ อัพเดทระบบ และแก้ไขปัญหาทางเทคนิค ฟรี 3 เดือน", delay: 400 },
              { icon: <Clock className="w-6 h-6" />, title: "ส่งงานตรงเวลา", desc: "มีการวางแผนงานที่ชัดเจน และการันตีส่งมอบงานตามกำหนดเวลาที่ตกลงไว้", delay: 500 },
            ].map((s) => (
              <ScrollReveal key={s.title} delay={s.delay}>
                <SpotlightCard className="bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-white/8 hover:bg-white/90 dark:hover:bg-slate-900/60">
                  <div className="w-12 h-12 bg-lime-400/20 dark:bg-lime-400/10 rounded-xl flex items-center justify-center text-lime-600 dark:text-lime-400 mb-6 group-hover:bg-lime-400/30 dark:group-hover:bg-lime-400/20 transition-colors">
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">{s.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed text-sm">{s.desc}</p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-28 border-t border-slate-200 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <span className="text-xs font-semibold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-3 block">ขั้นตอนการทำงาน</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">ทำงานอย่างเป็นระบบ</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light max-w-xl mx-auto">
              เรารับฟัง วิเคราะห์ และพัฒนา เพื่อส่งมอบผลงานที่ดีที่สุดให้กับคุณ
            </p>
          </ScrollReveal>
          <ProcessSection />
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-28 border-t border-slate-200 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <span className="text-xs font-semibold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-3 block">ผลงาน</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">ผลงานที่ผ่านมา</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light">ตัวอย่างเว็บไซต์ที่ออกแบบรองรับทุกอุปกรณ์</p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <PortfolioSection />
          </ScrollReveal>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-28 border-t border-slate-200 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <span className="text-xs font-semibold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-3 block">ราคา</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">เลือกแพ็คเกจที่ใช่</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light">ราคาโปร่งใส จ่ายครั้งเดียวจบ ไม่มีค่าใช้จ่ายแฝง</p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <PackagesSection />
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative z-10 overflow-hidden">
        {/* Section Background & Glow */}
        <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-200/50 dark:border-white/5 backdrop-blur-3xl" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lime-500/20 dark:via-lime-400/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-400/5 dark:bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-500/10 dark:bg-lime-400/10 border border-lime-500/20 dark:border-lime-400/20 text-lime-600 dark:text-lime-400 text-xs font-semibold uppercase tracking-widest mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
                  </span>
                  พร้อมให้บริการ
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
                  เริ่มต้น<br className="hidden lg:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-600 dark:from-lime-400 dark:to-emerald-400">โปรเจคกับเรา</span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-light mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  ไม่ว่าจะเป็นเว็บไซต์ธุรกิจ, E-Commerce, หรือ Portfolio เราพร้อมให้คำปรึกษาและประเมินราคาฟรี โดยไม่มีข้อผูกมัด
                </p>

                <div className="flex flex-col gap-4 text-left max-w-xs mx-auto lg:mx-0 mb-12 lg:mb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-lime-600 dark:text-lime-400 shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">อีเมล</div>
                      <a href="mailto:hello@waenweb.com" className="text-slate-500 dark:text-slate-400 text-sm hover:text-lime-600 dark:hover:text-lime-400 transition-colors">hello@waenweb.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-lime-600 dark:text-lime-400 shadow-sm">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">Line Official</div>
                      <a href="#" className="text-slate-500 dark:text-slate-400 text-sm hover:text-lime-600 dark:hover:text-lime-400 transition-colors">@waenweb</a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={200}>
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

