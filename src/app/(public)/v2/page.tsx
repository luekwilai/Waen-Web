import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Code2,
  Gauge,
  LayoutGrid,
  MessageSquare,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
} from "lucide-react"
import { V2ContactForm } from "@/components/v2/v2-contact-form"
import { V2Faq } from "@/components/v2/v2-faq"
import { V2Footer } from "@/components/v2/v2-footer"
import { V2Header } from "@/components/v2/v2-header"
import { V2Packages, type V2Package } from "@/components/v2/v2-packages"
import { getAllBlogPosts } from "@/lib/blog"
import { getFeaturedProjects, getPublicPackages, getPublicProjects, getSiteSettings } from "@/lib/queries"
import { normalizeMetrics } from "@/lib/project-metrics"

export const metadata: Metadata = {
  title: "WAENWEB V2 | เว็บไซต์ที่ช่วยให้ธุรกิจเติบโต",
  description: "แนวทางใหม่ของ WAENWEB บริการออกแบบและพัฒนาเว็บไซต์สำหรับธุรกิจ พร้อม SEO และดูแลหลังส่งมอบ",
  alternates: { canonical: "https://waenweb.com/v2" },
  robots: { index: false, follow: true },
}

const heroPlaceholders = [
  { id: "preview-1", title: "WAENWEB Preview", category: "Website preview", description: "", desktopImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&auto=format&fit=crop&q=85", mobileImage: null, websiteUrl: null },
  { id: "preview-2", title: "WAENWEB Preview", category: "Website preview", description: "", desktopImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1400&auto=format&fit=crop&q=85", mobileImage: null, websiteUrl: null },
  { id: "preview-3", title: "WAENWEB Preview", category: "Website preview", description: "", desktopImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&auto=format&fit=crop&q=85", mobileImage: null, websiteUrl: null },
]

type V2Service = { id: string; title: string; desc: string; icon: string }
type V2HeroStat = { value: string; label: string }
type V2ProcessSetting = { num: string; title: string; description: string }

const defaultServices: V2Service[] = [
  { id: "design", title: "Web Design", desc: "ออกแบบ UX/UI ให้สวย ใช้งานง่าย และสื่อสารแบรนด์ได้ชัดเจน", icon: "LayoutGrid" },
  { id: "development", title: "Development", desc: "พัฒนาเว็บไซต์ที่โหลดเร็ว ปลอดภัย และรองรับทุกอุปกรณ์", icon: "Code2" },
  { id: "commerce", title: "E-Commerce", desc: "ระบบร้านค้าออนไลน์ ตะกร้า ชำระเงิน และจัดการออเดอร์", icon: "ShoppingBag" },
  { id: "seo", title: "SEO", desc: "วางโครงสร้างเว็บไซต์และเนื้อหาให้พร้อมสำหรับการค้นหาบน Google", icon: "Search" },
]

const serviceIcons = { LayoutGrid, Code2, ShoppingBag, Search, Store, Smartphone, ShieldCheck, BarChart3 } as const
const processIcons = [MessageSquare, PenTool, Code2, Rocket]
const defaultProcess: V2ProcessSetting[] = [
  { num: "01", title: "คุยและวางแผน", description: "ทำความเข้าใจธุรกิจ เป้าหมาย ผู้ใช้งาน และขอบเขตงานที่ชัดเจน" },
  { num: "02", title: "ออกแบบ", description: "จัดโครงสร้างเนื้อหาและออกแบบหน้าตาให้สอดคล้องกับแบรนด์" },
  { num: "03", title: "พัฒนา", description: "ลงมือพัฒนา ทดสอบความเร็ว การแสดงผล และฟังก์ชันสำคัญ" },
  { num: "04", title: "ส่งมอบและดูแล", description: "เปิดใช้งานจริง สอนการใช้งาน และดูแลหลังส่งมอบตามแพ็กเกจ" },
]

function parseArraySetting<T>(value: string | undefined, fallback: T[], isItem: (item: unknown) => item is T): T[] {
  if (!value) return fallback
  try {
    const parsed = JSON.parse(value) as unknown
    return Array.isArray(parsed) && parsed.every(isItem) ? parsed : fallback
  } catch {
    return fallback
  }
}

function isService(item: unknown): item is V2Service {
  if (!item || typeof item !== "object") return false
  const value = item as Record<string, unknown>
  return typeof value.id === "string" && typeof value.title === "string" && typeof value.desc === "string" && typeof value.icon === "string"
}

function isHeroStat(item: unknown): item is V2HeroStat {
  if (!item || typeof item !== "object") return false
  const value = item as Record<string, unknown>
  return typeof value.value === "string" && typeof value.label === "string"
}

function isProcessSetting(item: unknown): item is V2ProcessSetting {
  if (!item || typeof item !== "object") return false
  const value = item as Record<string, unknown>
  return typeof value.num === "string" && typeof value.title === "string" && typeof value.description === "string"
}

function parseFeatures(value: string | null): string[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value) as unknown
    if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === "string")
  } catch {
    // Older records use newline-separated values.
  }
  return value.split("\n").map((item) => item.trim()).filter(Boolean)
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`mb-4 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] ${light ? "text-[#9ee800]" : "text-black/45"}`}><span className="h-2 w-2 rounded-full bg-[#9ee800]" />{children}</p>
}

