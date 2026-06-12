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
