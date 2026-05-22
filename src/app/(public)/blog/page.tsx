import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Clock, Layers } from "lucide-react"
import { getAllBlogPosts } from "@/lib/blog"
import { BrandLogo } from "@/components/brand-logo"
import { SiteFooter } from "@/components/home/site-footer"
import { BlogPostsGrid } from "@/components/blog/blog-posts-grid"
import { ThemeToggle } from "@/components/home/theme-toggle"
import { getSiteSettings } from "@/lib/queries"

export const metadata: Metadata = {
  title: "บทความ & คู่มือ | WAENWEB",
  description:
    "บทความให้ความรู้เรื่องเว็บไซต์ WordPress SEO และการทำธุรกิจออนไลน์ จากทีม WAENWEB",
  alternates: { canonical: "https://waenweb.com/blog" },
  openGraph: {
    title: "บทความ & คู่มือ | WAENWEB",
    description:
      "บทความให้ความรู้เรื่องเว็บไซต์ WordPress SEO และการทำธุรกิจออนไลน์ จากทีม WAENWEB",
    url: "https://waenweb.com/blog",
    type: "website",
  },
}

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    Promise.resolve(getAllBlogPosts()),
    getSiteSettings(),
  ])
  const logoUrl = settings["site.logoUrl"]
  const siteName = settings["site.name"]
  const totalReadTime = posts.reduce((acc, p) => acc + parseInt(p.readTime), 0)
  const categories = Array.from(new Set(posts.map((p) => p.category)))

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <BrandLogo
              iconSize={38}
              logoUrl={logoUrl}
              siteName={siteName}
              wrapperClassName="flex items-center gap-2.5"
              textClassName="hidden sm:flex flex-col leading-none"
              wordmarkClassName="text-lg font-black tracking-tight text-slate-900 dark:text-white"
              subtitle="Blog"
              subtitleClassName="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500"
            />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              หน้าแรก
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-lime-500/20 transition-all hover:scale-105"
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        {/* Hero */}
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-lime-600 dark:text-lime-400">
            Knowledge Base
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
            บทความ &amp; คู่มือ
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-500 dark:text-slate-400">
            เขียนจากประสบการณ์จริง ไม่มีศัพท์เทคนิคงงๆ อ่านแล้วเอาไปใช้ได้เลย
          </p>

          {/* Stats bar */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/70 bg-white/80 px-5 py-3 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/80">
              <BookOpen className="h-4 w-4 text-lime-600 dark:text-lime-400" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {posts.length} บทความ
              </span>
            </div>
            <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/70 bg-white/80 px-5 py-3 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/80">
              <Clock className="h-4 w-4 text-lime-600 dark:text-lime-400" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                รวม ~{totalReadTime} นาที
              </span>
            </div>
            <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/70 bg-white/80 px-5 py-3 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/80">
              <Layers className="h-4 w-4 text-lime-600 dark:text-lime-400" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {categories.length} หมวดหมู่
              </span>
            </div>
            <div className="flex items-center gap-2.5 rounded-2xl border border-lime-400/30 bg-lime-50/80 px-5 py-3 backdrop-blur-sm dark:border-lime-400/20 dark:bg-lime-400/10">
              <span className="text-sm font-bold text-lime-700 dark:text-lime-300">
                อ่านฟรีทุกบทความ ✓
              </span>
            </div>
          </div>
        </div>

        {/* Posts with client-side filter */}
        <BlogPostsGrid posts={posts} />

        {/* CTA */}
        <div className="mt-16 rounded-3xl border border-lime-400/30 bg-lime-50/80 p-10 backdrop-blur-sm dark:border-lime-400/20 dark:bg-lime-400/10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime-700 dark:text-lime-400">
                WAENWEB Studio
              </p>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                อ่านแล้วสนใจทำเว็บ?
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                ปรึกษาฟรี ไม่ต้องตัดสินใจทันที เราช่วยวางแผนให้ก่อนได้เลย
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-lime-500/25 transition-all hover:scale-105 whitespace-nowrap"
              >
                คุยกับเรา
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://line.me/ti/p/~thawatsak"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 shadow transition-all hover:scale-105 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 whitespace-nowrap"
              >
                💬 Line: thawatsak
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
