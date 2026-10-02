import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react"
import { BlogHeader, BlogFooter } from "@/components/blog/blog-shell"
import portfolioProjects from "@/components/creative-home/portfolio-data.json"
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies"
import { getService } from "@/lib/services"
import styles from "@/components/marketing/landing.module.css"

type Props = { params: Promise<{ slug: string }> }

const SITE_URL = "https://waenweb.com"

export const dynamicParams = false

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }))
}

const findProject = (title: string) => portfolioProjects.find((project) => project.title === title)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  const project = study && findProject(study.project)
  if (!study || !project) return {}
  const title = `ผลงาน ${study.project}: ${study.websiteType} | WAENWEB`
  const url = `${SITE_URL}/work/${study.slug}`
  return {
    title: { absolute: title },
    description: study.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "th_TH",
      siteName: "WAENWEB",
      title,
      description: study.summary,
      url,
      images: [{ url: project.sourceDesktopImage ?? project.desktopImage, alt: `หน้าเว็บไซต์ ${study.project}` }],
    },
    twitter: { card: "summary_large_image", title, description: study.summary },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  const project = study && findProject(study.project)
  if (!study || !project) notFound()

  const url = `${SITE_URL}/work/${study.slug}`
  const service = getService(study.service)
  const others = CASE_STUDIES.filter((s) => s.slug !== study.slug).slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: `เว็บไซต์ ${study.project}`,
        description: study.summary,
        url,
        image: project.sourceDesktopImage ?? project.desktopImage,
        inLanguage: "th-TH",
        dateModified: study.updated,
        creator: { "@id": `${SITE_URL}/#organization` },
        about: { "@type": "WebSite", name: study.project, url: project.websiteUrl },
        keywords: study.stack.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "ผลงาน", item: `${SITE_URL}/work` },
          { "@type": "ListItem", position: 3, name: study.project, item: url },
        ],
      },
    ],
  }

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <BlogHeader />
      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="เส้นทางนำทาง">
          <Link href="/work"><ArrowLeft size={15} aria-hidden="true" /> ผลงานทั้งหมด</Link>
          <span>{study.industry}</span>
        </nav>

        <header className={styles.hero}>
          <p className={styles.eyebrow}>CASE STUDY / {project.category.toUpperCase()}</p>
          <h1>{study.project}</h1>
          <p className={styles.lead}>{study.summary}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={project.websiteUrl} target="_blank" rel="noreferrer">เปิดเว็บไซต์จริง <ArrowUpRight size={18} aria-hidden="true" /></a>
            <Link className={styles.secondary} href="/#contact">อยากได้เว็บแบบนี้ <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </header>

        <section className={styles.section} aria-label="ภาพหน้าเว็บไซต์">
          <div className={styles.shots}>
            {/* eslint-disable-next-line @next/next/no-img-element -- already optimised by the image CDN */}
            <img className={styles.shotDesktop} src={project.desktopImage} alt={`หน้าเว็บไซต์ ${study.project} บนคอมพิวเตอร์`} width={828} height={518} />
            {/* eslint-disable-next-line @next/next/no-img-element -- already optimised by the image CDN */}
            <img className={styles.shotMobile} src={project.mobileImage} alt={`หน้าเว็บไซต์ ${study.project} บนมือถือ`} width={384} height={760} loading="lazy" />
          </div>
        </section>

        <section className={styles.section} aria-label="ข้อมูลโปรเจกต์">
          <dl className={styles.facts}>
            <div><dt>ธุรกิจ</dt><dd>{study.industry}</dd></div>
            <div><dt>ประเภทเว็บไซต์</dt><dd>{study.websiteType}</dd></div>
            <div><dt>ภาษา</dt><dd>{study.languages}</dd></div>
            <div><dt>แพลตฟอร์ม</dt><dd>{study.stack[0]}</dd></div>
          </dl>
        </section>

        <section className={`${styles.section} ${styles.prose}`}>
          <h2>โจทย์ของโปรเจกต์</h2>
          {study.brief.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section className={styles.section} aria-labelledby="structure-title">
          <h2 id="structure-title">โครงสร้างเว็บไซต์</h2>
          <ul className={styles.checklist}>
            {study.structure.map((item) => <li key={item}><Check size={18} aria-hidden="true" />{item}</li>)}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="features-title">
          <h2 id="features-title">ฟีเจอร์เด่น</h2>
          <div className={styles.grid}>
            {study.features.map((feature) => (
              <article className={styles.card} key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="stack-title">
          <h2 id="stack-title">เทคโนโลยีที่ใช้</h2>
          <ul className={styles.chips}>
            {study.stack.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </section>

        {service && (
          <section className={styles.cta}>
            <div>
              <p className={styles.eyebrow}>RELATED SERVICE</p>
              <h2>{service.keyword}</h2>
              <p>ดูขอบเขตงาน แพ็กเกจ และคำถามที่พบบ่อยของบริการนี้</p>
            </div>
            <Link className={styles.primary} href={`/services/${service.slug}`}>ดูรายละเอียดบริการ <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </section>
        )}

        <nav className={styles.section} aria-labelledby="more-work-title">
          <h2 id="more-work-title">ผลงานอื่น</h2>
          <div className={styles.links}>
            {others.map((other) => (
              <Link href={`/work/${other.slug}`} key={other.slug}>{other.project} <ArrowUpRight size={16} aria-hidden="true" /></Link>
            ))}
          </div>
        </nav>
      </main>
      <BlogFooter />
    </div>
  )
}
