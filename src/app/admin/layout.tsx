import { AdminSidebar, AdminMobileHeader } from "@/components/admin/admin-nav"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-500">
      <AdminSidebar />
      <AdminMobileHeader />
      <main className="flex-1 mt-16 md:mt-0 overflow-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
