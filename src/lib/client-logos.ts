import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"

export type ClientLogo = {
  title: string
  siteUrl: string
  logoUrl: string
}

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

const FETCH_TIMEOUT_MS = 6000

function absUrl(base: string, url: string): string | null {
  try {
    return new URL(url, base).href
  } catch {
    return null
  }
}

/**
 * Extract the most likely logo URL from a page's HTML.
 * Priority: header <img> mentioning "logo" → apple-touch-icon → <link rel=icon> → /favicon.ico
 */
function extractLogoUrl(html: string, baseUrl: string): string | null {
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0])
  for (const tag of imgs) {
    if (!/logo/i.test(tag)) continue
    const src =
      tag.match(/\bsrc=["']([^"']+)["']/i)?.[1] ||
      tag.match(/\bdata-src=["']([^"']+)["']/i)?.[1]
    if (src && !src.startsWith("data:")) {
      const u = absUrl(baseUrl, src)
      if (u) return u
    }
  }

  const touch = html.match(
    /<link\b[^>]*rel=["'][^"']*apple-touch-icon[^"']*["'][^>]*>/i
  )?.[0]
  if (touch) {
    const href = touch.match(/\bhref=["']([^"']+)["']/i)?.[1]
    if (href) {
      const u = absUrl(baseUrl, href)
      if (u) return u
    }
  }

  const icons = [...html.matchAll(/<link\b[^>]*rel=["'][^"']*icon[^"']*["'][^>]*>/gi)].map(
    (m) => m[0]
  )
  for (const tag of icons) {
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1]
    if (href && !href.startsWith("data:")) {
      const u = absUrl(baseUrl, href)
      if (u) return u
    }
  }

  return absUrl(baseUrl, "/favicon.ico")
}

async function resolveLogo(siteUrl: string): Promise<string | null> {
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS)
    const res = await fetch(siteUrl, {
      headers: { "user-agent": UA, accept: "text/html" },
      signal: ctrl.signal,
      redirect: "follow",
      cache: "no-store",
    })
    clearTimeout(timer)
    if (!res.ok) return null
    const html = await res.text()
    return extractLogoUrl(html, res.url || siteUrl)
  } catch {
    return null
  }
}

/**
 * Pull client logos straight from each client's live website.
 * Cached for 24h; sites that fail to resolve are silently skipped.
 */
export const getClientLogos = unstable_cache(
  async (): Promise<ClientLogo[]> => {
    const projects = await prisma.project.findMany({
      where: { isActive: true, websiteUrl: { not: null } },
      orderBy: { sortOrder: "asc" },
      select: { title: true, websiteUrl: true },
    })

    const settled = await Promise.allSettled(
      projects.map(async (p) => {
        const logoUrl = await resolveLogo(p.websiteUrl as string)
        return logoUrl
          ? ({ title: p.title, siteUrl: p.websiteUrl as string, logoUrl } satisfies ClientLogo)
          : null
      })
    )

    return settled
      .filter(
        (r): r is PromiseFulfilledResult<ClientLogo> =>
          r.status === "fulfilled" && r.value !== null
      )
      .map((r) => r.value)
  },
  ["client-logos"],
  { revalidate: 86400 }
)
