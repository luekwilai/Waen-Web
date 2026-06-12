import { getClientLogos } from "@/lib/client-logos"
import { ClientLogoImg } from "@/components/home/client-logo-img"

export async function ClientLogosSection() {
  let logos: Awaited<ReturnType<typeof getClientLogos>> = []
  try {
    logos = await getClientLogos()
  } catch {
    return null
  }
  if (logos.length < 4) return null

  return (
    <section className="relative z-10 border-t border-slate-200/60 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.02] py-12 md:py-16 overflow-hidden">
      {/* Label with decorative lines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 md:mb-10">
        <div className="flex items-center gap-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-300 dark:via-white/10 dark:to-white/5" />
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-slate-400 dark:text-slate-500 whitespace-nowrap select-none">
            ได้รับความไว้วางใจจากธุรกิจชั้นนำ
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-200 to-slate-300 dark:via-white/10 dark:to-white/5" />
        </div>
      </div>

      {/* Marquee — duplicated track, pauses on hover */}
      <div className="group marquee-mask overflow-hidden">
        <div className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 gap-4" aria-hidden={dup === 1}>
              {logos.map((logo) => (
                <a
                  key={`${dup}-${logo.siteUrl}`}
                  href={logo.siteUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  title={logo.title}
                  data-logo-item
                  tabIndex={dup === 1 ? -1 : undefined}
                  className="
                    flex items-center justify-center shrink-0
                    h-14 px-7 rounded-xl
                    bg-white dark:bg-white/[0.06]
                    border border-slate-200/80 dark:border-white/[0.08]
                    shadow-[0_1px_3px_rgba(0,0,0,0.06)]
                    grayscale opacity-50
                    hover:grayscale-0 hover:opacity-100
                    hover:border-lime-400/50 dark:hover:border-lime-500/40
                    hover:-translate-y-0.5
                    hover:shadow-[0_6px_20px_rgba(0,0,0,0.09)]
                    transition-all duration-300 ease-out
                  "
                >
                  <ClientLogoImg src={logo.logoUrl} alt={`โลโก้ ${logo.title}`} />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
