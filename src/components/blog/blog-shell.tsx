import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import styles from "./blog-shell.module.css"

export function BlogHeader() { return <header className={styles.shell}><div className={styles.inner}><Link href="/" aria-label="waenweb หน้าแรก"><BrandLogo iconSize={34} siteName="WAENWEB" wrapperClassName="flex items-center gap-2" textClassName="font-black text-lg text-[#edf5ef]" subtitle="Blog" subtitleClassName="ml-2 text-[10px] uppercase tracking-widest text-[#91a88e]" /></Link><nav className={styles.actions}><Link className={styles.link} href="/" aria-label="หน้าแรก"><ArrowLeft size={15} aria-hidden="true" /><span>หน้าแรก</span></Link><Link className={`${styles.link} ${styles.cta}`} href="/#contact">ติดต่อเรา <ArrowUpRight size={14} aria-hidden="true" /></Link></nav></div></header> }
export function BlogFooter() { return <footer className={styles.footer}><div className={styles.footerInner}><BrandLogo iconSize={28} siteName="WAENWEB" wrapperClassName="flex items-center gap-2" textClassName="font-black text-base text-[#edf5ef]" /><span>© {new Date().getFullYear()} WAENWEB · <Link href="/privacy-policy">นโยบายความเป็นส่วนตัว</Link></span></div></footer> }
