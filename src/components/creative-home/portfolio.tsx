'use client'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Hand, List, Rows3 } from 'lucide-react'
import portfolioProjects from './portfolio-data.json'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/creative-home/ui/carousel'

type PortfolioProject = { id: string; title: string; category: string; description: string; desktopImage: string; mobileImage: string; websiteUrl: string; sourceDesktopImage?: string; sourceMobileImage?: string }
type ViewMode = 'list' | 'carousel'
const projects = portfolioProjects as PortfolioProject[]
const displayDomain = (url: string) => { try { return new URL(url).hostname.replace(/^www\./, '') } catch { return url } }
const carouselProjects = [...projects].sort((a, b) => {
  const order = ['Smile Gallery Clinic', 'Origin Condo', 'A-Factory']
  const ai = order.indexOf(a.title); const bi = order.indexOf(b.title)
  if (ai !== -1 || bi !== -1) return (ai === -1 ? order.length : ai) - (bi === -1 ? order.length : bi)
  return 0
})

function SafeLink({ project, className, children }: { project: PortfolioProject; className?: string; children: ReactNode }) {
  const start = useRef<{ x: number; y: number } | null>(null); const dragged = useRef(false)
  return <a className={className} href={project.websiteUrl} target="_blank" rel="noreferrer" onPointerDown={e => { start.current = { x: e.clientX, y: e.clientY }; dragged.current = false }} onPointerMove={e => { if (start.current && Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y) > 8) dragged.current = true }} onPointerUp={() => { start.current = null }} onPointerCancel={() => { start.current = null }} onDragStart={e => e.preventDefault()} onClick={e => { if (e.detail !== 0 && dragged.current) { e.preventDefault(); e.stopPropagation() }; dragged.current = false }}>{children}</a>
}

