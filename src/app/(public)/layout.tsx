import { PublicClientShell } from "@/components/home/public-client-shell"
import { LineFloatButton } from "@/components/home/line-float-button"
import { getSiteSettings } from "@/lib/queries"

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSiteSettings()
  const contactLine = settings["contact.line"] || "thawatsak"

  return (
    <>
      <PublicClientShell />
      {children}
      <LineFloatButton lineId={contactLine} />
    </>
  )
}
