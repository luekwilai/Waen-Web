"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  FolderOpen,
  Mail,
  Package,
  LogOut,
  Menu,
} from "lucide-react"

const navItems = [
  { href: "/admin/dashboard", label: "แดชบอร์ด", icon: LayoutDashboard },
  { href: "/admin/projects", label: "ผลงาน", icon: FolderOpen },
  { href: "/admin/packages", label: "แพ็คเกจ", icon: Package },
  { href: "/admin/inquiries", label: "ข้อความ", icon: Mail },
]

function NavLinks() {
  const pathname = usePathname()
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
            pathname === item.href
              ? "bg-lime-500/10 text-lime-400 border border-lime-500/20 shadow-sm"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-100 border border-transparent"
          }`}
        >
          <item.icon className={`w-5 h-5 shrink-0 transition-colors ${pathname === item.href ? "text-lime-400" : "text-slate-500 group-hover:text-slate-300"}`} />
          {item.label}
        </Link>
      ))}
    </>
  )
}

function LogoutButton() {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 transition-colors rounded-xl h-12 px-4 font-medium"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      <LogOut className="w-5 h-5 mr-3" />
      ออกจากระบบ
    </Button>
  )
}

export function AdminSidebar() {
  return (
    <aside className="hidden md:flex w-72 shrink-0 flex-col bg-slate-950 border-r border-white/5 shadow-2xl z-10 relative">
      {/* Subtle Glow */}
      <div className="absolute top-0 right-0 w-[200px] h-[300px] bg-lime-500/5 blur-[80px] pointer-events-none rounded-full" />
      
      <div className="p-8 border-b border-white/5 relative z-10">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-lime-500/20">
            <LayoutDashboard className="w-4 h-4 text-slate-950" />
          </div>
          WAENWEB
        </h1>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-2 ml-11">Admin Panel</p>
      </div>
      <nav className="flex-1 p-6 space-y-2 relative z-10">
        <NavLinks />
      </nav>
      <div className="p-6 border-t border-white/5 relative z-10">
        <LogoutButton />
      </div>
    </aside>
  )
}

export function AdminMobileHeader() {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-lime-500/20">
            <LayoutDashboard className="w-3 h-3 text-slate-950" />
          </div>
          WAENWEB
        </h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-slate-950 border-white/5 p-0 flex flex-col">
            <div className="p-8 border-b border-white/5 relative z-10">
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-lime-500/20">
                  <LayoutDashboard className="w-4 h-4 text-slate-950" />
                </div>
                WAENWEB
              </h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-2 ml-11">Admin Panel</p>
            </div>
            <nav className="flex-1 p-6 space-y-2">
              <NavLinks />
            </nav>
            <div className="p-6 border-t border-white/5">
              <LogoutButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
