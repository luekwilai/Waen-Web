# ผูกแพ็คเกจกับผลงานจริง (เคสราคา) — Design Spec

วันที่: 2026-06-12

## เป้าหมาย

Packages ตอนนี้โชว์แค่ราคา + features ลูกค้าไทยอยากเห็น "ของจริง" ก่อนตัดสินใจ
ผูกแต่ละแพ็คเกจกับ**ผลงานจริง** เพื่อสื่อ "เว็บแบบนี้ = แพ็คเกจนี้" → ลดความลังเล เพิ่ม conversion

## ขอบเขต

- 1 ผลงาน = ตัวอย่างของ 1 แพ็คเกจ (optional); 1 แพ็คเกจมีได้หลายผลงาน
- การ์ดแพ็คเกจโชว์สูงสุด **2 ผลงานตัวอย่าง** เป็น thumbnail เล็ก + ชื่อ (คลิกไปเว็บจริง)
- จัดการผ่าน admin: เลือกแพ็คเกจในฟอร์มแก้ผลงาน
- **นอกขอบเขต:** ไม่แตะระบบราคา/แพ็คเกจเดิม, ไม่ทำ many-to-many

## ดีไซน์

### 1) Data model — `prisma/schema.prisma`

เพิ่ม relation Project → Package:

```prisma
model Project {
  ...
  examplePackageId String?
  examplePackage   Package? @relation(fields: [examplePackageId], references: [id], onDelete: SetNull)
}

model Package {
  ...
  exampleProjects Project[]
}
```

- `onDelete: SetNull` — ลบแพ็คเกจแล้วผลงานไม่หาย แค่เคลียร์ลิงก์

### 2) Public query — `src/components/home/packages-section.tsx`

เพิ่ม include ใน select ของ `prisma.package.findMany`:

```ts
exampleProjects: {
  where: { isActive: true },
  orderBy: { sortOrder: "asc" },
  take: 2,
  select: { id: true, title: true, desktopImage: true, websiteUrl: true },
}
```

map เข้า `PackageItem.exampleProjects`

### 3) Public display — `src/components/home/packages-section-client.tsx`

- ขยาย type `PackageItem` เพิ่ม `exampleProjects: { id; title; desktopImage; websiteUrl }[]`
- ใต้ปุ่ม "เลือกแพ็คเกจนี้" (ก่อนปิดการ์ด) เพิ่ม block **"เว็บตัวอย่าง"** เมื่อมีผลงาน:
  - แถว thumbnail เล็ก (อัตราส่วน 16:10, กว้าง ~40%) + ชื่อผลงาน
  - คลิก → เปิด `websiteUrl` (target _blank) ถ้ามี
  - แยกสไตล์ตามการ์ด popular (เข้ม) / ปกติ (สว่าง)

### 4) Admin — `src/components/admin/projects-page-client.tsx`

- เพิ่ม prop `packages: { id: string; name: string }[]` (รายชื่อแพ็คเกจให้เลือก)
- ขยาย `AdminProject` + `ProjectFormState` + `initialFormState` + `handleEdit` เพิ่ม `examplePackageId: string | null` (form ใช้ string, "" = ไม่มี)
- เพิ่ม `<select>` "เป็นตัวอย่างของแพ็คเกจ" ในฟอร์ม (option "— ไม่ผูก —" + รายชื่อแพ็คเกจ)
- ตอน submit: แปลง "" → ส่ง `examplePackageId: null`

### 5) Admin page — `src/app/admin/projects/page.tsx`

- query แพ็คเกจ (`getAdminPackages` หรือ prisma) ส่ง `packages={[{id,name}]}` เข้า client
- map `examplePackageId` ใน initialProjects

### 6) API — `src/app/api/projects/*`

- normalize `examplePackageId`: ถ้าเป็น "" หรือ falsy → `null` (กัน FK error)

## Verification

1. `prisma db push` + `tsc --noEmit` ผ่าน
2. admin: แก้ผลงาน → เลือกแพ็คเกจ → บันทึก
3. หน้าแรก: การ์ดแพ็คเกจนั้นโชว์ thumbnail + ชื่อผลงาน คลิกไปเว็บจริงได้
4. แพ็คเกจที่ไม่มีผลงานผูก → ไม่มี block (ไม่พัง)

## ความเสี่ยง

- FK constraint: ต้อง normalize "" → null ทั้ง API
- การ์ด popular พื้นที่จำกัด — thumbnail ต้องเล็กพอไม่ดันปุ่ม/layout
