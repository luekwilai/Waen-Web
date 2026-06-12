# Case Study เด่น พร้อมตัวเลขผลลัพธ์ — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** เพิ่ม section "ผลลัพธ์ที่วัดได้" บนหน้าแรก แสดง Case Study เด่น 1–2 โปรเจคพร้อมตัวเลขผลลัพธ์ จัดการผ่าน admin panel

**Architecture:** เพิ่ม field `metrics` (Json) และ `isFeatured` (Boolean) ใน Prisma model `Project` → admin form กรอกข้อมูล → cached query ดึงเฉพาะ featured → server component `CaseStudySection` render การ์ดสลับซ้าย/ขวาพร้อม stat chips → แทรกในหน้า `(public)/page.tsx` ถัดจาก Portfolio. helper กลาง `normalizeMetrics` ใช้ร่วมทั้ง API และ public component (DRY)

**Tech Stack:** Next.js 16 (App Router), Prisma 7 (PostgreSQL/Neon), React 19, Tailwind v4, framer-motion, lucide-react

**หมายเหตุ:** repo นี้**ไม่มี test runner** (ไม่มี jest/vitest) — verification ใช้ `npx tsc --noEmit` / `npm run build` + ตรวจจริงผ่าน preview tools แทน unit test

---

## File Structure

- `prisma/schema.prisma` — เพิ่ม 2 field ใน model `Project` (modify)
- `src/lib/project-metrics.ts` — type `MetricItem` + `normalizeMetrics()` helper (create)
- `src/lib/queries.ts` — เพิ่ม `getFeaturedProjects` cached query (modify)
- `src/app/api/projects/route.ts` — normalize metrics ตอน POST (modify)
- `src/app/api/projects/[id]/route.ts` — normalize metrics ตอน PUT (modify)
- `src/components/admin/projects-page-client.tsx` — featured checkbox + metrics editor (modify)
- `src/app/admin/projects/page.tsx` — map `metrics` ผ่าน `normalizeMetrics` ก่อนส่ง prop (modify)
- `src/components/home/case-study-section.tsx` — server component แสดงผล (create)
- `src/app/(public)/page.tsx` — แทรก `<CaseStudySection />` (modify)

---

### Task 1: Schema — เพิ่ม field `metrics` + `isFeatured`

**Files:**
- Modify: `prisma/schema.prisma:26-40` (model Project)

- [ ] **Step 1: เพิ่ม 2 field ใน model Project**

แก้ block `model Project` ให้เป็น:

```prisma
model Project {
  id           String   @id @default(cuid())
  title        String
  category     String
  description  String?
  desktopImage String?
  mobileImage  String?
  websiteUrl   String?
  metrics      Json?
  isFeatured   Boolean  @default(false)
  sortOrder    Int      @default(0)
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("projects")
}
```

- [ ] **Step 2: Push schema ไป DB + regenerate client**

Run: `npx prisma db push`
Expected: "Your database is now in sync with your Prisma schema" + "Generated Prisma Client"

(repo ใช้ `prisma db push` เป็นหลัก — ดู `vercel-build` ใน package.json — ไม่ใช้ migrate files)

- [ ] **Step 3: ยืนยัน types ใหม่มีผล**

Run: `npx tsc --noEmit`
Expected: ไม่มี error ใหม่ (ถ้ามี error เดิมที่ไม่เกี่ยวก็ข้ามได้ แต่ต้องไม่มี error เรื่อง `metrics`/`isFeatured`)

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat(db): add metrics + isFeatured fields to Project"
```

---

### Task 2: Shared helper — `MetricItem` type + `normalizeMetrics()`

**Files:**
- Create: `src/lib/project-metrics.ts`

- [ ] **Step 1: สร้างไฟล์ helper**

สร้าง `src/lib/project-metrics.ts`:

```ts
export type MetricItem = { value: string; label: string }

export const MAX_METRICS = 4

/**
 * รับ input ที่อาจมาจาก request body หรือ Prisma Json column (unknown)
 * แล้วคืน array ที่ปลอดภัย: เฉพาะ entry ที่มีทั้ง value และ label, ตัด whitespace, จำกัด MAX_METRICS ตัว
 */
