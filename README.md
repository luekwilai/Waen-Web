# WAENWEB
 
 เว็บบริษัทและแอดมินหลังบ้านสำหรับจัดการคอนเทนต์หน้าเว็บ ผลงาน แพ็กเกจ ราคา ข้อมูลติดต่อ และ inquiry จากลูกค้า

 [![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)
 [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
 [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
 [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
 [![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

 ## Live Demo & Links

 - **Production Website**: [https://waenweb.com](https://waenweb.com)
 - **Admin Login**: [https://waenweb.com/admin/login](https://waenweb.com/admin/login)
 - **GitHub Repository**: [https://github.com/luekwilai/Waen-Web](https://github.com/luekwilai/Waen-Web)

 ## Screenshots

 ### Public Website

 ![WAENWEB Screenshot 1](https://raw.githubusercontent.com/luekwilai/Waen-Web/master/public/uploads/projects/1771249231826-653c2685-d5bc-4ae1-9c20-54cd0b72b872.jpg)

 ### Project Showcase

 ![WAENWEB Screenshot 2](https://raw.githubusercontent.com/luekwilai/Waen-Web/master/public/uploads/projects/1771249236548-1d14493c-5bc8-482a-8a99-c0ea1d40529f.jpg)
 
 ## Tech Stack
 
 - **Framework**: Next.js 16 (App Router)
 - **Language**: TypeScript
 - **Styling**: Tailwind CSS v4
 - **UI**: shadcn/ui + Radix UI + Lucide Icons
 - **Database**: PostgreSQL (Neon) + Prisma
 - **Auth**: NextAuth
 - **Storage**: Vercel Blob
 - **Email**: Resend
 - **Analytics**: Vercel Analytics + Speed Insights
 
 ## Project Structure
 
 - **Public website**: `src/app/(public)/page.tsx`
 - **Admin pages**: `src/app/admin/*`
 - **API routes**: `src/app/api/*`
 - **Shared UI**: `src/components/ui/*`
 - **Home sections**: `src/components/home/*`
 - **Global styles**: `src/app/globals.css`
 
 ## shadcn Configuration
 
 โปรเจกต์นี้รองรับ `shadcn/ui` อยู่แล้ว โดยใช้ alias ตาม `components.json`
 
 ```json
 {
   "aliases": {
     "components": "@/components",
     "ui": "@/components/ui",
     "lib": "@/lib"
   }
 }
 ```
 
 path มาตรฐานของ shared UI component คือ:
 
 ```
 src/components/ui
 ```
 
 ## Requirements
 
 - **Node.js** 20+
 - **npm** 10+
 - **PostgreSQL / Neon database**
 
 ## Installation
 
 ```bash
 npm install
 ```
 
 หลัง install แล้ว `postinstall` จะรัน `prisma generate` อัตโนมัติ
 
 ## Environment Variables
 
 สร้างไฟล์ `.env.local`
 
 ```env
 DATABASE_URL=
 AUTH_SECRET=
 NEXTAUTH_SECRET=
 NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
 RECAPTCHA_SECRET_KEY=
 RESEND_API_KEY=
 RESEND_FROM_EMAIL=
 SEED_TOKEN=
 ```
 
 ### คำอธิบายตัวแปร
 
 - **`DATABASE_URL`**
   - connection string ของ PostgreSQL / Neon
 
 - **`AUTH_SECRET`**
   - secret หลักสำหรับ auth
   - ถ้าไม่ตั้ง ระบบจะ fallback ไป `NEXTAUTH_SECRET`
 
 - **`NEXTAUTH_SECRET`**
   - ใช้ได้เช่นกันหากต้องการตั้งตาม convention เดิมของ NextAuth
 
 - **`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`**
   - site key ฝั่ง client สำหรับหน้า login admin
 
 - **`RECAPTCHA_SECRET_KEY`**
   - secret key ฝั่ง server สำหรับตรวจ token reCAPTCHA
   - ถ้าไม่ตั้ง logic ปัจจุบันจะปล่อยผ่านการตรวจในบางจุด
 
 - **`RESEND_API_KEY`**
   - ใช้ส่งอีเมลแจ้งเตือนจากฟอร์มติดต่อ
 
 - **`RESEND_FROM_EMAIL`**
   - sender email เช่น `WAENWEB <noreply@yourdomain.com>`
 
 - **`SEED_TOKEN`**
   - ใช้ป้องกัน route seed ใน production
 
 ## Database Setup
 
 ถ้าฐานข้อมูลยังไม่มี schema ให้ sync ด้วย Prisma:
 
 ```bash
 npx prisma db push
 ```
 
 ถ้าต้องการเปิด Prisma Studio:
 
 ```bash
 npx prisma studio
 ```
 
 ## Seed Admin User
 
 ใช้คำสั่งนี้เพื่อสร้าง admin user เริ่มต้น:
 
 ```bash
 npm run seed:admin
 ```
 
 ตรวจสอบ script ได้ที่:
 
 - `scripts/seed-admin.js`
 
 ## Run Development Server
 
 ```bash
 npm run dev
 ```
 
 เปิดใน browser:
 
 ```
 http://localhost:3000
 ```
 
 ## Build for Production
 
 ```bash
 npm run build
 npm run start
 ```
 
 ## Lint
 
 ```bash
 npm run lint
 ```
 
 ## Admin Login
 
 หน้า admin login อยู่ที่:
 
 ```
 /admin/login
 ```
 
 หลัง login แล้วจะเข้าหน้าจัดการ:
 
 - Dashboard
 - Projects
 - Packages
 - Inquiries
 - Settings
 - Users
 
 ## Contact Form / Email Notification
 
 ฟอร์มติดต่อจะบันทึก inquiry ลงฐานข้อมูลก่อน แล้วจึงพยายามส่งอีเมลแจ้งเตือน
 
 สิ่งที่ต้องตั้งให้ครบ:
 
 - **`contact.email`** ในหน้า Admin Settings
 - **`RESEND_API_KEY`** ใน environment
 - **`RESEND_FROM_EMAIL`** ใน environment
 
 ถ้าจะ deploy บน Vercel ต้องเพิ่ม env เหล่านี้ใน **Project Settings > Environment Variables** ด้วย ไม่ใช่แค่ใน `.env.local`
 
 ## Media Uploads
 
 โปรเจกต์ใช้ Vercel Blob สำหรับอัปโหลดรูป และมี media picker สำหรับดึงรูปที่เคยอัปโหลดกลับมาใช้ซ้ำได้
 
 จุดหลักที่เกี่ยวข้อง:
 
 - `src/app/api/uploads/route.ts`
 - `src/components/admin/media-picker.tsx`
 
 ## Deployment
 
 โปรเจกต์นี้ deploy บน Vercel ได้โดยตรง
 
 build command ที่ใช้อยู่:
 
 ```bash
 prisma db push && next build
 ```
 
 อ้างอิงจาก script:
 
 ```json
 "vercel-build": "prisma db push && next build"
 ```
 
 ### Recommended Vercel Environment Variables
 
 ```env
 DATABASE_URL=
 AUTH_SECRET=
 NEXTAUTH_SECRET=
 NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
 RECAPTCHA_SECRET_KEY=
 RESEND_API_KEY=
 RESEND_FROM_EMAIL=
 SEED_TOKEN=
 ```
 
 ## Useful Commands
 
 - **Install deps**
   - `npm install`
 
 - **Run dev**
   - `npm run dev`
 
 - **Build**
   - `npm run build`
 
 - **Start production server**
   - `npm run start`
 
 - **Lint**
   - `npm run lint`
 
 - **Seed admin**
   - `npm run seed:admin`
 
 ## Notes
 
 - โปรเจกต์นี้ใช้ `src/app/globals.css` เป็น global Tailwind entry
 - shared UI component ควรอยู่ใน `src/components/ui`
 - มี dynamic metadata และ favicon จาก site settings
 - มี cache invalidation สำหรับ admin/public data แล้วในหลาย API routes
 
 ## Repository Usage
 
 ถ้าจะให้ทีมอื่นเริ่มงานต่อ แนะนำลำดับนี้:
 
 1. clone repo
 2. สร้าง `.env.local`
 3. ใส่ `DATABASE_URL`
 4. รัน `npm install`
 5. รัน `npx prisma db push`
 6. รัน `npm run seed:admin`
 7. รัน `npm run dev`
 
 ## License
 
 ใช้งานภายในโปรเจกต์ WAENWEB
