import { CookieConsentBanner } from "@/components/home/cookie-consent-banner"
import { AnimatedBackground } from "@/components/home/animated-background"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AnimatedBackground />
      {children}
      <CookieConsentBanner />
    </>
  )
}
