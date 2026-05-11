import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"
import { getAllBlogPosts } from "@/lib/blog"
import { BrandLogo } from "@/components/brand-logo"
import { SiteFooter } from "@/components/home/site-footer"

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

const CATEGORY_COLORS: Record<string, string> = {
  "ราคา & แพ็คเกจ": "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  "คำแนะนำ": "bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300",
  SEO: "bg-lime-100 text-lime-700 dark:bg-lime-400/15 dark:text-lime-300",
  "E-Commerce": "bg-purple-100 text-purple-700 dark:bg-purple-400/15 dark:text-purple-300",
  "Web Design": "bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300",
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const [featured, ...rest] = posts

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <BrandLogo
              iconSize={38}
              wrapperClassName="flex items-center gap-2.5"
              textClassName="hidden sm:flex flex-col leading-none"
              wordmarkClassName="text-lg font-black tracking-tight text-slate-900 dark:text-white"
              subtitle="Blog"
              subtitleClassName="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500"
            />
          </Link>
          <div className="flex items-center gap-3">
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
        {/* Page title */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-lime-600 dark:text-lime-400">
            Knowledge Base
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
            บทความ &amp; คู่มือ
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 dark:text-slate-400">
            ความรู้เรื่องเว็บไซต์ WordPress SEO และการทำธุรกิจออนไลน์
            จากทีม WAENWEB
          </p>
        </div>

        {/* Featured post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-10 flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-xl shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/20 md:flex-row"
          >
            {/* Featured image */}
            <div className="relative min-h-[220px] w-full overflow-hidden md:w-2/5">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-6 p-8 md:p-10">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-lime-400/15 px-3 py-0.5 text-xs font-semibold text-lime-700 dark:text-lime-300">
                    บทความแนะนำ
                  </span>
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[featured.category] ?? "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"}`}
                  >
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-2xl font-black leading-snug text-slate-900 transition-colors group-hover:text-lime-700 dark:text-white dark:group-hover:text-lime-300 md:text-3xl">
                  {featured.title}
                </h2>
                <p className="text-base leading-7 text-slate-500 dark:text-slate-400">
                  {featured.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {featured.readTime}
                  </span>
                  <span>
                    {new Date(featured.date).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-lime-600 transition-colors group-hover:text-lime-700 dark:text-lime-400">
                  อ่านต่อ
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {rest.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-lg shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/20"
            >
              {/* Cover image */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[post.category] ?? "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"}`}
                    >
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-lime-700 dark:text-white dark:group-hover:text-lime-300">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-6 text-slate-500 line-clamp-3 dark:text-slate-400">
                    {post.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-semibold text-lime-600 dark:text-lime-400">
                    อ่านต่อ
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl border border-lime-400/30 bg-lime-50/80 p-10 text-center backdrop-blur-sm dark:border-lime-400/20 dark:bg-lime-400/10">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            ต้องการเว็บไซต์ที่ติด Google?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-slate-500 dark:text-slate-400">
            WAENWEB รับทำเว็บ WordPress ที่ SEO ดี รองรับมือถือ ราคาเริ่มต้นเพียง 3,900 บาท
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime-400 px-8 py-3 font-bold text-slate-950 shadow-lg shadow-lime-500/25 transition-all hover:scale-105"
          >
            ปรึกษาฟรี ไม่มีข้อผูกมัด
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
