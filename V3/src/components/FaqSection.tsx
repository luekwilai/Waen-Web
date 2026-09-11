import { useState } from 'react';
import { FAQS_DATA } from '../data/mockData';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqSectionProps {
  onOpenLineModal: () => void;
}

export const FaqSection = ({ onOpenLineModal }: FaqSectionProps) => {
  const [openId, setOpenId] = useState<string>(FAQS_DATA[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'คำถามทั้งหมด' },
    { id: 'timeline', label: 'ระยะเวลา & กระบวนการ' },
    { id: 'cost', label: 'ค่าใช้จ่าย & ลิขสิทธิ์' },
    { id: 'seo', label: 'SEO & ความเร็ว' },
    { id: 'support', label: 'การดูแลหลังการขาย' },
  ];

  const filteredFaqs = selectedCategory === 'all'
    ? FAQS_DATA
    : FAQS_DATA.filter(f => f.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faqs" className="py-24 bg-[#F9F9F7] relative border-t border-[#E5E5E0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#78B900]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#619500] font-mono">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <span className="w-8 h-[1px] bg-[#78B900]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            คำถาม<span className="text-[#78B900] italic font-serif font-normal">ที่พบบ่อย</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            ข้อสงสัยยอดนิยมเกี่ยวกับการทำเว็บไซต์ ขอบเขตงาน ค่าใช้จ่าย และการดูแลหลังส่งมอบ
          </p>

          {/* Filter Categories */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === c.id
                    ? 'bg-[#78B900] text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-[#1A1A1A] hover:border-[#78B900] border border-[#E5E5E0]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-3xl border transition-all overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] ${
                  isOpen 
                    ? 'border-[#78B900] ring-1 ring-[#78B900]/40' 
                    : 'border-[#E5E5E0] hover:border-[#78B900]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-bold pr-2 transition-colors ${isOpen ? 'text-[#619500]' : 'text-[#1A1A1A]'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#78B900] text-white shadow-xs' : 'bg-[#F0F0EE] text-stone-700'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 mt-1 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E5E0] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div>
            <h4 className="text-sm font-bold text-[#1A1A1A]">ยังมีข้อสงสัยหรือมีข้อกำหนดเฉพาะ?</h4>
            <p className="text-xs text-stone-500 mt-0.5">สอบถามกับทีมผู้เชี่ยวชาญโดยตรงได้ทันที เรายินดีตอบทุกคำถาม</p>
          </div>
          <button
            onClick={onOpenLineModal}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-medium text-xs shadow-sm transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>สอบถามทาง Line</span>
          </button>
        </div>

      </div>
    </section>
  );
};

