"use client"

import { useState, useRef } from "react"
import { Save, Globe, PanelsTopLeft, Layers, GitBranch, Search, Upload, Plus, Trash2, GripVertical, CheckCircle2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MediaPicker } from "@/components/admin/media-picker"
import Image from "next/image"

type Settings = Record<string, string>

type ServiceItem = { id: string; title: string; desc: string; icon: string }
type StatItem = { label: string; value: string }
type ProcessStep = { id: string; num: string; title: string; description: string; tags: string[]; duration: string }

const ICON_OPTIONS = ["Smartphone", "Search", "ShoppingCart", "ShieldCheck", "Headphones", "Clock", "Globe", "Code2", "Star", "Zap", "Lock", "BarChart2"]

const tabs = [
  { id: "general", label: "ทั่วไป", icon: Globe },
  { id: "hero", label: "Hero", icon: PanelsTopLeft },
  { id: "services", label: "บริการ", icon: Layers },
  { id: "process", label: "ขั้นตอน", icon: GitBranch },
  { id: "seo", label: "SEO", icon: Search },
]

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl font-medium text-sm border animate-in slide-in-from-bottom-4 fade-in duration-300 ${type === "success" ? "bg-lime-50 dark:bg-lime-400/10 border-lime-200 dark:border-lime-400/30 text-lime-700 dark:text-lime-400" : "bg-red-50 dark:bg-red-400/10 border-red-200 dark:border-red-400/30 text-red-700 dark:text-red-400"}`}>
      {type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
      {message}
    </div>
  )
}

function SaveButton({ saving }: { saving: boolean }) {
  return (
    <Button type="submit" disabled={saving} className="bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold rounded-xl h-11 px-6 shadow-lg shadow-lime-500/20">
      {saving ? <><span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin mr-2" />กำลังบันทึก...</> : <><Save className="w-4 h-4 mr-2" />บันทึก</>}
    </Button>
  )
}

export function SettingsPageClient({ initialSettings }: { initialSettings: Settings }) {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState<Settings>(initialSettings)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const saveSettings = async (patch: Record<string, string>) => {
    setSaving(true)
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      })
      if (!res.ok) throw new Error()
      setSettings((prev) => ({ ...prev, ...patch }))
      showToast("บันทึกสำเร็จ", "success")
    } catch {
      showToast("เกิดข้อผิดพลาด กรุณาลองใหม่", "error")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">ตั้งค่าเว็บไซต์</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">แก้ไขเนื้อหาหน้าเว็บโดยไม่ต้องแตะ code</p>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl w-fit flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === tab.id ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs */}
      {activeTab === "general" && <GeneralTab settings={settings} saving={saving} onSave={saveSettings} />}
      {activeTab === "hero" && <HeroTab settings={settings} saving={saving} onSave={saveSettings} />}
      {activeTab === "services" && <ServicesTab settings={settings} saving={saving} onSave={saveSettings} />}
      {activeTab === "process" && <ProcessTab settings={settings} saving={saving} onSave={saveSettings} />}
      {activeTab === "seo" && <SeoTab settings={settings} saving={saving} onSave={saveSettings} />}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}

/* ─── General Tab ─── */
function GeneralTab({ settings, saving, onSave }: { settings: Settings; saving: boolean; onSave: (p: Record<string, string>) => Promise<void> }) {
  const [logoUrl, setLogoUrl] = useState(settings["site.logoUrl"] ?? "")
  const [email, setEmail] = useState(settings["contact.email"] ?? "")
  const [line, setLine] = useState(settings["contact.line"] ?? "")
  const [facebook, setFacebook] = useState(settings["social.facebook"] ?? "")
  const [instagram, setInstagram] = useState(settings["social.instagram"] ?? "")
  const [youtube, setYoutube] = useState(settings["social.youtube"] ?? "")
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/uploads", { method: "POST", body: fd })
      const data = await res.json()
      if (data.url) setLogoUrl(data.url)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ "site.logoUrl": logoUrl, "contact.email": email, "contact.line": line, "social.facebook": facebook, "social.instagram": instagram, "social.youtube": youtube })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5">
        <CardHeader><CardTitle className="text-lg font-bold text-slate-900 dark:text-white">โลโก้ / ไอคอนเว็บ</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 overflow-hidden shrink-0 shadow-md">
              {logoUrl ? <Image src={logoUrl} alt="Logo preview" fill className="object-contain p-2" unoptimized /> : <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">ไม่มีรูป</div>}
            </div>
            <div className="space-y-3 flex-1">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading} className="rounded-xl border-slate-200 dark:border-white/10">
                  <Upload className="w-4 h-4 mr-2" />{uploading ? "กำลังอัปโหลด..." : "อัปโหลดรูปใหม่"}
                </Button>
                <MediaPicker
                  selectedUrl={logoUrl}
                  onSelect={setLogoUrl}
                  buttonClassName="rounded-xl border-slate-200 dark:border-white/10"
                  title="เลือกรูปโลโก้จากคลัง"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-600 dark:text-slate-400 text-xs">หรือใส่ URL รูปภาพ</Label>
                <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="/waenweb-logo-r1.svg" className="h-10 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-sm" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5">
        <CardHeader><CardTitle className="text-lg font-bold text-slate-900 dark:text-white">ข้อมูลติดต่อ</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700 dark:text-slate-300">อีเมล</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="h-11 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
          </div>
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700 dark:text-slate-300">Line ID</Label>
            <Input value={line} onChange={(e) => setLine(e.target.value)} placeholder="your_line_id" className="h-11 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5">
        <CardHeader><CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Social Media (ถ้ามี)</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[["Facebook URL", facebook, setFacebook], ["Instagram URL", instagram, setInstagram], ["YouTube URL", youtube, setYoutube]].map(([label, val, setter]) => (
            <div key={label as string} className="space-y-2">
              <Label className="font-semibold text-slate-700 dark:text-slate-300">{label as string}</Label>
              <Input value={val as string} onChange={(e) => (setter as React.Dispatch<React.SetStateAction<string>>)(e.target.value)} placeholder="https://..." className="h-11 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end"><SaveButton saving={saving} /></div>
    </form>
  )
}

/* ─── Hero Tab ─── */
function HeroTab({ settings, saving, onSave }: { settings: Settings; saving: boolean; onSave: (p: Record<string, string>) => Promise<void> }) {
  const [badge, setBadge] = useState(settings["hero.badge"] ?? "")
  const [heading, setHeading] = useState(settings["hero.heading"] ?? "")
  const [description, setDescription] = useState(settings["hero.description"] ?? "")
  const [ctaPrimary, setCtaPrimary] = useState(settings["hero.ctaPrimary"] ?? "")
  const [ctaSecondary, setCtaSecondary] = useState(settings["hero.ctaSecondary"] ?? "")
  const [stats, setStats] = useState<StatItem[]>(() => {
    try { return JSON.parse(settings["hero.stats"] ?? "[]") } catch { return [] }
  })
  const [techPills, setTechPills] = useState<string[]>(() => {
    try { return JSON.parse(settings["hero.techPills"] ?? "[]") } catch { return [] }
  })
  const [newTech, setNewTech] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      "hero.badge": badge,
      "hero.heading": heading,
      "hero.description": description,
      "hero.ctaPrimary": ctaPrimary,
      "hero.ctaSecondary": ctaSecondary,
      "hero.stats": JSON.stringify(stats),
      "hero.techPills": JSON.stringify(techPills),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5">
        <CardHeader><CardTitle className="text-lg font-bold text-slate-900 dark:text-white">ข้อความหน้าแรก</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700 dark:text-slate-300">Badge (แถบเล็กด้านบน)</Label>
            <Input value={badge} onChange={(e) => setBadge(e.target.value)} className="h-11 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
          </div>
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700 dark:text-slate-300">หัวข้อรอง (ใต้ WAENWEB)</Label>
            <Input value={heading} onChange={(e) => setHeading(e.target.value)} className="h-11 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
          </div>
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700 dark:text-slate-300">คำอธิบาย</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 resize-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-semibold text-slate-700 dark:text-slate-300">ปุ่มหลัก (CTA)</Label>
              <Input value={ctaPrimary} onChange={(e) => setCtaPrimary(e.target.value)} className="h-11 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold text-slate-700 dark:text-slate-300">ปุ่มรอง</Label>
              <Input value={ctaSecondary} onChange={(e) => setCtaSecondary(e.target.value)} className="h-11 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5">
        <CardHeader><CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Stats Bar (ตัวเลขสถิติ)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <Input value={stat.value} onChange={(e) => setStats(stats.map((s, j) => j === i ? { ...s, value: e.target.value } : s))} placeholder="50+" className="w-28 h-10 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-center font-bold" />
              <Input value={stat.label} onChange={(e) => setStats(stats.map((s, j) => j === i ? { ...s, label: e.target.value } : s))} placeholder="label" className="flex-1 h-10 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
              <button type="button" onClick={() => setStats(stats.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => setStats([...stats, { label: "", value: "" }])} className="rounded-xl border-dashed border-slate-300 dark:border-white/10 text-slate-500 dark:text-slate-400 text-sm h-10">
            <Plus className="w-4 h-4 mr-2" />เพิ่มสถิติ
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5">
        <CardHeader><CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Tech Stack Pills</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {techPills.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-white/10">
                {t}
                <button type="button" onClick={() => setTechPills(techPills.filter((_, j) => j !== i))} className="text-slate-400 hover:text-red-500 transition-colors ml-1"><Trash2 className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={newTech} onChange={(e) => setNewTech(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (newTech.trim()) { setTechPills([...techPills, newTech.trim()]); setNewTech("") } } }} placeholder="พิมพ์แล้วกด Enter" className="h-10 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
            <Button type="button" variant="outline" onClick={() => { if (newTech.trim()) { setTechPills([...techPills, newTech.trim()]); setNewTech("") } }} className="rounded-xl h-10"><Plus className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end"><SaveButton saving={saving} /></div>
    </form>
  )
}

/* ─── Services Tab ─── */
function ServicesTab({ settings, saving, onSave }: { settings: Settings; saving: boolean; onSave: (p: Record<string, string>) => Promise<void> }) {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try { return JSON.parse(settings["services"] ?? "[]") } catch { return [] }
  })

  const addService = () => setServices([...services, { id: Date.now().toString(), title: "", desc: "", icon: "Globe" }])
  const removeService = (id: string) => setServices(services.filter((s) => s.id !== id))
  const updateService = (id: string, field: keyof ServiceItem, value: string) =>
    setServices(services.map((s) => s.id === id ? { ...s, [field]: value } : s))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ services: JSON.stringify(services) })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">จัดการการ์ดบริการที่แสดงในหน้าเว็บ</p>
        <Button type="button" onClick={addService} variant="outline" className="rounded-xl border-lime-400/50 text-lime-600 dark:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-400/10 h-10">
          <Plus className="w-4 h-4 mr-2" />เพิ่มบริการ
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <GripVertical className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                <button type="button" onClick={() => removeService(service.id)} className="text-red-400 hover:text-red-600 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm">ชื่อบริการ</Label>
                <Input value={service.title} onChange={(e) => updateService(service.id, "title", e.target.value)} placeholder="Responsive Design" className="h-10 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm">คำอธิบาย</Label>
                <Textarea value={service.desc} onChange={(e) => updateService(service.id, "desc", e.target.value)} rows={2} placeholder="รายละเอียดบริการ..." className="rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-sm resize-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Icon</Label>
                <select value={service.icon} onChange={(e) => updateService(service.id, "icon", e.target.value)} className="w-full h-10 rounded-xl bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm px-3">
                  {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                </select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {services.length === 0 && (
        <div className="text-center py-16 text-slate-400 dark:text-slate-600 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
          <Layers className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">ยังไม่มีบริการ กดเพิ่มบริการใหม่ได้เลย</p>
        </div>
      )}
      <div className="flex justify-end"><SaveButton saving={saving} /></div>
    </form>
  )
}

/* ─── Process Tab ─── */
function ProcessTab({ settings, saving, onSave }: { settings: Settings; saving: boolean; onSave: (p: Record<string, string>) => Promise<void> }) {
  const [steps, setSteps] = useState<ProcessStep[]>(() => {
    try { return JSON.parse(settings["process"] ?? "[]") } catch { return [] }
  })

  const addStep = () => {
    const num = String(steps.length + 1).padStart(2, "0")
    setSteps([...steps, { id: Date.now().toString(), num, title: "", description: "", tags: [], duration: "" }])
  }
  const removeStep = (id: string) => setSteps(steps.filter((s) => s.id !== id))
  const updateStep = (id: string, field: keyof ProcessStep, value: string | string[]) =>
    setSteps(steps.map((s) => s.id === id ? { ...s, [field]: value } : s))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ process: JSON.stringify(steps) })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">จัดการขั้นตอนการทำงานที่แสดงในหน้าเว็บ</p>
        <Button type="button" onClick={addStep} variant="outline" className="rounded-xl border-lime-400/50 text-lime-600 dark:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-400/10 h-10">
          <Plus className="w-4 h-4 mr-2" />เพิ่มขั้นตอน
        </Button>
      </div>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={step.id} className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-slate-200 dark:text-slate-800">{String(index + 1).padStart(2, "0")}</span>
                <button type="button" onClick={() => removeStep(step.id)} className="text-red-400 hover:text-red-600 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm">ชื่อขั้นตอน</Label>
                  <Input value={step.title} onChange={(e) => updateStep(step.id, "title", e.target.value)} placeholder="พูดคุยและวางแผน" className="h-10 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm">ระยะเวลา</Label>
                  <Input value={step.duration} onChange={(e) => updateStep(step.id, "duration", e.target.value)} placeholder="1–2 วัน" className="h-10 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm">คำอธิบาย</Label>
                <Textarea value={step.description} onChange={(e) => updateStep(step.id, "description", e.target.value)} rows={2} placeholder="รายละเอียด..." className="rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-sm resize-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Tags (คั่นด้วย , )</Label>
                <Input
                  value={step.tags.join(", ")}
                  onChange={(e) => updateStep(step.id, "tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
                  placeholder="Wireframe, Mockup, UI/UX"
                  className="h-10 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-sm"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {steps.length === 0 && (
        <div className="text-center py-16 text-slate-400 dark:text-slate-600 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
          <GitBranch className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">ยังไม่มีขั้นตอน กดเพิ่มขั้นตอนใหม่ได้เลย</p>
        </div>
      )}
      <div className="flex justify-end"><SaveButton saving={saving} /></div>
    </form>
  )
}

/* ─── SEO Tab ─── */
function SeoTab({ settings, saving, onSave }: { settings: Settings; saving: boolean; onSave: (p: Record<string, string>) => Promise<void> }) {
  const [title, setTitle] = useState(settings["seo.title"] ?? "")
  const [description, setDescription] = useState(settings["seo.description"] ?? "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ "seo.title": title, "seo.description": description })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5">
        <CardHeader><CardTitle className="text-lg font-bold text-slate-900 dark:text-white">SEO / Metadata</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700 dark:text-slate-300">Page Title (แท็บเบราว์เซอร์)</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="WAENWEB - รับทำเว็บไซต์มืออาชีพ" className="h-11 rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
            <p className="text-xs text-slate-400">{title.length}/60 ตัวอักษร (แนะนำไม่เกิน 60)</p>
          </div>
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700 dark:text-slate-300">Meta Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="รับพัฒนาเว็บไซต์ WordPress คุณภาพสูง..." className="rounded-xl bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 resize-none" />
            <p className="text-xs text-slate-400">{description.length}/160 ตัวอักษร (แนะนำไม่เกิน 160)</p>
          </div>

          {/* Preview */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">ตัวอย่างผลใน Google</p>
            <div className="space-y-1">
              <p className="text-blue-600 dark:text-blue-400 text-base font-medium truncate">{title || "ชื่อหน้าเว็บ"}</p>
              <p className="text-green-700 dark:text-green-500 text-xs">https://waenweb.com</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">{description || "คำอธิบายเว็บไซต์จะแสดงที่นี่..."}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end"><SaveButton saving={saving} /></div>
    </form>
  )
}
