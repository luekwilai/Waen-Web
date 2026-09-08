export const MIN_PAGE_COUNT = 1;
export const MAX_PAGE_COUNT = 30;

export type QuoteItem = {
  id: string;
  label: string;
  detail?: string;
  amount: number;
  kind: 'base' | 'pages' | 'addon';
};

export type Quote = {
  pageCount: number;
  featureIds: string[];
  items: QuoteItem[];
  total: number;
};

export const QUOTE_FEATURES = [
  { id: 'seo', label: 'วางโครงสร้าง SEO', description: 'ตั้งค่าพื้นฐานให้เว็บไซต์พร้อมให้ค้นหา', price: 5_900 },
  { id: 'shop', label: 'ระบบร้านค้าออนไลน์', description: 'แคตตาล็อกสินค้า ตะกร้า และขั้นตอนสั่งซื้อ', price: 10_000 },
  { id: 'bilingual', label: 'เว็บไซต์ 2 ภาษา', description: 'เพิ่มภาษาไทยและอังกฤษในหน้าเว็บไซต์', price: 6_000 },
  { id: 'blog', label: 'บทความ / บล็อก', description: 'พื้นที่จัดการและแสดงบทความ', price: 3_000 },
  { id: 'booking', label: 'ระบบจองคิว', description: 'รับคำขอนัดหมายจากผู้เข้าชม', price: 8_000 },
  { id: 'contact-form', label: 'ฟอร์มติดต่อ', description: 'ฟอร์มรับข้อความพร้อมอีเมลแจ้งเตือน', price: 1_500 },
] as const;

/** Alias kept short for integration code and model tests. */
export const FEATURES = QUOTE_FEATURES;

const formatPageDetail = (pageCount: number) => `${pageCount} หน้า`;
const pageCost = (pages: number) => Math.min(pages - 1, 2) * 3_000 + Math.max(pages - 3, 0) * 2_000;

export function clampPageCount(value: unknown): number {
  const number = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(number)) return MIN_PAGE_COUNT;
  return Math.min(MAX_PAGE_COUNT, Math.max(MIN_PAGE_COUNT, Math.trunc(number)));
}

export function calculateQuote(pageCount: unknown, featureIds: readonly unknown[] = []): Quote {
  const pages = clampPageCount(pageCount);
  const knownIds: Set<string> = new Set(QUOTE_FEATURES.map((feature) => feature.id));
  const uniqueFeatureIds = Array.from(new Set(featureIds.filter((id): id is string => typeof id === 'string' && knownIds.has(id))));
  const items: QuoteItem[] = [
    { id: 'base', label: 'แพ็กเกจเริ่มต้น', detail: 'รวม 1 หน้า และรองรับทุกหน้าจอ', amount: 10_000, kind: 'base' },
  ];

  if (pages > 1) {
    items.push({ id: 'pages', label: 'จำนวนหน้าเว็บไซต์', detail: `${formatPageDetail(pages)} (เพิ่ม ${pages - 1} หน้า)`, amount: pageCost(pages), kind: 'pages' });
  }

  for (const feature of QUOTE_FEATURES) {
    if (uniqueFeatureIds.includes(feature.id)) {
      items.push({ id: feature.id, label: feature.label, amount: feature.price, kind: 'addon' });
    }
  }

  return { pageCount: pages, featureIds: uniqueFeatureIds, items, total: items.reduce((total, item) => total + item.amount, 0) };
}
