import { BlogHeader, BlogFooter } from "@/components/blog/blog-shell"
import styles from "@/components/blog/blog-detail.module.css"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from "lucide-react"
import Image from "next/image"
import { getAllBlogPosts, getBlogPost } from "@/lib/blog"
import { renderMarkdown } from "@/lib/markdown"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://waenweb.com/blog/${slug}` },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://waenweb.com/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.title }],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()


  const allPosts = getAllBlogPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prev = allPosts[currentIndex + 1] ?? null
  const next = allPosts[currentIndex - 1] ?? null

  const htmlContent = renderMarkdown(post.content)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "th-TH",
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://waenweb.com/blog/${slug}` },
    author: { "@type": "Organization", name: "WAENWEB" },
    publisher: {
      "@type": "Organization",
      name: "WAENWEB",
      url: "https://waenweb.com",
      logo: { "@type": "ImageObject", url: "https://waenweb.com/waenweb-logo-r1.svg" },
    },
    url: `https://waenweb.com/blog/${slug}`,
  }

  const covers: Record<string, string> = {
    "website-2026-trend-thurai-thai-tong-ru": "trends",
    "content-marketing-samnab-website-thurakit-thai": "content",
    "an-analytics-website-yang-rai-hai-pen-prayot-tor-thurakit": "analytics",
  }
  const image = covers[slug] ? `/creative-home/images/articles/editorial-${covers[slug]}.webp` : post.image
  const headings: { id: string; title: string }[] = []
  const content = htmlContent.replace(/<h2>(.*?)<\/h2>/g, (_, title: string) => {
    const id = `section-${headings.length + 1}`
    headings.push({ id, title: title.replace(/<[^>]*>/g, "") })
    return `<h2 id="${id}">${title}</h2>`
  })
  return <div className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <BlogHeader />
    <main id="blog-main" className={styles.main}>
      <nav className={styles.breadcrumb} aria-label="เส้นทางนำทาง"><Link href="/blog"><ArrowLeft size={15} aria-hidden="true" /> บทความทั้งหมด</Link><span>{post.category}</span></nav>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>WAENWEB JOURNAL / {post.category}</p>
        <h1>{post.title}</h1><p className={styles.description}>{post.description}</p>
        <div className={styles.meta}><span><Calendar size={15} aria-hidden="true" />{new Date(post.date).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}</span><span><Clock size={15} aria-hidden="true" />อ่าน {post.readTime}</span><span>โดย WAENWEB Studio</span></div>
        <div className={styles.cover}><Image src={image} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 1100px" /></div>
      </header>
      <div className={styles.reading}>
        <aside className={styles.sidebar}><nav aria-label="สารบัญบทความ"><p className={styles.eyebrow}>ในบทความนี้</p>{headings.map(h=><a href={`#${h.id}`} key={h.id}>{h.title}</a>)}</nav><Link className={styles.discuss} href="/#contact">มีโปรเจกต์ในใจ?<br /><strong>คุยกับเรา <ArrowUpRight size={16} aria-hidden="true" /></strong></Link></aside>
        <article className={styles.prose} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <nav className={styles.related} aria-label="อ่านบทความต่อ">{[prev, next].filter(p=>p !== null).map(p=><Link href={`/blog/${p.slug}`} key={p.slug}><span>อ่านต่อ / {p.category}</span><h2>{p.title}</h2><ArrowUpRight size={22} aria-hidden="true" /></Link>)}</nav>
      <section className={styles.cta}><div><p className={styles.eyebrow}>FROM IDEAS TO YOUR WEBSITE</p><h2>เปลี่ยนไอเดีย<br />ให้เป็นเว็บไซต์ของคุณ.</h2><p>คุยเรื่องเป้าหมายและวางแผนเว็บไซต์ไปด้วยกัน</p></div><Link href="/#contact">เริ่มโปรเจกต์กัน <ArrowUpRight size={20} aria-hidden="true" /></Link></section>
    </main><BlogFooter />
  </div>
}
