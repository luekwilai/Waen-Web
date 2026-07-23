import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "lucide-react"
import Image from "next/image"
import { getAllBlogPosts, getBlogPost } from "@/lib/blog"
import { renderMarkdown } from "@/lib/markdown"
import { BrandLogo } from "@/components/brand-logo"
import { SiteFooter } from "@/components/home/site-footer"
import { ThemeToggle } from "@/components/home/theme-toggle"
import { getSiteSettings } from "@/lib/queries"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://waenweb.com/blog/${slug}` },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://waenweb.com/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.title }],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const settings = await getSiteSettings()
  const logoUrl = settings["site.logoUrl"]
  const siteName = settings["site.name"]

  const allPosts = getAllBlogPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prev = allPosts[currentIndex + 1] ?? null
  const next = allPosts[currentIndex - 1] ?? null

  const htmlContent = renderMarkdown(post.content)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "th-TH",
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://waenweb.com/blog/${slug}` },
    author: { "@type": "Organization", name: "WAENWEB" },
    publisher: {
      "@type": "Organization",
      name: "WAENWEB",
      url: "https://waenweb.com",
      logo: { "@type": "ImageObject", url: "https://waenweb.com/waenweb-logo-r1.svg" },
    },
    url: `https://waenweb.com/blog/${slug}`,
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
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
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              บทความทั้งหมด
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
        {/* Hero */}
        <div className="mb-10 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-xl shadow-slate-900/5 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/20">
          {/* Cover image */}
          <div className="relative h-56 w-full sm:h-72">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            {/* Category badge over image */}
            <div className="absolute bottom-4 left-6">
              <span className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-slate-950">
                {post.category}
              </span>
            </div>
          </div>
          <div className="p-8 md:p-12">
            <h1 className="text-3xl font-black leading-snug tracking-tight text-slate-900 dark:text-white md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-500 dark:text-slate-400">
              {post.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                อ่าน {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                WAENWEB Blog
              </span>
            </div>
          </div>
        </div>

        {/* Article content */}
        <article
          className="prose-waenweb mb-10 rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/20 md:p-12"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="mb-10 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900/80"
              >
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 dark:text-slate-500">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  บทความก่อนหน้า
                </span>
                <span className="text-sm font-bold leading-snug text-slate-700 group-hover:text-lime-700 dark:text-slate-200 dark:group-hover:text-lime-300 line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group flex flex-col items-end gap-2 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900/80 text-right"
              >
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 dark:text-slate-500">
                  บทความถัดไป
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-bold leading-snug text-slate-700 group-hover:text-lime-700 dark:text-slate-200 dark:group-hover:text-lime-300 line-clamp-2">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}

        {/* CTA */}
        <div className="rounded-3xl border border-lime-400/30 bg-lime-50/80 p-10 text-center backdrop-blur-sm dark:border-lime-400/20 dark:bg-lime-400/10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime-700 dark:text-lime-400">
            WAENWEB Studio
          </p>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            สนใจทำเว็บไซต์? ปรึกษาฟรีได้เลย
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            รับทำเว็บ WordPress ราคาเริ่มต้น 3,900 บาท ออกแบบสวย SEO ดี รองรับมือถือ
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-lime-500/25 transition-all hover:scale-105"
            >
              ติดต่อเรา
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://line.me/ti/p/~thawatsak"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 shadow transition-all hover:scale-105 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
            >
              💬 Line: thawatsak
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
