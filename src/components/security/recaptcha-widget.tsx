"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Script from "next/script"

type RecaptchaApi = {
  render: (container: HTMLElement, options: { sitekey: string; callback: (token: string) => void; "expired-callback"?: () => void; "error-callback"?: () => void; theme?: "light" | "dark" }) => number
  reset: (widgetId?: number) => void
  ready?: (callback: () => void) => void
}

declare global {
  interface Window { grecaptcha?: Partial<RecaptchaApi> }
}

const API_WAIT_MS = 100
const API_WAIT_LIMIT = 10000

export function RecaptchaWidget({ siteKey, theme = "light", resetSignal = 0, onChange }: { siteKey: string; theme?: "light" | "dark"; resetSignal?: number; onChange: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<number | null>(null)
  const onChangeRef = useRef(onChange)
  const scriptReadyRef = useRef(false)
  const mountedRef = useRef(false)
  const waitStartedAtRef = useRef(0)
  const waitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const readyRegisteredRef = useRef(false)
  const previousResetSignalRef = useRef(resetSignal)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  onChangeRef.current = onChange

  const clearWaitTimer = useCallback(() => {
    if (waitTimerRef.current !== null) { clearTimeout(waitTimerRef.current); waitTimerRef.current = null }
  }, [])

  const renderWidget = useCallback(() => {
    if (!mountedRef.current || widgetIdRef.current !== null || !containerRef.current) return false
    const api = window.grecaptcha
    if (typeof api?.render !== "function") return false
    try {
      widgetIdRef.current = api.render(containerRef.current, {
        sitekey: siteKey, theme,
        callback: (token) => { setStatus("ready"); onChangeRef.current(token) },
        "expired-callback": () => { setStatus("ready"); onChangeRef.current("") },
        "error-callback": () => { setStatus("error"); onChangeRef.current("") },
      })
      setStatus("ready")
      clearWaitTimer()
      return true
    } catch {
      widgetIdRef.current = null
      setStatus("error")
      clearWaitTimer()
      return false
    }
  }, [clearWaitTimer, siteKey, theme])

  const initializeWidget = useCallback(() => {
    if (!mountedRef.current || widgetIdRef.current !== null) return
    if (renderWidget()) return
    const api = window.grecaptcha
    if (!readyRegisteredRef.current && typeof api?.ready === "function") {
      readyRegisteredRef.current = true
      try { api.ready(renderWidget) } catch { /* polling below handles an early ready */ }
    }
    if (!waitStartedAtRef.current) waitStartedAtRef.current = Date.now()
    if (Date.now() - waitStartedAtRef.current >= API_WAIT_LIMIT) { setStatus("error"); return }
    clearWaitTimer()
    waitTimerRef.current = setTimeout(initializeWidget, API_WAIT_MS)
  }, [clearWaitTimer, renderWidget])

  const handleScriptReady = useCallback(() => {
    scriptReadyRef.current = true
    if (widgetIdRef.current !== null) return
    setStatus("loading")
    initializeWidget()
  }, [initializeWidget])

  const handleScriptError = useCallback(() => {
    clearWaitTimer()
    setStatus("error")
  }, [clearWaitTimer])

  useEffect(() => {
    mountedRef.current = true
    waitStartedAtRef.current = Date.now()
    initializeWidget()
    return () => { mountedRef.current = false; clearWaitTimer() }
  }, [clearWaitTimer, initializeWidget])

  useEffect(() => {
    if (previousResetSignalRef.current === resetSignal) return
    previousResetSignalRef.current = resetSignal
    const api = window.grecaptcha
    if (widgetIdRef.current !== null && typeof api?.reset === "function") { api.reset(widgetIdRef.current); onChangeRef.current("") }
  }, [resetSignal])

  return (
    <div className="space-y-2">
      <Script src="https://www.google.com/recaptcha/api.js?render=explicit" strategy="afterInteractive" onLoad={handleScriptReady} onReady={handleScriptReady} onError={handleScriptError} />
      <div ref={containerRef} />
      {status === "loading" && <p className="text-sm text-muted-foreground" aria-live="polite">กำลังโหลดการยืนยันตัวตน…</p>}
      {status === "error" && <p className="text-sm text-destructive" role="alert">โหลดการยืนยัน reCAPTCHA ไม่สำเร็จ กรุณาตรวจสอบการเชื่อมต่อแล้วโหลดหน้าใหม่</p>}
    </div>
  )
}
