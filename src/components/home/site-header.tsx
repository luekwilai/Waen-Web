"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Code2, ArrowRight, Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { href: "#services", label: "บริการ" },
  { href: "#packages", label: "ราคา" },
  { href: "#portfolio", label: "ผลงาน" },
  { href: "#contact", label: "ติดต่อ" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <header
        className={`fixed w-full z-50 top-0 transition-all duration-500 ${
          scrolled
            ? "border-b border-slate-200 dark:border-white/8 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl shadow-xl shadow-slate-200/20 dark:shadow-black/20"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-20 max-w-7xl mx-auto px-6 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-xl bg-lime-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
              <div className="relative w-10 h-10 bg-gradient-to-tr from-lime-500 to-emerald-500 dark:from-lime-400 dark:to-emerald-400 rounded-xl flex items-center justify-center text-white dark:text-slate-950 shadow-lg">
                <Code2 className="w-5 h-5" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                WAEN<span className="text-lime-600 dark:text-lime-400">WEB</span>
              </span>
              <span className="text-[10px] text-slate-500 tracking-widest uppercase">Web Studio</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full border border-slate-200 dark:border-white/8 bg-slate-100/50 dark:bg-white/[0.04] backdrop-blur-sm">
            {navLinks.map(({ href, label }) => {
              const isActive = activeSection === href.replace("#", "")
              return (
                <button
                  key={href}
                  onClick={() => handleNav(href)}
                  className={`relative text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-slate-950 bg-lime-400 shadow-md shadow-lime-500/30"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5"
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/admin/login"
              className="hidden md:inline-flex items-center gap-2 bg-lime-500 hover:bg-lime-600 dark:bg-lime-400 dark:hover:bg-lime-300 text-white dark:text-slate-950 text-sm font-bold rounded-full py-2.5 px-6 transition-all shadow-lg shadow-lime-500/20 hover:shadow-lime-500/40 hover:-translate-y-px"
            >
              เข้าสู่ระบบ
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-lime-500/50 dark:via-lime-400/50 to-transparent" />
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/20 dark:bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-l border-slate-200 dark:border-white/8 shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-lime-500 to-emerald-500 dark:from-lime-400 dark:to-emerald-400 rounded-lg flex items-center justify-center text-white dark:text-slate-950">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-black text-slate-900 dark:text-white text-sm">WAEN<span className="text-lime-600 dark:text-lime-400">WEB</span></span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer links */}
          <nav className="p-6 space-y-1">
            {navLinks.map(({ href, label }, i) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5 transition-all text-left group"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-lime-500/50 dark:bg-lime-400/50 group-hover:bg-lime-500 dark:group-hover:bg-lime-400 transition-colors" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>

          {/* Drawer CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 dark:border-white/8">
            <Link
              href="/admin/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-lime-500 hover:bg-lime-600 dark:bg-lime-400 dark:hover:bg-lime-300 text-white dark:text-slate-950 font-bold rounded-xl py-3 transition-all"
            >
              เข้าสู่ระบบ
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
