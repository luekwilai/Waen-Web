"use client"

import { useState, type FormEvent } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { KeyRound, Loader2, Pencil, Plus, Shield, ShieldCheck, Trash2, UserCog } from "lucide-react"

export interface AdminUserItem {
  id: string
  email: string
  name: string | null
  role: string
  twoFactorEnabled: boolean
  createdAt: string
  updatedAt: string
}

type UserFormState = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const initialFormState: UserFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export function UsersPageClient({
  initialUsers,
  currentUserId,
}: {
  initialUsers: AdminUserItem[]
  currentUserId: string
}) {
  const [users, setUsers] = useState(initialUsers)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUserItem | null>(null)
  const [formData, setFormData] = useState<UserFormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [twoFactorDialogOpen, setTwoFactorDialogOpen] = useState(false)
  const [twoFactorLoading, setTwoFactorLoading] = useState(false)
  const [twoFactorSecret, setTwoFactorSecret] = useState("")
  const [twoFactorOtpAuthUrl, setTwoFactorOtpAuthUrl] = useState("")
  const [twoFactorToken, setTwoFactorToken] = useState("")

  const currentUser = users.find((user) => user.id === currentUserId) ?? null

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users")
      const data = await res.json()
      setUsers(data.users || [])
    } catch (fetchError) {
      console.error("Failed to fetch users:", fetchError)
    }
  }

  const resetForm = () => {
    setFormData(initialFormState)
    setEditingUser(null)
    setError(null)
  }

  const handleAddNew = () => {
    resetForm()
    setSuccess(null)
    setDialogOpen(true)
  }

  const handleEdit = (user: AdminUserItem) => {
    setEditingUser(user)
    setFormData({
      name: user.name || "",
      email: user.email,
      password: "",
      confirmPassword: "",
    })
    setError(null)
    setSuccess(null)
    setDialogOpen(true)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    const trimmedEmail = formData.email.trim().toLowerCase()
    const trimmedPassword = formData.password.trim()

    if (!trimmedEmail) {
      setError("กรุณากรอกอีเมล")
      return
    }

    if (!editingUser && trimmedPassword.length < 8) {
      setError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร")
      return
    }

    if (trimmedPassword && trimmedPassword.length < 8) {
      setError("รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร")
      return
    }

    if (trimmedPassword !== formData.confirmPassword.trim()) {
      setError("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน")
      return
    }

    const payload: {
      name: string | null
      email: string
      password?: string
    } = {
      name: formData.name.trim() || null,
      email: trimmedEmail,
    }

    if (trimmedPassword) {
      payload.password = trimmedPassword
    }

    setIsSubmitting(true)

    try {
      const res = await fetch(editingUser ? `/api/users/${editingUser.id}` : "/api/users", {
        method: editingUser ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "ไม่สามารถบันทึกข้อมูลผู้ใช้ได้")
      }

      setDialogOpen(false)
      resetForm()
      await fetchUsers()
      setSuccess(editingUser ? "อัปเดตข้อมูลผู้ใช้เรียบร้อยแล้ว" : "สร้างผู้ใช้ใหม่เรียบร้อยแล้ว")
    } catch (submitError) {
      console.error("Failed to save user:", submitError)
      setError(submitError instanceof Error ? submitError.message : "เกิดข้อผิดพลาดในการบันทึกข้อมูล")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (user: AdminUserItem) => {
    if (!confirm(`คุณแน่ใจหรือไม่ที่จะลบผู้ใช้ ${user.email} ?`)) {
      return
    }

    setError(null)
    setSuccess(null)

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "ไม่สามารถลบผู้ใช้ได้")
      }

      await fetchUsers()
      setSuccess("ลบผู้ใช้เรียบร้อยแล้ว")
    } catch (deleteError) {
      console.error("Failed to delete user:", deleteError)
      setError(deleteError instanceof Error ? deleteError.message : "เกิดข้อผิดพลาดในการลบผู้ใช้")
    }
  }

  const handleStartTwoFactorSetup = async () => {
    setTwoFactorLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch("/api/users/me/2fa", { method: "POST" })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "ไม่สามารถเริ่มต้นการตั้งค่า 2FA ได้")
      }

      setTwoFactorSecret(data.secret)
      setTwoFactorOtpAuthUrl(data.otpauthUrl)
      setTwoFactorToken("")
      setTwoFactorDialogOpen(true)
    } catch (twoFactorError) {
      console.error("Failed to setup 2FA:", twoFactorError)
      setError(twoFactorError instanceof Error ? twoFactorError.message : "เกิดข้อผิดพลาดในการตั้งค่า 2FA")
    } finally {
      setTwoFactorLoading(false)
    }
  }

  const handleVerifyTwoFactor = async () => {
    setTwoFactorLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch("/api/users/me/2fa", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: twoFactorToken }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "ไม่สามารถยืนยัน 2FA ได้")
      }

      setTwoFactorDialogOpen(false)
      setTwoFactorSecret("")
      setTwoFactorOtpAuthUrl("")
      setTwoFactorToken("")
      await fetchUsers()
      setSuccess("เปิดใช้งาน 2FA ด้วย Google Authenticator เรียบร้อยแล้ว")
    } catch (twoFactorError) {
      console.error("Failed to verify 2FA:", twoFactorError)
      setError(twoFactorError instanceof Error ? twoFactorError.message : "เกิดข้อผิดพลาดในการยืนยัน 2FA")
    } finally {
      setTwoFactorLoading(false)
    }
  }

  const handleDisableTwoFactor = async () => {
    if (!confirm("ต้องการปิดการใช้งาน 2FA สำหรับบัญชีนี้ใช่หรือไม่?")) {
      return
    }

    setTwoFactorLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch("/api/users/me/2fa", { method: "DELETE" })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "ไม่สามารถปิด 2FA ได้")
      }

      await fetchUsers()
      setSuccess("ปิดการใช้งาน 2FA เรียบร้อยแล้ว")
    } catch (twoFactorError) {
      console.error("Failed to disable 2FA:", twoFactorError)
      setError(twoFactorError instanceof Error ? twoFactorError.message : "เกิดข้อผิดพลาดในการปิด 2FA")
    } finally {
      setTwoFactorLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">จัดการผู้ดูแลระบบ</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">เพิ่ม แก้ไขอีเมล ชื่อ และรีเซ็ตรหัสผ่านของผู้ใช้ที่เข้าหลังบ้าน</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddNew}
              className="bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold shadow-lg shadow-lime-500/20 transition-all hover:shadow-lime-500/40 hover:-translate-y-0.5 rounded-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              เพิ่มผู้ใช้ใหม่
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-slate-200 dark:border-white/10 text-slate-900 dark:text-white max-w-xl rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                {editingUser ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้ใหม่"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">ชื่อ</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="ชื่อที่ใช้แสดงผล"
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">อีเมล</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300">
                    {editingUser ? "รหัสผ่านใหม่" : "รหัสผ่าน"}
                  </Label>
                  <PasswordInput
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder={editingUser ? "เว้นว่างหากไม่เปลี่ยน" : "อย่างน้อย 8 ตัวอักษร"}
                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300">ยืนยันรหัสผ่าน</Label>
                  <PasswordInput
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="กรอกรหัสผ่านอีกครั้ง"
                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                  />
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 p-4 text-sm text-slate-500 dark:text-slate-400">
                ผู้ใช้ใหม่ทุกคนจะได้รับสิทธิ์เป็น <span className="font-semibold text-slate-900 dark:text-white">ADMIN</span>
              </div>
              {error ? (
                <p className="text-sm text-rose-500 dark:text-rose-400 font-medium p-3 bg-rose-50 dark:bg-rose-500/10 rounded-lg">{error}</p>
              ) : null}
              <Button
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold h-12 rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : editingUser ? "บันทึกการเปลี่ยนแปลง" : "สร้างผู้ใช้"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">ผู้ดูแลทั้งหมด</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{users.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-lime-500/10 text-lime-600 dark:text-lime-400 flex items-center justify-center">
              <UserCog className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">บัญชีของคุณ</p>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-2 break-all">
                {users.find((user) => user.id === currentUserId)?.email ?? "-"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">ความปลอดภัย</p>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-2">
                {currentUser?.twoFactorEnabled ? "เปิดใช้ 2FA แล้ว" : "ยังไม่ได้เปิดใช้ 2FA"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg"
                  onClick={handleStartTwoFactorSetup}
                  disabled={twoFactorLoading}
                >
                  {twoFactorLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                  {currentUser?.twoFactorEnabled ? "ตั้งค่าใหม่" : "เปิดใช้ 2FA"}
                </Button>
                {currentUser?.twoFactorEnabled ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-lg"
                    onClick={handleDisableTwoFactor}
                    disabled={twoFactorLoading}
                  >
                    ปิด 2FA
                  </Button>
                ) : null}
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <KeyRound className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {success ? (
        <div className="rounded-xl border border-lime-200 dark:border-lime-500/20 bg-lime-50 dark:bg-lime-500/10 px-4 py-3 text-sm font-medium text-lime-700 dark:text-lime-300">
          {success}
        </div>
      ) : null}
      {error && !dialogOpen ? (
        <div className="rounded-xl border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-700 dark:text-rose-300">
          {error}
        </div>
      ) : null}

      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 dark:border-white/5 hover:bg-transparent bg-slate-50/50 dark:bg-slate-950/50">
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4 pl-6">ชื่อ</TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4">อีเมล</TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4">สิทธิ์</TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4">สร้างเมื่อ</TableHead>
              <TableHead className="text-slate-500 dark:text-slate-400 font-semibold py-4 text-right pr-6">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-slate-500 py-12 font-medium">
                  ยังไม่มีผู้ใช้ในระบบ
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => {
                const isCurrentUser = user.id === currentUserId

                return (
                  <TableRow key={user.id} className="border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                    <TableCell className="font-semibold text-slate-900 dark:text-white pl-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{user.name || "-"}</span>
                        {isCurrentUser ? (
                          <Badge className="bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/20 font-medium px-3 py-1 rounded-full">
                            คุณ
                          </Badge>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400 py-4 font-medium">{user.email}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-lime-100 dark:bg-lime-500/10 text-lime-700 dark:text-lime-400 border-lime-200 dark:border-lime-500/20 font-medium px-3 py-1 rounded-full">
                          {user.role}
                        </Badge>
                        <Badge className={user.twoFactorEnabled ? "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/20 font-medium px-3 py-1 rounded-full" : "bg-slate-100 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-500/20 font-medium px-3 py-1 rounded-full"}>
                          {user.twoFactorEnabled ? "2FA เปิด" : "2FA ปิด"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400 py-4 font-medium">
                      {new Date(user.createdAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right pr-6 py-4">
                      <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-500 dark:text-slate-400 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-400/10 rounded-xl w-9 h-9"
                          onClick={() => handleEdit(user)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isCurrentUser}
                          className="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-400/10 rounded-xl w-9 h-9 disabled:opacity-40"
                          onClick={() => handleDelete(user)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={twoFactorDialogOpen} onOpenChange={setTwoFactorDialogOpen}>
        <DialogContent className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-slate-200 dark:border-white/10 text-slate-900 dark:text-white max-w-xl rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">ตั้งค่า 2FA ด้วย Google Authenticator</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 mt-4">
            <div className="grid gap-6 md:grid-cols-[220px_1fr] items-start">
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 p-3 mx-auto">
                {twoFactorOtpAuthUrl ? (
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(twoFactorOtpAuthUrl)}`}
                    alt="2FA QR Code"
                    className="w-[220px] h-[220px] rounded-xl"
                  />
                ) : null}
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">1. สแกน QR ด้วย Google Authenticator</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">หากสแกนไม่ได้ ให้ใช้ secret key ด้านล่างแทน</p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
                  <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Secret Key</p>
                  <p className="mt-2 font-mono text-sm text-slate-900 dark:text-white break-all">{twoFactorSecret}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twoFactorToken" className="text-slate-700 dark:text-slate-300">2. กรอกรหัส 6 หลักเพื่อยืนยัน</Label>
                  <Input
                    id="twoFactorToken"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={twoFactorToken}
                    onChange={(e) => setTwoFactorToken(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                  />
                </div>
                <Button
                  type="button"
                  className="w-full bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold h-11 rounded-xl"
                  disabled={twoFactorLoading || twoFactorToken.length !== 6}
                  onClick={handleVerifyTwoFactor}
                >
                  {twoFactorLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "ยืนยันการเปิดใช้ 2FA"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