export default async function V2Page() {
  const [settings, projects, databasePackages, featuredProjects] = await Promise.all([
    getSiteSettings(),
    getPublicProjects(),
    getPublicPackages(),
    getFeaturedProjects(),
  ])
  const posts = getAllBlogPosts()
  const heroProjects = [...projects, ...heroPlaceholders].slice(0, 3)
  const heroMobileProject = heroProjects.find((project) => project.mobileImage)
  const services = parseArraySetting(settings["services"], defaultServices, isService)
  const heroStats = parseArraySetting<V2HeroStat>(settings["hero.stats"], [
    { value: "50+", label: "โปรเจกต์ที่ส่งมอบ" },
    { value: "100%", label: "รองรับมือถือ" },
    { value: "3 เดือน", label: "ดูแลหลังส่งมอบ" },
  ], isHeroStat)
  const processSettings = parseArraySetting(settings["process"], defaultProcess, isProcessSetting)
  const processSteps = processSettings.map((step, index) => ({ ...step, icon: processIcons[index % processIcons.length] }))
  const techPills = parseArraySetting<string>(settings["hero.techPills"], ["WordPress", "React", "TypeScript", "Next.js"], (item): item is string => typeof item === "string")
  const email = settings["contact.email"] || "thawatsak28@gmail.com"
  const lineId = settings["contact.line"] || "thawatsak"
  const logoUrl = settings["site.logoUrl"] || undefined
  const siteName = settings["site.name"] || "WAENWEB"
  const heroBadge = settings["hero.badge"] || "Web design · Development · SEO"
  const heroHeading = settings["hero.heading"] || "รับทำเว็บไซต์สำหรับธุรกิจ บริษัท และร้านค้าออนไลน์"
  const primaryCta = settings["hero.ctaPrimary"] || "เริ่มโปรเจกต์กับเรา"
  const secondaryCta = settings["hero.ctaSecondary"] || "ดูผลงาน"
  const packages: V2Package[] = databasePackages.map((item) => ({ ...item, features: parseFeatures(item.features) }))
  const featuredCase = featuredProjects[0] || null
  const caseProject = featuredCase || projects[0] || null
  const caseMetrics = featuredCase ? normalizeMetrics(featuredCase.metrics) : []
  return (
    <div className="v2-page relative z-10 overflow-x-clip bg-[#f5f4ef] text-[#111311]">
      <V2Header logoUrl={logoUrl} siteName={siteName} />
      <main>
        <section className="v2-grid relative overflow-hidden border-b border-black/10">
          <div className="absolute left-[45%] top-24 h-96 w-96 rounded-full bg-[#9ee800]/25 blur-[100px]" />
          <div className="mx-auto grid min-h-[calc(100svh-80px)] max-w-[1440px] items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-20">
            <div className="relative z-10 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/60 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-black/60">
                <span className="h-2 w-2 rounded-full bg-[#9ee800]" /> {heroBadge}
              </div>
              <h1 className="mt-7 max-w-3xl text-[clamp(3rem,7vw,6.7rem)] font-black leading-[0.94] tracking-[-0.065em]">
                เว็บไซต์ที่ดี<br />ไม่ได้แค่<span className="text-[#78b900]">สวย</span> —<br />แต่ต้องช่วยให้<br className="hidden sm:block" />ธุรกิจเติบโต
              </h1>
              <p className="mt-6 max-w-xl text-base font-black leading-7 text-black/75 sm:text-lg">{heroHeading}</p>
              <p className="mt-3 max-w-xl text-base leading-8 text-black/55 sm:text-lg">
                {settings["hero.description"] || "ออกแบบเว็บไซต์และพัฒนาระบบสำหรับธุรกิจ บริษัท ร้านค้าออนไลน์ และ Portfolio ให้ชัด เร็ว ใช้งานง่าย พร้อมดูแลหลังส่งมอบ"}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#contact" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#9ee800] px-7 font-black shadow-[0_14px_35px_-16px_rgba(120,185,0,.8)] transition hover:-translate-y-1 hover:bg-[#b5f52c]">{primaryCta} <ArrowRight className="h-4 w-4" /></Link>
                <Link href="#portfolio" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-black/20 bg-white/50 px-7 font-bold transition hover:-translate-y-1 hover:bg-white">{secondaryCta} <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {techPills.map((tech) => <span key={tech} className="rounded-full border border-black/10 bg-white/55 px-3 py-1.5 text-[10px] font-bold text-black/50">{tech}</span>)}
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-black/10 pt-6">
                {heroStats.slice(0, 3).map((stat) => <div key={`${stat.value}-${stat.label}`}><p className="text-xl font-black sm:text-2xl">{stat.value}</p><p className="mt-1 text-[10px] leading-4 text-black/40 sm:text-xs">{stat.label}</p></div>)}
              </div>
            </div>

            <div className="relative min-h-[460px] lg:col-span-6 lg:min-h-[640px]">
              <div className="absolute left-[8%] top-[8%] h-[65%] w-[84%] rotate-2 overflow-hidden rounded-[22px] border-[7px] border-[#161816] bg-[#161816] shadow-[0_35px_80px_-30px_rgba(0,0,0,.5)] transition-transform duration-500 hover:rotate-0">
                <div className="flex h-7 items-center gap-1.5 px-3"><span className="h-2 w-2 rounded-full bg-red-400" /><span className="h-2 w-2 rounded-full bg-amber-300" /><span className="h-2 w-2 rounded-full bg-emerald-400" /></div>
                <div className="relative h-[calc(100%-28px)] overflow-hidden rounded-b-[14px]"><Image src={heroProjects[0].desktopImage || heroPlaceholders[0].desktopImage} alt={heroProjects[0].title} fill priority className="object-cover object-top" sizes="(max-width: 1024px) 84vw, 42vw" /></div>
              </div>
              <div className="v2-float absolute bottom-[6%] left-0 h-[40%] w-[58%] -rotate-3 overflow-hidden rounded-[18px] border-[6px] border-[#151715] bg-[#151715] shadow-[0_30px_65px_-25px_rgba(0,0,0,.55)]">
                <div className="relative h-full"><Image src={heroProjects[1].desktopImage || heroPlaceholders[1].desktopImage} alt={heroProjects[1].title} fill className="object-cover object-top" sizes="(max-width: 1024px) 58vw, 29vw" /></div>
              </div>
              {heroMobileProject?.mobileImage ? (
                <div className="v2-float-delayed absolute bottom-0 right-[4%] aspect-[9/19] w-[27%] rotate-5 overflow-hidden rounded-[24px] border-[7px] border-[#151715] bg-[#151715] shadow-[0_30px_65px_-25px_rgba(0,0,0,.65)]">
                  <span aria-hidden="true" className="absolute left-1/2 top-0 z-10 h-3 w-1/2 -translate-x-1/2 rounded-b-lg bg-[#151715]" />
                  <div className="relative h-full"><Image src={heroMobileProject.mobileImage} alt={`${heroMobileProject.title} เวอร์ชันมือถือ`} fill className="object-cover object-top" sizes="(max-width: 1024px) 27vw, 14vw" /></div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#111311] py-7 text-white">
          <div className="mx-auto flex max-w-[1440px] items-center gap-8 overflow-hidden px-5 sm:px-8 lg:px-12">
            <p className="shrink-0 text-xs font-semibold text-white/35">ผลงานที่ลูกค้าไว้วางใจ</p>
            <div className="h-5 w-px shrink-0 bg-white/15" />
            <div className="flex min-w-0 flex-1 items-center justify-around gap-10 overflow-hidden">
              {projects.slice(0, 6).map((project) => <span key={project.id} className="shrink-0 text-sm font-black tracking-tight text-white/50 sm:text-lg">{project.title}</span>)}
              {projects.length < 3 ? ["WORDPRESS", "NEXT.JS", "E-COMMERCE"].map((item) => <span key={item} className="shrink-0 font-mono text-xs font-bold text-white/35">{item}</span>) : null}
            </div>
          </div>
        </section>

        <section id="portfolio" className="v2-defer bg-[#111311] py-20 text-white sm:py-28 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div><SectionLabel light>Selected work</SectionLabel><h2 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">ผลงานที่พูดแทนเรา</h2></div>
              <p className="max-w-md text-sm leading-7 text-white/45">เว็บไซต์แต่ละชิ้นถูกออกแบบจากเป้าหมายธุรกิจจริง ไม่ใช่แค่เลือกเทมเพลตแล้วเปลี่ยนสี</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {projects.map((project, index) => {
                const card = (
                  <article className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
                      <Image
                        src={project.desktopImage || heroPlaceholders[index % heroPlaceholders.length].desktopImage}
                        alt=""
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                      {project.mobileImage ? (
                        <div className="absolute bottom-3 right-3 z-10 aspect-[9/19] w-[24%] overflow-hidden rounded-[14px] border-[4px] border-[#111311] bg-[#111311] shadow-[0_20px_45px_-12px_rgba(0,0,0,.8)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-1 sm:bottom-4 sm:right-4">
                          <span className="absolute left-1/2 top-0 z-10 h-2 w-1/2 -translate-x-1/2 rounded-b-md bg-[#111311]" />
                          <Image
                            src={project.mobileImage}
                            alt=""
                            fill
                            className="object-cover object-top transition-[object-position] duration-[8000ms] ease-linear group-hover:object-bottom"
                            sizes="(max-width: 1023px) 24vw, 8vw"
                          />
                        </div>
                      ) : null}
                      <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-[#9ee800] text-[#111311] opacity-0 transition-all group-hover:opacity-100"><ArrowUpRight className="h-5 w-5" /></span>
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-5"><div><h3 className="text-xl font-black">{project.title}</h3><p className="mt-1 text-xs text-white/40">{project.category}</p></div><span className="font-mono text-xs text-[#9ee800]">0{index + 1}</span></div>
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/45">{project.description}</p>

                  </article>
                )
                return project.websiteUrl ? <a key={project.id} href={project.websiteUrl} target="_blank" rel="noreferrer noopener">{card}</a> : <div key={project.id}>{card}</div>
              })}
            </div>
            {projects.length === 0 ? <p className="rounded-[24px] border border-white/12 p-8 text-center text-white/50">ยังไม่มีผลงานที่เปิดแสดงในขณะนี้</p> : null}
          </div>
        </section>

        <section id="services" className="v2-defer border-b border-black/10 bg-[#f5f4ef] py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <SectionLabel>Capabilities</SectionLabel>
            <div className="grid gap-7 lg:grid-cols-2 lg:items-end"><h2 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">บริการครบ<br />จบในที่เดียว</h2><p className="max-w-lg text-base leading-8 text-black/50 lg:justify-self-end">ตั้งแต่กลยุทธ์ โครงสร้างเนื้อหา และดีไซน์ ไปจนถึงการพัฒนา เปิดใช้งาน และดูแลหลังส่งมอบ</p></div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => {
                const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] || Sparkles
                return <article key={service.id} className="group bg-[#f5f4ef] p-7 transition hover:bg-white sm:p-8"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#9ee800]/20 text-[#4d7600] transition group-hover:bg-[#9ee800] group-hover:text-black"><Icon className="h-5 w-5" /></span><span className="font-mono text-xs text-black/25">0{index + 1}</span></div><h3 className="mt-10 text-xl font-black">{service.title}</h3><p className="mt-3 text-sm leading-7 text-black/48">{service.desc}</p><ArrowUpRight className="mt-7 h-4 w-4 text-black/35 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-black" /></article>
              })}
            </div>
          </div>
        </section>

        <section id="about" className="v2-defer bg-white py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5"><SectionLabel>Why WAENWEB</SectionLabel><h2 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">สวยอย่างเดียว<br />ยังไม่พอ</h2><p className="mt-6 max-w-md text-base leading-8 text-black/50">เราให้ความสำคัญกับผลลัพธ์หลังเปิดเว็บ ทั้งความเร็ว ประสบการณ์ผู้ใช้ การค้นหา และความง่ายในการดูแลต่อ</p></div>
              <div className="grid gap-px overflow-hidden rounded-[28px] border border-black/10 bg-black/10 sm:grid-cols-2 lg:col-span-7">
                {[{ icon: Gauge, title: "โหลดเร็ว ไม่เสียโอกาส", text: "ปรับภาพ โค้ด และโครงสร้างให้เว็บตอบสนองรวดเร็ว" }, { icon: Smartphone, title: "รองรับทุกอุปกรณ์", text: "ออกแบบ Mobile-first ให้ใช้งานง่ายในทุกขนาดหน้าจอ" }, { icon: Search, title: "พร้อมสำหรับ SEO", text: "วางโครงสร้างหน้า Meta และข้อมูลสำคัญให้ Google เข้าใจ" }, { icon: ShieldCheck, title: "ดูแลหลังส่งมอบ", text: "มีคู่มือ สอนใช้งาน และช่วงดูแลตามแพ็กเกจที่เลือก" }].map(({ icon: Icon, title, text }) => <div key={title} className="bg-white p-7 sm:p-9"><Icon className="h-7 w-7 text-[#78b900]" /><h3 className="mt-8 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-black/48">{text}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="v2-defer border-y border-black/10 bg-[#f5f4ef] py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <SectionLabel>Our process</SectionLabel><h2 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">จากไอเดีย<br />สู่เว็บไซต์ที่ใช้งานจริง</h2>
            <div className="mt-14 grid gap-5 lg:grid-cols-4">
              {processSteps.map((step) => {
                const StepIcon = step.icon
                return <article key={step.num} className="relative rounded-[24px] border border-black/10 bg-white p-7"><span className="font-mono text-sm font-bold text-[#78b900]">{step.num}</span><StepIcon className="mt-12 h-7 w-7" /><h3 className="mt-7 text-xl font-black">{step.title}</h3><p className="mt-3 text-sm leading-7 text-black/48">{step.description}</p></article>
              })}
            </div>
          </div>
        </section>

        <section id="packages" className="v2-defer bg-[#111311] py-20 text-white sm:py-28 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end"><div><SectionLabel light>Pricing</SectionLabel><h2 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">แพ็กเกจที่ชัดเจน<br />ไม่มีค่าใช้จ่ายแอบแฝง</h2></div><p className="max-w-lg text-sm leading-7 text-white/45 lg:justify-self-end">ราคาจริงอาจเปลี่ยนตามขอบเขตงาน ทีมงานจะสรุปรายละเอียดและค่าใช้จ่ายทั้งหมดก่อนเริ่มโปรเจกต์</p></div>
            {packages.length > 0 ? <V2Packages packages={packages} /> : <p className="rounded-[24px] border border-white/12 p-8 text-center text-white/50">ยังไม่มีแพ็กเกจที่เปิดแสดงในขณะนี้</p>}
          </div>
        </section>

        {caseProject ? (
          <section className="v2-defer bg-white py-20 sm:py-28 lg:py-32">
            <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
              <div className="grid overflow-hidden rounded-[32px] border border-black/10 lg:grid-cols-2">
                <div className="relative min-h-[360px] bg-black/5 lg:min-h-[560px]">
                  <Image src={caseProject.desktopImage || heroPlaceholders[0].desktopImage} alt={caseProject.title} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
                  <SectionLabel>Featured case study</SectionLabel>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-black/35">{caseProject.category}</p>
                  <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-5xl">{caseProject.title}</h2>
                  <p className="mt-6 text-base leading-8 text-black/50">{caseProject.description}</p>
                  {caseMetrics.length > 0 ? (
                    <div className="mt-9 grid grid-cols-2 gap-4 border-y border-black/10 py-7 sm:grid-cols-3">
                      {caseMetrics.map((metric) => <div key={`${metric.value}-${metric.label}`}><p className="text-2xl font-black">{metric.value}</p><p className="text-xs text-black/40">{metric.label}</p></div>)}
                    </div>
                  ) : null}
                  {caseProject.websiteUrl ? <a href={caseProject.websiteUrl} target="_blank" rel="noreferrer noopener" className="mt-8 inline-flex items-center gap-2 font-black">ดูเว็บไซต์จริง <ArrowUpRight className="h-4 w-4" /></a> : null}
                </div>
              </div>
            </div>
          </section>
        ) : null}
        <section className="v2-defer border-y border-black/10 bg-[#f5f4ef] py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><SectionLabel>WAENWEB journal</SectionLabel><h2 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">บทความและไอเดีย<br />สำหรับธุรกิจ</h2></div><Link href="/v2/blog" className="inline-flex items-center gap-2 font-black">ดูบทความทั้งหมด <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {posts.slice(0, 3).map((post) => <Link key={post.slug} href={`/v2/blog/${post.slug}`} className="group overflow-hidden rounded-[24px] border border-black/10 bg-white"><div className="relative aspect-[16/10] overflow-hidden"><Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="p-6"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#78b900]">{post.category}</p><h3 className="mt-4 line-clamp-2 text-xl font-black leading-snug">{post.title}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-black/45">{post.description}</p><div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-xs text-black/40"><span>{post.readTime}</span><ArrowUpRight className="h-4 w-4 text-black" /></div></div></Link>)}
            </div>
          </div>
        </section>

        <section className="v2-defer bg-white py-20 sm:py-28 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-4"><SectionLabel>FAQ</SectionLabel><h2 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">คำถาม<br />ที่พบบ่อย</h2><p className="mt-5 max-w-sm text-sm leading-7 text-black/48">คำตอบเบื้องต้นก่อนเริ่มโปรเจกต์ หากมีคำถามนอกเหนือจากนี้ สามารถทักมาปรึกษาได้ฟรี</p></div><div className="lg:col-span-7 lg:col-start-6"><V2Faq /></div>
          </div>
        </section>

        <section id="contact" className="v2-defer bg-[#111311] py-20 text-white sm:py-28 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-5"><SectionLabel light>Start a project</SectionLabel><h2 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">เริ่มต้นโปรเจกต์<br />ของคุณ</h2><p className="mt-6 max-w-md text-base leading-8 text-white/48">เล่าความต้องการให้เราฟังได้เลย ไม่ต้องมี brief ที่สมบูรณ์ เราช่วยตั้งคำถามและวางขอบเขตให้ชัดก่อนเสนอราคา</p><div className="mt-9 space-y-4 text-sm text-white/60"><p className="flex items-center gap-3"><Check className="h-4 w-4 text-[#9ee800]" /> ปรึกษาเบื้องต้นฟรี</p><p className="flex items-center gap-3"><Check className="h-4 w-4 text-[#9ee800]" /> แจ้งขอบเขตและค่าใช้จ่ายก่อนเริ่มงาน</p><p className="flex items-center gap-3"><Check className="h-4 w-4 text-[#9ee800]" /> ดูแลหลังส่งมอบตามแพ็กเกจ</p></div></div><div className="lg:col-span-6 lg:col-start-7"><V2ContactForm /></div>
          </div>
        </section>
      </main>
      <V2Footer email={email} lineId={lineId} logoUrl={logoUrl} siteName={siteName} socialFacebook={settings["social.facebook"]} socialInstagram={settings["social.instagram"]} socialYoutube={settings["social.youtube"]} serviceNames={services.map((service) => service.title)} />
    </div>
  )
}
