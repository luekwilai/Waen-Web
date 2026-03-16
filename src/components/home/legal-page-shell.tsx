import type { ReactNode } from "react"
import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import { ArrowLeft, Mail, MessageSquare } from "lucide-react"
import { SiteFooter } from "@/components/home/site-footer"

type LegalPageShellProps = {
  eyebrow: string
  title: string
  summary: string
  lastUpdated: string
  children: ReactNode
}

export function LegalPageShell({
  eyebrow,
  title,
  summary,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="relative z-10">
        <header className="border-b border-slate-200/70 bg-white/70 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <BrandLogo
                iconSize={44}
                wrapperClassName="flex items-center gap-3"
                textClassName="flex flex-col leading-none"
                wordmarkClassName="text-xl font-black tracking-tight text-slate-900 dark:text-white"
                subtitle="Legal & Compliance"
                subtitleClassName="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500"
              />
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900 dark:hover:bg-white/10">
                <ArrowLeft className="h-4 w-4" />
                กลับหน้าแรก
              </Link>
              <Link href="/privacy-policy" className="transition-colors hover:text-lime-600 dark:hover:text-lime-400">
                นโยบายความเป็นส่วนตัว
              </Link>
              <Link href="/terms-of-use" className="transition-colors hover:text-lime-600 dark:hover:text-lime-400">
                เงื่อนไขการใช้งาน
              </Link>
              <Link href="/#contact" className="transition-colors hover:text-lime-600 dark:hover:text-lime-400">
                ติดต่อเรา
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 pb-20 pt-14 sm:px-6 md:pt-20">
          <section className="rounded-[2rem] border border-slate-200/70 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/75 dark:shadow-black/20 md:p-12">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-lime-600 dark:text-lime-400">
                {eyebrow}
              </p>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
                {title}
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400 md:text-lg">
                {summary}
              </p>
              <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-500">
                อัปเดตล่าสุด: {lastUpdated}
              </p>
            </div>
          </section>

          <article className="mt-8 rounded-[2rem] border border-slate-200/70 bg-white/70 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 dark:shadow-black/20 md:p-12">
            <div className="space-y-10">{children}</div>
          </article>

          <section className="mt-8 rounded-[2rem] border border-lime-400/30 bg-lime-50/80 p-8 backdrop-blur-2xl dark:border-lime-400/20 dark:bg-lime-400/10 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime-700 dark:text-lime-400">
                  Contact for privacy requests
                </p>
                <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                  หากต้องการใช้สิทธิด้านข้อมูลส่วนบุคคลหรือสอบถามเพิ่มเติม ติดต่อเราได้โดยตรง
                </h2>
              </div>
              <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <a href="mailto:thawatsak28@gmail.com" className="flex items-center gap-3 transition-colors hover:text-lime-600 dark:hover:text-lime-400">
                  <Mail className="h-4 w-4" />
                  thawatsak28@gmail.com
                </a>
                <a href="https://line.me/ti/p/~thawatsak" target="_blank" rel="noreferrer" className="flex items-center gap-3 transition-colors hover:text-lime-600 dark:hover:text-lime-400">
                  <MessageSquare className="h-4 w-4" />
                  Line ID: thawatsak
                </a>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}
