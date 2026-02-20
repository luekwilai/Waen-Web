import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, Mail, Package, Eye } from "lucide-react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/get-session"
import { getDashboardStats } from "@/lib/queries"

export default async function AdminDashboardPage() {
  const [session, stats] = await Promise.all([
    getSession(),
    getDashboardStats(),
  ])

  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/admin/login")
  }

  const statCards = [
    {
      title: "ผลงานทั้งหมด",
      value: stats.projects,
      icon: FolderOpen,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
    {
      title: "แพ็คเกจ",
      value: stats.packages,
      icon: Package,
      color: "text-green-400",
      bgColor: "bg-green-400/10"
    },
    {
      title: "ข้อความทั้งหมด",
      value: stats.inquiries,
      icon: Mail,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10"
    },
    {
      title: "ข้อความใหม่",
      value: stats.newInquiries,
      icon: Eye,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10"
    }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">แดชบอร์ด</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">ภาพรวมระบบจัดการเว็บไซต์ WAENWEB</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Card key={card.title} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-200 dark:border-white/5 shadow-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors overflow-hidden relative group">
            {/* Hover Glow */}
            <div className={`absolute -inset-20 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 ${card.bgColor.replace('/10', '')}`} />
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{card.title}</p>
                  <p className="text-4xl font-black text-slate-900 dark:text-white">{card.value}</p>
                </div>
                <div className={`w-14 h-14 rounded-2xl ${card.bgColor} flex items-center justify-center border border-slate-200 dark:border-white/5 shadow-inner`}>
                  <card.icon className={`w-7 h-7 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-lime-500/10 dark:bg-lime-500/5 blur-[100px] pointer-events-none rounded-full" />
        
        <CardHeader className="relative z-10 border-b border-slate-200 dark:border-white/5 pb-6">
          <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-lime-500/10 flex items-center justify-center">
              <FolderOpen className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            </div>
            ยินดีต้อนรับสู่ระบบจัดการ
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 relative z-10 text-slate-600 dark:text-slate-300 space-y-6">
          <p className="text-lg font-medium text-slate-800 dark:text-slate-200">
            ระบบออกแบบมาเพื่อให้คุณจัดการเนื้อหาเว็บไซต์ได้อย่างง่ายดาย:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <li className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20 dark:border-white/5">
                <FolderOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">จัดการผลงาน</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">เพิ่ม ลบ หรือแก้ไขผลงานใน Portfolio ของคุณได้ทันที</p>
            </li>
            <li className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 border border-green-500/20 dark:border-white/5">
                <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">จัดการแพ็คเกจ</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">ปรับเปลี่ยนราคาและรายละเอียดแพ็คเกจได้อย่างอิสระ</p>
            </li>
            <li className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20 dark:border-white/5">
                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">ข้อความติดต่อ</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">ตรวจสอบและจัดการข้อความจากลูกค้าที่ติดต่อเข้ามา</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
