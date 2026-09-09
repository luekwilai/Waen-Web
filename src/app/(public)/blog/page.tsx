import type { Metadata } from "next"
import { getAllBlogPosts } from "@/lib/blog"
import { BlogHeader, BlogFooter } from "@/components/blog/blog-shell"
import { BlogPostsGrid } from "@/components/blog/blog-posts-grid"
import styles from "./blog-index.module.css"

export const metadata: Metadata = { title: { absolute: "บทความสำหรับคนทำธุรกิจ | WAENWEB" }, description: "บทความให้ความรู้เรื่องเว็บไซต์ WordPress SEO และธุรกิจออนไลน์จาก WAENWEB", alternates: { canonical: "https://waenweb.com/blog" }, openGraph: { title: "บทความสำหรับคนทำธุรกิจ | WAENWEB", description: "ความรู้เรื่องเว็บไซต์ SEO และธุรกิจออนไลน์จาก WAENWEB", url: "https://waenweb.com/blog", type: "website", images: ["/creative-home/images/articles/context-trends.webp"] }, robots: { index: true, follow: true } }

export default function BlogPage() {
  const posts = getAllBlogPosts()
  return <div className={styles.page}><BlogHeader /><main className={styles.main}>
    <section className={styles.hero}><div><span className={styles.kicker}>WAENWEB / FIELD NOTES</span><h1>บทความสำหรับ<br /><em>คนทำธุรกิจ.</em></h1></div><div className={styles.intro}><p>มุมมอง เครื่องมือ และบทเรียนจากการทำเว็บไซต์ให้ธุรกิจไทย อ่านง่าย ใช้ได้จริง และเริ่มต้นได้ทันที</p><span>{posts.length} บทความ · อัปเดตจากประสบการณ์จริง</span></div></section>
    <section className={styles.library} aria-labelledby="library-title"><div className={styles.libraryHead}><div><span className={styles.kicker}>THE LIBRARY</span><h2 id="library-title">เลือกเรื่องที่อยากรู้</h2></div><p>ค้นหาและกรองตามหัวข้อที่สนใจ</p></div><BlogPostsGrid posts={posts} /></section>
  </main><BlogFooter /></div>
}
