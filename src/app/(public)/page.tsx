import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ContactForm } from "@/components/home/contact-form"
import { PortfolioSection } from "@/components/home/portfolio-section"
import { PackagesSection } from "@/components/home/packages-section"
import { ProcessSection } from "@/components/home/process-section"
import { ScrollReveal } from "@/components/home/scroll-reveal"
import { SiteHeader } from "@/components/home/site-header"
import { SiteFooter } from "@/components/home/site-footer"
import { HeroCodeEditor } from "@/components/home/hero-code-editor"
import { FaqSection } from "@/components/home/faq-section"
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section"
import { CtaBanner } from "@/components/home/cta-banner"
import { LatestArticlesSection } from "@/components/home/latest-articles-section"
import { getSiteSettings } from "@/lib/queries"
import { getAllBlogPosts } from "@/lib/blog"
import {
  Smartphone,
  Search,
  ShoppingCart,
  ShieldCheck,
  Headphones,
  Clock,
  ArrowRight,
  Mail,
  MessageSquare,
  Globe,
  Code2,
  Star,
  Zap,
  Lock,
  BarChart2,
  type LucideIcon,
} from "lucide-react"

const SERVICE_ICONS: Record<string, LucideIcon> = {
  Smartphone, Search, ShoppingCart, ShieldCheck, Headphones, Clock,
  Globe, Code2, Star, Zap, Lock, BarChart2,
}

function ServiceIcon({ name }: { name: string }) {
  const Icon = SERVICE_ICONS[name] ?? Globe
  return <Icon className="w-6 h-6" />
}

const DEFAULT_TITLE = "รับทำเว็บไซต์ รับทำเว็บ WordPress ออกแบบเว็บธุรกิจ | WAENWEB"
const DEFAULT_DESC  = "รับทำเว็บไซต์และรับทำเว็บ WordPress สำหรับธุรกิจ บริษัท ร้านค้าออนไลน์ และ Portfolio ออกแบบสวย รองรับมือถือ SEO ติดหน้าแรก ดูแลหลังส่งมอบ ราคาเริ่มต้น 3,900 บาท"
const KEYWORDS      = "รับทำเว็บไซต์,รับทำเว็บ WordPress,ออกแบบเว็บไซต์,รับทำเว็บราคาถูก,รับทำเว็บธุรกิจ,รับทำเว็บไซต์ครบวงจร,เว็บไซต์มืออาชีพ,รับทำเว็บ SEO,รับทำเว็บร้านค้าออนไลน์,WAENWEB"
const CANONICAL     = "https://waenweb.com"
const OG_IMAGE      = "https://waenweb.com/og-image.png"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings()
    const title = settings["seo.title"] || DEFAULT_TITLE
    const description = settings["seo.description"] || DEFAULT_DESC
    return buildMetadata(title, description, settings["site.logoUrl"])
  } catch {
    return buildMetadata(DEFAULT_TITLE, DEFAULT_DESC)
  }
}

function buildMetadata(title: string, description: string, logoUrl?: string): Metadata {
  return {
    title,
    description,
    keywords: KEYWORDS,
    authors: [{ name: "WAENWEB", url: CANONICAL }],
    creator: "WAENWEB",
    metadataBase: new URL(CANONICAL),
    alternates: { canonical: CANONICAL },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: logoUrl
      ? { icon: logoUrl, shortcut: logoUrl, apple: logoUrl }
      : undefined,
    openGraph: {
      title,
      description,
      url: CANONICAL,
      siteName: "WAENWEB",
      locale: "th_TH",
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
      creator: "@waenweb",
    },
  }
}

