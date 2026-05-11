"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

const CATEGORY_COLORS: Record<string, string> = {
  "ราคา & แพ็คเกจ": "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  "คำแนะนำ": "bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300",
  SEO: "bg-lime-100 text-lime-700 dark:bg-lime-400/15 dark:text-lime-300",
  "E-Commerce": "bg-purple-100 text-purple-700 dark:bg-purple-400/15 dark:text-purple-300",
  "Web Design": "bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300",
}

type Props = { posts: BlogPost[] }

export function BlogPostsGrid({ posts }: Props) {
  const categories = ["ทั้งหมด", ...Array.from(new Set(posts.map((p) => p.category)))]
  const [active, setActive] = useState("ทั้งหมด")

  const filtered = active === "ทั้งหมด" ? posts : posts.filter((p) => p.category === active)
  const [featured, ...rest] = filtered

  return (
    <div className="space-y-8">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
              active === cat
                ? "bg-lime-400 text-slate-950 shadow-md shadow-lime-500/20"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-lime-400/50 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured post */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-xl shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/20 md:flex-row"
        >
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
                <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[featured.category] ?? "bg-slate-100 text-slate-600"}`}>
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
                  {new Date(featured.date).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-lime-600 dark:text-lime-400">
                อ่านต่อ
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-lg shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/20"
            >
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
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[post.category] ?? "bg-slate-100 text-slate-600"}`}>
                    {post.category}
                  </span>
                  <h2 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-lime-700 dark:text-white dark:group-hover:text-lime-300">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-6 text-slate-500 line-clamp-2 dark:text-slate-400">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-lime-600 dark:text-lime-400">
                    อ่านต่อ
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-16 text-center text-slate-400 dark:text-slate-500">
          <p className="text-lg font-semibold">ไม่มีบทความในหมวดนี้</p>
          <button onClick={() => setActive("ทั้งหมด")} className="mt-3 text-lime-600 hover:underline dark:text-lime-400 text-sm">
            ดูทั้งหมด
          </button>
        </div>
      )}
    </div>
  )
}
