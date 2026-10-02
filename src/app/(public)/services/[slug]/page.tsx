import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Check, Clock } from "lucide-react"
import { BlogHeader, BlogFooter } from "@/components/blog/blog-shell"
import { packages } from "@/components/creative-home/home-content"
import portfolioProjects from "@/components/creative-home/portfolio-data.json"
import { SERVICES, getService } from "@/lib/services"
import styles from "./service.module.css"

type Props = { params: Promise<{ slug: string }> }

const SITE_URL = "https://waenweb.com"
const LINE_URL = "https://line.me/ti/p/~thawatsak"

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  const url = `${SITE_URL}/services/${service.slug}`
  return {
    title: { absolute: service.title },
    description: service.description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "th_TH", siteName: "WAENWEB", title: service.title, description: service.description, url },
    twitter: { card: "summary_large_image", title: service.title, description: service.description },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const url = `${SITE_URL}/services/${service.slug}`
  const servicePackages = service.packages
    .map((name) => packages.find((p) => p.name === name))
    .filter((p): p is (typeof packages)[number] => Boolean(p))
  const projects = service.projects
    .map((title) => portfolioProjects.find((project) => project.title === title))
    .filter((project): project is (typeof portfolioProjects)[number] => Boolean(project))
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.keyword,
        description: service.description,
        url,
        serviceType: service.keyword,
        areaServed: { "@type": "Country", name: "Thailand" },
        provider: { "@id": `${SITE_URL}/#organization` },
        offers: servicePackages.map((p) => ({
          "@type": "Offer",
          name: `แพ็กเกจ ${p.name}`,
          price: p.price.replaceAll(",", ""),
          priceCurrency: "THB",
          url,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "บริการ", item: `${SITE_URL}/#services` },
          { "@type": "ListItem", position: 3, name: service.keyword, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  }

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <BlogHeader />
      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="เส้นทางนำทาง">
          <Link href="/#services"><ArrowLeft size={15} aria-hidden="true" /> บริการทั้งหมด</Link>
          <span>{service.keyword}</span>
        </nav>

        <header className={styles.hero}>
          <p className={styles.eyebrow}>WAENWEB SERVICES / {service.eyebrow}</p>
          <h1>{service.keyword}</h1>
          <p className={styles.lead}>{service.intro}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/#contact">ปรึกษาและประเมินราคาฟรี <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a className={styles.secondary} href={LINE_URL} target="_blank" rel="noreferrer">คุยผ่าน LINE <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="audience-title">
          <h2 id="audience-title">เหมาะกับใคร</h2>
          <ul className={styles.checklist}>
            {service.audience.map((item) => <li key={item}><Check size={18} aria-hidden="true" />{item}</li>)}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="deliverables-title">
          <h2 id="deliverables-title">สิ่งที่คุณจะได้รับ</h2>
          <div className={styles.grid}>
            {service.deliverables.map((item) => (
              <article className={styles.card} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        {service.sections.map((section) => (
          <section className={`${styles.section} ${styles.prose}`} key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}

        {servicePackages.length > 0 && (
          <section className={styles.section} aria-labelledby="packages-title">
            <h2 id="packages-title">แพ็กเกจที่แนะนำ</h2>
            <div className={styles.grid}>
              {servicePackages.map((p) => (
                <article className={styles.card} key={p.name}>
                  <p className={styles.eyebrow}>{p.name}</p>
                  <h3>{p.desc}</h3>
                  <p className={styles.price}><span>฿</span>{p.price}</p>
                  <p className={styles.duration}><Clock size={14} aria-hidden="true" /> ระยะเวลา {p.time}</p>
                  <ul className={styles.features}>
                    {p.features.map((feature) => <li key={feature}><Check size={15} aria-hidden="true" />{feature}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <p className={styles.note}>ราคาแพ็กเกจไม่รวม Hosting และ Domain · งานสั่งทำเริ่มต้น 10,000 บาท · ยืนยันขอบเขตงานก่อนเริ่มโปรเจกต์ · <Link href="/#pricing">ดูแพ็กเกจทั้งหมด</Link></p>
          </section>
        )}

        {projects.length > 0 && (
          <section className={styles.section} aria-labelledby="work-title">
            <h2 id="work-title">ผลงานที่เกี่ยวข้อง</h2>
            <div className={styles.grid}>
              {projects.map((project) => (
                <a className={styles.work} href={project.websiteUrl} target="_blank" rel="noreferrer" key={project.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- already optimised by the image CDN */}
                  <img src={project.desktopImage} alt={`ตัวอย่างหน้าเว็บไซต์ ${project.title}`} loading="lazy" decoding="async" width={828} height={518} />
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className={styles.section} aria-labelledby="faq-title">
          <h2 id="faq-title">คำถามที่พบบ่อย</h2>
          <div className={styles.faq}>
            {service.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <nav className={styles.section} aria-labelledby="more-title">
          <h2 id="more-title">บริการอื่นของเรา</h2>
          <div className={styles.links}>
            {otherServices.map((other) => (
              <Link href={`/services/${other.slug}`} key={other.slug}>{other.keyword} <ArrowUpRight size={16} aria-hidden="true" /></Link>
            ))}
          </div>
        </nav>

        <section className={styles.cta}>
          <div>
            <p className={styles.eyebrow}>LET&apos;S TALK</p>
            <h2>เล่าไอเดียให้เราฟัง</h2>
            <p>ปรึกษาและประเมินราคาฟรี ยังไม่ต้องตัดสินใจตอนนี้ก็ได้</p>
          </div>
          <Link className={styles.primary} href="/#contact">เริ่มโปรเจกต์กัน <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </section>
      </main>
      <BlogFooter />
    </div>
  )
}
