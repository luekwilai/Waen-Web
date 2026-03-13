import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import bcrypt from "bcryptjs"

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error("DATABASE_URL is not set")
const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter } as never)

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

  // Seed default site settings
  const defaultSettings = [
    { key: "contact.email", value: "thawatsak28@gmail.com" },
    { key: "contact.line", value: "thawatsak" },
    { key: "social.facebook", value: "" },
    { key: "social.instagram", value: "" },
    { key: "social.youtube", value: "" },
    { key: "site.logoUrl", value: "/waenweb-logo-r1.svg" },
    { key: "hero.badge", value: "รับทำเว็บไซต์ด้วย WordPress" },
    { key: "hero.heading", value: "รับทำเว็บไซต์มืออาชีพ" },
    { key: "hero.description", value: "สร้างเว็บไซต์ที่ตอบโจทย์ธุรกิจของคุณ ด้วยทีมงานมืออาชีพและเทคโนโลยีที่ทันสมัย รองรับทุกการแสดงผล" },
    { key: "hero.ctaPrimary", value: "ติดต่อเรา" },
    { key: "hero.ctaSecondary", value: "ดูผลงานของเรา" },
    {
      key: "hero.stats",
      value: JSON.stringify([
        { label: "โปรเจคที่สำเร็จ", value: "50+" },
        { label: "ความพึงพอใจ", value: "100%" },
        { label: "ดูแลฟรี (เดือน)", value: "3" },
        { label: "Support", value: "24/7" },
      ]),
    },
    {
      key: "hero.techPills",
      value: JSON.stringify(["WordPress", "React", "TypeScript", "Tailwind CSS", "Next.js"]),
    },
    {
      key: "services",
      value: JSON.stringify([
        { id: "1", title: "Responsive Design", desc: "ออกแบบเว็บไซต์ให้รองรับการแสดงผลทุกอุปกรณ์ ทั้ง PC, Tablet และ Mobile", icon: "Smartphone" },
        { id: "2", title: "SEO Optimization", desc: "ปรับแต่งโครงสร้างเว็บไซต์ให้รองรับหลักการ SEO เพื่อเพิ่มโอกาสติดอันดับ Google", icon: "Search" },
        { id: "3", title: "E-Commerce", desc: "ระบบร้านค้าออนไลน์ครบวงจร จัดการสินค้า ออเดอร์ และการชำระเงิน", icon: "ShoppingCart" },
        { id: "4", title: "PDPA Compliance", desc: "ติดตั้งระบบ Cookie Consent และ Privacy Policy รองรับกฎหมาย PDPA", icon: "ShieldCheck" },
        { id: "5", title: "ดูแลหลังการขาย", desc: "บริการดูแลรักษาเว็บไซต์ อัพเดทระบบ และแก้ไขปัญหาทางเทคนิค ฟรี 3 เดือน", icon: "Headphones" },
        { id: "6", title: "ส่งงานตรงเวลา", desc: "มีการวางแผนงานที่ชัดเจน และการันตีส่งมอบงานตามกำหนดเวลาที่ตกลงไว้", icon: "Clock" },
      ]),
    },
    {
      key: "process",
      value: JSON.stringify([
        { id: "1", num: "01", title: "พูดคุยและวางแผน", description: "เราเริ่มต้นด้วยการรับฟังความต้องการของคุณอย่างละเอียด วิเคราะห์กลุ่มเป้าหมาย และวางโครงสร้างเว็บไซต์ร่วมกัน", tags: ["รับฟังความต้องการ", "วิเคราะห์ธุรกิจ", "วางโครงสร้าง"], duration: "1–2 วัน" },
        { id: "2", num: "02", title: "ออกแบบ UI/UX", description: "สร้าง Mockup และ Prototype ให้เห็นภาพรวมก่อนการพัฒนา รับรีวิวและแก้ไขได้จนกว่าจะพอใจ", tags: ["Wireframe", "Mockup Design", "ปรับแก้ได้ไม่จำกัด"], duration: "2–4 วัน" },
        { id: "3", num: "03", title: "พัฒนาเว็บไซต์", description: "ลงมือพัฒนาด้วย WordPress และเทคโนโลยีที่ทันสมัย พร้อมระบบจัดการหลังบ้านที่ใช้งานง่าย", tags: ["WordPress CMS", "Responsive", "SEO Ready"], duration: "5–10 วัน" },
        { id: "4", num: "04", title: "ส่งมอบและดูแล", description: "ทดสอบระบบครบถ้วน นำขึ้น Hosting จริง สอนการใช้งาน และให้บริการดูแลต่อเนื่องฟรี 3 เดือน", tags: ["ทดสอบระบบ", "ดูแลฟรี 3 เดือน", "สอนการใช้งาน"], duration: "1–2 วัน" },
      ]),
    },
    { key: "seo.title", value: "WAENWEB - รับทำเว็บไซต์มืออาชีพ" },
    { key: "seo.description", value: "รับพัฒนาเว็บไซต์ WordPress คุณภาพสูง ออกแบบสวยงาม รองรับทุกอุปกรณ์" },
  ]

  for (const setting of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.log("Default site settings seeded")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
