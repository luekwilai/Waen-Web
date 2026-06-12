# Case Study เด่น พร้อมตัวเลขผลลัพธ์ — Design Spec

วันที่: 2026-06-12

## เป้าหมาย

ปัจจุบันผลงาน (Portfolio) โชว์แค่ภาพหน้าจอเว็บ ขาด "ผลลัพธ์เชิงตัวเลข" ที่พิสูจน์คุณค่า
(เช่น PageSpeed 98/100, ติดหน้าแรก Google ใน 3 เดือน, ลูกค้าติดต่อเพิ่ม 2 เท่า)
เพิ่มความสามารถให้แสดง **Case Study เด่น 1–2 โปรเจค** พร้อมตัวเลขผลลัพธ์ เพื่อเพิ่มความน่าเชื่อถือและ conversion

## ขอบเขต (Scope)

- เก็บตัวเลขผลลัพธ์ใน DB และจัดการผ่าน admin panel (ไม่ hardcode)
- แสดงเป็น **section แยกใหม่** ("ผลลัพธ์ที่วัดได้") ถัดจาก Portfolio carousel
- รองรับ 1–2 โปรเจคเด่น แต่ schema เปิดให้ใส่ได้หลายโปรเจค

**นอกขอบเขต:** ไม่แตะคารูเซลผลงานปกติ (โปรเจคเด่นยังโชว์ในคารูเซลตามเดิม), ไม่ทำ before/after storytelling, ไม่แตะ landing page อสังหา

## สถาปัตยกรรมปัจจุบัน (อ้างอิง)

- ผลงานเก็บใน Prisma model `Project` (PostgreSQL) — fields: `title, category, description, desktopImage, mobileImage, websiteUrl, sortOrder, isActive`
- จัดการผ่าน `src/components/admin/projects-page-client.tsx` → API `src/app/api/projects/route.ts` + `[id]/route.ts`
- แสดงผ่าน `PortfolioSection` (server) → `PortfolioCarousel` (client) ในหน้า `src/app/(public)/page.tsx`
- API ใช้ `prisma.project.create({ data })` / `update({ data })` ส่ง body ตรง → field ใหม่ไหลผ่านอัตโนมัติ

## ดีไซน์

### 1) Data model — `prisma/schema.prisma`

เพิ่ม 2 field ใน model `Project`:

```prisma
metrics     Json?     // [{ value: "98/100", label: "PageSpeed" }, ...] แนะนำสูงสุด 4 ตัว
isFeatured  Boolean   @default(false)
```

- `metrics`: array ของ `{ value: string, label: string }` — ยืดหยุ่น เพิ่ม/ลบตัวเลขได้อิสระต่อโปรเจค
- `isFeatured`: ธงคุมว่าโปรเจคไหนขึ้น section Case Study เด่น (แยกจากการมี metrics)
- Migration ผ่าน Prisma (ตามวิธีของ repo)

### 2) Admin — `src/components/admin/projects-page-client.tsx`

- เพิ่ม type `MetricItem = { value: string; label: string }`
- ขยาย `AdminProject`, `ProjectFormState`, `initialFormState`, `handleEdit` ให้รวม `metrics: MetricItem[]` และ `isFeatured: boolean`
- UI ในฟอร์ม:
  - checkbox **"แสดงเป็น Case Study เด่น"**
  - **editor ตัวเลขผลลัพธ์**: รายการแถวเพิ่ม/ลบได้ แต่ละแถวมี input `value` + `label` (จำกัด ~4 แถว) — ปุ่ม "เพิ่มตัวเลข" / ปุ่มลบต่อแถว
- ตอน submit: ส่ง `metrics` (กรองแถวว่างออก) + `isFeatured` ไปกับ payload เดิม

### 3) API — `src/app/api/projects/*`

- โครงสร้างส่ง `data` ตรงเข้า Prisma อยู่แล้ว → ไม่ต้องแก้ logic หลัก
- เพิ่ม normalize เบาๆ ฝั่ง POST/PUT: ถ้ามี `metrics` ให้กรองเฉพาะ entry ที่มี `value`+`label` (กัน data เพี้ยน) — เก็บ logic ให้น้อยที่สุด

### 4) Public — component ใหม่ `src/components/home/case-study-section.tsx`

- **Server component**: query `prisma.project.findMany({ where: { isActive: true, isFeatured: true }, orderBy: { sortOrder: "asc" }, take: 2 })`
- ถ้าไม่มีผล → `return null` (ปลอดภัย ship ก่อนกรอกข้อมูลได้)
- แต่ละการ์ด (สลับซ้าย/ขวาสำหรับ 2 ใบ):
  - ฝั่งภาพ: `desktopImage` ใน browser-bar mockup สไตล์เดียวกับการ์ดคารูเซลเดิม
  - ฝั่งเนื้อหา: badge `category` + `title` + `description` + แถว **stat chips**
  - **stat chips**: ตัวเลขใหญ่ gradient lime→emerald (ตามสไตล์ Stats section เดิมในหน้าหลัก) + label เล็ก uppercase
  - มือถือ: stack แนวตั้ง (ภาพบน เนื้อหาล่าง)
- ใช้ `ScrollReveal` ครอบเพื่อ animation ให้เข้ากับ section อื่น
- parsing `metrics`: รับเป็น JSON อาจเป็น unknown — parse + guard ให้เป็น `MetricItem[]` ก่อน render

### 5) วางในหน้า — `src/app/(public)/page.tsx`

แทรก `<CaseStudySection />` เป็น section ใหม่ **ถัดจาก Portfolio section** (หลัง `</section>` ของ portfolio, บรรทัด ~338)
- พาดหัว: **"ผลลัพธ์ที่วัดได้"** ใช้ heading style เดียวกับ section อื่น (eyebrow + h2 + คำโปรย)
- เนื่องจาก component คืน null เมื่อไม่มีข้อมูล จึงไม่กระทบ layout ถ้ายังไม่มีโปรเจคเด่น

## การยืนยันงานเสร็จ (Verification)

1. `prisma migrate` / generate สำเร็จ, `tsc`/build ผ่าน
2. รัน dev server → เข้า admin → ติ๊ก featured + กรอก metrics ให้ 1 โปรเจค
3. ดูหน้าแรก: section "ผลลัพธ์ที่วัดได้" ขึ้นพร้อม stat chips ถูกต้อง (desktop + mobile)
4. ลบ featured ออกหมด → section หายไป (render null) ไม่พัง layout

## ความเสี่ยง / ข้อควรระวัง

- **Mass assignment**: API ส่ง body ตรงเข้า Prisma (pattern เดิม) — การ normalize metrics ช่วยลดความเสี่ยง field เพี้ยน แต่ไม่แก้ pattern เดิม (นอกขอบเขต)
- **Json typing**: ฝั่ง public ต้อง guard parse `metrics` เพราะ Prisma คืน `JsonValue` ไม่ใช่ type ที่รู้ล่วงหน้า
- โปรเจคเด่นโชว์ทั้งใน section ใหม่และคารูเซลเดิม (ตั้งใจ — เป็นผลงานเดียวกัน)
