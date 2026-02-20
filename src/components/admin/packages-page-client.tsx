"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Star } from "lucide-react"

export interface AdminPackage {
  id: string
  name: string
  nameEn: string | null
  price: number
  description: string | null
  duration: string | null
  isPopular: boolean
  isActive: boolean
  features: string[]
}

type PackageFormState = {
  name: string
  nameEn: string
  price: string
  description: string
  duration: string
  isPopular: boolean
  isActive: boolean
  features: string
}

const initialFormState: PackageFormState = {
  name: "",
  nameEn: "",
  price: "",
  description: "",
  duration: "",
  isPopular: false,
  isActive: true,
  features: "",
}

export function PackagesPageClient({ initialPackages }: { initialPackages: AdminPackage[] }) {
  const [packages, setPackages] = useState<AdminPackage[]>(initialPackages)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState<AdminPackage | null>(null)
  const [formData, setFormData] = useState<PackageFormState>(initialFormState)

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages")
      const data = await res.json()
      setPackages(data.packages || [])
    } catch (error) {
      console.error("Failed to fetch packages:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = {
      ...formData,
      price: Number.parseInt(formData.price, 10),
      features: formData.features.split("\n").filter((f) => f.trim()),
    }

    try {
      if (editingPackage) {
        await fetch(`/api/packages/${editingPackage.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        await fetch("/api/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      setDialogOpen(false)
      setEditingPackage(null)
      setFormData(initialFormState)
      fetchPackages()
    } catch (error) {
      console.error("Failed to save package:", error)
    }
  }

  const handleEdit = (pkg: AdminPackage) => {
    setEditingPackage(pkg)
    setFormData({
      name: pkg.name,
      nameEn: pkg.nameEn || "",
      price: pkg.price.toString(),
      description: pkg.description || "",
      duration: pkg.duration || "",
      isPopular: pkg.isPopular,
      isActive: pkg.isActive,
      features: Array.isArray(pkg.features) ? pkg.features.join("\n") : "",
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบแพ็คเกจนี้?")) return

    try {
      await fetch(`/api/packages/${id}`, { method: "DELETE" })
      fetchPackages()
    } catch (error) {
      console.error("Failed to delete package:", error)
    }
  }

  const handleAddNew = () => {
    setEditingPackage(null)
    setFormData(initialFormState)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">แพ็คเกจทั้งหมด</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">จัดการแพ็คเกจราคาและรายละเอียดบริการ</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingPackage(null)
              setFormData(initialFormState)
            }} className="bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold shadow-lg shadow-lime-500/20 transition-all hover:shadow-lime-500/40 hover:-translate-y-0.5 rounded-xl">
              <Plus className="w-5 h-5 mr-2" />
              เพิ่มแพ็คเกจ
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-slate-200 dark:border-white/10 text-slate-900 dark:text-white max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">{editingPackage ? "แก้ไขแพ็คเกจ" : "เพิ่มแพ็คเกจใหม่"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">ชื่อแพ็คเกจ</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300">ราคา (บาท)</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300">ระยะเวลา</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="เช่น 7-14 วัน"
                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">รายละเอียด</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">ฟีเจอร์ (แต่ละบรรทัด)</Label>
                <Textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="ฟีเจอร์ 1&#10;ฟีเจอร์ 2&#10;ฟีเจอร์ 3"
                  rows={4}
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                />
              </div>
              <div className="flex gap-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                  />
                  <Label htmlFor="isPopular" className="cursor-pointer text-slate-700 dark:text-slate-300 font-medium">แนะนำ (Popular)</Label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-lime-500 focus:ring-lime-500"
                  />
                  <Label htmlFor="isActive" className="cursor-pointer text-slate-700 dark:text-slate-300 font-medium">แสดงแพ็คเกจ</Label>
                </div>
              </div>
              <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold h-12 rounded-xl">
                {editingPackage ? "บันทึกการเปลี่ยนแปลง" : "สร้างแพ็คเกจ"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 dark:border-white/5 hover:bg-transparent bg-slate-50/50 dark:bg-slate-950/50">
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4 pl-6">ชื่อแพ็คเกจ</TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4">ราคา</TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4">ระยะเวลา</TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4">สถานะ</TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4 text-right pr-6">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-slate-500 py-12 font-medium">
                  ยังไม่มีแพ็คเกจ
                </TableCell>
              </TableRow>
            ) : (
              packages.map((pkg) => (
                <TableRow key={pkg.id} className="border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white">{pkg.name}</span>
                      {pkg.isPopular && <Star className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)] dark:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 py-4 font-medium">{pkg.price.toLocaleString()} บาท</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 py-4 font-medium">{pkg.duration}</TableCell>
                  <TableCell className="py-4">
                    {pkg.isActive ? (
                      <Badge className="bg-lime-100 dark:bg-lime-500/10 text-lime-700 dark:text-lime-400 border-lime-200 dark:border-lime-500/20 font-medium px-3 py-1 rounded-full">แสดงผล</Badge>
                    ) : (
                      <Badge className="bg-slate-100 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-500/20 font-medium px-3 py-1 rounded-full">ซ่อน</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-500 dark:text-slate-400 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-400/10 rounded-xl w-9 h-9"
                        onClick={() => handleEdit(pkg)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-400/10 rounded-xl w-9 h-9"
                        onClick={() => handleDelete(pkg.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
