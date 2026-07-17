"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"

const navItems = [
  { href: "/v2#services", label: "บริการ" },
  { href: "/v2#portfolio", label: "ผลงาน" },
  { href: "/v2#packages", label: "แพ็กเกจ" },
  { href: "/v2/blog", label: "บทความ" },
  { href: "/v2#about", label: "เกี่ยวกับเรา" },
]

type Props = {
  active?: "blog" | ""
  logoUrl?: string
  siteName?: string
}

export function V2Header({ active = "", logoUrl, siteName = "WAENWEB" }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f5f4ef]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/v2" className="group inline-flex items-center gap-2" aria-label={`${siteName} V2`}>
          {logoUrl ? <Image src={logoUrl} alt="" width={30} height={30} className="h-7 w-7 rounded-lg object-contain" priority /> : null}
          <span className="text-xl font-black tracking-[-0.06em] text-[#111311] sm:text-2xl">{siteName}</span>
          <span className="rounded-full border border-black/15 px-2 py-0.5 font-mono text-[9px] font-semibold tracking-[0.18em] text-black/45 transition-colors group-hover:border-[#9ee800] group-hover:text-black">V2</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="เมนูหลัก">
          {navItems.map((item) => {
            const selected = active === "blog" && item.href === "/v2/blog"
            return (
              <Link key={item.href} href={item.href} aria-current={selected ? "page" : undefined} className={`relative py-2 text-sm font-semibold transition-colors hover:text-black ${selected ? "text-black" : "text-black/55"}`}>
                {item.label}
                {selected ? <span className="absolute inset-x-0 -bottom-[23px] h-0.5 bg-[#9ee800]" /> : null}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/v2#contact" className="hidden items-center gap-2 rounded-full bg-[#9ee800] px-5 py-3 text-sm font-black text-[#111311] shadow-[0_10px_30px_-14px_rgba(158,232,0,.8)] transition-all hover:-translate-y-0.5 hover:bg-[#b5f52c] sm:inline-flex">
            เริ่มโปรเจกต์กับเรา <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button type="button" aria-label={open ? "ปิดเมนู" : "เปิดเมนู"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-full border border-black/15 text-black lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-black/10 bg-[#f5f4ef] px-5 py-5 lg:hidden">
          <nav className="mx-auto grid max-w-[1440px] gap-1" aria-label="เมนูมือถือ">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={active === "blog" && item.href === "/v2/blog" ? "page" : undefined} className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold text-black/70 hover:bg-black/5 hover:text-black">
                {item.label}<ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
            <Link href="/v2#contact" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#9ee800] px-4 py-3 font-black text-[#111311]">เริ่มโปรเจกต์กับเรา <ArrowUpRight className="h-4 w-4" /></Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
