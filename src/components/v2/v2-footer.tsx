import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Facebook, Instagram, Mail, MessageCircle, Youtube } from "lucide-react"

type Props = {
  email: string
  lineId: string
  logoUrl?: string
  siteName?: string
  socialFacebook?: string
  socialInstagram?: string
  socialYoutube?: string
  serviceNames?: string[]
}

export function V2Footer({ email, lineId, logoUrl, siteName = "WAENWEB", socialFacebook = "", socialInstagram = "", socialYoutube = "", serviceNames = [] }: Props) {
  const services = serviceNames.length > 0 ? serviceNames : ["Web Design", "Development", "E-Commerce", "SEO", "Website Care"]
  const usesDefaultLogo = !logoUrl || logoUrl === "/waenweb-logo-r1.svg" || logoUrl === "/waenweb-logo.svg"
  const footerLogoUrl = usesDefaultLogo ? "/waenweb-logo-inverse.svg" : logoUrl
  const socials = [
    socialFacebook ? { href: socialFacebook, label: "Facebook", icon: Facebook } : null,
    socialInstagram ? { href: socialInstagram, label: "Instagram", icon: Instagram } : null,
    socialYoutube ? { href: socialYoutube, label: "YouTube", icon: Youtube } : null,
  ].filter((item): item is { href: string; label: string; icon: typeof Facebook } => item !== null)

  return (
    <footer className="border-t border-white/10 bg-[#0f110f] text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/v2" className="inline-flex items-center gap-3 text-3xl font-black tracking-[-0.045em]">{footerLogoUrl ? <Image src={footerLogoUrl} alt="" width={38} height={38} className={usesDefaultLogo ? "h-9 w-9 object-contain" : "h-9 w-9 rounded-xl bg-white object-contain"} /> : null}{siteName.toUpperCase() === "WAENWEB" ? "waenweb" : siteName}</Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/50">ออกแบบเว็บไซต์และพัฒนาระบบที่ช่วยให้ธุรกิจดูน่าเชื่อถือ ใช้งานง่าย โหลดเร็ว และพร้อมเติบโตในระยะยาว</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-white/70 transition-colors hover:border-[#9ee800] hover:text-[#9ee800]"><Mail className="h-4 w-4" /> {email}</a>
              <a href={`https://line.me/ti/p/~${lineId}`} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-white/70 transition-colors hover:border-[#9ee800] hover:text-[#9ee800]"><MessageCircle className="h-4 w-4" /> LINE: {lineId}</a>
            </div>
            {socials.length > 0 ? <div className="mt-5 flex gap-2">{socials.map(({ href, label, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer noopener" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/55 transition hover:border-[#9ee800] hover:text-[#9ee800]"><Icon className="h-4 w-4" /></a>)}</div> : null}
          </div>

          <div className="lg:col-span-2 lg:col-start-7"><h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9ee800]">เมนู</h3><ul className="mt-5 space-y-3 text-sm text-white/55"><li><Link className="hover:text-white" href="/v2#portfolio">ผลงาน</Link></li><li><Link className="hover:text-white" href="/v2#packages">แพ็กเกจ</Link></li><li><Link className="hover:text-white" href="/v2/blog">บทความ</Link></li><li><Link className="hover:text-white" href="/v2#contact">ติดต่อเรา</Link></li></ul></div>
          <div className="lg:col-span-2"><h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9ee800]">บริการ</h3><ul className="mt-5 space-y-3 text-sm text-white/55">{services.map((service) => <li key={service}>{service}</li>)}</ul></div>
          <div className="lg:col-span-3"><h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9ee800]">พร้อมเริ่มหรือยัง?</h3><p className="mt-5 text-sm leading-6 text-white/50">เล่าไอเดียให้เราฟัง แล้วเราจะช่วยวางทางเลือกที่เหมาะกับธุรกิจและงบประมาณของคุณ</p><Link href="/v2#contact" className="mt-5 inline-flex items-center gap-2 font-bold text-white hover:text-[#9ee800]">คุยกับเรา <ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
        <div className="flex flex-col gap-4 pt-8 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between"><p suppressHydrationWarning>© {new Date().getFullYear()} {siteName}. All rights reserved.</p><div className="flex gap-5"><Link href="/privacy-policy" className="hover:text-white">นโยบายความเป็นส่วนตัว</Link><Link href="/terms-of-use" className="hover:text-white">เงื่อนไขการใช้งาน</Link></div></div>
      </div>
    </footer>
  )
}
