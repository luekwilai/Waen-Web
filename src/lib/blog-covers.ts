import type { BlogPost } from "./blog"

// Kept separate from blog.ts so client components can use it without bundling every article.
// Maps a post slug to its cover file in /public/creative-home/images/articles (without .webp).
const LOCAL_COVERS: Record<string, string> = {
  "website-2026-trend-thurai-thai-tong-ru": "context-trends",
  "content-marketing-samnab-website-thurakit-thai": "context-content",
  "an-analytics-website-yang-rai-hai-pen-prayot-tor-thurakit": "context-analytics",
  "tham-website-thurakit-rakha-thaurai": "cover-pricing",
  "wordpress-vs-website-samret-rup-aukhrai-dee": "cover-wordpress-vs-builder",
  "seo-khue-arai-thammai-website-thurakit-tong-tham": "cover-seo",
  "tham-web-ranchakha-ounlain-tong-priam-arai": "cover-ecommerce-prep",
  "website-roongrub-mue-thue-samkhan-khae-nai": "cover-mobile-friendly",
  "jang-tham-web-tong-ru-arai-kon-jai-ngern": "cover-hiring-checklist",
  "google-my-business-kue-arai-thammai-thurakit-tong-sai": "cover-google-business",
  "landing-page-vs-website-tang-kan-yang-rai": "cover-landing-vs-website",
  "web-nai-chaa-phro-arai-witi-kae-hai-reo": "cover-slow-website",
  "portfolio-website-samkhan-khae-nai-samnab-freelance": "cover-portfolio",
  "ux-ui-design-kue-arai-thammai-samkhan-kwa-khwam-suay": "cover-ux-ui",
  "pdpa-kue-arai-website-thurakit-tong-priam-tua": "cover-pdpa",
  "duu-lae-website-lang-song-mop-khuan-tham-arai-bang": "cover-maintenance",
  "line-oa-vs-website-tham-ngan-ruam-kan-yang-rai": "cover-line-oa-website",
}

/** Cover image path: our own artwork when available, otherwise the post's image URL. */
export function getBlogCover(post: Pick<BlogPost, "slug" | "image">): string {
  const name = LOCAL_COVERS[post.slug]
  return name ? `/creative-home/images/articles/${name}.webp` : post.image
}
