import { PRICING_PLANS } from '../data/mockData';
import { Check, X, ArrowRight, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingSectionProps {
  onSelectPlan: (planName: string, price: number) => void;
}

export const PricingSection = ({ onSelectPlan }: PricingSectionProps) => {
  return (
    <section id="pricing" className="py-24 bg-[#F9F9F7] relative border-t border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#78B900]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#619500] font-mono">
              TRANSPARENT PRICING
            </span>
            <span className="w-8 h-[1px] bg-[#78B900]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            เลือกแพ็คเกจ<span className="text-[#78B900] italic font-serif font-normal">ที่ใช่</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            ราคาโปร่งใส จ่ายครั้งเดียวจบ ไม่มีค่าใช้จ่ายแอบแฝง โค้ดและลิขสิทธิ์ทั้งหมดเป็นของคุณ 100%
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, idx) => {
            const isPopular = plan.isPopular;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all bg-white ${
                  isPopular
                    ? 'border-2 border-[#78B900] shadow-2xl lg:-translate-y-2 ring-1 ring-[#78B900]'
                    : 'border border-[#E5E5E0] hover:border-[#78B900] shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
                }`}
                id={`pricing-card-${plan.id}`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#78B900] text-white font-medium text-[10px] uppercase tracking-wider shadow-md">
                    ★ ยอดนิยมสูงสุด (Recommended)
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-[#1A1A1A]">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 min-h-[32px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price display */}
                  <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-stone-100">
                    <span className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] font-mono tracking-tight">
                      ฿{plan.price.toLocaleString()}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-xs text-stone-400 line-through font-mono">
                        ฿{plan.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Suitability */}
                  <div className="p-3.5 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0] mb-6 text-xs text-stone-700">
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold mb-0.5">
                      เหมาะสำหรับ:
                    </span>
                    {plan.suitability}
                  </div>

                  {/* Delivery time */}
                  <div className="flex items-center gap-2 text-xs text-stone-600 mb-6">
                    <Clock className="w-4 h-4 text-[#78B900]" />
                    <span>ระยะเวลาส่งมอบงาน: <strong className="text-[#1A1A1A] font-mono">{plan.deliveryDays} วันทำการ</strong></span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider block">
                      รายละเอียดที่รวมในแพ็คเกจ:
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                        {feat.included ? (
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${feat.highlight ? 'text-[#78B900] stroke-[3]' : 'text-stone-400'}`} />
                        ) : (
                          <X className="w-4 h-4 text-stone-300 shrink-0 mt-0.5" />
                        )}
                        <span className={feat.included ? (feat.highlight ? 'text-[#1A1A1A] font-semibold' : 'text-stone-600') : 'text-stone-300 line-through'}>
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan CTA Button */}
                <button
                  onClick={() => {
                    onSelectPlan(plan.name, plan.price);
                    const contactElem = document.getElementById('contact');
                    if (contactElem) {
                      contactElem.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  id={`select-plan-${plan.id}`}
                  className={`w-full py-3.5 px-4 rounded-full font-medium text-xs flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
                    isPopular
                      ? 'bg-[#78B900] hover:bg-[#68a000] text-white shadow-md shadow-[#78B900]/25'
                      : 'bg-white hover:bg-[#F4FAE6] hover:text-[#619500] hover:border-[#78B900] text-[#1A1A1A] border border-[#E5E5E0]'
                  }`}
                >
                  <span>เลือกแพ็คเกจนี้</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise / Custom Requirement Callout */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-[#E5E5E0] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#F4FAE6] text-[#619500] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1A1A1A]">ต้องการระบบเฉพาะทาง หรือขอบเขตงานขนาดใหญ่?</h4>
              <p className="text-xs text-stone-500">เรามีบริการพัฒนา Custom Web Application, ระบบ ERP, ระบบ CRM เชื่อมต่อ API</p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-[#78B900] hover:bg-[#68a000] text-xs font-medium text-white whitespace-nowrap shadow-sm shadow-[#78B900]/20"
          >
            ปรึกษาโครงการพิเศษ →
          </a>
        </div>

      </div>
    </section>
  );
};