export function normalizeMetrics(input: unknown): MetricItem[] {
  if (!Array.isArray(input)) return []
  return input
    .filter((m): m is Record<string, unknown> => !!m && typeof m === "object")
    .map((m) => ({
      value: String(m.value ?? "").trim(),
      label: String(m.label ?? "").trim(),
    }))
    .filter((m) => m.value !== "" && m.label !== "")
    .slice(0, MAX_METRICS)
}
```

- [ ] **Step 2: ยืนยัน type-check ผ่าน**

Run: `npx tsc --noEmit`
Expected: ไม่มี error

- [ ] **Step 3: Commit**

```bash
git add src/lib/project-metrics.ts
git commit -m "feat(lib): add project-metrics type and normalizeMetrics helper"
```

---

### Task 3: Cached query — `getFeaturedProjects`

**Files:**
- Modify: `src/lib/queries.ts` (เพิ่มต่อจาก `getPublicProjects`, หลังบรรทัด ~44)

- [ ] **Step 1: เพิ่ม cached query**

แทรกหลัง block `getPublicProjects` (ก่อน `getAdminPackages`):

```ts
// Public, read-only list of featured projects with metrics (Case Study section on home page).
export const getFeaturedProjects = unstable_cache(
  async () =>
    prisma.project.findMany({
      where: { isActive: true, isFeatured: true },
      orderBy: { sortOrder: "asc" },
      take: 2,
      select: {
        id: true,
        title: true,
        category: true,
        description: true,
        desktopImage: true,
        websiteUrl: true,
        metrics: true,
      },
    }),
  ["featured-projects"],
  { revalidate: 60, tags: ["projects"] }
)
```

(ใช้ tag `"projects"` เดียวกับ query อื่น → admin บันทึกแล้ว `revalidateTag("projects")` ใน API ทำให้ section อัปเดตอัตโนมัติ)

- [ ] **Step 2: ยืนยัน type-check ผ่าน**

Run: `npx tsc --noEmit`
Expected: ไม่มี error

- [ ] **Step 3: Commit**

```bash
git add src/lib/queries.ts
git commit -m "feat(lib): add getFeaturedProjects cached query"
```

---

### Task 4: API — normalize metrics ตอน POST/PUT

**Files:**
- Modify: `src/app/api/projects/route.ts:66-88` (POST)
- Modify: `src/app/api/projects/[id]/route.ts:6-33` (PUT)

- [ ] **Step 1: แก้ POST ให้ normalize metrics**

ใน `src/app/api/projects/route.ts` เพิ่ม import บนสุด (หลัง import เดิม):

```ts
import { normalizeMetrics } from "@/lib/project-metrics"
```

แล้วแก้ body ของ `POST` ตรงส่วน parse + create:

```ts
    const data = await request.json()
    if ("metrics" in data) {
      data.metrics = normalizeMetrics(data.metrics)
    }
    const project = await prisma.project.create({ data })
```

- [ ] **Step 2: แก้ PUT ให้ normalize metrics**

ใน `src/app/api/projects/[id]/route.ts` เพิ่ม import:

```ts
import { normalizeMetrics } from "@/lib/project-metrics"
```

แล้วแก้ส่วน parse + update ใน `PUT`:

```ts
    const { id } = await params
    const data = await request.json()
    if ("metrics" in data) {
      data.metrics = normalizeMetrics(data.metrics)
    }
    const project = await prisma.project.update({
      where: { id },
      data
    })
```

- [ ] **Step 3: ยืนยัน type-check ผ่าน**

Run: `npx tsc --noEmit`
Expected: ไม่มี error

- [ ] **Step 4: Commit**

```bash
git add src/app/api/projects/route.ts "src/app/api/projects/[id]/route.ts"
git commit -m "feat(api): normalize project metrics on create/update"
```

---

### Task 5: Admin form — featured checkbox + metrics editor

**Files:**
- Modify: `src/components/admin/projects-page-client.tsx`

- [ ] **Step 1: เพิ่ม import + ขยาย types**

แก้ import lucide (บรรทัด 25) เพิ่ม `X`:

```ts
import { Plus, Pencil, Trash2, Eye, Upload, Loader2, GripVertical, X } from "lucide-react"
```

เพิ่ม import helper หลัง import lucide:

```ts
import { type MetricItem, MAX_METRICS } from "@/lib/project-metrics"
```

ขยาย `AdminProject` (บรรทัด 27-36) เพิ่ม 2 field:

```ts
export interface AdminProject {
  id: string
  title: string
  category: string
  description: string | null
  desktopImage: string | null
  mobileImage: string | null
  websiteUrl: string | null
  metrics: MetricItem[] | null
  isFeatured: boolean
  isActive: boolean
}
```

ขยาย `ProjectFormState` (บรรทัด 38-46) + `initialFormState` (บรรทัด 48-56):

```ts
type ProjectFormState = {
  title: string
  category: string
  description: string
  desktopImage: string
  mobileImage: string
  websiteUrl: string
  metrics: MetricItem[]
  isFeatured: boolean
  isActive: boolean
}

