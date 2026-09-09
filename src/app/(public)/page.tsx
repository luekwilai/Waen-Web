import CreativeHome from "@/components/creative-home/page"
import type { Metadata } from "next"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: { absolute: "WAENWEB — ออกแบบเว็บไซต์ให้ธุรกิจเติบโต" },
  description: "ออกแบบและพัฒนาเว็บไซต์ WordPress เว็บไซต์ธุรกิจ และร้านค้าออนไลน์ พร้อมดูแลหลังส่งมอบ",
  alternates: { canonical: "https://waenweb.com" },
  openGraph: { title: "WAENWEB — ออกแบบเว็บไซต์ให้ธุรกิจเติบโต", url: "https://waenweb.com", images: [{ url: "https://waenweb.com/creative-home/images/pricing/custom-package.webp", width: 1400, height: 700, alt: "WAENWEB ออกแบบและพัฒนาเว็บไซต์" }] },
  twitter: { card: "summary_large_image", title: "WAENWEB — ออกแบบเว็บไซต์ให้ธุรกิจเติบโต", images: ["https://waenweb.com/creative-home/images/pricing/custom-package.webp"] },
}

export default async function HomePage() {
  const session = await auth()
  const canCustomizeBackground = (session?.user as { role?: string } | undefined)?.role === "ADMIN"

  return <CreativeHome canCustomizeBackground={canCustomizeBackground} />
}
