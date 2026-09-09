"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { ExternalLink, FolderOpen, LayoutDashboard, LogOut, Mail, Menu, Moon, Package, Settings, Sun, Users } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { BrandLogo } from "@/components/brand-logo"

const navItems = [
  { href: "/admin/dashboard", label: "แดชบอร์ด", icon: LayoutDashboard },
  { href: "/admin/projects", label: "ผลงาน", icon: FolderOpen },
  { href: "/admin/packages", label: "แพ็คเกจ", icon: Package },
  { href: "/admin/inquiries", label: "ข้อความ", icon: Mail },
  { href: "/admin/users", label: "ผู้ดูแลระบบ", icon: Users },
  { href: "/admin/settings", label: "ตั้งค่าเว็บ", icon: Settings },
]

export function AdminThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === "dark"
  return (
    <button type="button" role="switch" aria-checked={isDark} aria-label={isDark ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"} className="admin-theme-switch" onClick={() => setTheme(isDark ? "light" : "dark")}>
      <span className="admin-theme-switch-track"><span className="admin-theme-switch-thumb">{isDark ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}</span></span>
      <span className="admin-theme-switch-label">{isDark ? "มืด" : "สว่าง"}</span>
    </button>
  )
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return <>{navItems.map((item) => {
    const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
    const Icon = item.icon
    return <Link key={item.href} href={item.href} onClick={onNavigate} className={`admin-nav-link${active ? " is-active" : ""}`} aria-current={active ? "page" : undefined}><Icon aria-hidden="true" />{item.label}</Link>
  })}</>
}

function LogoutButton() {
  return <button type="button" className="admin-logout" onClick={() => signOut({ callbackUrl: "/admin/login" })}><LogOut aria-hidden="true" />ออกจากระบบ</button>
}

function Brand() {
  return <div className="admin-brand"><BrandLogo iconSize={30} siteName="WAENWEB" wrapperClassName="flex items-center gap-3" textClassName="admin-brand-wordmark" /><span className="admin-brand-label">CONTROL ROOM</span></div>
}

function SiteLink() {
  return <Link href="/" className="admin-site-link">ดูเว็บไซต์ <ExternalLink aria-hidden="true" /></Link>
}

export function AdminSidebar() {
  return <aside className="admin-sidebar"><div className="admin-sidebar-head"><Brand /><AdminThemeSwitch /></div><nav className="admin-nav" aria-label="เมนูผู้ดูแลระบบ"><NavLinks /></nav><div className="admin-sidebar-foot"><SiteLink /><LogoutButton /></div></aside>
}

export function AdminMobileHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [pathname])
  return <header className="admin-mobile-header"><Brand /><div className="admin-mobile-actions"><AdminThemeSwitch /><Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><button type="button" className="admin-menu-button" aria-label="เปิดเมนูผู้ดูแลระบบ"><Menu aria-hidden="true" /></button></SheetTrigger><SheetContent side="right" className="admin-mobile-sheet"><SheetTitle className="sr-only">เมนูผู้ดูแลระบบ</SheetTitle><div className="admin-sheet-brand"><Brand /></div><nav className="admin-nav" aria-label="เมนูผู้ดูแลระบบ"><NavLinks onNavigate={() => setOpen(false)} /></nav><div className="admin-sidebar-foot"><SiteLink /><LogoutButton /></div></SheetContent></Sheet></div></header>
}
