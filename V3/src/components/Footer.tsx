import { MessageCircle, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenLineModal: () => void;
}

export const Footer = ({ onOpenLineModal }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F9F9F7] border-t border-[#E5E5E0] pt-16 pb-24 sm:pb-12 text-stone-600 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E5E5E0]">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-4 group inline-block">
              <div className="w-10 h-10 rounded-full border border-[#78B900] bg-[#F4FAE6] flex items-center justify-center text-[#619500] font-serif font-bold text-lg shadow-xs">
                W
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-[#1A1A1A] tracking-wide leading-none group-hover:text-[#619500] transition-colors">
                  WAEN WEB
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#619500] font-semibold mt-0.5">
                  Studio & Architecture
                </span>
              </div>
            </a>

            <p className="text-xs text-stone-500 leading-relaxed max-w-sm mb-6">
              สตูดิโอรับทำเว็บไซต์ ออกแบบ UX/UI และพัฒนาระบบดิจิทัลระดับมืออาชีพ ดีไซน์มินิมอล โหลดเร็วพิเศษ และเน้นสร้างยอดขายจริงให้กับธุรกิจยุคใหม่
            </p>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4FAE6] border border-[#78B900]/30 text-[11px] text-[#619500] font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#78B900] animate-pulse" />
                <span>รับงานใหม่ได้ทันที (Q1 2026)</span>
              </span>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider font-mono mb-4">
              หมวดหมู่หลัก
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li><a href="#portfolio" className="hover:text-[#619500] transition-colors">ผลงานที่ผ่านมา (Portfolio)</a></li>
              <li><a href="#services" className="hover:text-[#619500] transition-colors">บริการทั้งหมด (Services)</a></li>
              <li><a href="#why-us" className="hover:text-[#619500] transition-colors">ทำไมต้องเลือกเรา (Why Us)</a></li>
              <li><a href="#calculator" className="hover:text-[#619500] transition-colors">คำนวณราคา (Cost Estimator)</a></li>
              <li><a href="#process" className="hover:text-[#619500] transition-colors">ขั้นตอนการทำงาน (Process)</a></li>
            </ul>
          </div>

          {/* Col 4: Services & Packages */}
          <div>
            <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider font-mono mb-4">
              แพ็คเกจ & ข้อมูล
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li><a href="#pricing" className="hover:text-[#619500] transition-colors">Startup Package (฿16,000)</a></li>
              <li><a href="#pricing" className="hover:text-[#619500] transition-colors">Business Package (฿25,900)</a></li>
              <li><a href="#pricing" className="hover:text-[#619500] transition-colors">E-Commerce Package (฿35,900)</a></li>
              <li><a href="#articles" className="hover:text-[#619500] transition-colors">บทความ & คู่มือ SEO</a></li>
              <li><a href="#faqs" className="hover:text-[#619500] transition-colors">คำถามที่พบบ่อย (FAQs)</a></li>
            </ul>
          </div>

          {/* Col 5: Direct Contact */}
          <div>
            <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider font-mono mb-4">
              ติดต่อเรา
            </h4>
            <ul className="space-y-3 text-xs text-stone-600">
              <li>
                <span className="text-[11px] text-stone-400 block">อีเมล:</span>
                <a href="mailto:thawatsak28@gmail.com" className="text-[#1A1A1A] hover:text-[#619500] transition-colors font-mono font-medium">
                  thawatsak28@gmail.com
                </a>
              </li>
              <li>
                <span className="text-[11px] text-stone-400 block">Line ID:</span>
                <button onClick={onOpenLineModal} className="text-[#1A1A1A] hover:text-[#06C755] transition-colors font-mono font-semibold flex items-center gap-1">
                  <span>thawatsak</span>
                  <MessageCircle className="w-3.5 h-3.5 text-[#06C755]" />
                </button>
              </li>
              <li>
                <span className="text-[11px] text-stone-400 block">เวลาให้คำปรึกษา:</span>
                <span className="text-stone-700">จันทร์ - เสาร์ (09:00 - 20:00 น.)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-stone-500 text-center sm:text-left">
            © {new Date().getFullYear()} WAEN WEB Studio. All rights reserved. ออกแบบและพัฒนาด้วยความประณีต
          </p>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hover:text-[#619500] transition-colors">
              PDPA & Privacy Policy
            </a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E5E5E0] hover:bg-[#F4FAE6] hover:text-[#619500] hover:border-[#78B900] transition-all text-xs text-stone-700 shadow-xs"
            >
              <span>กลับด้านบน</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#78B900]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

