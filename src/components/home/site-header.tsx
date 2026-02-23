"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Code2, ArrowRight, Menu, X, Sparkles } from "lucide-react"
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
        className={`fixed w-full z-50 top-0 transition-all duration-700 ${
          scrolled
            ? "py-3 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-b border-white/20 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex max-w-7xl mx-auto px-6 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative">
            {/* Logo Glow Behind */}
            <div className="absolute inset-0 bg-lime-400/20 dark:bg-lime-400/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative w-11 h-11 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <div className="absolute inset-0 rounded-xl bg-lime-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative w-11 h-11 bg-gradient-to-tr from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 rounded-xl flex items-center justify-center text-lime-400 dark:text-lime-600 shadow-xl border border-white/10 dark:border-slate-900/10 z-10 overflow-hidden">
                {/* Shine effect inside logo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <Code2 className="w-5 h-5 relative z-10" />
              </div>
            </div>
            <div className="flex flex-col leading-none relative z-10 -ml-1">
              <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white transition-colors duration-300">
                WAEN<span className="text-lime-500 dark:text-lime-400">WEB</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-[0.2em] uppercase mt-0.5">Studio</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/5 dark:bg-white/5 p-1 rounded-full border border-slate-200/50 dark:border-white/5">
            {[
              { name: "บริการ", href: "#services" },
              { name: "ราคา", href: "#packages" },
              { name: "ผลงาน", href: "#portfolio" },
              { name: "ติดต่อ", href: "#contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeSection === item.href.substring(1)
                    ? "text-lime-700 dark:text-lime-300 bg-lime-400/20 dark:bg-lime-400/10 shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            <Link
              href="#contact"
              className="hidden md:inline-flex relative items-center justify-center group"
            >
              {/* Button Shadow & Glow */}
              <div className="absolute inset-0 bg-lime-400/40 dark:bg-lime-400/20 blur-md rounded-full group-hover:bg-lime-400/60 dark:group-hover:bg-lime-400/30 transition-all duration-300 opacity-0 group-hover:opacity-100" />
              
              {/* Inner Button */}
              <span className="relative inline-flex items-center gap-2 bg-lime-400 text-slate-950 text-sm font-bold rounded-full py-2.5 px-6 transition-all duration-300 group-hover:scale-105 border border-lime-500/50">
                ติดต่อเรา
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Mobile hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <ThemeToggle />
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-900 dark:text-white backdrop-blur-md shadow-sm"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] sm:w-[350px] max-w-sm bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-white/10 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/10 dark:bg-lime-400/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          {/* Drawer header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-white/10 relative z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center text-lime-400 dark:text-lime-600 shadow-lg">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-slate-900 dark:text-white text-lg tracking-tight">WAEN<span className="text-lime-500">WEB</span></span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Studio</span>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer links */}
          <nav className="p-5 sm:p-6 space-y-2 relative z-10 overflow-y-auto flex-1">
            {navLinks.map(({ href, label }, i) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900 transition-all text-left group"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-lime-500/50 dark:bg-lime-400/50 group-hover:bg-lime-500 dark:group-hover:bg-lime-400 group-hover:scale-150 transition-all duration-300" />
                  <span className="font-bold text-lg">{label}</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-lime-500" />
              </button>
            ))}
          </nav>

          {/* Drawer Footer / CTA */}
          <div className="p-5 sm:p-6 border-t border-slate-100 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm z-10 shrink-0">
            <Link
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-lime-400 text-slate-950 font-bold rounded-2xl py-4 transition-all hover:scale-[1.02] shadow-xl shadow-lime-500/20 dark:shadow-lime-400/10 border border-lime-500/50"
            >
              ติดต่อเรา
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
