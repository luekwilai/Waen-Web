"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThemeToggle } from "@/components/home/theme-toggle"
import { PasswordInput } from "@/components/ui/password-input"
import { KeyRound, ArrowLeft, CheckCircle, XCircle } from "lucide-react"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [validating, setValidating] = useState(true)

  useEffect(() => {
    if (!token) {
      setError("ไม่พบ Token สำหรับรีเซ็ตรหัสผ่าน")
      setValidating(false)
    } else {
      setValidating(false)
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password.length < 8) {
      setError("รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร")
      return
    }

    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/login")
      }, 3000)
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
    } finally {
      setLoading(false)
    }
  }

  if (validating) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 animate-pulse">
          <KeyRound className="w-6 h-6 text-slate-400" />
        </div>
        <p className="text-slate-500 dark:text-slate-400">กำลังตรวจสอบ...</p>
      </div>
    )
  }

  if (error && !token) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center mx-auto">
          <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
        </div>
        <p className="text-slate-600 dark:text-slate-300">{error}</p>
        <Link
          href="/admin/forgot-password"
          className="inline-flex items-center gap-2 text-lime-600 dark:text-lime-400 font-semibold hover:underline"
        >
          ขอลิงก์รีเซ็ตรหัสผ่านใหม่
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <Alert variant="destructive" className="mb-6 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400">
          <AlertDescription className="font-medium">{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2.5">
        <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-medium">
          รหัสผ่านใหม่
        </Label>
        <PasswordInput
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="รหัสผ่านอย่างน้อย 8 ตัวอักษร"
          className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white h-12 px-4 rounded-xl focus-visible:ring-lime-500"
        />
      </div>
      <div className="space-y-2.5">
        <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300 font-medium">
          ยืนยันรหัสผ่านใหม่
        </Label>
        <PasswordInput
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="กรอกรหัสผ่านอีกครั้ง"
          className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white h-12 px-4 rounded-xl focus-visible:ring-lime-500"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold h-12 rounded-xl mt-2 shadow-lg shadow-lime-500/20 transition-all hover:shadow-lime-500/40 hover:-translate-y-0.5"
        disabled={loading}
      >
        {loading ? "กำลังรีเซ็ต..." : "รีเซ็ตรหัสผ่าน"}
      </Button>
      <div className="text-center">
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับสู่หน้าเข้าสู่ระบบ
        </Link>
      </div>
    </form>
  )
}

function SuccessView() {
  return (
    <div className="text-center space-y-4 py-4">
      <div className="w-16 h-16 rounded-full bg-lime-100 dark:bg-lime-500/20 flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-lime-600 dark:text-lime-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        รีเซ็ตรหัสผ่านสำเร็จ!
      </h3>
      <p className="text-slate-600 dark:text-slate-300">
        รหัสผ่านของคุณถูกเปลี่ยนแล้ว กำลังพากลับสู่หน้าเข้าสู่ระบบ...
      </p>
      <Link
        href="/admin/login"
        className="inline-flex items-center gap-2 text-lime-600 dark:text-lime-400 font-semibold hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        กลับสู่หน้าเข้าสู่ระบบ
      </Link>
    </div>
  )
}

export default function ResetPasswordPage() {
  const [success, setSuccess] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative transition-colors duration-500">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-500/10 dark:bg-lime-500/5 blur-[120px] pointer-events-none rounded-full" />

      <Card className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-white/10 shadow-2xl relative z-10 overflow-hidden">
        <CardHeader className="space-y-2 pb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-lime-500/20 mx-auto mb-4">
            <KeyRound className="w-6 h-6 text-white dark:text-slate-950" />
          </div>
          <CardTitle className="text-2xl font-black text-slate-900 dark:text-white text-center tracking-tight">
            รีเซ็ตรหัสผ่าน
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400 text-center font-medium">
            ตั้งรหัสผ่านใหม่สำหรับบัญชีของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <KeyRound className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-500 dark:text-slate-400">กำลังโหลด...</p>
            </div>
          }>
            {success ? <SuccessView /> : <ResetPasswordForm />}
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
