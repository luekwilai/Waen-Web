import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, BookOpen, Clock } from "lucide-react"
import { V2BlogGrid, type V2BlogSummary } from "@/components/v2/v2-blog-grid"
import { V2Footer } from "@/components/v2/v2-footer"
import { V2Header } from "@/components/v2/v2-header"
import { getAllBlogPosts } from "@/lib/blog"
import { getSiteSettings } from "@/lib/queries"

export const metadata: Metadata = {
  title: "บทความและไอเดียสำหรับธุรกิจ | WAENWEB V2",
  description: "ความรู้เรื่องเว็บไซต์ SEO การออกแบบ และการเติบโตออนไลน์จาก WAENWEB",
  alternates: { canonical: "https://waenweb.com/v2/blog" },
  robots: { index: false, follow: true },
}

export default async function V2BlogPage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), Promise.resolve(getAllBlogPosts())])
  const email = settings["contact.email"] || "thawatsak28@gmail.com"
  const lineId = settings["contact.line"] || "thawatsak"
  const totalMinutes = posts.reduce((sum, post) => sum + (Number.parseInt(post.readTime, 10) || 0), 0)
  const summaries: V2BlogSummary[] = posts.map((post) => ({
    slug: post.slug, title: post.title, description: post.description, date: post.date,
    readTime: post.readTime, category: post.category, image: post.image,
  }))
  const logoUrl = settings["site.logoUrl"] || undefined
  const siteName = settings["site.name"] || "WAENWEB"

  return (
    <div className="v2-page relative z-10 bg-[#f5f4ef] text-[#111311]">
      <V2Header active="blog" logoUrl={logoUrl} siteName={siteName} />
      <main>
        <section className="v2-grid border-b border-black/10">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#78b900]">WAENWEB Journal</p>
            <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:items-end">
              <h1 className="text-[clamp(3.2rem,8vw,8rem)] font-black leading-[0.92] tracking-[-0.065em] lg:col-span-8">บทความและไอเดีย<br />สำหรับธุรกิจ</h1>
              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-base leading-8 text-black/52">ความรู้เรื่องเว็บไซต์ SEO และการเติบโตออนไลน์ ที่เขียนจากประสบการณ์และนำไปใช้กับธุรกิจได้จริง</p>
                <div className="mt-7 flex gap-5 border-t border-black/10 pt-5 text-xs text-black/42"><span className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> {posts.length} บทความ</span><span className="flex items-center gap-2"><Clock className="h-4 w-4" /> ~{totalMinutes} นาที</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="latest" className="py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <V2BlogGrid posts={summaries} />
          </div>
        </section>

        <section className="bg-[#111311] py-14 text-white sm:py-18">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
            <div><p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9ee800]">Stay curious</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">รับบทความใหม่ก่อนใคร</h2><p className="mt-3 text-sm text-white/45">ติดตามบทความใหม่และแนวคิดที่ช่วยให้เว็บไซต์ทำงานเพื่อธุรกิจได้ดีขึ้น</p></div>
            <a href={`mailto:${email}?subject=ติดตามบทความ WAENWEB`} className="inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-[#9ee800] px-7 font-black text-[#111311] transition hover:bg-[#b5f52c]">แจ้งความสนใจทางอีเมล <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </section>

        <section className="border-b border-black/10 bg-white py-16 sm:py-20">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
            <div><p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#78b900]">Have a project?</p><h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">มีโปรเจกต์ในใจ? มาคุยกัน</h2><p className="mt-3 text-sm leading-7 text-black/48">ปรึกษาเบื้องต้นฟรี แล้วเราจะช่วยวางขอบเขตที่เหมาะกับธุรกิจของคุณ</p></div>
            <Link href="/v2#contact" className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-[#111311] px-7 font-black text-white transition hover:-translate-y-0.5">เริ่มโปรเจกต์กับเรา <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
      <V2Footer email={email} lineId={lineId} logoUrl={logoUrl} siteName={siteName} socialFacebook={settings["social.facebook"]} socialInstagram={settings["social.instagram"]} socialYoutube={settings["social.youtube"]} />
    </div>
  )
}
