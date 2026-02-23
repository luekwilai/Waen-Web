import React from "react"
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

export const revalidate = 0

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      <AnimatedBackground />
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center px-4 sm:px-6 pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* Giant watermark */}
          <div className="absolute inset-0 flex items-center justify-end pr-8 opacity-[0.018] dark:opacity-[0.025]">
            <span className="text-[52vw] font-black text-slate-900 dark:text-white leading-none tracking-tighter">W</span>
          </div>
          <div className="absolute top-1/4 right-[-5%] w-[700px] h-[700px] bg-lime-400/10 dark:bg-lime-400/6 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-[-5%] w-[500px] h-[500px] bg-emerald-500/8 dark:bg-emerald-500/4 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-lime-400/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] border border-lime-400/8 rounded-full" />
          <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, #64748b 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left — Text */}
          <div className="flex flex-col items-start text-left">
            {/* Badge */}
            <div className="animate-fade-up mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-lime-500/30 bg-lime-400/10 dark:border-lime-400/20 dark:bg-lime-400/5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-500 dark:bg-lime-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-600 dark:bg-lime-500" />
              </span>
              <span className="text-xs font-bold text-lime-700 dark:text-lime-300 uppercase tracking-[0.15em]">
                รับทำเว็บไซต์ด้วย WordPress
              </span>
            </div>

            {/* Heading */}
            <h1 className="animate-fade-up animation-delay-100 font-black tracking-tight mb-6 md:mb-8 relative flex flex-wrap items-baseline gap-x-0 gap-y-0 md:gap-y-2">
              <span className="text-7xl sm:text-[5.5rem] md:text-[6rem] xl:text-[8rem] leading-[0.85] text-slate-900 dark:text-white">
                WAEN
              </span>
              <span className="text-7xl sm:text-[5.5rem] md:text-[6rem] xl:text-[8rem] leading-[0.85] relative">
                <span className="absolute inset-0 bg-gradient-to-r from-lime-400 to-emerald-400 blur-[40px] md:blur-[60px] opacity-30 dark:opacity-40" />
                <span className="relative text-lime-500 dark:text-lime-400">WEB</span>
              </span>
              <span className="w-full text-xl sm:text-2xl md:text-3xl xl:text-[2.25rem] font-semibold text-slate-500 dark:text-slate-400 mt-3 md:mt-4 tracking-wide">
                รับทำเว็บไซต์<span className="text-slate-800 dark:text-slate-200 font-bold">มืออาชีพ</span>
              </span>
            </h1>

            <p className="animate-fade-up animation-delay-200 text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
              สร้างเว็บไซต์ที่ตอบโจทย์ธุรกิจของคุณ ด้วยทีมงานมืออาชีพ
              และเทคโนโลยีที่ทันสมัย รองรับทุกการแสดงผล
            </p>

            {/* Tech stack pills */}
            <div className="animate-fade-up flex flex-wrap gap-2 mb-10">
              {["WordPress","React","TypeScript","Tailwind CSS","Next.js"].map((tech) => (
                <span key={tech} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-up animation-delay-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 md:mb-12 w-full sm:w-auto">
              <Link
                href="#contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center bg-lime-400 hover:bg-lime-300 text-slate-950 transition-all font-black rounded-full py-4 px-9 shadow-xl shadow-lime-500/30 hover:shadow-lime-500/50 hover:-translate-y-1 text-base gap-2"
              >
                ติดต่อเรา
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-900 dark:text-white transition-all font-semibold rounded-full py-4 px-8 border border-slate-300 dark:border-white/15 hover:-translate-y-1 text-base"
              >
                ดูผลงานของเรา
              </Link>
            </div>

            {/* Social proof */}
            <div className="animate-fade-up animation-delay-400 flex items-center gap-5">
              <div className="flex -space-x-3">
                {["#84cc16","#22c55e","#10b981","#14b8a6","#06b6d4"].map((bg, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 shadow-sm" style={{ background: bg }} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-1">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  <span className="text-sm font-bold text-slate-900 dark:text-white ml-1">5.0</span>
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">ลูกค้าที่ไว้วางใจ <strong className="text-slate-900 dark:text-white">50+</strong> ราย</span>
              </div>
            </div>
          </div>

          {/* Right — Code Editor */}
          <div className="animate-fade-up animation-delay-200 hidden lg:flex items-center justify-center relative h-[580px]">
            <div className="absolute inset-8 bg-lime-400/8 dark:bg-lime-400/6 rounded-3xl blur-3xl" />

            {/* Editor window */}
            <div className="relative w-full max-w-[490px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/30 dark:shadow-black/60 border border-white/8 z-10">
              {/* Title bar */}
              <div className="flex items-center bg-slate-800 dark:bg-[#1e1e2e]">
                <div className="flex items-center gap-1.5 px-4 py-3.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-lime-500" />
                </div>
                <div className="flex text-xs">
                  <span className="px-4 py-3.5 bg-[#0d1117] dark:bg-[#0d1117] text-slate-200 border-r border-white/5 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />index.tsx
                  </span>
                  <span className="px-4 py-3.5 text-slate-500 border-r border-white/5">styles.css</span>
                  <span className="px-4 py-3.5 text-slate-500">tailwind.config</span>
                </div>
              </div>

              {/* Code body */}
              <div className="bg-[#0d1117] px-0 py-5 font-mono text-[12.5px] leading-6 select-none">
                {[
                  [1,  <><span className="text-slate-500">// WAENWEB — Professional Web Design</span></>],
                  [2,  <></>],
                  [3,  <><span className="text-pink-400">import</span> <span className="text-sky-300">React</span><span className="text-slate-300">,</span> {'{'} <span className="text-sky-300">useState</span> {'}'} <span className="text-pink-400">from</span> <span className="text-amber-300">&apos;react&apos;</span></>],
                  [4,  <><span className="text-pink-400">import</span> {'{'} <span className="text-sky-300">motion</span> {'}'} <span className="text-pink-400">from</span> <span className="text-amber-300">&apos;framer-motion&apos;</span></>],
                  [5,  <></>],
                  [6,  <><span className="text-purple-400">interface</span> <span className="text-amber-300">WebsiteProps</span> {'{'}</>],
                  [7,  <><span className="text-slate-400 pl-4">title</span><span className="text-slate-300">:</span> <span className="text-sky-400">string</span></>],
                  [8,  <><span className="text-slate-400 pl-4">responsive</span><span className="text-slate-300">:</span> <span className="text-sky-400">boolean</span></>],
                  [9,  <>{'}'}</>],
                  [10, <></>],
                  [11, <><span className="text-pink-400">export default function</span> <span className="text-amber-300">Website</span>({'{'}<span className="text-slate-300">title</span>{'}'}<span className="text-slate-300">:</span> <span className="text-sky-300">WebsiteProps</span>) {'{'}</>],
                  [12, <><span className="text-pink-400 pl-4">return</span> <span className="text-slate-300">(</span></>],
                  [13, <><span className="text-slate-300 pl-8">&lt;</span><span className="text-sky-400">main</span> <span className="text-purple-300">className</span><span className="text-slate-300">=</span><span className="text-amber-300">&quot;min-h-screen&quot;</span><span className="text-slate-300">&gt;</span></>],
                  [14, <><span className="overflow-hidden inline-block border-r-2 border-lime-400 pr-0.5 animate-[typing_3s_steps(30,end)_infinite,blink_1s_step-end_infinite] whitespace-nowrap"><span className="text-slate-300 pl-12">&lt;</span><span className="text-sky-400">Hero</span> <span className="text-purple-300">title</span><span className="text-slate-300">={'{'}title{'}'}</span> <span className="text-slate-300">/&gt;</span></span></>],
                  [15, <><span className="text-slate-300 pl-8">&lt;/</span><span className="text-sky-400">main</span><span className="text-slate-300">&gt;</span></>],
                  [16, <><span className="text-slate-300 pl-4">)</span></>],
                  [17, <>{'}'}</>],
                ].map(([num, code]) => (
                  <div key={num as number} className="flex items-start px-4 hover:bg-white/[0.02] transition-colors">
                    <span className="text-slate-600 select-none w-7 shrink-0 text-right mr-5 text-[11px] leading-6">{num}</span>
                    <span className="text-slate-300">{code as React.ReactNode /* jsx element */}</span>
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between bg-lime-600 dark:bg-lime-700 px-4 py-1 text-[10px] font-medium text-white">
                <span>TypeScript React</span>
                <span className="flex items-center gap-3">
                  <span>UTF-8</span>
                  <span>Ln 14, Col 45</span>
                </span>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-5 -right-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl px-5 py-3.5 shadow-2xl z-20" style={{ animation: 'float 3s ease-in-out infinite' }}>
              <div className="text-3xl font-black text-lime-500 dark:text-lime-400">50+</div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-semibold uppercase tracking-wider">โปรเจคสำเร็จ</div>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl px-5 py-3.5 shadow-2xl z-20" style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '1s' }}>
              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">ความพึงพอใจ 100%</div>
            </div>
            <div className="absolute top-1/2 -left-10 -translate-y-1/2 bg-slate-900 dark:bg-slate-800 rounded-xl px-3 py-2 shadow-xl z-20 border border-white/10" style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '0.5s' }}>
              <div className="text-[10px] font-bold text-lime-400 uppercase tracking-wider">⚡ 7–14 วัน</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-0.5 h-10 bg-gradient-to-b from-lime-400 to-transparent rounded-full" />
        </div>
      </section>

      {/* Stats Section */}
      <div className="border-y border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x divide-slate-200 dark:divide-white/5 text-center">
            {[
              { label: "โปรเจคที่สำเร็จ", value: "50+" },
              { label: "ความพึงพอใจ", value: "100%" },
              { label: "ดูแลฟรี (เดือน)", value: "3" },
              { label: "Support", value: "24/7" },
            ].map((stat) => (
              <div key={stat.label} className="px-2">
                <div className="text-xl sm:text-2xl font-bold text-lime-600 dark:text-lime-400">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 border-t border-slate-200 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
                <SpotlightCard className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/8 hover:bg-slate-50 dark:hover:bg-slate-900/60 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all">
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
      <section id="process" className="py-20 md:py-28 border-t border-slate-200 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
      <section id="portfolio" className="py-20 md:py-28 border-t border-slate-200 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
      <section id="packages" className="py-20 md:py-28 border-t border-slate-200 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-20">
            <span className="text-xs font-semibold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-4 block">ราคา</span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-5">
              เลือกแพ็คเกจ<span className="text-lime-500 dark:text-lime-400">ที่ใช่</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-light max-w-xl mx-auto">ราคาโปร่งใส จ่ายครั้งเดียวจบ ไม่มีค่าใช้จ่ายแฝง</p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <PackagesSection />
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 relative z-10 overflow-hidden">
        {/* Section Background & Glow */}
        <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-200/50 dark:border-white/5 backdrop-blur-3xl" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lime-500/20 dark:via-lime-400/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-400/5 dark:bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
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

