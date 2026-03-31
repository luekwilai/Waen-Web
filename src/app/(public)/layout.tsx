import { PublicClientShell } from "@/components/home/public-client-shell"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <PublicClientShell />
      {children}
    </>
  )
}
