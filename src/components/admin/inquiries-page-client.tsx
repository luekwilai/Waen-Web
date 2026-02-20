"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mail, Phone, Building, Calendar, CheckCircle, Trash2, Eye } from "lucide-react"

export interface AdminInquiry {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  message: string
  status: "NEW" | "READ" | "RESPONDED" | "ARCHIVED"
  createdAt: string
}

const statusLabels: Record<string, { label: string; color: string }> = {
  NEW: { label: "ใหม่", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  READ: { label: "อ่านแล้ว", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  RESPONDED: { label: "ตอบกลับแล้ว", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  ARCHIVED: { label: "เก็บถาวร", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
}

export function InquiriesPageClient({ initialInquiries }: { initialInquiries: AdminInquiry[] }) {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>(initialInquiries)
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries")
      const data = await res.json()
      setInquiries(data.inquiries || [])
    } catch (error) {
      console.error("Failed to fetch inquiries:", error)
    }
  }

  const handleView = async (inquiry: AdminInquiry) => {
    setSelectedInquiry(inquiry)
    setDialogOpen(true)

    if (inquiry.status === "NEW") {
      try {
        await fetch(`/api/inquiries/${inquiry.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "READ" }),
        })
        fetchInquiries()
      } catch (error) {
        console.error("Failed to update status:", error)
      }
    }
  }

  const handleUpdateStatus = async (id: string, status: AdminInquiry["status"]) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      fetchInquiries()
      if (selectedInquiry) {
        setSelectedInquiry({ ...selectedInquiry, status })
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบข้อความนี้?")) return

    try {
      await fetch(`/api/inquiries/${id}`, { method: "DELETE" })
      fetchInquiries()
      if (selectedInquiry?.id === id) {
        setDialogOpen(false)
      }
    } catch (error) {
      console.error("Failed to delete inquiry:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">ข้อความจากลูกค้า</h1>
          <p className="text-slate-400 mt-1 font-medium">จัดการข้อความและการติดต่อจากลูกค้าที่ส่งผ่านหน้าเว็บไซต์</p>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent bg-slate-950/50">
              <TableHead className="text-slate-400 font-medium py-4 pl-6">ชื่อ</TableHead>
              <TableHead className="text-slate-400 font-medium py-4">อีเมล</TableHead>
              <TableHead className="text-slate-400 font-medium py-4">วันที่</TableHead>
              <TableHead className="text-slate-400 font-medium py-4">สถานะ</TableHead>
              <TableHead className="text-slate-400 font-medium py-4 text-right pr-6">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-slate-500 py-12 font-medium">
                  ยังไม่มีข้อความ
                </TableCell>
              </TableRow>
            ) : (
              inquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="font-medium text-white pl-6 py-4">{inquiry.name}</TableCell>
                  <TableCell className="text-slate-400 py-4">{inquiry.email}</TableCell>
                  <TableCell className="text-slate-400 py-4">{formatDate(inquiry.createdAt)}</TableCell>
                  <TableCell className="py-4">
                    <Badge className={`${statusLabels[inquiry.status].color} font-medium px-2.5 py-0.5 rounded-full`}>
                      {statusLabels[inquiry.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-lime-400 hover:bg-lime-400/10 rounded-xl w-9 h-9"
                        onClick={() => handleView(inquiry)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl w-9 h-9"
                        onClick={() => handleDelete(inquiry.id)}
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-slate-900/90 backdrop-blur-2xl border-white/10 text-white max-w-lg rounded-2xl shadow-2xl shadow-black/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">รายละเอียดข้อความ</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-lime-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-lime-500" />
                </div>
                <div>
                  <p className="font-medium text-white">{selectedInquiry.name}</p>
                  <p className="text-sm text-slate-400">{selectedInquiry.email}</p>
                </div>
              </div>

              {selectedInquiry.phone && (
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-4 h-4" />
                  <span>{selectedInquiry.phone}</span>
                </div>
              )}

              {selectedInquiry.company && (
                <div className="flex items-center gap-2 text-slate-400">
                  <Building className="w-4 h-4" />
                  <span>{selectedInquiry.company}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(selectedInquiry.createdAt)}</span>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-400 mb-2">ข้อความ:</p>
                <p className="text-white whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <Badge className={statusLabels[selectedInquiry.status].color}>{statusLabels[selectedInquiry.status].label}</Badge>
                <div className="flex gap-2">
                  {selectedInquiry.status !== "RESPONDED" && (
                    <Button
                      size="sm"
                      className="bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      onClick={() => handleUpdateStatus(selectedInquiry.id, "RESPONDED")}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      ทำเครื่องหมายตอบกลับแล้ว
                    </Button>
                  )}
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(selectedInquiry.id)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    ลบ
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
