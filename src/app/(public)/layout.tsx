import { CookieConsentBanner } from "@/components/home/cookie-consent-banner"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <CookieConsentBanner />
    </>
  )
}
