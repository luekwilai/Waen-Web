import { Loader2 } from "lucide-react"

export default function AdminLoading() {
  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full blur-xl bg-lime-500/20 animate-pulse" />
        <Loader2 className="w-10 h-10 animate-spin text-lime-400 relative z-10" />
      </div>
      <p className="text-sm font-medium text-slate-400 animate-pulse">กำลังโหลดข้อมูล...</p>
    </div>
  )
}
