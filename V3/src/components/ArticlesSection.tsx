import { useState, type FormEvent } from 'react';
import { ARTICLES_DATA } from '../data/mockData';
import { Article } from '../types';
import { Clock, ArrowRight, X, Tag, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const ArticlesSection = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail || !subscriberEmail.includes('@')) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#78B900', '#1A1A1A', '#619500', '#E5E5E0']
      });
    }, 600);
  };

  return (
    <section id="articles" className="py-24 bg-[#F0F0EE]/30 relative border-t border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#78B900]" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[#619500] font-mono">
                INSIGHTS & GUIDES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              บทความ<span className="text-[#78B900] italic font-serif font-normal">ล่าสุด</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
              ความรู้เรื่องเว็บไซต์ WordPress SEO และธุรกิจออนไลน์ อ่านเข้าใจง่าย นำไปใช้เพิ่มยอดขายได้จริง
            </p>
          </div>

          <a
            href="#articles"
            onClick={(e) => { e.preventDefault(); setSelectedArticle(ARTICLES_DATA[0]); }}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#619500] hover:text-[#78B900] transition-colors"
          >
            <span>อ่านบทความเด่น</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES_DATA.map((art, idx) => (
            <motion.article
              key={art.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              onClick={() => setSelectedArticle(art)}
              className="flex flex-col justify-between rounded-3xl bg-white border border-[#E5E5E0] overflow-hidden hover:border-[#78B900] hover:shadow-xl transition-all cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              id={`article-card-${art.id}`}
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-stone-100">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-white/90 backdrop-blur-md text-[#1A1A1A] border border-stone-200 font-semibold shadow-xs">
                      {art.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#619500] transition-colors line-clamp-2 mb-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed mb-4">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#78B900]" />
                  <span>{art.readTime}</span>
                </div>
                <span className="text-xs font-semibold text-[#619500] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>อ่านต่อ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Subscription Form at the bottom */}
        <div className="mt-16 relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-white border border-[#E5E5E0] shadow-sm">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4FAE6] border border-[#78B900]/30 text-xs font-mono font-semibold text-[#619500] mb-4">
              <Mail className="w-3.5 h-3.5 text-[#78B900]" />
              <span>NEWSLETTER & INSIGHTS</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-3">
              รับความรู้และเทคนิคทำเว็บ <span className="text-[#78B900] italic font-serif font-normal">ส่งตรงถึงอีเมลคุณ</span>
            </h3>

            <p className="text-sm text-stone-600 leading-relaxed max-w-xl mx-auto mb-8">
              อัปเดตเทรนด์ดีไซน์ UX/UI, เคล็ดลับทำ SEO ดันเว็บติดหน้าแรก Google, และกลยุทธ์สร้างยอดขายออนไลน์ ทุกสัปดาห์ ไม่มีสแปม
            </p>

            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0] max-w-md mx-auto flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#F4FAE6] text-[#619500] flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6 stroke-[2]" />
                </div>
                <h4 className="text-base font-bold text-[#1A1A1A] mb-1">
                  สมัครรับจดหมายข่าวเรียบร้อยแล้ว!
                </h4>
                <p className="text-xs text-stone-500 mb-4">
                  เราได้บันทึกอีเมล <strong className="text-[#1A1A1A] font-medium">{subscriberEmail}</strong> แล้ว คุณจะได้รับบทความและคำแนะนำฉบับถัดไปในไม่ช้า
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubscribed(false);
                    setSubscriberEmail('');
                  }}
                  className="text-xs text-[#619500] hover:text-[#78B900] underline transition-colors"
                >
                  สมัครด้วยอีเมลอื่น
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <div className="relative w-full">
                    <input
                      type="email"
                      required
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      placeholder="กรอกอีเมลของคุณ (เช่น name@company.com)"
                      className="w-full px-5 py-3.5 rounded-full bg-[#F9F9F7] border border-[#E5E5E0] text-[#1A1A1A] placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#78B900] transition-colors"
                      id="newsletter-email-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="newsletter-subscribe-btn"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#78B900] hover:bg-[#68a000] text-white font-medium text-xs sm:text-sm shadow-md shadow-[#78B900]/25 flex items-center justify-center gap-2 whitespace-nowrap transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>กำลังบันทึก...</span>
                      </span>
                    ) : (
                      <>
                        <span>ติดตามบทความ</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 mt-3.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#78B900]" />
                  <span>เราเคารพความเป็นส่วนตัวของคุณ ปลอดสแปม 100% ยกเลิกได้ตลอดเวลา</span>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* Interactive Article Reading Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1A1A1A]/60 backdrop-blur-md overflow-y-auto">
            <div className="fixed inset-0" onClick={() => setSelectedArticle(null)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white border border-[#E5E5E0] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#78B900] text-white">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-stone-500">{selectedArticle.date}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-full bg-[#F0F0EE] hover:bg-stone-200 text-stone-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                {selectedArticle.title}
              </h2>

              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full aspect-video object-cover rounded-2xl mb-6 shadow-sm"
                referrerPolicy="no-referrer"
              />

              <div className="space-y-4 text-sm text-stone-600 leading-relaxed mb-6">
                {selectedArticle.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-stone-100">
                <Tag className="w-3.5 h-3.5 text-[#78B900]" />
                {selectedArticle.tags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-[#F4FAE6] text-[#619500] font-mono">
                    #{t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

