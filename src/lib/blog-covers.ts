import type { BlogPost } from "./blog"

// Kept separate from blog.ts so client components can use it without bundling every article.
const LOCAL_COVERS: Record<string, string> = {
  "website-2026-trend-thurai-thai-tong-ru": "context-trends",
  "content-marketing-samnab-website-thurakit-thai": "context-content",
  "an-analytics-website-yang-rai-hai-pen-prayot-tor-thurakit": "context-analytics",
}

/** Cover image path: our own artwork when available, otherwise the post's image URL. */
export function getBlogCover(post: Pick<BlogPost, "slug" | "image">): string {
  const name = LOCAL_COVERS[post.slug]
  return name ? `/creative-home/images/articles/${name}.webp` : post.image
}
