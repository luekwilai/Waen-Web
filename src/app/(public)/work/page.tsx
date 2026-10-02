import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BlogHeader, BlogFooter } from "@/components/blog/blog-shell"
import portfolioProjects from "@/components/creative-home/portfolio-data.json"
import { CASE_STUDIES } from "@/lib/case-studies"
import styles from "@/components/marketing/landing.module.css"

const TITLE = "ผลงานออกแบบและทำเว็บไซต์ | WAENWEB"
const DESCRIPTION =
  "รวมผลงานออกแบบและพัฒนาเว็บไซต์ของ WAENWEB ทั้งเว็บไซต์คลินิกทันตกรรม โครงการอสังหาริมทรัพย์ เว็บไซต์บริษัท และร้านค้าออนไลน์ พร้อมรายละเอียดโครงสร้างและฟีเจอร์ของแต่ละโปรเจกต์"

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "https://waenweb.com/work" },
  openGraph: { type: "website", locale: "th_TH", siteName: "WAENWEB", title: TITLE, description: DESCRIPTION, url: "https://waenweb.com/work" },
}

export default function WorkIndexPage() {
  const studies = CASE_STUDIES.map((study) => ({ study, project: portfolioProjects.find((p) => p.title === study.project) }))

  return (
    <div className={styles.page}>
      <BlogHeader />
      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="เส้นทางนำทาง">
          <Link href="/#portfolio"><ArrowLeft size={15} aria-hidden="true" /> กลับหน้าแรก</Link>
          <span>ผลงาน</span>
        </nav>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>SELECTED WORK / CASE STUDIES</p>
          <h1>ผลงานออกแบบและทำเว็บไซต์</h1>
          <p className={styles.lead}>เบื้องหลังเว็บไซต์ที่เราออกแบบและพัฒนาให้ธุรกิจหลากหลายประเภท ทั้งโจทย์ของแต่ละโปรเจกต์ โครงสร้างเว็บไซต์ และเทคโนโลยีที่ใช้</p>
        </header>
        <section className={styles.section} aria-label="รายการผลงาน">
          <div className={styles.grid}>
            {studies.map(({ study, project }) => (
              <Link className={styles.work} href={`/work/${study.slug}`} key={study.slug}>
                {project && (
                  // eslint-disable-next-line @next/next/no-img-element -- already optimised by the image CDN
                  <img src={project.desktopImage} alt={`หน้าเว็บไซต์ ${study.project}`} loading="lazy" decoding="async" width={828} height={518} />
                )}
                <span>{study.industry}</span>
                <h2 className={styles.workTitle}>{study.project}</h2>
                <p>{study.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <BlogFooter />
    </div>
  )
}
