import type { MetadataRoute } from "next"
import { getAllBlogPosts } from "@/lib/blog"
import { SERVICES } from "@/lib/services"

// lastModified should reflect real content changes, not build time, so search engines keep trusting it.
const LEGAL_UPDATED = new Date("2026-03-13")

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://waenweb.com"
  const posts = getAllBlogPosts()
  const postUpdated = (post: (typeof posts)[number]) => new Date(post.updated ?? post.date)

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: postUpdated(post),
    changeFrequency: "monthly",
    priority: 0.7,
  }))
  const latestPost = new Date(Math.max(...posts.map((post) => postUpdated(post).getTime())))

  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: new Date(service.updated),
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...serviceEntries,
    { url: `${base}/blog`, lastModified: latestPost, changeFrequency: "weekly", priority: 0.8 },
    ...blogEntries,
    { url: `${base}/privacy-policy`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms-of-use`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  ]
}
