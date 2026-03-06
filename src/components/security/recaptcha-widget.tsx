"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          "expired-callback"?: () => void
          "error-callback"?: () => void
          theme?: "light" | "dark"
        }
      ) => number
      reset: (widgetId?: number) => void
    }
  }
}

export function RecaptchaWidget({
  siteKey,
  theme = "light",
  resetSignal = 0,
  onChange,
}: {
  siteKey: string
  theme?: "light" | "dark"
  resetSignal?: number
  onChange: (token: string) => void
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [widgetId, setWidgetId] = useState<number | null>(null)

  const renderWidget = () => {
    if (!containerRef.current || !window.grecaptcha || widgetId !== null) {
      return
    }

    const id = window.grecaptcha.render(containerRef.current, {
      sitekey: siteKey,
      theme,
      callback: (token) => onChange(token),
      "expired-callback": () => onChange(""),
      "error-callback": () => onChange(""),
    })

    setWidgetId(id)
  }

  useEffect(() => {
    if (widgetId !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetId)
      onChange("")
    }
  }, [resetSignal, widgetId, onChange])

  return (
    <div className="space-y-2">
      <Script src="https://www.google.com/recaptcha/api.js?render=explicit" strategy="afterInteractive" onLoad={renderWidget} />
      <div ref={containerRef} />
    </div>
  )
}
