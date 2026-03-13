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
        className="relative shrink-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.12)] ring-1 ring-black/5 dark:border-lime-300/25 dark:bg-slate-900 dark:shadow-[0_12px_36px_rgba(0,0,0,0.52)] dark:ring-white/15"
        style={{ width: iconSize, height: iconSize }}
      >
        <div className="absolute inset-[10%] rounded-xl bg-lime-300/10 blur-md dark:bg-lime-300/18" />
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
        <span className={wordmarkClassName}>WAENWEB</span>
        {subtitle ? <span className={subtitleClassName}>{subtitle}</span> : null}
      </div>
    </div>
  )
}
