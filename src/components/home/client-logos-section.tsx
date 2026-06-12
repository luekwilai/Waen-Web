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
    <section className="relative z-10 py-10 md:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] mb-7">
          ได้รับความไว้วางใจจากธุรกิจชั้นนำ
        </p>
      </div>

      {/* Marquee — duplicated track, pauses on hover */}
      <div className="group marquee-mask overflow-hidden">
        <div className="flex w-max gap-6 animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 gap-6" aria-hidden={dup === 1}>
              {logos.map((logo) => (
                <a
                  key={`${dup}-${logo.siteUrl}`}
                  href={logo.siteUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  title={logo.title}
                  data-logo-item
                  tabIndex={dup === 1 ? -1 : undefined}
                  className="flex items-center justify-center shrink-0 h-16 sm:h-20 px-6 sm:px-8 rounded-2xl bg-white dark:bg-white/95 border border-slate-200 dark:border-white/10 shadow-sm grayscale opacity-75 hover:grayscale-0 hover:opacity-100 hover:-translate-y-0.5 hover:shadow-md hover:border-lime-400/50 transition-all duration-300"
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
