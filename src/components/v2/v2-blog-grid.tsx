"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

export type V2BlogSummary = Omit<BlogPost, "content">
const PAGE_SIZE = 6

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })
}

export function V2BlogGrid({ posts }: { posts: V2BlogSummary[] }) {
  const categories = useMemo(() => ["ทั้งหมด", ...Array.from(new Set(posts.map((post) => post.category)))], [posts])
  const [category, setCategory] = useState("ทั้งหมด")
  const [page, setPage] = useState(1)
  const filtered = category === "ทั้งหมด" ? posts : posts.filter((post) => post.category === category)
  const [featured, ...rest] = filtered
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE))
  const pagePosts = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function selectCategory(nextCategory: string) {
    setCategory(nextCategory)
    setPage(1)
  }

  return (
    <div>
      <div className="v2-hide-scrollbar mb-8 flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button key={item} type="button" onClick={() => selectCategory(item)} aria-pressed={category === item} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${category === item ? "border-[#9ee800] bg-[#9ee800] text-[#111311]" : "border-black/15 text-black/55 hover:border-black/40 hover:text-black"}`}>
            {item}
          </button>
        ))}
      </div>

      {featured ? (
        <Link href={`/v2/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[28px] border border-black/10 bg-[#111311] text-white lg:grid-cols-2">
          <div className="relative min-h-72 overflow-hidden lg:min-h-[420px]"><Image src={featured.image} alt={featured.title} fill priority className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" /></div>
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12"><div><div className="flex flex-wrap items-center gap-3 text-xs text-white/45"><span className="rounded-full bg-[#9ee800] px-3 py-1 font-black text-[#111311]">บทความแนะนำ</span><span>{featured.category}</span><span>{formatDate(featured.date)}</span></div><h2 className="mt-7 text-3xl font-black leading-tight tracking-[-0.035em] sm:text-4xl">{featured.title}</h2><p className="mt-5 line-clamp-3 text-sm leading-7 text-white/55 sm:text-base">{featured.description}</p></div><div className="mt-9 flex items-center justify-between border-t border-white/10 pt-5 text-sm"><span className="flex items-center gap-2 text-white/45"><Clock className="h-4 w-4" /> {featured.readTime}</span><span className="inline-flex items-center gap-2 font-bold text-[#9ee800]">อ่านบทความ <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span></div></div>
        </Link>
      ) : null}

      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pagePosts.map((post) => (
          <Link key={post.slug} href={`/v2/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-[24px] border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgba(0,0,0,.35)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-black/5"><Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /></div>
            <div className="flex flex-1 flex-col p-6"><div className="flex items-center justify-between gap-3 text-[11px] font-semibold text-black/40"><span className="rounded-full bg-[#9ee800]/20 px-2.5 py-1 text-black/65">{post.category}</span><span>{formatDate(post.date)}</span></div><h2 className="mt-5 text-xl font-black leading-snug tracking-[-0.025em] text-[#111311] group-hover:underline group-hover:decoration-[#9ee800] group-hover:decoration-4 group-hover:underline-offset-4">{post.title}</h2><p className="mt-3 line-clamp-2 text-sm leading-6 text-black/50">{post.description}</p><div className="mt-auto flex items-center justify-between pt-7 text-xs text-black/40"><span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span><ArrowUpRight className="h-4 w-4 text-black" /></div></div>
          </Link>
        ))}
      </div>

      {totalPages > 1 ? (
        <nav className="mt-10 flex items-center justify-center gap-3" aria-label="หน้าบทความ">
          <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} aria-label="หน้าก่อนหน้า" className="grid h-10 w-10 place-items-center rounded-full border border-black/15 disabled:opacity-30"><ArrowLeft className="h-4 w-4" /></button>
          <span className="min-w-20 text-center text-sm font-bold text-black/55">{page} / {totalPages}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages} aria-label="หน้าถัดไป" className="grid h-10 w-10 place-items-center rounded-full border border-black/15 disabled:opacity-30"><ArrowRight className="h-4 w-4" /></button>
        </nav>
      ) : null}

      {filtered.length === 0 ? <p className="py-20 text-center text-black/45">ยังไม่มีบทความในหมวดนี้</p> : null}
    </div>
  )
}