export default async function HomePage() {
  const settings = await getSiteSettings()
  const latestPosts = getAllBlogPosts()

  const logoUrl = settings["site.logoUrl"] || undefined
  const siteName = settings["site.name"] || undefined
  const contactEmail = settings["contact.email"] || "thawatsak28@gmail.com"
  const contactLine = settings["contact.line"] || "thawatsak"
  const heroBadge = settings["hero.badge"] || "รับทำเว็บไซต์ WordPress"
  const heroHeading = settings["hero.heading"] || "รับทำเว็บไซต์สำหรับธุรกิจ บริษัท และร้านค้าออนไลน์"
  const heroDescription = settings["hero.description"] || "บริการรับทำเว็บไซต์และรับทำเว็บ WordPress สำหรับธุรกิจ บริษัท ร้านค้าออนไลน์ และ Portfolio ออกแบบสวย รองรับมือถือ ปรับ SEO โหลดไว และดูแลหลังส่งมอบ"
  const heroCtaPrimary = settings["hero.ctaPrimary"] || "ติดต่อเรา"
  const heroCtaSecondary = settings["hero.ctaSecondary"] || "ดูผลงานของเรา"

  let heroStats: { label: string; value: string }[] = [
    { label: "โปรเจคที่สำเร็จ", value: "50+" },
    { label: "ความพึงพอใจ", value: "100%" },
    { label: "ดูแลฟรี (เดือน)", value: "3" },
    { label: "Support", value: "24/7" },
  ]
  try { if (settings["hero.stats"]) heroStats = JSON.parse(settings["hero.stats"]) } catch { /* use default */ }

  let techPills: string[] = ["WordPress", "React", "TypeScript", "Tailwind CSS", "Next.js"]
  try { if (settings["hero.techPills"]) techPills = JSON.parse(settings["hero.techPills"]) } catch { /* use default */ }

  let services: { id: string; title: string; desc: string; icon: string }[] = []
  try { if (settings["services"]) services = JSON.parse(settings["services"]) } catch { /* use default */ }

  let processSteps: import("@/components/home/process-section").ProcessStepData[] = []
  try { if (settings["process"]) processSteps = JSON.parse(settings["process"]) } catch { /* use default */ }


  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://waenweb.com/#business",
        "name": siteName || "WAENWEB",
        "url": "https://waenweb.com",
        "logo": logoUrl || "https://waenweb.com/waenweb-logo.svg",
        "image": "https://waenweb.com/og-image.png",
        "description": DEFAULT_DESC,
        "email": contactEmail,
        "priceRange": "฿฿",
        "currenciesAccepted": "THB",
        "paymentAccepted": "โอนเงิน, พร้อมเพย์",
        "areaServed": { "@type": "Country", "name": "Thailand" },
        "serviceType": ["Web Design", "WordPress Development", "SEO", "E-Commerce"],
        "address": { "@type": "PostalAddress", "addressCountry": "TH" },
        "sameAs": [
          settings["social.facebook"] || "",
          settings["social.instagram"] || "",
        ].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": "https://waenweb.com/#website",
        "url": "https://waenweb.com",
        "name": siteName || "WAENWEB",
        "description": DEFAULT_DESC,
        "inLanguage": "th-TH",
        "publisher": { "@id": "https://waenweb.com/#business" },
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "ทำเว็บไซต์ใช้เวลานานแค่ไหน?", "acceptedAnswer": { "@type": "Answer", "text": "โดยทั่วไปใช้เวลา 7–21 วันทำการ ขึ้นอยู่กับความซับซ้อนของเว็บ" } },
          { "@type": "Question", "name": "ราคาทำเว็บไซต์เริ่มต้นเท่าไหร่?", "acceptedAnswer": { "@type": "Answer", "text": "ราคาเริ่มต้นที่ 3,900 บาท สำหรับเว็บไซต์ WordPress พื้นฐาน พร้อม SEO และรองรับมือถือ" } },
          { "@type": "Question", "name": "หลังส่งมอบงานแล้วแก้ไขได้ไหม?", "acceptedAnswer": { "@type": "Answer", "text": "ได้ครับ ทุกแพ็คเกจมีระยะดูแลฟรี 3 เดือนหลังส่งมอบ" } },
          { "@type": "Question", "name": "รับทำเว็บร้านค้าออนไลน์ได้ไหม?", "acceptedAnswer": { "@type": "Answer", "text": "รับครับ ทำ E-Commerce ด้วย WooCommerce บน WordPress รองรับระบบตะกร้าสินค้าและชำระเงินออนไลน์" } },
          { "@type": "Question", "name": "ทำแล้วติดหน้าแรก Google ได้ไหม?", "acceptedAnswer": { "@type": "Answer", "text": "ทุกเว็บได้รับการตั้งค่า SEO พื้นฐาน meta tag, sitemap, schema markup และ page speed optimization" } },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader logoUrl={logoUrl} siteName={siteName} />

      {/* Hero Section */}
      <section className="relative lg:min-h-[100svh] flex items-center px-4 sm:px-6 pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background — layered mesh + dotted grid */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* Dotted grid with radial fade */}
          <div className="absolute inset-0 bg-grid-dots opacity-60 dark:opacity-50" />
          {/* Mesh gradient blobs */}
          <div className="absolute top-[10%] right-[-8%] w-[560px] h-[560px] bg-lime-400/10 dark:bg-lime-400/8 rounded-full blur-[90px]" />
          <div className="absolute bottom-[-10%] left-[-8%] w-[480px] h-[480px] bg-emerald-500/8 dark:bg-emerald-500/6 rounded-full blur-[80px]" />
          <div className="absolute top-[40%] left-[30%] w-[340px] h-[340px] bg-indigo-400/5 dark:bg-indigo-500/5 rounded-full blur-[100px]" />
          {/* Top fade */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left — Text */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Badge — animated ping dot + gradient border */}
            <div className="animate-fade-up mb-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-lime-500/40 bg-lime-400/10 dark:border-lime-400/25 dark:bg-lime-400/5 backdrop-blur-sm shadow-sm shadow-lime-500/10">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-lime-500 opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-600 dark:bg-lime-400" />
              </span>
              <span className="text-xs font-bold text-lime-700 dark:text-lime-300 uppercase tracking-[0.15em]">
                {heroBadge}
              </span>
            </div>

            {/* Heading — shimmer on "WEB" */}
            <h1 className="animate-fade-up animation-delay-100 font-black tracking-tight mb-4 md:mb-5">
              <span className="relative inline-flex max-w-full items-baseline gap-2 sm:gap-3 md:gap-4 whitespace-nowrap text-[clamp(3rem,10vw,5.5rem)] leading-[0.9] [text-wrap:balance]">
                <span className="text-slate-900 dark:text-white drop-shadow-sm">WAEN</span>
                <span className="relative inline-flex">
                  <span className="web-gradient relative bg-clip-text text-transparent animate-shimmer-slow [filter:drop-shadow(0_2px_10px_rgba(132,204,22,0.25))]">
                    WEB
                  </span>
                </span>
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl font-semibold text-slate-600 dark:text-slate-300 mt-2.5 md:mt-3 tracking-wide [text-wrap:balance]">
                {heroHeading}
              </span>
            </h1>

            <p className="animate-fade-up animation-delay-200 text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-lg mb-6 leading-relaxed">
              {heroDescription}
            </p>

            {/* Tech stack pills */}
            <div className="animate-fade-up flex flex-wrap gap-2 mb-7">
              {techPills.map((tech, i) => (
                <span
                  key={tech}
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 backdrop-blur-sm shadow-sm hover:border-lime-400/50 hover:text-lime-700 dark:hover:text-lime-300 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ animationDelay: `${300 + i * 60}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-500 dark:bg-lime-400 group-hover:animate-pulse" />
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-up animation-delay-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10 sm:mb-10 md:mb-8 w-full sm:w-auto">
              <Link
                href="#contact"
                className="btn-shine group w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-lime-400 to-lime-300 hover:from-lime-300 hover:to-lime-200 text-slate-950 transition-all font-black rounded-full py-3.5 px-8 shadow-[0_10px_40px_-10px_rgba(163,230,53,0.55)] hover:shadow-[0_14px_50px_-8px_rgba(163,230,53,0.7)] hover:-translate-y-1 text-sm gap-2 ring-1 ring-inset ring-white/40"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {heroCtaPrimary}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="#portfolio"
                className="group w-full sm:w-auto inline-flex items-center justify-center bg-white/60 dark:bg-white/[0.03] hover:bg-white/90 dark:hover:bg-white/[0.07] text-slate-900 dark:text-white transition-all font-semibold rounded-full py-3.5 px-7 border border-slate-300 dark:border-white/15 hover:border-lime-400/50 hover:-translate-y-1 text-sm backdrop-blur-sm"
              >
                {heroCtaSecondary}
                <ArrowRight className="w-4 h-4 ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </div>
          </div>

          {/* Right — Code Editor with subtle aura */}
          <div className="lg:col-span-7 animate-fade-up animation-delay-200 hidden lg:flex items-center justify-center relative h-[580px] group/editor">
            {/* Aura glow behind editor */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[420px] h-[420px] rounded-full bg-lime-400/20 dark:bg-lime-400/15 blur-[90px]" />
            </div>

            {/* Interactive Code Editor */}
            <HeroCodeEditor />
          </div>
        </div>

        {/* Scroll Indicator — mouse + animated flow */}
        <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 sm:gap-2 text-slate-400 dark:text-slate-500 pointer-events-none">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-widest font-medium">Scroll</span>
          <div className="relative w-[22px] h-[34px] rounded-full border-2 border-slate-300 dark:border-white/20 flex justify-center pt-1.5">
            <span className="w-1 h-2 rounded-full bg-lime-500 dark:bg-lime-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="relative z-10 overflow-hidden">
        {/* top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 dark:via-white/8 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 dark:divide-white/8">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="group relative flex-1 min-w-[140px] flex flex-col items-center justify-center gap-1 py-8 px-6 text-center transition-colors duration-300 hover:bg-slate-50/80 dark:hover:bg-white/[0.03]"
              >
                {/* hover glow dot */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-br from-lime-500 to-emerald-500 dark:from-lime-300 dark:to-emerald-400 bg-clip-text text-transparent leading-none">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 md:py-28 border-t border-slate-200 dark:border-white/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
              ผลงาน
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              ผลงาน<span className="text-lime-500 dark:text-lime-400">ที่ผ่านมา</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">ตัวอย่างเว็บไซต์ที่ออกแบบรองรับทุกอุปกรณ์</p>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={150}>
          <PortfolioSection />
        </ScrollReveal>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 border-t border-slate-200 dark:border-white/5 relative z-10 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-1/3 right-0 w-[380px] h-[380px] bg-lime-400/5 dark:bg-lime-400/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
              บริการของเรา
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              ครบทุก<span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-500 dark:from-lime-400 dark:to-emerald-400">บริการ</span> ในที่เดียว
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-light max-w-xl mx-auto">
              เราให้บริการครอบคลุม ทั้งการออกแบบ พัฒนา และดูแลเว็บไซต์
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {services.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 40}>
                <div className="group relative bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/8 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-lime-500/10 dark:hover:shadow-lime-400/5 hover:border-lime-400/50 dark:hover:border-lime-400/30 h-full flex flex-col">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-400/0 via-transparent to-emerald-400/0 group-hover:from-lime-400/[0.07] group-hover:to-emerald-400/[0.05] transition-all duration-500 pointer-events-none rounded-2xl sm:rounded-3xl" />
                  <span className="absolute top-3 right-4 text-2xl sm:text-3xl font-black text-slate-200/90 dark:text-white/[0.06] select-none tabular-nums leading-none group-hover:text-lime-500/20 dark:group-hover:text-lime-400/10 transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-lime-400/25 to-emerald-400/10 dark:from-lime-400/20 dark:to-emerald-400/5 rounded-xl sm:rounded-2xl flex items-center justify-center text-lime-600 dark:text-lime-400 mb-3 sm:mb-5 shrink-0 group-hover:from-lime-400/40 group-hover:to-emerald-400/25 group-hover:scale-[1.08] group-hover:-rotate-3 transition-all duration-300 shadow-sm ring-1 ring-inset ring-lime-400/20 dark:ring-lime-400/15">
                    <ServiceIcon name={s.icon} />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2 leading-snug group-hover:text-lime-700 dark:group-hover:text-lime-300 transition-colors">{s.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px] sm:text-sm line-clamp-3 flex-1">{s.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="relative h-px flex-1 bg-slate-200/60 dark:bg-white/5 overflow-hidden rounded-full">
                      <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-gradient-to-r from-lime-400/80 to-emerald-400/80 transition-all duration-500 rounded-full" />
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 ml-3 text-lime-500 dark:text-lime-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Mid-page CTA Banner */}
      <CtaBanner contactLine={contactLine} />

      {/* Process Section */}
      <section id="process" className="py-20 md:py-28 border-t border-slate-200 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
              ขั้นตอนการทำงาน
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              ทำงานอย่าง<span className="text-lime-500 dark:text-lime-400">เป็นระบบ</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-light max-w-xl mx-auto">
              เรารับฟัง วิเคราะห์ และพัฒนา เพื่อส่งมอบผลงานที่ดีที่สุดให้กับคุณ
            </p>
          </ScrollReveal>
          <ProcessSection steps={processSteps} />
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 md:py-28 border-t border-slate-200 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
              ราคา
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              เลือกแพ็คเกจ<span className="text-lime-500 dark:text-lime-400">ที่ใช่</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-light max-w-xl mx-auto">ราคาโปร่งใส จ่ายครั้งเดียวจบ ไม่มีค่าใช้จ่ายแฝง</p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <PackagesSection />
          </ScrollReveal>
        </div>
      </section>

      {/* Latest Articles Section */}
      <LatestArticlesSection posts={latestPosts} />

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 relative z-10 overflow-hidden">
        {/* Section Background - simplified */}
        <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-200/50 dark:border-white/5" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lime-500/20 dark:via-lime-400/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/5 dark:bg-lime-400/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-500/10 dark:bg-lime-400/10 border border-lime-500/20 dark:border-lime-400/20 text-lime-600 dark:text-lime-400 text-xs font-semibold uppercase tracking-widest mb-6">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500" />
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
                      <a href={`mailto:${contactEmail}`} className="text-slate-500 dark:text-slate-400 text-sm hover:text-lime-600 dark:hover:text-lime-400 transition-colors">{contactEmail}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-lime-600 dark:text-lime-400 shadow-sm">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">Line ID</div>
                      <a href={`https://line.me/ti/p/~${contactLine}`} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 text-sm hover:text-lime-600 dark:hover:text-lime-400 transition-colors">{contactLine}</a>
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

      {/* FAQ Section */}
      <ScrollReveal>
        <FaqSection />
      </ScrollReveal>

      <SiteFooter
        logoUrl={logoUrl}
        siteName={siteName}
        contactEmail={contactEmail}
        contactLine={contactLine}
        socialFacebook={settings["social.facebook"]}
        socialInstagram={settings["social.instagram"]}
        socialYoutube={settings["social.youtube"]}
        serviceNames={services.length > 0 ? services.map((s) => s.title) : undefined}
      />

    </div>
  )
}

