import { useState, useEffect, type FormEvent } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileText, 
  X, 
  Copy, 
  Check 
} from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  initialQuoteData?: {
    type?: string;
    planName?: string;
    price?: number;
    pages?: number;
    estimatedDays?: number;
    featuresList?: string[];
  } | null;
  onClearQuoteData: () => void;
  onOpenLineModal: () => void;
}

export const ContactSection = ({ 
  initialQuoteData, 
  onClearQuoteData,
  onOpenLineModal
}: ContactSectionProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('corporate');
  const [budget, setBudget] = useState('15k-30k');
  const [message, setMessage] = useState('');
  const [agreedPdpa, setAgreedPdpa] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLine, setCopiedLine] = useState(false);

  useEffect(() => {
    if (initialQuoteData) {
      let msg = '';
      if (initialQuoteData.planName) {
        msg += `[สนใจแพ็คเกจ: ${initialQuoteData.planName} (฿${initialQuoteData.price?.toLocaleString()})]\n`;
      }
      if (initialQuoteData.type) {
        msg += `[ประเภทเว็บ: ${initialQuoteData.type} (~${initialQuoteData.pages} หน้า)]\n`;
      }
      if (initialQuoteData.featuresList && initialQuoteData.featuresList.length > 0) {
        msg += `[ฟีเจอร์ที่ต้องการ: ${initialQuoteData.featuresList.join(', ')}]\n`;
      }
      if (initialQuoteData.price) {
        msg += `[ราคาประเมินเบื้องต้น: ฿${initialQuoteData.price.toLocaleString()} (~${initialQuoteData.estimatedDays} วัน)]\n\n`;
      }
      msg += 'ต้องการสอบถามรายละเอียดเพิ่มเติมเกี่ยวกับการทำเว็บไซต์...';
      setMessage(msg);
    }
  }, [initialQuoteData]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#78B900', '#1A1A1A', '#619500', '#E5E5E0']
      });
    }, 600);
  };

  const copyToClipboard = (text: string, type: 'email' | 'line') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedLine(true);
      setTimeout(() => setCopiedLine(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#F9F9F7] relative overflow-hidden border-t border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contacts & Value Statement */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[1px] bg-[#78B900]" />
                <span className="text-xs uppercase tracking-widest font-semibold text-[#619500] font-mono">
                  START YOUR PROJECT
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-tight mb-4">
                เริ่มต้น<span className="text-[#78B900] italic font-serif font-normal">โปรเจกต์</span>กับเรา
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-8">
                ไม่ว่าจะเป็นเว็บไซต์บริษัท, ร้านค้า E-Commerce, หรือ Portfolio เราพร้อมให้คำปรึกษา แนะนำโครงสร้าง และประเมินราคาให้ฟรีโดยไม่มีข้อผูกมัด
              </p>

              {/* Direct Contact Cards */}
              <div className="space-y-3 mb-8">
                
                {/* Email */}
                <div className="p-5 rounded-3xl bg-white border border-[#E5E5E0] flex items-center justify-between group hover:border-[#78B900] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#F4FAE6] text-[#619500] flex items-center justify-center group-hover:bg-[#78B900] group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-stone-400 block">อีเมลติดต่อโดยตรง</span>
                      <a 
                        href="mailto:thawatsak28@gmail.com" 
                        className="text-xs sm:text-sm font-semibold text-[#1A1A1A] group-hover:text-[#619500] transition-colors font-mono"
                      >
                        thawatsak28@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('thawatsak28@gmail.com', 'email')}
                    className="p-2.5 rounded-full bg-[#F0F0EE] hover:bg-[#F4FAE6] hover:text-[#619500] text-stone-700 transition-colors text-xs"
                    title="คัดลอกอีเมล"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-[#78B900]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Line Official */}
                <div className="p-5 rounded-3xl bg-white border border-[#E5E5E0] flex items-center justify-between group hover:border-[#06C755]/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#06C755]/10 flex items-center justify-center text-[#06C755]">
                      <MessageCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <span className="text-[11px] text-stone-400 block">Line ID</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#1A1A1A] font-mono">
                        thawatsak
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard('thawatsak', 'line')}
                      className="p-2.5 rounded-full bg-[#F0F0EE] hover:bg-stone-200 text-stone-700 transition-colors"
                      title="คัดลอก Line ID"
                    >
                      {copiedLine ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={onOpenLineModal}
                      className="px-4 py-2 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-medium text-xs shadow-sm transition-all"
                    >
                      แอดไลน์
                    </button>
                  </div>
                </div>

              </div>

              {/* SLA Response Guarantee */}
              <div className="p-5 rounded-3xl bg-[#F0F0EE] border border-[#E5E5E0] flex items-center gap-3.5 text-xs text-stone-700">
                <Clock className="w-5 h-5 text-[#78B900] shrink-0" />
                <div>
                  <span className="font-bold text-[#1A1A1A] block">การันตีตอบกลับรวดเร็ว</span>
                  <span>ทีมงานจะติดต่อกลับพร้อมสรุปข้อมูลเบื้องต้นภายใน 15 - 30 นาทีในเวลาทำการ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Request Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E5E0] shadow-xl relative">
              
              {/* If prefilled from calculator / plan */}
              {initialQuoteData && (
                <div className="mb-6 p-4 rounded-2xl bg-[#F4FAE6] border border-[#78B900]/30 flex items-start justify-between">
                  <div className="text-xs">
                    <div className="flex items-center gap-1.5 text-[#619500] font-bold mb-1">
                      <FileText className="w-4 h-4" />
                      <span>รายการราคาที่เลือกไว้</span>
                    </div>
                    <p className="text-stone-700">
                      {initialQuoteData.planName || initialQuoteData.type} {initialQuoteData.price ? `(ประเมิน ฿${initialQuoteData.price.toLocaleString()})` : ''}
                    </p>
                  </div>
                  <button
                    onClick={onClearQuoteData}
                    className="p-1 rounded-lg text-stone-400 hover:text-[#1A1A1A]"
                    title="ล้างข้อมูลที่เลือก"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F4FAE6] text-[#619500] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 stroke-[2]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                    ได้รับข้อมูลของคุณเรียบร้อยแล้ว!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mb-6 leading-relaxed">
                    ขอบคุณที่ให้ความสนใจ WAEN WEB ทีมงานกำลังตรวจสอบรายละเอียดและจะติดต่อกลับผ่านอีเมล <strong className="text-[#1A1A1A]">{email}</strong> หรือโทรศัพท์โดยเร็วที่สุด
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#78B900] hover:bg-[#68a000] text-xs font-medium text-white shadow-sm transition-colors"
                  >
                    ส่งข้อมูลเพิ่มเติม
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div>
                      <label className="text-xs font-medium text-stone-600 block mb-1.5">
                        ชื่อ - นามสกุล <span className="text-[#78B900]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="คุณธวัชศักดิ์..."
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0] text-[#1A1A1A] placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#78B900] transition-colors"
                        id="contact-form-name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-medium text-stone-600 block mb-1.5">
                        อีเมลสำหรับติดต่อกลับ <span className="text-[#78B900]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0] text-[#1A1A1A] placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#78B900] transition-colors"
                        id="contact-form-email"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-xs font-medium text-stone-600 block mb-1.5">
                        เบอร์โทรศัพท์
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="08X-XXX-XXXX"
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0] text-[#1A1A1A] placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#78B900] transition-colors"
                        id="contact-form-phone"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="text-xs font-medium text-stone-600 block mb-1.5">
                        ชื่อธุรกิจ / บริษัท (ถ้ามี)
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="เช่น Smile Clinic, Prime Co., Ltd."
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0] text-[#1A1A1A] placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#78B900] transition-colors"
                        id="contact-form-company"
                      />
                    </div>

                  </div>

                  {/* Project Type & Budget Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-stone-600 block mb-1.5">
                        ประเภทเว็บไซต์
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0] text-[#1A1A1A] text-xs sm:text-sm focus:outline-none focus:border-[#78B900] transition-colors cursor-pointer"
                        id="contact-form-project-type"
                      >
                        <option value="corporate">เว็บไซต์บริษัท / องค์กร (Corporate)</option>
                        <option value="ecommerce">ร้านค้าออนไลน์ E-Commerce (ตัดบัตร/PromptPay)</option>
                        <option value="healthcare">คลินิก / สุขภาพ / นัดหมายแพทย์</option>
                        <option value="realestate">อสังหาริมทรัพย์ / โครงการ</option>
                        <option value="landing">Landing Page ยิงโฆษณา</option>
                        <option value="redesign">รีดีไซน์ / ปรับปรุงเว็บเดิมให้โหลดเร็ว</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-stone-600 block mb-1.5">
                        งบประมาณโดยประมาณ
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0] text-[#1A1A1A] text-xs sm:text-sm focus:outline-none focus:border-[#78B900] transition-colors cursor-pointer"
                        id="contact-form-budget"
                      >
                        <option value="16k">฿16,000 (Startup Package)</option>
                        <option value="15k-30k">฿25,000 - ฿35,000 (Business / E-Commerce)</option>
                        <option value="35k-60k">฿35,000 - ฿60,000 (Custom / Full System)</option>
                        <option value="60k+">฿60,000+ (Enterprise / Platform)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-medium text-stone-600 block mb-1.5">
                      รายละเอียดโปรเจกต์ หรือบริการที่ต้องการ <span className="text-[#78B900]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="เล่ารายละเอียดเบื้องต้น เช่น เว็บเดิมที่มีปัญหา, ฟังก์ชันที่อยากได้, หรือวันที่ต้องการเปิดตัว..."
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0] text-[#1A1A1A] placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#78B900] transition-colors resize-none"
                      id="contact-form-message"
                    />
                  </div>

                  {/* PDPA Agreement */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="pdpa-consent"
                      required
                      checked={agreedPdpa}
                      onChange={(e) => setAgreedPdpa(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-[#E5E5E0] bg-[#F9F9F7] text-[#78B900] accent-[#78B900] cursor-pointer"
                    />
                    <label htmlFor="pdpa-consent" className="text-[11px] text-stone-500 leading-tight cursor-pointer">
                      ยินยอมให้ WAEN WEB ประมวลผลข้อมูลส่วนบุคคลเพื่อการติดต่อและจัดทำใบเสนอราคาตาม{' '}
                      <span className="text-[#619500] underline">นโยบายความเป็นส่วนตัว (PDPA)</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-form-submit-btn"
                    className="w-full py-4 rounded-full bg-[#78B900] hover:bg-[#68a000] text-white font-medium text-sm shadow-md shadow-[#78B900]/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>กำลังส่งข้อมูล...</span>
                      </span>
                    ) : (
                      <>
                        <span>ส่งข้อความเพื่อประเมินราคา</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#78B900]" />
                    <span>ข้อมูลของคุณจะถูกเก็บเป็นความลับและประมวลผลตามนโยบายความเป็นส่วนตัว</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

