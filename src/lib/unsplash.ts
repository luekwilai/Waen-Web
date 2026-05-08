const ICON_TO_QUERY: Record<string, string> = {
  Smartphone: "mobile responsive website design",
  Search: "SEO search engine optimization",
  ShoppingCart: "ecommerce online store",
  ShieldCheck: "web security protection",
  Headphones: "customer support service",
  Clock: "fast website performance",
  Globe: "professional web design",
  Code2: "web development coding",
  Star: "premium quality design",
  Zap: "fast speed technology",
  Lock: "digital security",
  BarChart2: "analytics data dashboard",
}

export async function fetchUnsplashImage(
  iconName: string,
  unsplashQuery?: string
): Promise<string | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) return null

  const query = unsplashQuery || ICON_TO_QUERY[iconName] || "web design"

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high`,
      {
        headers: { Authorization: `Client-ID ${key}` },
        next: { revalidate: 86400 }, // cache 24h
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    return (data.urls?.small as string) ?? null
  } catch {
    return null
  }
}
