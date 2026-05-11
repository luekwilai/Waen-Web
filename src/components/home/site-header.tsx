"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { href: "#portfolio", label: "ผลงาน" },
  { href: "#services", label: "บริการ" },
  { href: "#packages", label: "ราคา" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "ติดต่อ" },
]

// Separate page links (not hash anchors)
const pageLinks = [
  { href: "/blog", label: "บทความ" },
]

export function SiteHeader({ logoUrl, siteName }: { logoUrl?: string; siteName?: string } = {}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      // Hysteresis: scroll down > 50px to compact, scroll up < 30px to expand
      if (!scrolled && y > 50) {
        setScrolled(true)
      } else if (scrolled && y < 30) {
        setScrolled(false)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [scrolled])

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
    <div className="sticky top-0 z-50">
      <header
        className={`transition-[padding] duration-300 ease-out will-change-[padding]
          ${scrolled ? "py-2" : "py-4 sm:py-6"}
        `}
      >
        <div className="mx-auto px-3 sm:px-4 md:px-6 max-w-7xl">
          <div
            className={`relative flex items-center justify-between transition-[background-color,box-shadow] duration-300
              ${scrolled 
                ? "py-2.5 px-4 sm:px-6 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-lg" 
                : "py-3 px-2 sm:px-4 bg-transparent"
              }
            `}
          >
            {/* Subtle shine effect - only when scrolled */}
            {scrolled && (
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            )}

            {/* Logo */}
            <Link href="/" className="relative flex items-center gap-2.5 sm:gap-3 group z-10">
              <BrandLogo
                priority
                iconSize={scrolled ? 36 : 40}
                logoUrl={logoUrl}
                siteName={siteName}
                wrapperClassName="relative flex items-center gap-2.5 sm:gap-3"
                textClassName="hidden sm:flex flex-col leading-none"
                wordmarkClassName={`font-black tracking-tighter text-slate-900 dark:text-white ${scrolled ? "text-lg" : "text-xl"}`}
                subtitle="Studio"
                subtitleClassName="text-slate-500 font-semibold tracking-[0.15em] uppercase text-[10px] mt-0.5"
              />
            </Link>

            {/* Desktop Nav - Clean pill style */}
            <nav className={`hidden lg:flex items-center gap-1 ${scrolled ? "bg-slate-100/70 dark:bg-white/5 p-1 rounded-full" : ""}`}>
              {navLinks.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className={`relative px-4 xl:px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200
                    ${activeSection === item.href.substring(1)
                      ? scrolled
                        ? "text-lime-700 dark:text-lime-300 bg-lime-400/25 dark:bg-lime-400/15"
                        : "text-lime-700 dark:text-lime-300 bg-lime-400/20 dark:bg-lime-400/10"
                      : scrolled
                        ? "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/5"
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
              {pageLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 xl:px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200
                    ${scrolled
                      ? "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/5"
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              
              {/* Desktop CTA - Liquid glass button */}
              <button
                onClick={() => handleNav("#contact")}
                className="hidden lg:flex relative items-center justify-center group"
              >
                <span className={`relative inline-flex items-center gap-1.5 bg-lime-400 text-slate-950 font-bold rounded-full transition-all duration-300 border border-lime-500/30 shadow-lg shadow-lime-500/20 hover:shadow-lime-500/30 hover:scale-105 ${scrolled ? "py-2 px-4 text-sm" : "py-2.5 px-5 text-sm"}`}>
                  ติดต่อเรา
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </button>

              {/* Tablet nav - simplified */}
              <nav className="hidden md:flex lg:hidden items-center gap-1 bg-slate-100/70 dark:bg-white/5 p-1 rounded-full">
                {navLinks.slice(0, 3).map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all
                      ${activeSection === item.href.substring(1)
                        ? "text-lime-700 dark:text-lime-300 bg-lime-400/25 dark:bg-lime-400/15"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNav("#contact")}
                  className="px-3 py-1.5 text-xs font-bold bg-lime-400 text-slate-950 rounded-full hover:scale-105 transition-transform"
                >
                  ติดต่อ
                </button>
              </nav>

              {/* Mobile hamburger - Animated SVG */}
              <div className="flex md:hidden items-center gap-2">
                <ThemeToggle />
                <button
                  className={`relative w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200
                    ${scrolled
                      ? "border-slate-200 dark:border-white/15 bg-white/70 dark:bg-white/10 shadow-sm"
                      : "border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5"
                    }
                    text-slate-900 dark:text-white hover:scale-105 active:scale-90 active:bg-lime-400/20 backdrop-blur-sm`}
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Toggle menu"
                >
                  {/* Animated Hamburger to X SVG */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                    {/* Top line - morphs to X */}
                    <line 
                      x1="4" 
                      y1="6" 
                      x2="20" 
                      y2="6" 
                      className={`transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`}
                      style={{ transformOrigin: "12px 12px" }}
                    />
                    {/* Middle line - disappears */}
                    <line 
                      x1="4" 
                      y1="12" 
                      x2="20" 
                      y2="12" 
                      className={`transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`}
                    />
                    {/* Bottom line - morphs to X */}
                    <line 
                      x1="4" 
                      y1="18" 
                      x2="20" 
                      y2="18" 
                      className={`transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                      style={{ transformOrigin: "12px 12px" }}
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Now inside sticky container */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Menu Panel - Inside header flow */}
        <div className="mx-auto px-3 sm:px-4 pb-4">
          <div
            className={`bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl 
              rounded-2xl sm:rounded-3xl border border-white/50 dark:border-white/10
              shadow-[0_16px_40px_-8px_rgba(0,0,0,0.2)] dark:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.5)]
              overflow-hidden
              transition-all duration-300
              ${mobileOpen ? "translate-y-0 scale-100" : "-translate-y-2 scale-95"}
            `}
          >
            {/* Glass shine effects */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 via-transparent to-white/5 dark:from-white/15 dark:via-transparent dark:to-white/5 pointer-events-none" />
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/70 dark:via-white/40 to-transparent pointer-events-none" />
            
            {/* Decorative gradient blob */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-lime-400/20 dark:bg-lime-400/10 blur-3xl rounded-full pointer-events-none" />
            
            {/* Drawer header */}
            <div className="flex items-center justify-between gap-3 p-5 border-b border-slate-200/60 dark:border-white/10 relative z-10 shrink-0">
              <BrandLogo
                iconSize={36}
                logoUrl={logoUrl}
                siteName={siteName}
                wrapperClassName="flex items-center gap-2.5"
                textClassName="flex flex-col leading-none"
                wordmarkClassName="font-black text-base tracking-tight text-slate-900 dark:text-white"
                subtitle="Studio"
                subtitleClassName="text-[10px] uppercase tracking-[0.2em] text-slate-500"
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-slate-100/80 dark:bg-slate-900/80 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all duration-200 border border-slate-200/50 dark:border-white/10 active:scale-90 group"
              >
                {/* Animated X with rotation */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-90">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            {/* Drawer links */}
            <nav className="p-4 space-y-1 relative z-10">
              {navLinks.map(({ href, label }, i) => (
                <button
                  key={href}
                  onClick={() => handleNav(href)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left group transition-all duration-300
                    ${activeSection === href.substring(1)
                      ? "bg-lime-400/15 dark:bg-lime-400/10 text-lime-700 dark:text-lime-300 border border-lime-400/20 dark:border-lime-400/10"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5 border border-transparent"
                    }
                  `}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === href.substring(1) ? "bg-lime-500 scale-125" : "bg-slate-300 dark:bg-slate-600 group-hover:bg-lime-500 group-hover:scale-110"}`} />
                    <span className="font-semibold text-sm">{label}</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-all duration-300 ${activeSection === href.substring(1) ? "opacity-100 translate-x-0 text-lime-500" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-lime-500"}`} />
                </button>
              ))}
              {pageLinks.map(({ href, label }, i) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left group transition-all duration-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5 border border-transparent"
                  style={{ transitionDelay: `${(navLinks.length + i) * 40}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-lime-500 transition-all duration-300 group-hover:scale-110" />
                    <span className="font-semibold text-sm">{label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-lime-500 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              ))}
            </nav>

            {/* Drawer Footer / CTA */}
            <div className="p-4 border-t border-slate-200/60 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
              <Link
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-lime-400 text-slate-950 font-bold rounded-xl py-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-lime-500/25 dark:shadow-lime-400/15 border border-lime-500/30"
              >
                ติดต่อเรา
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
