import CreativeHome from "@/components/creative-home/page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "WAENWEB — ออกแบบเว็บไซต์ให้ธุรกิจเติบโต",
  description: "ออกแบบและพัฒนาเว็บไซต์ WordPress เว็บไซต์ธุรกิจ และร้านค้าออนไลน์ พร้อมดูแลหลังส่งมอบ",
  alternates: { canonical: "https://waenweb.com" },
}

export default function HomePage() {
  return <CreativeHome />
}
