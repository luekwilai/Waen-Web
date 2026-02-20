"use client"

import { useState, type ChangeEvent, type DragEvent, type FormEvent } from "react"
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
import { Plus, Pencil, Trash2, Eye, Upload, Loader2 } from "lucide-react"

export interface AdminProject {
  id: string
  title: string
  category: string
  description: string | null
  desktopImage: string | null
  mobileImage: string | null
  websiteUrl: string | null
  isActive: boolean
}

type ProjectFormState = {
  title: string
  category: string
  description: string
  desktopImage: string
  mobileImage: string
  websiteUrl: string
  isActive: boolean
}

const initialFormState: ProjectFormState = {
  title: "",
  category: "",
  description: "",
  desktopImage: "",
  mobileImage: "",
  websiteUrl: "",
  isActive: true,
}

type ImageField = "desktopImage" | "mobileImage"

export function ProjectsPageClient({ initialProjects }: { initialProjects: AdminProject[] }) {
  const [projects, setProjects] = useState<AdminProject[]>(initialProjects)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<AdminProject | null>(null)
  const [formData, setFormData] = useState<ProjectFormState>(initialFormState)
  const [uploadingField, setUploadingField] = useState<ImageField | null>(null)
  const [dragOverField, setDragOverField] = useState<ImageField | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects")
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (editingProject) {
        await fetch(`/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      } else {
        await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }

      setDialogOpen(false)
      setEditingProject(null)
      setFormData(initialFormState)
      fetchProjects()
    } catch (error) {
      console.error("Failed to save project:", error)
    }
  }

  const handleEdit = (project: AdminProject) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description || "",
      desktopImage: project.desktopImage || "",
      mobileImage: project.mobileImage || "",
      websiteUrl: project.websiteUrl || "",
      isActive: project.isActive,
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบผลงานนี้?")) return

    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" })
      fetchProjects()
    } catch (error) {
      console.error("Failed to delete project:", error)
    }
  }

  const handleAddNew = () => {
    setEditingProject(null)
    setFormData(initialFormState)
    setUploadError(null)
    setDialogOpen(true)
  }

  const updateImageField = (field: ImageField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (field: ImageField, file: File) => {
    setUploadingField(field)
    setUploadError(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      const data = await res.json()
      updateImageField(field, data.url)
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ กรุณาลองใหม่อีกครั้ง")
    } finally {
      setUploadingField(null)
      setDragOverField(null)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>, field: ImageField) => {
    e.preventDefault()
    setDragOverField(field)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOverField(null)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, field: ImageField) => {
    e.preventDefault()
    setDragOverField(null)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      void handleImageUpload(field, file)
    }
  }

  const handleImageInputChange = (field: ImageField, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      void handleImageUpload(field, file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">ผลงานทั้งหมด</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">จัดการผลงาน Portfolio ที่แสดงบนหน้าเว็บไซต์</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingProject(null)
              setFormData(initialFormState)
            }} className="bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold shadow-lg shadow-lime-500/20 transition-all hover:shadow-lime-500/40 hover:-translate-y-0.5 rounded-xl">
              <Plus className="w-5 h-5 mr-2" />
              เพิ่มผลงานใหม่
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-slate-200 dark:border-white/10 text-slate-900 dark:text-white max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">{editingProject ? "แก้ไขผลงาน" : "เพิ่มผลงานใหม่"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">ชื่อผลงาน</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">หมวดหมู่</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="เช่น E-commerce, Corporate, Blog"
                  required
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">รายละเอียด</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">รูปภาพ Desktop</Label>
                <div
                  onDragOver={(e) => handleDragOver(e, "desktopImage")}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "desktopImage")}
                  className={`rounded-xl border-2 border-dashed p-6 transition-all duration-300 ${
                    dragOverField === "desktopImage"
                      ? "border-lime-500 bg-lime-500/10"
                      : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">ลากรูปมาวาง หรือคลิกเลือกไฟล์ (แนะนำอัตราส่วน 16:9)</div>
                    <label htmlFor="desktop-upload" className="cursor-pointer">
                      <span className="inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors shadow-sm">
                        {uploadingField === "desktopImage" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        เลือกรูป
                      </span>
                    </label>
                    <input
                      id="desktop-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => handleImageInputChange("desktopImage", event)}
                    />
                  </div>
                  {formData.desktopImage && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm">
                      <img
                        src={formData.desktopImage}
                        alt="Desktop preview"
                        className="h-40 w-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <Input
                  value={formData.desktopImage}
                  onChange={(e) => updateImageField("desktopImage", e.target.value)}
                  placeholder="/uploads/projects/... หรือ https://..."
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white mt-2 focus-visible:ring-lime-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">รูปภาพ Mobile</Label>
                <div
                  onDragOver={(e) => handleDragOver(e, "mobileImage")}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "mobileImage")}
                  className={`rounded-xl border-2 border-dashed p-6 transition-all duration-300 ${
                    dragOverField === "mobileImage"
                      ? "border-lime-500 bg-lime-500/10"
                      : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">ลากรูปมาวาง หรือคลิกเลือกไฟล์ (แนะนำอัตราส่วน 9:16)</div>
                    <label htmlFor="mobile-upload" className="cursor-pointer">
                      <span className="inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors shadow-sm">
                        {uploadingField === "mobileImage" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        เลือกรูป
                      </span>
                    </label>
                    <input
                      id="mobile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => handleImageInputChange("mobileImage", event)}
                    />
                  </div>
                  {formData.mobileImage && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm w-32 mx-auto">
                      <img
                        src={formData.mobileImage}
                        alt="Mobile preview"
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <Input
                  value={formData.mobileImage}
                  onChange={(e) => updateImageField("mobileImage", e.target.value)}
                  placeholder="/uploads/projects/... หรือ https://..."
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white mt-2 focus-visible:ring-lime-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">ลิงก์เว็บไซต์</Label>
                <Input
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="https://..."
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                />
              </div>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-white/5">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-lime-500 focus:ring-lime-500"
                />
                <Label htmlFor="isActive" className="cursor-pointer text-slate-700 dark:text-slate-300 font-medium">แสดงผลงานนี้บนหน้าเว็บไซต์</Label>
              </div>
              {uploadError && <p className="text-sm text-rose-500 dark:text-rose-400 font-medium p-3 bg-rose-50 dark:bg-rose-500/10 rounded-lg">{uploadError}</p>}
              <Button
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold h-12 rounded-xl"
                disabled={uploadingField !== null}
              >
                {editingProject ? "บันทึกการเปลี่ยนแปลง" : "สร้างผลงาน"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 dark:border-white/5 hover:bg-transparent bg-slate-50/50 dark:bg-slate-950/50">
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4 pl-6">ชื่อโปรเจค</TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4">หมวดหมู่</TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4">สถานะ</TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4 text-right pr-6">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-slate-500 py-12 font-medium">
                  ยังไม่มีผลงาน
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id} className="border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <TableCell className="font-semibold text-slate-900 dark:text-white pl-6 py-4">{project.title}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 py-4 font-medium">{project.category}</TableCell>
                  <TableCell className="py-4">
                    {project.isActive ? (
                      <Badge className="bg-lime-100 dark:bg-lime-500/10 text-lime-700 dark:text-lime-400 border-lime-200 dark:border-lime-500/20 font-medium px-3 py-1 rounded-full">แสดงผล</Badge>
                    ) : (
                      <Badge className="bg-slate-100 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-500/20 font-medium px-3 py-1 rounded-full">ซ่อน</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.websiteUrl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl w-9 h-9"
                          onClick={() => window.open(project.websiteUrl ?? "", "_blank")}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-500 dark:text-slate-400 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-400/10 rounded-xl w-9 h-9"
                        onClick={() => handleEdit(project)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-400/10 rounded-xl w-9 h-9"
                        onClick={() => handleDelete(project.id)}
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
