import { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Palette, 
  TrendingUp, 
  Smartphone, 
  Headphones, 
  DollarSign, 
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';

interface WhyUsComparisonProps {
  onOpenLineModal: () => void;
}

export const WhyUsComparison = ({ onOpenLineModal }: WhyUsComparisonProps) => {
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');

  const reasons = [
    {
      icon: <Palette className="w-5 h-5" />,
      title: 'ออกแบบเฉพาะธุรกิจคุณ (Tailor-made)',
      desc: 'ดีไซน์เน้นสร้างภาพลักษณ์ที่น่าเชื่อถือ ตรงกลุ่มเป้าหมาย ไม่ใช้เทมเพลตสำเร็จรูปที่ซ้ำกับใครในตลาด',
      tag: 'Custom UI/UX',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'โหลดไว + SEO ติดหน้าแรก',
      desc: 'โครงสร้าง SEO ทางเทคนิคระดับสูง Google PageSpeed 98+ มีโอกาสติดอันดับหน้าแรก Google สูงขึ้นอย่างยั่งยืน',
      tag: 'PageSpeed 98+',
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: 'รองรับทุกหน้าจออย่างสมบูรณ์แบบ',
      desc: 'ทดสอบการแสดงผลบนอุปกรณ์จริงทั้ง iPhone, iPad, Android และจอขนาด 4K ตัวหนังสือไม่ตก ปุ่มกดง่าย 100%',
      tag: 'Mobile-First',
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      title: 'ดูแลซัพพอร์ต ไม่ทิ้งงาน',
      desc: 'ดูแลระบบต่อเนื่อง สำรองข้อมูล ตรวจสอบความปลอดภัย และพร้อมให้คำปรึกษาตลอดระยะเวลารับประกัน',
      tag: 'รับประกัน 1 ปี',
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: 'ราคาโปร่งใส ไม่มีแฝง',
      desc: 'บอกขอบเขตงานและค่าใช้จ่ายชัดเจน ไม่มีค่าธรรมเนียมซ่อนเร้น โค้ดและลิขสิทธิ์ทั้งหมดเป็นของลูกค้า 100%',
      tag: '100% Transparent',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'ส่งงานตรงเวลา มีมาตรฐาน',
      desc: 'ทำงานอย่างมีระบบ มี Timeline และ Milestone ชัดเจน การันตีส่งมอบงานตรงตามกำหนดเวลา 100%',
      tag: 'On-Time SLA',
    },
  ];

  const comparisonData = [
    {
      feature: 'ความเร็วในการโหลด (Load Speed)',
      waen: '0.4s - 0.7s (Lighthouse 98+)',
      freelance: '2.5s - 4.5s (ธีมหนัก ช้า)',
      builders: '1.8s - 3.2s (โค้ดสำเร็จรูป)',
    },
    {
      feature: 'การปรับแต่งดีไซน์ (Custom UI/UX)',
      waen: 'ออกแบบเฉพาะแบรนด์คุณ 100%',
      freelance: 'ใช้ธีมซื้อมาแก้สี/รูป',
      builders: 'จำกัดตามบล็อกสำเร็จรูป',
    },
    {
      feature: 'โครงสร้าง SEO ขั้นสูง (Schema/Core Vitals)',
      waen: 'วางระบบครบทุกหน้า ถูกหลัก Google',
      freelance: 'พื้นฐานทั่วไป หรือไม่ได้ทำ',
      builders: 'จำกัดตามระบบของแพลตฟอร์ม',
    },
    {
      feature: 'กรรมสิทธิ์เว็บไซต์ & Source Code',
      waen: 'เป็นของลูกค้า 100% ย้ายโฮสต์ได้อิสระ',
      freelance: 'บางรายไม่ยอมให้รหัสหลังบ้าน',
      builders: 'เช่ารายเดือน ย้ายเว็บออกไม่ได้',
    },
    {
      feature: 'การรับประกันและดูแลหลังส่งมอบ',
      waen: 'รับประกัน 1 ปี พร้อมทีมตอบไว',
      freelance: 'เสร็จแล้วจบ หรือติดต่อยาก',
      builders: 'ส่งตั๋ว Support รอนาน',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-[#F9F9F7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#78B900]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#619500] font-mono">
              WHY CHOOSE US
            </span>
            <span className="w-8 h-[1px] bg-[#78B900]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            ทำเว็บกับเรา <span className="text-[#78B900] italic font-serif font-normal">คุ้มค่า</span> กว่า
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            เราไม่ได้แค่ทำเว็บให้เสร็จ แต่เราสร้างสินทรัพย์ดิจิทัลที่ดีที่สุดเพื่อเพิ่มยอดขายและสร้างความน่าเชื่อถือให้ธุรกิจของคุณ
          </p>

          {/* View Mode Toggle */}
          <div className="inline-flex items-center gap-1 p-1 bg-[#F0F0EE] border border-[#E5E5E0] rounded-full mt-6 shadow-xs">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                viewMode === 'cards' ? 'bg-[#78B900] text-white shadow-xs' : 'text-stone-600 hover:text-[#1A1A1A]'
              }`}
            >
              จุดเด่นของเรา (Key Benefits)
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                viewMode === 'matrix' ? 'bg-[#78B900] text-white shadow-xs' : 'text-stone-600 hover:text-[#1A1A1A]'
              }`}
            >
              ตารางเปรียบเทียบ (Comparison)
            </button>
          </div>
        </div>

        {/* View Mode: 6 Cards */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="p-7 rounded-3xl bg-white border border-[#E5E5E0] hover:border-[#78B900] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#F4FAE6] text-[#619500] flex items-center justify-center group-hover:bg-[#78B900] group-hover:text-white transition-colors">
                      {r.icon}
                    </div>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#F4FAE6] text-[#619500] border border-[#78B900]/30 font-semibold">
                      {r.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#619500] transition-colors mb-2">
                    {r.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {r.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-[#619500] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#78B900]" />
                  <span>การันตีมาตรฐานทุกโปรเจกต์</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View Mode: Comparison Matrix */}
        {viewMode === 'matrix' && (
          <div className="overflow-x-auto rounded-3xl border border-[#E5E5E0] bg-white p-2 shadow-sm">
            <table className="w-full text-left text-xs text-stone-600">
              <thead className="bg-[#F9F9F7] text-[#1A1A1A] font-mono uppercase text-[11px] border-b border-[#E5E5E0]">
                <tr>
                  <th className="p-4 rounded-tl-2xl">รายการเปรียบเทียบ</th>
                  <th className="p-4 text-[#619500] font-bold bg-[#F4FAE6] border-x border-[#78B900]/20">
                    ★ WAEN WEB Studio
                  </th>
                  <th className="p-4 text-stone-500">ฟรีแลนซ์ทั่วไป</th>
                  <th className="p-4 text-stone-500 rounded-tr-2xl">เว็บสำเร็จรูปเช่ารายเดือน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E0]">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F9F9F7] transition-colors">
                    <td className="p-4 font-semibold text-[#1A1A1A]">{row.feature}</td>
                    <td className="p-4 font-bold text-[#619500] bg-[#F4FAE6]/50 border-x border-[#78B900]/20 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#78B900] shrink-0" />
                      <span>{row.waen}</span>
                    </td>
                    <td className="p-4 text-stone-500">{row.freelance}</td>
                    <td className="p-4 text-stone-500">{row.builders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* High-Impact CTA Banner */}
        <div className="mt-16 relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-white border border-[#E5E5E0] shadow-sm">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4FAE6] text-[#619500] border border-[#78B900]/30 text-xs font-mono font-semibold mb-3">
                <span>ปรึกษาฟรี ไม่มีข้อผูกมัด</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-2">
                พร้อมเริ่ม<span className="text-[#78B900] italic font-serif font-normal">โปรเจกต์</span>ของคุณแล้วหรือยัง?
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                เล่าไอเดียและความต้องการให้เราฟัง แล้วเราจะช่วยวางแผน Sitemap และประเมินราคาให้ฟรีภายใน 1 ชั่วโมง
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
              <a
                href="#contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#78B900] hover:bg-[#68a000] text-white font-medium text-sm shadow-md shadow-[#78B900]/20 transition-all"
              >
                <span>ติดต่อเรา</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenLineModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-medium text-sm shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>ทักผ่าน Line</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

