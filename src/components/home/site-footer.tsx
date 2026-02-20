import Link from "next/link"
import { Code2, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react"

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
    <footer className="relative border-t border-white/8 overflow-hidden">
      {/* Footer aurora glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(132,204,22,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-400/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group mb-5">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-xl bg-lime-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-tr from-lime-400 to-emerald-400 rounded-xl flex items-center justify-center text-slate-950 shadow-lg">
                  <Code2 className="w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-black text-white">
                  WAEN<span className="text-lime-400">WEB</span>
                </span>
                <span className="text-[10px] text-slate-500 tracking-widest uppercase">Web Studio</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              รับทำเว็บไซต์คุณภาพสูง ออกแบบสวยงาม รองรับทุกอุปกรณ์ ด้วยทีมงานมืออาชีพ
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Youtube, label: "YouTube", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-lime-400 hover:border-lime-400/30 hover:bg-lime-400/5 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-lime-400 inline-block" />
              บริการ
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-lime-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-lime-400 transition-colors" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-lime-400 inline-block" />
              ลิงก์ด่วน
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-slate-400 hover:text-lime-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-lime-400 transition-colors" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-lime-400 inline-block" />
              ติดต่อเรา
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-400/10 flex items-center justify-center text-lime-400 shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">อีเมล</p>
                  <a href="mailto:hello@waenweb.com" className="text-slate-300 hover:text-lime-400 text-sm transition-colors">
                    hello@waenweb.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-400/10 flex items-center justify-center text-lime-400 shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">โทรศัพท์</p>
                  <a href="tel:+66800000000" className="text-slate-300 hover:text-lime-400 text-sm transition-colors">
                    080-000-0000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-400/10 flex items-center justify-center text-lime-400 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">ที่อยู่</p>
                  <p className="text-slate-300 text-sm">กรุงเทพมหานคร, ประเทศไทย</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} WAENWEB. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
              นโยบายความเป็นส่วนตัว
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
              เงื่อนไขการใช้งาน
            </a>
            <Link href="/admin/login" className="text-slate-700 hover:text-slate-500 text-xs transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
