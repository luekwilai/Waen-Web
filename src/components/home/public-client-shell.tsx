"use client"

import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

const AnimatedBackground = dynamic(
  () => import("@/components/home/animated-background").then((mod) => mod.AnimatedBackground),
  { ssr: false }
)

const CookieConsentBanner = dynamic(
  () => import("@/components/home/cookie-consent-banner").then((mod) => mod.CookieConsentBanner),
  { ssr: false }
)

export function PublicClientShell() {
  const pathname = usePathname()
  return (
    <>
      {pathname !== "/" && !pathname.startsWith("/blog") && <AnimatedBackground />}
      <CookieConsentBanner />
    </>
  )
}
