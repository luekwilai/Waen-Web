import Image from "next/image"

type BrandLogoProps = {
  iconSize?: number
  logoUrl?: string
  priority?: boolean
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
  subtitle,
  subtitleClassName,
  textClassName,
  wordmarkClassName,
  wrapperClassName,
}: BrandLogoProps) {
  return (
    <div className={wrapperClassName}>
      <div
        className="relative shrink-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.12)] ring-1 ring-black/5 dark:border-white/10 dark:bg-slate-950/95 dark:shadow-[0_12px_36px_rgba(0,0,0,0.4)] dark:ring-white/10"
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src={logoUrl}
          alt="WAENWEB logo"
          fill
          priority={priority}
          sizes={`${iconSize}px`}
          className="object-contain p-[6%]"
        />
      </div>

      <div className={textClassName}>
        <span className={wordmarkClassName}>WAENWEB</span>
        {subtitle ? <span className={subtitleClassName}>{subtitle}</span> : null}
      </div>
    </div>
  )
}
