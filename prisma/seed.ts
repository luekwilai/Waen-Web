import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient({})

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10)
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@waenweb.com" },
    update: {},
    create: {
      email: "admin@waenweb.com",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN"
    }
  })
  
  console.log("Admin user created:", admin.email)
  
  // Seed default packages
  const packages = [
    {
      name: "Landing Page",
      nameEn: "Landing Page",
      price: 8900,
      description: "เว็บไซต์ Landing Page โดดเด่น รองรับทุกอุปกรณ์",
      duration: "7-14 วัน",
      isPopular: false,
      features: JSON.stringify([
        "ออกแบบ UI/UX สวยงาม",
        "รองรับมือถือ & แท็บเล็ต",
        "ฟอร์มติดต่อ + Google Maps",
        "SEO มาตรฐาน",
        "SSL Certificate ฟรี"
      ])
    },
    {
      name: "Business Website",
      nameEn: "Business Website",
      price: 15900,
      description: "เว็บไซต์ธุรกิจครบวงจร พร้อมระบบจัดการ",
      duration: "14-21 วัน",
      isPopular: true,
      features: JSON.stringify([
        "หน้าเว็บสูงสุด 7 หน้า",
        "ระบบ CMS จัดการเนื้อหา",
        "ระบบ Blog & News",
        "รองรับหลายภาษา",
        "Google Analytics",
        "แก้ไขฟรี 3 ครั้ง"
      ])
    },
    {
      name: "E-Commerce",
      nameEn: "E-Commerce",
      price: 29900,
      description: "ร้านค้าออนไลน์ครบวงจร พร้อมระบบชำระเงิน",
      duration: "21-30 วัน",
      isPopular: false,
      features: JSON.stringify([
        "ระบบสินค้า & สต็อก",
        "ตะกร้าสินค้า & Checkout",
        "ระบบชำระเงิน (PromptPay, Credit)",
        "ระบบสมาชิก & ประวัติการสั่งซื้อ",
        "ระบบจัดการคำสั่งซื้อ",
        "SSL & Security สูงสุด"
      ])
    }
  ]
  
  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { id: pkg.name },
      update: {},
      create: pkg as any
    })
  }
  
  console.log("Default packages seeded")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
