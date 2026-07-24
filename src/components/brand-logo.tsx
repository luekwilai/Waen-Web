import Image from "next/image"

type BrandLogoProps = {
  iconSize?: number
  logoUrl?: string
  priority?: boolean
  siteName?: string
  subtitle?: string
  subtitleClassName?: string
  textClassName?: string
  wordmarkClassName?: string
  wrapperClassName?: string
}

export function BrandLogo({
  iconSize = 44,
  logoUrl = "/waenweb-logo-r1.svg",
  priority = false,
  siteName = "WAENWEB",
  subtitle,
  subtitleClassName,
  textClassName,
  wordmarkClassName,
  wrapperClassName,
}: BrandLogoProps) {
  return (
    <div className={wrapperClassName}>
      <div
        className="relative shrink-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)] ring-1 ring-black/5 dark:border-white/20 dark:bg-white dark:shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.12)]"
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src={logoUrl}
          alt="WAENWEB logo"
          fill
          priority={priority}
          sizes={`${iconSize}px`}
          className="object-contain p-[5%]"
        />
      </div>

      <div className={textClassName}>
        <span className={wordmarkClassName}>{siteName.toUpperCase() === "WAENWEB" ? "waenweb" : siteName}</span>
        {subtitle ? <span className={subtitleClassName}>{subtitle}</span> : null}
      </div>
    </div>
  )
}
