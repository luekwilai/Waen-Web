import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, Tag } from "lucide-react"
import { V2Footer } from "@/components/v2/v2-footer"
import { V2Header } from "@/components/v2/v2-header"
import { getAllBlogPosts, getBlogPost } from "@/lib/blog"
import { renderMarkdown } from "@/lib/markdown"
import { getSiteSettings } from "@/lib/queries"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | WAENWEB V2`,
    description: post.description,
    alternates: { canonical: `https://waenweb.com/blog/${slug}` },
    robots: { index: false, follow: true },
  }
}

export default async function V2BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const settingsPromise = getSiteSettings()
  const allPosts = getAllBlogPosts()
  const currentIndex = allPosts.findIndex((item) => item.slug === slug)
  const previous = allPosts[currentIndex + 1] || null
  const next = allPosts[currentIndex - 1] || null
  const html = renderMarkdown(post.content)
  const settings = await settingsPromise
  const email = settings["contact.email"] || "thawatsak28@gmail.com"
  const lineId = settings["contact.line"] || "thawatsak"
  const logoUrl = settings["site.logoUrl"] || "/waenweb-logo-r1.svg"
  const siteName = settings["site.name"] || "WAENWEB"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Organization", name: "WAENWEB" },
    publisher: { "@type": "Organization", name: "WAENWEB", url: "https://waenweb.com" },
    url: `https://waenweb.com/blog/${slug}`,
  }

  return (
    <div className="v2-page relative z-10 bg-[#f5f4ef] text-[#111311]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <V2Header active="blog" logoUrl={logoUrl} siteName={siteName} />
      <main>
        <section className="v2-grid border-b border-black/10">
          <div className="mx-auto max-w-5xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
            <Link href="/v2/blog" className="inline-flex items-center gap-2 text-sm font-bold text-black/50 transition hover:text-black"><ArrowLeft className="h-4 w-4" /> บทความทั้งหมด</Link>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs text-black/45"><span className="rounded-full bg-[#9ee800] px-3 py-1.5 font-black text-[#111311]">{post.category}</span><span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {new Date(post.date).toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" })}</span><span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span></div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] sm:text-6xl">{post.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-black/52 sm:text-lg">{post.description}</p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[24px] bg-black/5 sm:rounded-[32px]"><Image src={post.image} alt={post.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" /></div>
          <article className="v2-prose mx-auto max-w-3xl py-10 sm:py-16" dangerouslySetInnerHTML={{ __html: html }} />

          {(previous || next) ? (
            <nav className="grid gap-4 border-t border-black/10 pt-8 sm:grid-cols-2" aria-label="บทความใกล้เคียง">
              {previous ? <Link href={`/v2/blog/${previous.slug}`} className="group rounded-[20px] border border-black/10 bg-white p-5"><span className="flex items-center gap-2 text-xs font-bold text-black/35"><ArrowLeft className="h-3.5 w-3.5" /> บทความก่อนหน้า</span><p className="mt-3 line-clamp-2 font-black leading-6 group-hover:text-[#5f9200]">{previous.title}</p></Link> : <div />}
              {next ? <Link href={`/v2/blog/${next.slug}`} className="group rounded-[20px] border border-black/10 bg-white p-5 text-right"><span className="flex items-center justify-end gap-2 text-xs font-bold text-black/35">บทความถัดไป <ArrowRight className="h-3.5 w-3.5" /></span><p className="mt-3 line-clamp-2 font-black leading-6 group-hover:text-[#5f9200]">{next.title}</p></Link> : <div />}
            </nav>
          ) : null}
        </div>

        <section className="bg-[#111311] py-16 text-white">
          <div className="mx-auto flex max-w-5xl flex-col gap-7 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between"><div><p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#9ee800]"><Tag className="h-3.5 w-3.5" /> WAENWEB Studio</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">สนใจทำเว็บไซต์? ปรึกษาฟรีได้เลย</h2><p className="mt-3 text-sm text-white/45">บอกเป้าหมายและงบประมาณ เราช่วยแนะนำทางเลือกที่เหมาะสมให้ได้</p></div><Link href="/v2#contact" className="inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-[#9ee800] px-7 font-black text-[#111311]">คุยกับเรา <ArrowUpRight className="h-4 w-4" /></Link></div>
        </section>
      </main>
      <V2Footer email={email} lineId={lineId} logoUrl={logoUrl} siteName={siteName} socialFacebook={settings["social.facebook"]} socialInstagram={settings["social.instagram"]} socialYoutube={settings["social.youtube"]} />
    </div>
  )
}
