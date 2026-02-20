"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { ThemeToggle } from "@/components/home/theme-toggle"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (!result || result.error) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
        return
      }

      router.push("/admin/dashboard")
      router.refresh()
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white dark:text-slate-950">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
          <CardTitle className="text-3xl font-black text-slate-900 dark:text-white text-center tracking-tight">
            WAENWEB Admin
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400 text-center font-medium">
            เข้าสู่ระบบจัดการเว็บไซต์
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400">
              <AlertDescription className="font-medium">{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">อีเมล (Email)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white h-12 px-4 rounded-xl focus-visible:ring-lime-500"
              />
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-medium">รหัสผ่าน (Password)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white h-12 px-4 rounded-xl focus-visible:ring-lime-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold h-12 rounded-xl mt-2 shadow-lg shadow-lime-500/20 transition-all hover:shadow-lime-500/40 hover:-translate-y-0.5"
              disabled={loading}
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
