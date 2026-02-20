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
    setUploadError(null)

    if (!file.type.startsWith("image/")) {
      setUploadError("รองรับเฉพาะไฟล์รูปภาพเท่านั้น")
      return
    }

    setUploadingField(field)

    try {
      const payload = new FormData()
      payload.append("file", file)

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: payload,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.error || "อัปโหลดรูปไม่สำเร็จ")
      }

      updateImageField(field, result.url)
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "อัปโหลดรูปไม่สำเร็จ")
    } finally {
      setUploadingField(null)
      setDragOverField(null)
    }
  }

  const handleImageInputChange = (field: ImageField, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      void handleImageUpload(field, file)
    }
    event.target.value = ""
  }

  const handleImageDrop = (field: ImageField, event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      void handleImageUpload(field, file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">จัดการผลงาน</h1>
          <p className="text-slate-400">เพิ่ม แก้ไข หรือลบผลงาน Portfolio</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-lime-500 hover:bg-lime-600 text-slate-950" onClick={handleAddNew}>
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มผลงาน
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "แก้ไขผลงาน" : "เพิ่มผลงานใหม่"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>ชื่อโปรเจค</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>หมวดหมู่</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="เช่น E-Commerce, Corporate, etc."
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>รายละเอียด</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>รูป Desktop</Label>
                <div
                  onDragOver={(event) => {
                    event.preventDefault()
                    setDragOverField("desktopImage")
                  }}
                  onDragLeave={() => setDragOverField(null)}
                  onDrop={(event) => handleImageDrop("desktopImage", event)}
                  className={`rounded-md border border-dashed p-4 transition-colors ${
                    dragOverField === "desktopImage"
                      ? "border-lime-400 bg-lime-400/10"
                      : "border-slate-700 bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-slate-300">ลากรูปมาวาง หรือคลิกเลือกไฟล์</div>
                    <label htmlFor="desktop-upload" className="cursor-pointer">
                      <span className="inline-flex items-center gap-2 rounded-md bg-slate-700 px-3 py-2 text-xs font-medium text-white hover:bg-slate-600">
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
                    <img
                      src={formData.desktopImage}
                      alt="Desktop preview"
                      className="mt-3 h-24 w-full rounded-md object-cover"
                    />
                  )}
                </div>
                <Input
                  value={formData.desktopImage}
                  onChange={(e) => updateImageField("desktopImage", e.target.value)}
                  placeholder="/uploads/projects/... หรือ https://..."
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>รูป Mobile</Label>
                <div
                  onDragOver={(event) => {
                    event.preventDefault()
                    setDragOverField("mobileImage")
                  }}
                  onDragLeave={() => setDragOverField(null)}
                  onDrop={(event) => handleImageDrop("mobileImage", event)}
                  className={`rounded-md border border-dashed p-4 transition-colors ${
                    dragOverField === "mobileImage"
                      ? "border-lime-400 bg-lime-400/10"
                      : "border-slate-700 bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-slate-300">ลากรูปมาวาง หรือคลิกเลือกไฟล์</div>
                    <label htmlFor="mobile-upload" className="cursor-pointer">
                      <span className="inline-flex items-center gap-2 rounded-md bg-slate-700 px-3 py-2 text-xs font-medium text-white hover:bg-slate-600">
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
                    <img
                      src={formData.mobileImage}
                      alt="Mobile preview"
                      className="mt-3 h-24 w-full rounded-md object-cover"
                    />
                  )}
                </div>
                <Input
                  value={formData.mobileImage}
                  onChange={(e) => updateImageField("mobileImage", e.target.value)}
                  placeholder="/uploads/projects/... หรือ https://..."
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>ลิงก์เว็บไซต์</Label>
                <Input
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="https://..."
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="isActive" className="cursor-pointer">แสดงผลงานนี้</Label>
              </div>
              {uploadError && <p className="text-sm text-red-400">{uploadError}</p>}
              <Button
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-600 text-slate-950"
                disabled={uploadingField !== null}
              >
                {editingProject ? "บันทึกการเปลี่ยนแปลง" : "สร้างผลงาน"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent bg-slate-950/50">
              <TableHead className="text-slate-400 font-medium py-4 pl-6">ชื่อโปรเจค</TableHead>
              <TableHead className="text-slate-400 font-medium py-4">หมวดหมู่</TableHead>
              <TableHead className="text-slate-400 font-medium py-4">สถานะ</TableHead>
              <TableHead className="text-slate-400 font-medium py-4 text-right pr-6">จัดการ</TableHead>
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
                <TableRow key={project.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="font-medium text-white pl-6 py-4">{project.title}</TableCell>
                  <TableCell className="text-slate-400 py-4">{project.category}</TableCell>
                  <TableCell className="py-4">
                    {project.isActive ? (
                      <Badge className="bg-lime-500/10 text-lime-400 border-lime-500/20 font-medium px-2.5 py-0.5 rounded-full">แสดงผล</Badge>
                    ) : (
                      <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20 font-medium px-2.5 py-0.5 rounded-full">ซ่อน</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.websiteUrl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-white hover:bg-white/10 rounded-xl w-9 h-9"
                          onClick={() => window.open(project.websiteUrl ?? "", "_blank")}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-lime-400 hover:bg-lime-400/10 rounded-xl w-9 h-9"
                        onClick={() => handleEdit(project)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl w-9 h-9"
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