function Preview({ project, failedImages, markImageFailed, compact = false }: { project: PortfolioProject; failedImages: Set<string>; markImageFailed: (id: string) => void; compact?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const head = <div className="portfolio-v2-preview-head"><div><p className="portfolio-v2-category">{project.category}</p><h3>{project.title}</h3><p className="portfolio-v2-description">{project.description}</p></div><SafeLink project={project} className="portfolio-v2-visit">Visit site <ArrowUpRight aria-hidden="true" /></SafeLink></div>
  const image = (src: string, id: string, alt: string) => failedImages.has(id) ? <div className="portfolio-v2-fallback">{project.title}</div> : <img draggable={false} className={scrolled ? 'is-scrolled' : ''} src={src} alt={alt} loading="lazy" onError={() => markImageFailed(id)} />
  return <article className={`portfolio-v2-preview${compact ? ' is-compact' : ''}`}>{compact && head}<div className="portfolio-v2-stage" tabIndex={0} aria-label="พรีวิวเว็บไซต์ เลื่อนภาพเมื่อโฟกัส"><div className="portfolio-v2-browser-frame"><div className="portfolio-v2-browser-bar" aria-hidden="true"><span className="portfolio-v2-browser-dots"><i /><i /><i /></span><span className="portfolio-v2-domain">{displayDomain(project.websiteUrl)}</span></div>{image(project.desktopImage, `${project.id}-desktop`, `${project.title} desktop preview`)}</div><div className="portfolio-v2-phone" aria-label={`${project.title} mobile preview`}><div className="portfolio-v2-phone-screen">{image(project.mobileImage, `${project.id}-mobile`, `${project.title} mobile preview`)}</div></div><button type="button" className="portfolio-v2-preview-toggle" aria-pressed={scrolled} onClick={() => setScrolled(value => !value)}>เลื่อนชมเว็บไซต์</button></div>{!compact && head}</article>
}

function CarouselProject({ project, index, failedImages, markImageFailed }: { project: PortfolioProject; index: number; failedImages: Set<string>; markImageFailed: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const desktop = project.desktopImage
  const mobile = project.mobileImage
  const image = (src: string, id: string, alt: string) => failedImages.has(id) ? <div className="pc-fallback">{project.title}</div> : <img draggable={false} className={scrolled ? 'is-scrolled' : ''} src={src} alt={alt} loading={index < 3 ? 'eager' : 'lazy'} onError={() => markImageFailed(id)} />
  return <article className="pc-slide">
    <header className="pc-slide-heading"><h3><span>{String(index + 1).padStart(2, '0')}</span> {project.title}</h3><p>{project.category}</p></header>
    <div className="pc-previews" tabIndex={0} aria-label={`${project.title} website previews. Hover or focus to see the full page.`}>
      <div className="pc-browser"><div className="pc-browser-top" aria-hidden="true"><i /><i /><i /></div>{image(desktop, `${project.id}-carousel-desktop`, `${project.title} desktop preview`)}</div>
      <div className="pc-phone"><div className="pc-phone-screen">{image(mobile, `${project.id}-carousel-mobile`, `${project.title} mobile preview`)}</div></div>
    </div>
    <p className="pc-slide-description">{project.description}</p>
    <div className="pc-slide-actions"><button type="button" className="pc-toggle" aria-pressed={scrolled} onClick={() => setScrolled(value => !value)}><ArrowDown aria-hidden="true" className={scrolled ? 'is-reversed' : ''} /><span>{scrolled ? 'ดูด้านบน' : 'เลื่อนชมผลงาน'}</span></button><SafeLink project={project} className="pc-visit">เปิดเว็บไซต์ <ArrowUpRight aria-hidden="true" /></SafeLink></div>
  </article>
}

export default function Portfolio() {
  const [mode, setMode] = useState<ViewMode>('carousel'); const [selectedId, setSelectedId] = useState(projects[0]?.id ?? '')
  const [carouselInitialIndex, setCarouselInitialIndex] = useState(0)
  const restoreHeadingTop = useRef<number | null>(null)
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set()); const [carouselApi, setCarouselApi] = useState<CarouselApi>(); const [carouselIndex, setCarouselIndex] = useState(0); const [snapCount, setSnapCount] = useState(1); const [canScrollPrev, setCanScrollPrev] = useState(false); const [canScrollNext, setCanScrollNext] = useState(false); const [reducedMotion, setReducedMotion] = useState(false)
  const selected = useMemo(() => projects.find(p => p.id === selectedId) ?? projects[0], [selectedId])
  useEffect(() => { const media = window.matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReducedMotion(media.matches); update(); media.addEventListener('change', update); return () => media.removeEventListener('change', update) }, [])
  useEffect(() => { if (!carouselApi) return; const update = (api: NonNullable<CarouselApi>) => { const index = api.selectedScrollSnap(); setCarouselIndex(index); if (carouselProjects[index]) setSelectedId(carouselProjects[index].id); setSnapCount(api.scrollSnapList().length); setCanScrollPrev(api.canScrollPrev()); setCanScrollNext(api.canScrollNext()) }; update(carouselApi); carouselApi.on('select', update); carouselApi.on('reInit', update); return () => { carouselApi.off('select', update); carouselApi.off('reInit', update) } }, [carouselApi])
  useLayoutEffect(() => { const heading = document.querySelector<HTMLElement>('.portfolio-v2-heading'); if (!heading) return; const targetTop = restoreHeadingTop.current; if (targetTop !== null) { restoreHeadingTop.current = null; const delta = heading.getBoundingClientRect().top - targetTop; if (delta) window.scrollTo({ left: 0, top: window.scrollY + delta, behavior: 'instant' as ScrollBehavior }) } }, [mode])
  const markImageFailed = useCallback((id: string) => setFailedImages(current => new Set(current).add(id)), [])
  const handleCarouselApi = useCallback((api: CarouselApi) => setCarouselApi(api), [])
  const changeMode = useCallback((nextMode: ViewMode) => {
    if (nextMode === mode) return
    restoreHeadingTop.current = document.querySelector<HTMLElement>('.portfolio-v2-heading')?.getBoundingClientRect().top ?? null
    if (nextMode === 'carousel') setCarouselInitialIndex(Math.max(0, carouselProjects.findIndex(project => project.id === selectedId)))
    setMode(nextMode)
  }, [mode, selectedId])
  return <section className="portfolio-v2-section" id="portfolio" data-particle-label="ผลงานที่ผ่านมา"><div className="portfolio-v2-inner"><div className="portfolio-v2-heading"><div><p className="portfolio-v2-eyebrow">SELECTED WORK</p><div className="pc-heading-line"><h2 className="portfolio-v2-title">ผลงานที่ผ่านมา</h2></div><p className="pc-intro">ผลงานออกแบบและพัฒนาเว็บไซต์สำหรับธุรกิจหลากหลายรูปแบบ</p></div><p className="portfolio-v2-count">{String(projects.length).padStart(2, '0')} PROJECTS</p></div><div className="portfolio-v2-toolbar" role="group" aria-label="Portfolio view"><button type="button" className={`portfolio-v2-mode${mode === 'list' ? ' is-active' : ''}`} aria-pressed={mode === 'list'} onClick={() => changeMode('list')}><List aria-hidden="true" /> List</button><button type="button" className={`portfolio-v2-mode${mode === 'carousel' ? ' is-active' : ''}`} aria-pressed={mode === 'carousel'} onClick={() => changeMode('carousel')}><Rows3 aria-hidden="true" /> Carousel</button></div>
    {mode === 'list' && selected ? <div className="portfolio-v2-list-layout"><nav className="portfolio-v2-project-list" aria-label="Projects" onKeyDown={e => { if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return; e.preventDefault(); const i = projects.findIndex(p => p.id === selectedId); const next = e.key === 'ArrowDown' ? Math.min(projects.length - 1, i + 1) : Math.max(0, i - 1); const button = e.currentTarget.querySelectorAll<HTMLButtonElement>('button')[next]; setSelectedId(projects[next]?.id ?? selectedId); button?.focus(); button?.scrollIntoView({ block: 'nearest' }) }}>{projects.map((project, index) => <button type="button" key={project.id} className={`portfolio-v2-project-row${project.id === selected.id ? ' is-selected' : ''}`} aria-pressed={project.id === selected.id} onClick={() => setSelectedId(project.id)}><span>{String(index + 1).padStart(2, '0')}</span><span>{project.title}</span><small>{project.category}</small><ArrowUpRight aria-hidden="true" /></button>)}</nav><Preview key={selected.id} project={selected} failedImages={failedImages} markImageFailed={markImageFailed} /></div> : <Carousel setApi={handleCarouselApi} opts={{ align: 'start', containScroll: 'keepSnaps', startIndex: carouselInitialIndex, duration: reducedMotion ? 0 : 25 }}><CarouselContent className="pc-carousel-content">{carouselProjects.map((project, index) => <CarouselItem key={project.id} className="pc-carousel-item"><CarouselProject project={project} index={index} failedImages={failedImages} markImageFailed={markImageFailed} /></CarouselItem>)}</CarouselContent><div className="pc-carousel-controls"><button type="button" className="pc-carousel-button" onClick={() => carouselApi?.scrollPrev(reducedMotion)} disabled={!canScrollPrev} aria-label="Previous project"><ArrowLeft aria-hidden="true" /></button><span className="pc-progress" aria-live="polite"><i style={{ width: `${((carouselIndex + 1) / Math.max(1, snapCount)) * 100}%` }} /></span><button type="button" className="pc-carousel-button" onClick={() => carouselApi?.scrollNext(reducedMotion)} disabled={!canScrollNext} aria-label="Next project"><ArrowRight aria-hidden="true" /></button></div><p className="pc-drag-hint"><Hand aria-hidden="true" />ลากเพื่อเลื่อนดูผลงาน</p></Carousel>}
  </div></section>
}
