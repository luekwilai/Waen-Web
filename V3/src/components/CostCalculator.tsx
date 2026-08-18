import { useState } from 'react';
import { 
  Calculator, 
  Check, 
  Clock, 
  ArrowRight, 
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CostCalculatorProps {
  onApplyToQuote: (details: {
    type: string;
    pages: number;
    totalPrice: number;
    estimatedDays: number;
    featuresList: string[];
  }) => void;
}

export const CostCalculator = ({ onApplyToQuote }: CostCalculatorProps) => {
  const [websiteType, setWebsiteType] = useState<'corporate' | 'ecommerce' | 'landing' | 'custom'>('corporate');
  const [pageCount, setPageCount] = useState<number>(5);
  const [hasEcommerce, setHasEcommerce] = useState<boolean>(false);
  const [hasMultiLang, setHasMultiLang] = useState<boolean>(false);
  const [hasSeoPro, setHasSeoPro] = useState<boolean>(true);
  const [hasBooking, setHasBooking] = useState<boolean>(false);
  const [hasPdpa, setHasPdpa] = useState<boolean>(true);
  const [hasLineOa, setHasLineOa] = useState<boolean>(true);
  const [speedTier, setSpeedTier] = useState<'standard' | 'express'>('standard');

  // Base prices
  const typeBasePrices = {
    landing: 12000,
    corporate: 18000,
    ecommerce: 28000,
    custom: 38000,
  };

  const typeBaseDays = {
    landing: 10,
    corporate: 18,
    ecommerce: 30,
    custom: 40,
  };

  // Calculations
  const basePrice = typeBasePrices[websiteType];
  const pagePrice = Math.max(0, pageCount - 3) * 1500;
  const ecommercePrice = hasEcommerce || websiteType === 'ecommerce' ? 8000 : 0;
  const multiLangPrice = hasMultiLang ? 4500 : 0;
  const seoProPrice = hasSeoPro ? 3500 : 0;
  const bookingPrice = hasBooking ? 5000 : 0;
  const pdpaPrice = hasPdpa ? 2000 : 0;
  const lineOaPrice = hasLineOa ? 1500 : 0;
  const expressMultiplier = speedTier === 'express' ? 1.2 : 1;

  const rawTotal = (basePrice + pagePrice + ecommercePrice + multiLangPrice + seoProPrice + bookingPrice + pdpaPrice + lineOaPrice);
  const finalPrice = Math.round(rawTotal * expressMultiplier / 100) * 100;

  // Days
  const baseDays = typeBaseDays[websiteType] + Math.floor((pageCount - 3) * 1.5);
  const calculatedDays = speedTier === 'express' ? Math.max(7, Math.round(baseDays * 0.6)) : baseDays;

  const handleApply = () => {
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#78B900', '#1A1A1A', '#619500', '#E5E5E0']
    });

    const features: string[] = [];
    if (hasEcommerce || websiteType === 'ecommerce') features.push('ระบบร้านค้าออนไลน์ & ชำระเงิน');
    if (hasMultiLang) features.push('ระบบ 2 ภาษา (Multi-Language)');
    if (hasSeoPro) features.push('โครงสร้าง Advanced SEO');
    if (hasBooking) features.push('ระบบนัดหมาย/จองคิวออนไลน์');
    if (hasPdpa) features.push('ระบบ PDPA Cookie Consent');
    if (hasLineOa) features.push('เชื่อมต่อแจ้งเตือน Line OA');
    if (speedTier === 'express') features.push('งานด่วนพิเศษ Express');

    const typeNames = {
      landing: 'Landing Page หน้าเดียว',
      corporate: 'เว็บไซต์บริษัท / องค์กร (Corporate)',
      ecommerce: 'เว็บไซต์ร้านค้า E-Commerce',
      custom: 'เว็บแอปพลิเคชัน & Custom Web App',
    };

    onApplyToQuote({
      type: typeNames[websiteType],
      pages: pageCount,
      totalPrice: finalPrice,
      estimatedDays: calculatedDays,
      featuresList: features,
    });

    // Smooth scroll to contact
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculator" className="py-24 bg-[#F9F9F7] relative border-t border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#78B900]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#619500] font-mono">
              INSTANT PROJECT ESTIMATOR
            </span>
            <span className="w-8 h-[1px] bg-[#78B900]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            คำนวณราคา<span className="text-[#78B900] italic font-serif font-normal">ประเมินโปรเจกต์</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            เลือกฟังก์ชันที่คุณต้องการเพื่อดูราคาประเมินเบื้องต้นและระยะเวลาทำงานจริงได้ทันที โปร่งใส ชัดเจน
          </p>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Config Options */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Website Type */}
            <div className="p-7 rounded-3xl bg-white border border-[#E5E5E0] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-3">
                1. เลือกประเภทเว็บไซต์ (Website Type)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'corporate', label: 'บริษัท & องค์กร (Corporate)', desc: 'เพิ่มความน่าเชื่อถือ ปิดการขาย' },
                  { id: 'ecommerce', label: 'ร้านค้าออนไลน์ (E-Commerce)', desc: 'ตะกร้าสินค้า สแกนจ่าย ตัดบัตร' },
                  { id: 'landing', label: 'Landing Page หน้าเดียว', desc: 'เน้นยิงโฆษณา สร้าง Lead รวดเร็ว' },
                  { id: 'custom', label: 'เว็บระบบเฉพาะ (Custom Web)', desc: 'ฟังก์ชันพิเศษ เชื่อมต่อ API ภายนอก' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setWebsiteType(t.id as any);
                      if (t.id === 'ecommerce') setHasEcommerce(true);
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                      websiteType === t.id
                        ? 'bg-[#F4FAE6] border-[#78B900] text-[#1A1A1A] shadow-xs'
                        : 'bg-white border-[#E5E5E0] text-stone-600 hover:bg-[#F9F9F7]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">{t.label}</span>
                      {websiteType === t.id && <Check className="w-4 h-4 text-[#78B900]" />}
                    </div>
                    <span className="text-[11px] text-stone-500">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Page Count Slider */}
            <div className="p-7 rounded-3xl bg-white border border-[#E5E5E0] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  2. จำนวนหน้าเว็บไซต์โดยประมาณ (Pages)
                </label>
                <span className="px-3.5 py-1 rounded-full bg-[#78B900] text-white font-mono font-bold text-xs shadow-xs">
                  {pageCount} หน้า
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={pageCount}
                onChange={(e) => setPageCount(parseInt(e.target.value))}
                className="w-full h-2 bg-[#E5E5E0] rounded-lg appearance-none cursor-pointer accent-[#78B900]"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-2">
                <span>1 หน้า (Landing)</span>
                <span>5 หน้า (มาตรฐาน)</span>
                <span>10 หน้า (ธุรกิจขนาดกลาง)</span>
                <span>20+ หน้า</span>
              </div>
            </div>

            {/* Step 3: Add-on Features Checkboxes */}
            <div className="p-7 rounded-3xl bg-white border border-[#E5E5E0] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-3">
                3. ฟังก์ชันเสริมพิเศษ (Add-on Features)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    state: hasSeoPro,
                    setter: setHasSeoPro,
                    label: 'SEO Pro โครงสร้างขั้นสูง',
                    price: '+฿3,500',
                    desc: 'Schema, Keyword Mapping, Meta',
                  },
                  {
                    state: hasPdpa,
                    setter: setHasPdpa,
                    label: 'ระบบ PDPA & Cookie Banner',
                    price: '+฿2,000',
                    desc: 'ถูกต้องตามกฎหมายไทย 100%',
                  },
                  {
                    state: hasLineOa,
                    setter: setHasLineOa,
                    label: 'เชื่อมต่อแจ้งเตือน Line OA',
                    price: '+฿1,500',
                    desc: 'เตือนออเดอร์/ฟอร์มติดต่อทันที',
                  },
                  {
                    state: hasMultiLang,
                    setter: setHasMultiLang,
                    label: 'ระบบหลายภาษา (TH / EN)',
                    price: '+฿4,500',
                    desc: 'สลับภาษาอัตโนมัติ',
                  },
                  {
                    state: hasBooking,
                    setter: setHasBooking,
                    label: 'ระบบนัดหมาย / จองคิวออนไลน์',
                    price: '+฿5,000',
                    desc: 'ปฏิทินจองคิว ซิงค์ Google Calendar',
                  },
                  {
                    state: hasEcommerce || websiteType === 'ecommerce',
                    setter: setHasEcommerce,
                    label: 'ระบบร้านค้า E-Commerce',
                    price: '+฿8,000',
                    desc: 'PromptPay, ตัดบัตร, สต็อก',
                    disabled: websiteType === 'ecommerce',
                  },
                ].map((feat, i) => (
                  <button
                    key={i}
                    disabled={feat.disabled}
                    onClick={() => feat.setter(!feat.state)}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex items-start justify-between ${
                      feat.state
                        ? 'bg-[#F4FAE6] border-[#78B900] text-[#1A1A1A]'
                        : 'bg-white border-[#E5E5E0] text-stone-500 hover:bg-[#F9F9F7]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                          feat.state ? 'bg-[#78B900] text-white' : 'border border-stone-300'
                        }`}>
                          {feat.state && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-semibold text-xs text-[#1A1A1A]">{feat.label}</span>
                      </div>
                      <p className="text-[10px] text-stone-500 pl-6 mt-0.5">{feat.desc}</p>
                    </div>
                    <span className="text-[11px] font-mono text-[#619500] font-bold shrink-0 ml-2">
                      {feat.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Speed Tier */}
            <div className="p-7 rounded-3xl bg-white border border-[#E5E5E0] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-3">
                4. ความเร็วในการส่งมอบงาน (Timeline SLA)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSpeedTier('standard')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    speedTier === 'standard'
                      ? 'bg-[#F4FAE6] border-[#78B900] text-[#1A1A1A]'
                      : 'bg-white border-[#E5E5E0] text-stone-500'
                  }`}
                >
                  <div className="font-bold text-xs">กำหนดการปกติ (Standard)</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">ระยะเวลาประมาณ {baseDays} วันทำการ</div>
                </button>
                <button
                  onClick={() => setSpeedTier('express')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    speedTier === 'express'
                      ? 'bg-[#F4FAE6] border-[#78B900] text-[#1A1A1A]'
                      : 'bg-white border-[#E5E5E0] text-stone-500'
                  }`}
                >
                  <div className="font-bold text-xs text-[#619500] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#78B900]" />
                    <span>ด่วนพิเศษ (Express +20%)</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">ระยะเวลาเร่งรัด ~{Math.max(7, Math.round(baseDays * 0.6))} วัน</div>
                </button>
              </div>
            </div>

          </div>

          {/* Right / Live Estimate Summary Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#E5E5E0] shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#619500] tracking-wider font-semibold">
                    ESTIMATED PROPOSAL
                  </span>
                  <h3 className="text-lg font-bold text-[#1A1A1A]">
                    สรุปราคาประเมิน
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#F4FAE6] flex items-center justify-center text-[#619500]">
                  <Calculator className="w-4 h-4" />
                </div>
              </div>

              {/* Price display */}
              <div className="mb-6 p-5 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0]">
                <span className="text-xs text-stone-500 block mb-1">ราคาประเมินสุทธิโดยประมาณ</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-bold text-[#78B900] font-mono">
                    ฿{finalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">บาท (สุทธิ)</span>
                </div>
                <div className="mt-3 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#78B900]" />
                    <span>ระยะเวลาส่งมอบงาน:</span>
                  </span>
                  <span className="font-mono font-bold text-[#1A1A1A]">~{calculatedDays} วันทำการ</span>
                </div>
              </div>

              {/* Selected breakdown checklist */}
              <div className="space-y-2.5 mb-6 text-xs text-stone-600">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-400">ประเภท:</span>
                  <span className="font-medium text-[#1A1A1A]">{websiteType.toUpperCase()} ({pageCount} หน้า)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-400">การดูแลหลังการขาย:</span>
                  <span className="font-medium text-[#1A1A1A]">ดูแลฟรี 6 เดือนเต็ม</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-400">Google PageSpeed:</span>
                  <span className="font-medium text-[#619500] font-mono font-bold">การันตี 95-100 คะแนน</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-400">เงื่อนไขการชำระ:</span>
                  <span className="font-medium text-[#1A1A1A]">แบ่งจ่าย 2 งวด (50/50)</span>
                </div>
              </div>

              {/* Apply CTA with CI green */}
              <button
                onClick={handleApply}
                id="calculator-apply-quote-btn"
                className="w-full py-4 rounded-full bg-[#78B900] hover:bg-[#68a000] text-white font-medium text-sm shadow-md shadow-[#78B900]/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>ใช้ราคานี้ขอใบเสนอราคาทางการ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-stone-400 text-center mt-3">
                * ราคานี้เป็นราคาประเมินเบื้องต้น ทีมงานจะส่งใบเสนอราคาทางการที่มีรายละเอียดครบถ้วนให้อีกครั้ง
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

