'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';
import { BrandLogo } from '@/components/brand-logo';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/creative-home/ui/sheet';

const whNavigation = [
  ['ผลงาน', '#portfolio'],
  ['บริการ', '#services'],
  ['ขั้นตอนการทำงาน', '#process'],
  ['แพ็กเกจ', '#pricing'],
  ['บทความ', '#articles'],
  ['คำถามที่พบบ่อย', '#faq'],
] as const;

const blogNavigation = [
  ['ผลงาน', '/#portfolio'],
  ['บริการ', '/#services'],
  ['ขั้นตอนการทำงาน', '/#process'],
  ['แพ็กเกจ', '/#pricing'],
  ['บทความ', '/blog'],
  ['คำถามที่พบบ่อย', '/#faq'],
] as const;

export default function SiteHeader({ blogMode = false, canCustomizeBackground = false }: { blogMode?: boolean; canCustomizeBackground?: boolean }) {
  const navigation = blogMode ? blogNavigation : whNavigation;
  const [whMenuOpen, setWhMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const openEditorAfterMenuClose = useRef(false);
  const navRef = useRef<HTMLElement>(null);
  const selected = hovered ?? active;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCompact(window.scrollY > 48);
      let current = '';
      if (blogMode) {
        setActive('/blog');
        return;
      }
      for (const [, href] of navigation) {
        const section = document.querySelector(href);
        if (section && section.getBoundingClientRect().top <= 150) current = href;
      }
      const contact = document.getElementById('contact');
      if (contact && contact.getBoundingClientRect().top <= 150) current = '';
      setActive(current);
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', scroll); };
  }, [blogMode, navigation]);

  useEffect(() => {
    const update = () => {
      const link = Array.from(navRef.current?.querySelectorAll('a') ?? []).find(a => a.getAttribute('href') === selected);
      setIndicator(link ? { left: link.offsetLeft, width: link.offsetWidth } : { left: 0, width: 0 });
    };
    update();
    const observer = new ResizeObserver(update);
    if (navRef.current) observer.observe(navRef.current);
    return () => observer.disconnect();
  }, [selected]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1100px)');
    const update = () => { if (media.matches) setWhMenuOpen(false); };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const closeWhMenu = () => setWhMenuOpen(false);

  return (
    <header className={`wh-site-header${blogMode ? ' blog-header-scope' : ''}${compact ? ' is-compact' : ''}`}>
      <div className="wh-site-header__bar" onPointerMove={event => {
        if (event.pointerType !== 'mouse') return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--wh-pointer', `${event.clientX - rect.left}px`);
      }}>
        <a className="wh-site-header__brand" href={blogMode ? '/' : '#'} aria-label="WAENWEB หน้าแรก">
          <BrandLogo iconSize={34} wrapperClassName="wh-site-header__brand-lockup" textClassName="wh-site-header__brand-name" wordmarkClassName="" />
          <span className="wh-site-header__brand-meta">
            <span aria-hidden="true">®</span>
            <small>digital studio</small>
          </span>
        </a>

        <nav ref={navRef} className="wh-site-header__desktop-nav" aria-label="เมนูหลัก" onPointerLeave={() => setHovered(null)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setHovered(null); }}>
          <span className="wh-nav-indicator" aria-hidden="true" style={{ '--wh-left': `${indicator.left}px`, '--wh-width': `${indicator.width}px`, opacity: indicator.width ? 1 : 0 } as CSSProperties} />
          {navigation.map(([label, href]) => (
            <a key={href} href={href} aria-current={active === href ? 'location' : undefined} data-highlight={selected === href} onPointerEnter={() => setHovered(href)} onFocus={() => setHovered(href)}>
              {label}
            </a>
          ))}
        </nav>

        <a className="wh-site-header__cta" href={blogMode ? '/#contact' : '#contact'}>
          <span>เริ่มโปรเจกต์กัน</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>

        <Sheet open={whMenuOpen} onOpenChange={setWhMenuOpen} onOpenChangeComplete={(isOpen) => { if (!isOpen && canCustomizeBackground && openEditorAfterMenuClose.current) { openEditorAfterMenuClose.current = false; window.dispatchEvent(new Event('waenweb:open-particle-editor')); } }}>
          <SheetTrigger
            render={
              <button
                type="button"
                className="wh-site-header__menu-trigger"
                aria-label="เปิดเมนู"
                aria-haspopup="dialog"
              />
            }
          >
            <Menu size={22} aria-hidden="true" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="wh-site-header__sheet"
            finalFocus={() => canCustomizeBackground && openEditorAfterMenuClose.current ? false : undefined}
            aria-describedby="wh-site-header-sheet-description"
          >
            <SheetHeader className="wh-site-header__sheet-header">
              <span className="wh-site-header__sheet-kicker">MENU</span>
              <SheetTitle>WAENWEB</SheetTitle>
              <SheetDescription id="wh-site-header-sheet-description">
                ไปยังส่วนต่าง ๆ ของเว็บไซต์
              </SheetDescription>
            </SheetHeader>
            <nav className="wh-site-header__mobile-nav" aria-label="เมนูมือถือ">
              {navigation.map(([label, href], index) => (
                <SheetClose nativeButton={false} key={href} render={<a href={href} onClick={closeWhMenu} aria-current={active === href ? 'location' : undefined} style={{ '--wh-order': index } as CSSProperties} />}>
                  <small aria-hidden="true">0{index + 1}</small>
                  <span>{label}</span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </SheetClose>
              ))}
              {!blogMode && canCustomizeBackground && <SheetClose render={<button type="button" className="wh-site-header__mobile-editor" onClick={() => { openEditorAfterMenuClose.current = true; closeWhMenu(); }} />}>ปรับพื้นหลัง</SheetClose>}
              <SheetClose nativeButton={false}
                render={
                  <a className="wh-site-header__mobile-cta" href={blogMode ? '/#contact' : '#contact'} onClick={closeWhMenu} />
                }
              >
                <span>เริ่มโปรเจกต์กัน</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
