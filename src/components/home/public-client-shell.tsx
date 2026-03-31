"use client"

import dynamic from "next/dynamic"

const AnimatedBackground = dynamic(
  () => import("@/components/home/animated-background").then((mod) => mod.AnimatedBackground),
  { ssr: false }
)

const CookieConsentBanner = dynamic(
  () => import("@/components/home/cookie-consent-banner").then((mod) => mod.CookieConsentBanner),
  { ssr: false }
)

export function PublicClientShell() {
  return (
    <>
      <AnimatedBackground />
      <CookieConsentBanner />
    </>
  )
}
