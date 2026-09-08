import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import SiteHeader from "@/components/creative-home/site-header"
import styles from "./blog-shell.module.css"

export function BlogHeader() { return <SiteHeader blogMode /> }
export function BlogFooter() { return <footer className={styles.footer}><div className={styles.footerInner}><BrandLogo iconSize={28} siteName="WAENWEB" wrapperClassName="flex items-center gap-2" textClassName="font-black text-base text-[#edf5ef]" /><span>© {new Date().getFullYear()} WAENWEB · <Link href="/privacy-policy">นโยบายความเป็นส่วนตัว</Link></span></div></footer> }
