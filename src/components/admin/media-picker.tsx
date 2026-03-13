"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, ImageIcon, Loader2, RefreshCw, Search } from "lucide-react"

type MediaItem = {
  url: string
  pathname: string
  uploadedAt: string | null
  source: "blob" | "db"
}

type MediaPickerProps = {
  buttonLabel?: string
  buttonClassName?: string
  onSelect: (url: string) => void
  selectedUrl?: string
  title?: string
}

export function MediaPicker({
  buttonLabel = "เลือกรูปจากคลัง",
  buttonClassName,
  onSelect,
  selectedUrl,
  title = "คลังรูปภาพ",
}: MediaPickerProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<MediaItem[]>([])
  const [query, setQuery] = useState("")

  const fetchItems = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/uploads", { method: "GET" })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setItems(data.items || [])
    } catch {
      setError("โหลดคลังรูปไม่สำเร็จ กรุณาลองใหม่")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      void fetchItems()
    }
  }, [open])

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return items
    return items.filter((item) => {
      return item.pathname.toLowerCase().includes(normalizedQuery) || item.url.toLowerCase().includes(normalizedQuery)
    })
  }, [items, query])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className={buttonClassName}>
          <ImageIcon className="w-4 h-4 mr-2" />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            เลือกรูปที่เคยอัปโหลดไว้แล้วเพื่อนำกลับมาใช้ซ้ำ
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาจากชื่อไฟล์หรือ URL"
              className="pl-9 h-10 rounded-xl bg-white/70 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800"
            />
          </div>
          <Button type="button" variant="outline" onClick={() => void fetchItems()} disabled={loading} className="rounded-xl border-slate-200 dark:border-white/10">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            รีเฟรช
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          {loading ? (
            <div className="h-64 flex items-center justify-center text-slate-500 dark:text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />กำลังโหลดคลังรูป...
            </div>
          ) : error ? (
            <div className="h-64 flex items-center justify-center text-rose-500 dark:text-rose-400 font-medium">{error}</div>
          ) : filteredItems.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-slate-500 dark:text-slate-400">ยังไม่มีรูปในคลัง</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-1">
              {filteredItems.map((item) => {
                const isSelected = selectedUrl === item.url
                return (
                  <button
                    key={item.url}
                    type="button"
                    onClick={() => {
                      onSelect(item.url)
                      setOpen(false)
                    }}
                    className={`text-left group rounded-2xl overflow-hidden border transition-all ${isSelected ? "border-lime-500 ring-2 ring-lime-500/30" : "border-slate-200 dark:border-white/10 hover:border-lime-400/60"}`}
                  >
                    <div className="relative aspect-square bg-slate-100 dark:bg-slate-950 overflow-hidden">
                      <Image src={item.url} alt={item.pathname} fill className="object-cover" unoptimized />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                      {isSelected ? (
                        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center shadow-lg">
                          <Check className="w-4 h-4" />
                        </div>
                      ) : null}
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">{item.pathname.split("/").pop() || item.pathname}</div>
                      <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 truncate">{item.source === "blob" ? "Vercel Blob" : "Referenced"}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
