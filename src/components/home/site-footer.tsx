import Link from "next/link"
import { Code2, Mail, Phone, MapPin, Facebook, Instagram, Youtube, ArrowRight } from "lucide-react"

const services = [
  "Responsive Website",
  "E-Commerce",
  "SEO Optimization",
  "PDPA Compliance",
  "ดูแลหลังการขาย",
]

const quickLinks = [
  { href: "#services", label: "บริการ" },
  { href: "#packages", label: "ราคา" },
  { href: "#portfolio", label: "ผลงาน" },
  { href: "#contact", label: "ติดต่อ" },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-3xl overflow-hidden">
      {/* Massive Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-lime-400/20 via-emerald-500/5 to-transparent dark:from-lime-400/10 dark:via-emerald-500/5 blur-[100px] pointer-events-none rounded-full" />
      
      {/* Glowing Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-lime-500 dark:via-lime-400 to-transparent opacity-50" />

      {/* Floating Orbs for Decoration */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-lime-400/20 rounded-full blur-[50px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-[60px] animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-12 z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column (Spans 4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 group mb-6 relative">
              <div className="absolute inset-0 bg-lime-400/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <div className="absolute inset-0 rounded-xl bg-lime-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative w-12 h-12 bg-gradient-to-tr from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 rounded-xl flex items-center justify-center text-lime-400 dark:text-lime-600 shadow-xl border border-white/10 dark:border-slate-900/10 z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <Code2 className="w-6 h-6 relative z-10" />
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                  WAEN<span className="text-lime-500 dark:text-lime-400">WEB</span>
                </span>
                <span className="text-xs text-slate-500 font-semibold tracking-[0.2em] uppercase mt-1">Studio</span>
              </div>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8 max-w-sm">
              สร้างเว็บไซต์ที่ตอบโจทย์ธุรกิจของคุณ ด้วยทีมงานมืออาชีพและเทคโนโลยีที่ทันสมัย รองรับทุกการแสดงผล
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: Facebook, label: "Facebook", href: "#", color: "hover:bg-blue-500 hover:border-blue-500 hover:text-white hover:shadow-blue-500/30" },
                { icon: Instagram, label: "Instagram", href: "#", color: "hover:bg-pink-500 hover:border-pink-500 hover:text-white hover:shadow-pink-500/30" },
                { icon: Youtube, label: "YouTube", href: "#", color: "hover:bg-red-500 hover:border-red-500 hover:text-white hover:shadow-red-500/30" },
              ].map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`relative w-12 h-12 flex items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 transition-all duration-300 shadow-sm hover:shadow-lg ${color} group overflow-hidden`}
                >
                  <Icon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column (Spans 2 cols) */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-lime-400 to-emerald-500 inline-block" />
              เมนูด่วน
            </h4>
            <ul className="space-y-4">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-lime-400 text-base transition-all duration-300 flex items-center gap-3 group w-fit"
                  >
                    <span className="w-6 h-px bg-slate-300 dark:bg-slate-700 group-hover:w-10 group-hover:bg-lime-500 dark:group-hover:bg-lime-400 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-lime-400 to-emerald-500 inline-block" />
              บริการ
            </h4>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-lime-400 text-base transition-all duration-300 flex items-center gap-3 group w-fit"
                  >
                    <span className="w-6 h-px bg-slate-300 dark:bg-slate-700 group-hover:w-10 group-hover:bg-lime-500 dark:group-hover:bg-lime-400 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium">{s}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column (Spans 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-lime-400 to-emerald-500 inline-block" />
              ติดต่อเรา
            </h4>
            <div className="space-y-6">
              <a href="mailto:hello@waenweb.com" className="flex items-start gap-4 group p-3 -m-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-lime-400/10 dark:bg-lime-400/5 flex items-center justify-center text-lime-600 dark:text-lime-400 shrink-0 group-hover:scale-110 group-hover:bg-lime-400 group-hover:text-slate-900 transition-all duration-300 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">ส่งอีเมลหาเรา</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">hello@waenweb.com</p>
                </div>
              </a>
              
              <a href="tel:+66800000000" className="flex items-start gap-4 group p-3 -m-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-lime-400/10 dark:bg-lime-400/5 flex items-center justify-center text-lime-600 dark:text-lime-400 shrink-0 group-hover:scale-110 group-hover:bg-lime-400 group-hover:text-slate-900 transition-all duration-300 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">โทรศัพท์</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">080-000-0000</p>
                </div>
              </a>
              
              <div className="flex items-start gap-4 p-3 -m-3">
                <div className="w-12 h-12 rounded-xl bg-lime-400/10 dark:bg-lime-400/5 flex items-center justify-center text-lime-600 dark:text-lime-400 shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">ที่ตั้งสำนักงาน</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">กรุงเทพมหานคร, ประเทศไทย</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 dark:text-slate-500 text-sm font-medium" suppressHydrationWarning>
            © {new Date().getFullYear()} <span className="text-slate-900 dark:text-white font-bold">WAENWEB</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors relative group">
              นโยบายความเป็นส่วนตัว
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors relative group">
              เงื่อนไขการใช้งาน
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <Link 
              href="/admin/login" 
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-lime-400 text-sm font-bold transition-all group px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-lime-500/50 hover:bg-slate-50 dark:hover:bg-lime-400/10"
            >
              Admin Portal
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