const initialFormState: ProjectFormState = {
  title: "",
  category: "",
  description: "",
  desktopImage: "",
  mobileImage: "",
  websiteUrl: "",
  metrics: [],
  isFeatured: false,
  isActive: true,
}
```

- [ ] **Step 2: เติม metrics + isFeatured ใน handleEdit**

แก้ `handleEdit` (บรรทัด 109-121) ส่วน `setFormData`:

```ts
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description || "",
      desktopImage: project.desktopImage || "",
      mobileImage: project.mobileImage || "",
      websiteUrl: project.websiteUrl || "",
      metrics: project.metrics ?? [],
      isFeatured: project.isFeatured,
      isActive: project.isActive,
    })
```

- [ ] **Step 3: เพิ่ม handler จัดการแถว metrics**

เพิ่ม 3 ฟังก์ชันนี้ภายใน component (วางหลัง `updateImageField`, ก่อน `handleImageUpload` ราวบรรทัด 137):

```ts
  const addMetric = () => {
    setFormData((prev) =>
      prev.metrics.length >= MAX_METRICS
        ? prev
        : { ...prev, metrics: [...prev.metrics, { value: "", label: "" }] }
    )
  }

  const updateMetric = (index: number, field: keyof MetricItem, value: string) => {
    setFormData((prev) => {
      const metrics = prev.metrics.map((m, i) => (i === index ? { ...m, [field]: value } : m))
      return { ...prev, metrics }
    })
  }

  const removeMetric = (index: number) => {
    setFormData((prev) => ({ ...prev, metrics: prev.metrics.filter((_, i) => i !== index) }))
  }
