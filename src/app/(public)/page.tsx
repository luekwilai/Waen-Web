import CreativeHome from "@/components/creative-home/page"
import { packages, questions } from "@/components/creative-home/home-content"
import type { Metadata } from "next"
import { getParticleBackgroundConfig } from "@/lib/queries"

const SITE_URL = "https://waenweb.com"
const TITLE = "รับทำเว็บไซต์ธุรกิจ & WordPress | ออกแบบเว็บ SEO-ready – WAENWEB"
const DESCRIPTION =
  "รับทำเว็บไซต์ธุรกิจ WordPress และร้านค้าออนไลน์ ออกแบบเฉพาะแบรนด์ รองรับมือถือ วางโครงสร้าง SEO พร้อมดูแลหลังส่งมอบ เริ่มต้น 10,000 บาท ปรึกษาฟรี"
const OG_IMAGE = `${SITE_URL}/creative-home/images/pricing/custom-package.webp`

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "WAENWEB",
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/`,
    images: [{ url: OG_IMAGE, width: 1400, height: 700, alt: "WAENWEB รับทำเว็บไซต์ธุรกิจและ WordPress" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
}

const toPrice = (price: string) => price.replaceAll(",", "")

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: "WAENWEB",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/apple-touch-icon.png`,
      image: OG_IMAGE,
      description: DESCRIPTION,
      email: "thawatsak28@gmail.com",
      areaServed: { "@type": "Country", name: "Thailand" },
      knowsLanguage: ["th", "en"],
      priceRange: "฿10,000 - ฿35,900",
      sameAs: ["https://line.me/ti/p/~thawatsak"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "thawatsak28@gmail.com",
        url: "https://line.me/ti/p/~thawatsak",
        availableLanguage: ["th", "en"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "แพ็กเกจรับทำเว็บไซต์",
        itemListElement: packages.map((p) => ({
          "@type": "Offer",
          name: `แพ็กเกจ ${p.name}`,
          description: `${p.desc} · ${p.features.join(" · ")}`,
          price: toPrice(p.price),
          priceCurrency: "THB",
          url: `${SITE_URL}/#pricing`,
          itemOffered: { "@type": "Service", name: `รับทำเว็บไซต์ ${p.name}`, serviceType: "Web design and development" },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "WAENWEB",
      inLanguage: "th-TH",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: questions.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
}

export default async function HomePage() {
  const initialParticleConfig = await getParticleBackgroundConfig()

  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so content can never close the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CreativeHome initialParticleConfig={initialParticleConfig} />
    </>
  )
}
