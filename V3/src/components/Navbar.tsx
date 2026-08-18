import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle, Calculator, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenCalculator: () => void;
  onOpenLineModal: () => void;
}

export const Navbar = ({ onOpenCalculator, onOpenLineModal }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ผลงาน', href: '#portfolio' },
    { label: 'บริการ', href: '#services' },
    { label: 'ทำไมต้องเรา', href: '#why-us' },
    { label: 'คำนวณราคา', href: '#calculator', onClick: onOpenCalculator },
    { label: 'ขั้นตอนทำงาน', href: '#process' },
    { label: 'แพ็คเกจราคา', href: '#pricing' },
    { label: 'บทความ', href: '#articles' },
    { label: 'FAQ', href: '#faqs' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F9F9F7]/90 backdrop-blur-xl border-b border-[#E5E5E0] py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Artistic Flair Geometric Logo with CI Accent */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none"
              id="brand-logo-link"
            >
              <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform relative overflow-hidden">
                <div className="absolute inset-0 bg-[#78B900]/15" />
                <div className="w-3.5 h-3.5 border-2 border-[#78B900] rotate-45 transform group-hover:rotate-90 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tighter text-[#1A1A1A] flex items-center gap-1.5">
                  WAEN<span className="text-[#78B900]">.STUDIO</span>
                  <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#78B900] text-white font-mono font-bold shadow-xs">
                    PRO
                  </span>
                </span>
                <span className="text-[11px] text-stone-500 font-light tracking-wide">
                  สตูดิโอออกแบบ & ทำเว็บไซต์
                </span>
              </div>
            </a>

            {/* Desktop Nav Links in Rounded-Full Capsule */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#F0F0EE]/80 border border-[#E5E5E0] rounded-full px-4 py-1.5 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={link.onClick ? (e) => { e.preventDefault(); link.onClick?.(); } : undefined}
                  className="text-xs font-medium text-stone-600 hover:text-[#1A1A1A] hover:bg-white px-3.5 py-1.5 rounded-full transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA & Availability */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Queue Status Pill */}
              <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4FAE6] border border-[#78B900]/30 text-[11px] text-[#619500] font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#78B900] opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#78B900]"></span>
                </span>
                <span>เปิดรับโปรเจกต์ 2 คิว</span>
              </div>

              {/* Instant Calculator Trigger */}
              <button
                onClick={onOpenCalculator}
                id="navbar-calculator-btn"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-[#1A1A1A] bg-white hover:bg-[#F0F0EE] border border-[#E5E5E0] transition-all shadow-xs"
              >
                <Calculator className="w-3.5 h-3.5 text-[#78B900]" />
                <span>คำนวณราคา</span>
              </button>

              {/* Main Contact CTA with CI Brand Color */}
              <a
                href="#contact"
                id="navbar-contact-btn"
                className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-medium text-white bg-[#78B900] hover:bg-[#68a000] shadow-sm shadow-[#78B900]/25 transition-all transform active:scale-95"
              >
                <span>เริ่มโปรเจกต์</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenCalculator}
                className="p-2 rounded-full bg-white border border-[#E5E5E0] text-[#1A1A1A] text-xs flex items-center shadow-xs"
                aria-label="Calculator"
              >
                <Calculator className="w-4 h-4 text-[#78B900]" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="mobile-menu-toggle-btn"
                className="p-2.5 rounded-full bg-white border border-[#E5E5E0] text-[#1A1A1A] hover:bg-[#F0F0EE] focus:outline-none shadow-xs"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-[#F9F9F7]/98 backdrop-blur-2xl border-b border-[#E5E5E0] p-6 lg:hidden shadow-2xl max-h-[calc(100vh-60px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E0]">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  เมนูหลัก
                </span>
                <div className="flex items-center gap-2 text-[11px] text-[#619500] bg-[#F4FAE6] px-3 py-1 rounded-full border border-[#78B900]/30 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#78B900] animate-pulse"></span>
                  <span>พร้อมรับโปรเจกต์ใหม่</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (link.onClick) {
                        e.preventDefault();
                        link.onClick();
                      }
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#E5E5E0] text-sm font-medium text-[#1A1A1A] hover:bg-[#F0F0EE] transition-colors shadow-xs"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </a>
                ))}
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCalculator();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white border border-[#E5E5E0] text-[#1A1A1A] font-medium text-sm hover:bg-[#F0F0EE] shadow-xs"
                >
                  <Calculator className="w-4 h-4 text-[#78B900]" />
                  <span>คำนวณราคาโปรเจกต์แบบละเอียด</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLineModal();
                    }}
                    className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#06C755] text-white font-medium text-sm shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>แอดไลน์คุยทันที</span>
                  </button>

                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#78B900] text-white font-medium text-sm shadow-xs"
                  >
                    <span>ส่งข้อมูลประเมิน</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

