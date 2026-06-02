import Link from "next/link"
import { ScrollReveal } from "@/components/home/scroll-reveal"
import { ArrowRight, Clock } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

export function LatestArticlesSection({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length === 0) return null
  const latest = posts.slice(0, 3)

  return (
    <section className="py-20 md:py-28 border-t border-slate-200 dark:border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16 text-center sm:text-left">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
              บทความ &amp; คู่มือ
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
              บทความ<span className="text-lime-500 dark:text-lime-400">ล่าสุด</span>
            </h2>
            <p className="mt-3 text-base md:text-lg text-slate-500 dark:text-slate-400 font-light max-w-lg">
              ความรู้เรื่องเว็บไซต์ WordPress SEO และธุรกิจออนไลน์ อ่านแล้วใช้ได้จริง
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 shrink-0 rounded-full border border-slate-300 dark:border-white/15 bg-white/60 dark:bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-lime-400/50 hover:-translate-y-0.5 transition-all backdrop-blur-sm"
          >
            ดูบทความทั้งหมด
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {latest.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 80}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-slate-900/50 hover:-translate-y-1.5 hover:border-lime-400/50 dark:hover:border-lime-400/30 hover:shadow-2xl hover:shadow-lime-500/10 dark:hover:shadow-lime-400/5 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-lime-400 px-3 py-1 text-[11px] font-bold text-slate-950 shadow">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-lime-700 dark:group-hover:text-lime-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-lime-600 dark:text-lime-400">
                      อ่านต่อ
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile view-all */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/15 bg-white/60 dark:bg-white/[0.03] px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-lime-400/50 transition-all"
          >
            ดูบทความทั้งหมด
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