```

- [ ] **Step 4: กรองแถว metrics ว่างก่อนส่ง**

แก้ `handleSubmit` (บรรทัด 82-107) — สร้าง payload ที่กรอง metrics ว่างออก แล้วใช้แทน `formData`:

```ts
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = {
      ...formData,
      metrics: formData.metrics.filter((m) => m.value.trim() !== "" && m.label.trim() !== ""),
    }

    try {
      if (editingProject) {
        await fetch(`/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      setDialogOpen(false)
      setEditingProject(null)
      setFormData(initialFormState)
      fetchProjects()
    } catch (error) {
      console.error("Failed to save project:", error)
    }
  }
```

- [ ] **Step 5: เพิ่ม UI — featured checkbox + metrics editor ในฟอร์ม**

ในฟอร์ม แทรก block นี้**ก่อน** block checkbox `isActive` เดิม (บรรทัด 441 ที่ขึ้นต้น `<div className="flex items-center gap-3 bg-slate-50...`):

```tsx
              {/* Case Study เด่น */}
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-white/5">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-lime-500 focus:ring-lime-500"
                />
                <Label htmlFor="isFeatured" className="cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
                  แสดงเป็น Case Study เด่น (โชว์พร้อมตัวเลขผลลัพธ์)
                </Label>
              </div>

              {/* ตัวเลขผลลัพธ์ */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-700 dark:text-slate-300">ตัวเลขผลลัพธ์ (สูงสุด {MAX_METRICS} ตัว)</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMetric}
                    disabled={formData.metrics.length >= MAX_METRICS}
                    className="rounded-lg border-slate-200 dark:border-white/10"
                  >
                    <Plus className="w-4 h-4 mr-1" /> เพิ่มตัวเลข
                  </Button>
                </div>
                {formData.metrics.length === 0 ? (
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    ยังไม่มีตัวเลข เช่น ค่า &quot;98/100&quot; กับ label &quot;PageSpeed&quot;
                  </p>
                ) : (
                  <div className="space-y-2">
                    {formData.metrics.map((metric, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={metric.value}
                          onChange={(e) => updateMetric(index, "value", e.target.value)}
                          placeholder="ค่า เช่น 98/100"
                          className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                        />
                        <Input
                          value={metric.label}
                          onChange={(e) => updateMetric(index, "label", e.target.value)}
                          placeholder="label เช่น PageSpeed"
                          className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-lime-500"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMetric(index)}
                          className="shrink-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-400/10 rounded-lg w-9 h-9"
                          aria-label="ลบตัวเลข"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
```

- [ ] **Step 6: ยืนยัน type-check ผ่าน**

Run: `npx tsc --noEmit`
Expected: ไม่มี error (ตรวจว่า `AdminProject` ที่ส่งเข้ามาจาก `projects-page` server component ยัง assignable — ดู Step 7)

- [ ] **Step 7: Map ข้อมูลใน admin page ให้ตรง type ของ prop**

`getAdminProjects` คืน full Project โดย `metrics` เป็น `Prisma.JsonValue` → ไม่ assignable กับ `AdminProject.metrics: MetricItem[] | null` ตรงๆ ต้อง map ก่อนส่ง prop

แก้ `src/app/admin/projects/page.tsx` — เพิ่ม import helper + map projects:

```tsx
import { ProjectsPageClient, type AdminProject } from "@/components/admin/projects-page-client"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/get-session"
import { getAdminProjects } from "@/lib/queries"
import { normalizeMetrics } from "@/lib/project-metrics"

export default async function AdminProjectsPage() {
  const [session, projects] = await Promise.all([
    getSession(),
    getAdminProjects(),
  ])

  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/admin/login")
  }

  const initialProjects: AdminProject[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    desktopImage: p.desktopImage,
    mobileImage: p.mobileImage,
    websiteUrl: p.websiteUrl,
    metrics: normalizeMetrics(p.metrics),
    isFeatured: p.isFeatured,
    isActive: p.isActive,
  }))

  return <ProjectsPageClient initialProjects={initialProjects} />
}
```

(หมายเหตุ: `ProjectsPageClient` export `AdminProject` อยู่แล้ว — `export interface AdminProject`)

- [ ] **Step 8: ยืนยัน type-check ผ่านทั้ง admin form + page**

Run: `npx tsc --noEmit`
Expected: ไม่มี error

- [ ] **Step 9: Commit**

```bash
git add src/components/admin/projects-page-client.tsx src/app/admin/projects/page.tsx
git commit -m "feat(admin): add featured flag and metrics editor to project form"
```

---

### Task 6: Public component — `CaseStudySection`

**Files:**
- Create: `src/components/home/case-study-section.tsx`

- [ ] **Step 1: สร้าง server component**

สร้าง `src/components/home/case-study-section.tsx`:

```tsx
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"
import { getFeaturedProjects } from "@/lib/queries"
import { normalizeMetrics } from "@/lib/project-metrics"
import { ScrollReveal } from "@/components/home/scroll-reveal"

export async function CaseStudySection() {
  const projects = await getFeaturedProjects()
  if (projects.length === 0) return null

  return (
    <section
      id="case-studies"
      className="py-20 md:py-28 border-t border-slate-200 dark:border-white/5 relative z-10 overflow-hidden"
    >
      {/* background accent */}
      <div className="absolute top-1/4 left-0 w-[420px] h-[420px] bg-lime-400/5 dark:bg-lime-400/[0.04] rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
            Case Study
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            ผลลัพธ์ที่<span className="text-lime-500 dark:text-lime-400">วัดได้</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-light max-w-xl mx-auto">
            ไม่ใช่แค่เว็บสวย แต่ทำงานได้จริง — นี่คือตัวเลขจากงานที่เราส่งมอบ
          </p>
        </ScrollReveal>

        <div className="space-y-10 md:space-y-16">
          {projects.map((project, index) => {
            const metrics = normalizeMetrics(project.metrics)
            const imageRight = index % 2 === 1
            return (
              <ScrollReveal key={project.id} delay={index * 100}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                  {/* Screenshot */}
                  <div className={`relative ${imageRight ? "lg:order-2" : ""}`}>
                    <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-lime-400/20 via-emerald-400/10 to-transparent blur-xl pointer-events-none" />
                    <div className="relative overflow-hidden rounded-[22px] border border-slate-200/80 dark:border-white/8 bg-white dark:bg-slate-900/80 shadow-xl">
                      <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-950 overflow-hidden">
                        {/* Browser bar */}
                        <div className="absolute inset-x-0 top-0 h-7 bg-slate-100/98 dark:bg-slate-950/98 border-b border-slate-200 dark:border-slate-800 z-10 flex items-center px-3 gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                          </div>
                          {project.websiteUrl && (
                            <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-800 rounded-full text-[9px] text-slate-400 flex items-center px-2 overflow-hidden">
                              <span className="truncate">{project.websiteUrl}</span>
                            </div>
                          )}
                        </div>
                        {project.desktopImage && (
                          <Image
                            src={project.desktopImage}
                            alt={project.title}
                            fill
                            className="object-cover object-top pt-7"
                            sizes="(max-width: 1023px) 100vw, 50vw"
                            quality={75}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={imageRight ? "lg:order-1" : ""}>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-lime-600 dark:text-lime-400 mb-3">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {project.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-7 max-w-lg">
                        {project.description}
                      </p>
                    )}

                    {/* Stat chips */}
                    {metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-7">
                        {metrics.map((metric, i) => (
                          <div
                            key={i}
                            className="rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-slate-900/60 px-4 py-4 text-center shadow-sm"
                          >
                            <div className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-br from-lime-500 to-emerald-500 dark:from-lime-300 dark:to-emerald-400 bg-clip-text text-transparent leading-none">
                              {metric.value}
                            </div>
                            <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {project.websiteUrl && (
                      <Link
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                      >
                        เข้าชมเว็บไซต์จริง
                        <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/8 flex items-center justify-center group-hover:bg-lime-400 group-hover:text-slate-950 transition-colors">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: ยืนยัน type-check ผ่าน**

Run: `npx tsc --noEmit`
Expected: ไม่มี error (`project.metrics` เป็น `JsonValue` → ส่งเข้า `normalizeMetrics(unknown)` ได้)

- [ ] **Step 3: Commit**

```bash
git add src/components/home/case-study-section.tsx
git commit -m "feat(home): add CaseStudySection rendering featured projects with metrics"
```

---

### Task 7: Wire เข้า page + verification ปลายทาง

**Files:**
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: เพิ่ม import**

ใน `src/app/(public)/page.tsx` เพิ่มหลัง import `PortfolioSection` (บรรทัด 5):

```ts
import { CaseStudySection } from "@/components/home/case-study-section"
```

- [ ] **Step 2: แทรก component ถัดจาก Portfolio section**

หลัง `</section>` ปิดของ Portfolio section (บรรทัด ~338, ก่อน comment `{/* Services Section */}`) เพิ่ม:

```tsx
      {/* Case Study Section — featured projects with metrics */}
      <CaseStudySection />

```

- [ ] **Step 3: Build ผ่าน**

Run: `npm run build`
Expected: build สำเร็จ ไม่มี type error

- [ ] **Step 4: ตรวจจริงบน browser (preview tools)**

1. `preview_start` (หรือใช้ server ที่รันอยู่) เปิดหน้าแรก
2. เข้า admin → แก้ 1 โปรเจค: ติ๊ก "แสดงเป็น Case Study เด่น" + เพิ่มตัวเลข 3 ตัว (เช่น `98/100`/`PageSpeed`, `3 เดือน`/`ติดหน้าแรก Google`, `2 เท่า`/`ลูกค้าติดต่อเพิ่ม`) → บันทึก
3. โหลดหน้าแรกใหม่ → ยืนยัน section "ผลลัพธ์ที่วัดได้" ขึ้นถัดจากผลงาน พร้อม stat chips ถูกต้อง
4. `preview_resize` มือถือ → ยืนยัน stack แนวตั้งอ่านง่าย
5. `preview_console_logs` → ไม่มี error
6. `preview_screenshot` เก็บหลักฐาน desktop + mobile

- [ ] **Step 5: ตรวจ empty state**

นำ featured ออกจากทุกโปรเจค (uncheck) → โหลดหน้าแรก → ยืนยัน section หายไปโดย layout ไม่พัง (component คืน null)
จากนั้นติ๊กกลับ 1 โปรเจคเพื่อให้มีของโชว์

- [ ] **Step 6: Commit**

```bash
git add "src/app/(public)/page.tsx"
git commit -m "feat(home): mount CaseStudySection after portfolio"
```

---

## Self-Review Notes

- **Spec coverage:** data model (Task 1), helper (Task 2), cached query (Task 3), API normalize (Task 4), admin form+featured+metrics (Task 5), public section+stat chips+placement (Task 6-7), empty-state null (Task 6 Step 1 / Task 7 Step 5), verification (Task 7) — ครบทุกหัวข้อใน spec
- **โปรเจคเด่นโชว์ทั้ง 2 ที่:** ตามที่ยืนยัน — ไม่แตะ `PortfolioSection`/คารูเซลเดิม
- **Type consistency:** `MetricItem` + `normalizeMetrics` นิยามครั้งเดียวใน `project-metrics.ts` ใช้ร่วมทุกที่; `getFeaturedProjects` คืน `metrics` ที่ map ผ่าน `normalizeMetrics` ใน component
- **ความเสี่ยงที่ต้องเฝ้า:** Task 5 Step 7 — type ของ `metrics` (Prisma `JsonValue`) ที่ไหลเข้า `AdminProject.metrics: MetricItem[] | null` อาจไม่ assignable ตรงๆ ใน server component ที่ map prop; แก้โดย map ผ่าน `normalizeMetrics` ตอนสร้าง prop
