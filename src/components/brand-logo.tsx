"use client"
import { useEffect, useRef, useState, type CSSProperties } from "react"
import styles from "./brand-logo.module.css"

type BrandLogoProps = { iconSize?: number; logoUrl?: string; priority?: boolean; siteName?: string; subtitle?: string; subtitleClassName?: string; textClassName?: string; wordmarkClassName?: string; wrapperClassName?: string }

export function BrandLogo({ iconSize = 44, siteName = "WAENWEB", subtitle, subtitleClassName, textClassName, wordmarkClassName, wrapperClassName }: BrandLogoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const wordmark = siteName.toUpperCase() === "WAENWEB" ? "waenweb" : siteName
  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === "undefined") { setVisible(true); return }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } }, { threshold: 0.1 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  const bars = [{ x: 25, y: 38, h: 70, delay: "0s" }, { x: 52, y: 68, h: 40, delay: ".07s" }, { x: 79, y: 52, h: 56, delay: ".14s" }, { x: 106, y: 38, h: 70, delay: ".21s" }]
  return <div ref={ref} className={wrapperClassName} role="img" aria-label={wordmark} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
    <svg className={`${styles.mark} ${visible ? styles.visible : ""}`} width={iconSize} height={iconSize} viewBox="0 0 150 150" aria-hidden="true" style={{ width: iconSize, height: iconSize }}>
      <g fill="#ccfa80">{bars.map((bar) => <rect key={bar.x} className={styles.bar} x={bar.x} y={bar.y} width="22" height={bar.h} rx="11" style={{ "--brand-delay": bar.delay } as CSSProperties} />)}</g>
    </svg>
    <div className={textClassName}><span className={`${styles.word} ${visible ? styles.visible : ""} ${wordmarkClassName ?? ""}`}>{wordmark}</span>{subtitle ? <span className={subtitleClassName}>{subtitle}</span> : null}</div>
  </div>
}
