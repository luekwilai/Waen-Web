// Curated Unsplash photo IDs per service icon — no API key needed
const ICON_TO_PHOTO_ID: Record<string, string> = {
  Smartphone: "1512941937938-b3d18ab66fb2",
  Search:     "1432888498266-38ffec3eaf0a",
  ShoppingCart:"1563013544-824ae1b704d3",
  ShieldCheck: "1550751827-4bd374c3f58b",
  Headphones:  "1486312338219-ce68d2c6f44d",
  Clock:       "1506784983877-45594efa4cbe",
  Globe:       "1460925895917-afdab827c52f",
  Code2:       "1461749280684-dccba630e2f6",
  Star:        "1499750310107-5fef28a66643",
  Zap:         "1518770660439-4636190af475",
  Lock:        "1555421689-3f034debb9a6",
  BarChart2:   "1551288049-bebda4e38f71",
}

export function fetchUnsplashImage(iconName: string): string | null {
  const id = ICON_TO_PHOTO_ID[iconName]
  if (!id) return null
  return `https://images.unsplash.com/photo-${id}?w=600&q=80&fit=crop&auto=format`
}
