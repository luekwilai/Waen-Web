"use client"

import { usePathname } from "next/navigation"
import { AdminSidebar, AdminMobileHeader } from "@/components/admin/admin-nav"

const authRoutes = ["/admin/login", "/admin/forgot-password", "/admin/reset-password"]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuth = authRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (isAuth) return <div className="admin-auth-page">{children}</div>

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <AdminMobileHeader />
      <main className="admin-main">
        <div className="admin-topbar"><div><span className="admin-topbar-kicker">WAENWEB / ADMIN</span><span className="admin-topbar-page">{pathname.split("/").filter(Boolean).pop()?.replaceAll("-", " ")}</span></div><span className="admin-topbar-secure">ระบบจัดการเว็บไซต์</span></div>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  )
}
