import { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Laptop, 
  Smartphone, 
  Tablet, 
  Zap, 
  Gauge, 
  Code2, 
  Eye, 
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

interface HeroProps {
  onOpenCalculator: () => void;
  onOpenLineModal: () => void;
}

export const Hero = ({ onOpenCalculator, onOpenLineModal }: HeroProps) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'speed' | 'stack'>('preview');
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [demoLikeCount, setDemoLikeCount] = useState(148);
  const [hasLiked, setHasLiked] = useState(false);

  const handleRunPreview = () => {
    setIsRunningTest(true);
    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#78B900', '#1A1A1A', '#A3A39E', '#E5E5E0']
    });
    setTimeout(() => {
      setIsRunningTest(false);
      setActiveTab('preview');
    }, 400);
  };

  const handleDemoLike = () => {
    if (!hasLiked) {
      setDemoLikeCount(prev => prev + 1);
      setHasLiked(true);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#78B900', '#1A1A1A', '#619500']
      });
    } else {
      setDemoLikeCount(prev => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#F9F9F7]">
      {/* Background Soft Organic Blurred Blobs with CI Accent Glow */}
      <div className="absolute -bottom-10 -left-12 w-80 h-80 bg-[#78B900]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none -z-10" />
      <div className="absolute top-20 -right-12 w-96 h-96 bg-[#F0F0EE] rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Artistic Flair Copy & CI Brand Highlights */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Architectural Eyebrow Line with CI Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4 flex items-center gap-2.5"
            >
              <span className="w-10 h-[2px] bg-[#78B900]" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[#619500] px-3 py-1 rounded-full bg-[#F4FAE6] border border-[#78B900]/30 font-mono">
                REDEFINING DIGITAL SPACE
              </span>
            </motion.div>

            {/* Main Headline with Serif/Italic CI Contrast */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.08] mb-6"
            >
              Crafting <span className="text-[#78B900] italic font-serif font-normal">Seamless</span>
              <br />
              Web Experiences.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-xl mb-8"
            >
              สตูดิโอรับทำเว็บไซต์มืออาชีพ ออกแบบอย่างมีเอกลักษณ์ (Custom UI/UX) โครงสร้างสะอาด โหลดไวระดับ 0.4s ติดหน้าแรก Google และตอบโจทย์ธุรกิจคุณในทุกมิติ
            </motion.p>

            {/* Tech Stack Pills in Theme */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center gap-2 mb-8"
            >
              {['WordPress CMS', 'React 19', 'TypeScript', 'Tailwind CSS', 'Next.js 14'].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-white text-stone-700 border border-[#E5E5E0] font-mono shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  {tech}
                </span>
              ))}
              <span className="text-xs px-3 py-1 rounded-full bg-[#F4FAE6] text-[#619500] border border-[#78B900]/40 font-mono font-bold shadow-xs">
                ⚡ PageSpeed 99+
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10"
            >
              <a
                href="#contact"
                id="hero-contact-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm text-white bg-[#78B900] hover:bg-[#68a000] shadow-md shadow-[#78B900]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>เริ่มโปรเจกต์กับเรา</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#portfolio"
                id="hero-portfolio-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm text-[#1A1A1A] bg-white hover:bg-[#F0F0EE] border border-[#E5E5E0] shadow-xs transition-all"
              >
                <Eye className="w-4 h-4 text-stone-600" />
                <span>ดูผลงานจริง</span>
              </a>

              <button
                onClick={onOpenCalculator}
                id="hero-calculator-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-medium text-xs text-stone-700 bg-[#F0F0EE] hover:bg-white border border-[#E5E5E0] transition-all shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 text-[#78B900]" />
                <span>คำนวณราคาประเมินฟรี</span>
              </button>
            </motion.div>

            {/* Trust Avatars & Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 pt-6 border-t border-[#E5E5E0] w-full"
            >
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#F9F9F7] bg-[#F4FAE6] text-[#619500] flex items-center justify-center text-[10px] font-bold">JD</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#F9F9F7] bg-stone-300 flex items-center justify-center text-[10px] font-bold text-stone-800">AS</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#F9F9F7] bg-stone-400 flex items-center justify-center text-[10px] font-bold text-stone-900">MK</div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-bold text-[#1A1A1A]">Trusted by 45+ Businesses & Brands</span>
                <span className="text-[10px] text-stone-400 uppercase tracking-tight">รับประกันดูแลระบบ 1 ปีเต็ม • ส่งมอบตรงเวลา 100%</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Sleek Device Bezel with Interactive Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 w-full relative"
          >
            {/* Device Container matching Theme Bezel */}
            <div className="w-full bg-white rounded-[36px] sm:rounded-[44px] shadow-2xl border-[6px] sm:border-[8px] border-[#1A1A1A] overflow-hidden relative">
              
              {/* Dynamic Island / Notch Bar */}
              <div className="absolute top-0 left-0 w-full h-8 flex justify-center items-end pb-1 bg-white z-20">
                <div className="w-24 h-3.5 bg-[#1A1A1A] rounded-full flex items-center justify-end px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#78B900] animate-pulse" />
                </div>
              </div>

              {/* Window Header Navigation */}
              <div className="pt-10 px-4 pb-3 bg-white border-b border-stone-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-stone-400">waen.studio/preview</span>
                </div>

                {/* Device Frame Viewport Switcher */}
                <div className="flex items-center gap-1 bg-[#F0F0EE] p-1 rounded-full border border-stone-200">
                  <button
                    onClick={() => setActiveDevice('desktop')}
                    className={`p-1.5 rounded-full ${activeDevice === 'desktop' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-stone-400 hover:text-stone-600'}`}
                    title="Desktop"
                  >
                    <Laptop className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setActiveDevice('tablet')}
                    className={`p-1.5 rounded-full ${activeDevice === 'tablet' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-stone-400 hover:text-stone-600'}`}
                    title="Tablet"
                  >
                    <Tablet className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setActiveDevice('mobile')}
                    className={`p-1.5 rounded-full ${activeDevice === 'mobile' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-stone-400 hover:text-stone-600'}`}
                    title="Mobile"
                  >
                    <Smartphone className="w-3 h-3" />
                  </button>
                </div>

                {/* Run Preview CTA */}
                <button
                  onClick={handleRunPreview}
                  disabled={isRunningTest}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#78B900] hover:bg-[#68a000] text-white text-[10px] font-medium transition-all shadow-xs"
                >
                  <Play className={`w-2.5 h-2.5 fill-current ${isRunningTest ? 'animate-spin' : ''}`} />
                  <span>{isRunningTest ? 'TESTING...' : 'RUN'}</span>
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 px-4 py-2 bg-[#F9F9F7] border-b border-stone-200 overflow-x-auto no-scrollbar">
                {[
                  { id: 'preview', label: 'Live Site', icon: <Eye className="w-3 h-3" /> },
                  { id: 'code', label: 'Core.tsx', icon: <Code2 className="w-3 h-3" /> },
                  { id: 'speed', label: 'PageSpeed', icon: <Gauge className="w-3 h-3" /> },
                  { id: 'stack', label: 'Stack', icon: <Layers className="w-3 h-3" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-white text-[#1A1A1A] shadow-xs border border-stone-200'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Main Emulator Content */}
              <div className="p-4 bg-[#F9F9F7] min-h-[340px] flex items-center justify-center">
                
                {/* TAB 1: Preview */}
                {activeTab === 'preview' && (
                  <div
                    className={`w-full transition-all duration-300 mx-auto ${
                      activeDevice === 'mobile'
                        ? 'max-w-[260px] rounded-2xl border-2 border-stone-300 bg-white p-3 shadow-md'
                        : activeDevice === 'tablet'
                        ? 'max-w-[340px] rounded-xl border border-stone-200 bg-white p-3.5 shadow-md'
                        : 'w-full rounded-2xl bg-white p-4 border border-stone-200 shadow-sm'
                    }`}
                  >
                    {/* Simulated Mini Site Header */}
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-stone-100 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-[#78B900] flex items-center justify-center text-white font-bold text-[8px]">
                          W
                        </div>
                        <span className="font-bold text-[#1A1A1A]">Nomad Brand</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#F4FAE6] text-[#619500] text-[9px] font-mono border border-[#78B900]/30 font-semibold">
                        ● 0.4s Fast
                      </span>
                    </div>

                    {/* Simulated Mini Site Card */}
                    <div className="rounded-xl p-3 bg-[#F0F0EE] border border-stone-200 mb-3">
                      <span className="text-[9px] uppercase font-mono tracking-wider text-[#619500] font-semibold block mb-0.5">
                        Aesthetics & Speed
                      </span>
                      <h4 className="text-xs font-bold text-[#1A1A1A] leading-snug mb-1">
                        เว็บไซต์มินิมอล ยกระดับแบรนด์ เพิ่มยอดขาย 240%
                      </h4>
                      <p className="text-[10px] text-stone-500 leading-relaxed mb-3">
                        ออกแบบเฉพาะธุรกิจ โค้ดสะอาด ได้มาตรฐาน Core Web Vitals 99+
                      </p>

                      {/* Interactive like button inside preview */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                        <button
                          onClick={handleDemoLike}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                            hasLiked 
                              ? 'bg-[#78B900] text-white shadow-xs' 
                              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          <span>{hasLiked ? '❤️ Liked' : '🤍 Like'}</span>
                          <span className="font-mono">({demoLikeCount})</span>
                        </button>

                        <span className="text-[10px] font-mono font-bold text-[#619500]">
                          PageSpeed 100/100
                        </span>
                      </div>
                    </div>

                    {/* Metric row */}
                    <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                      <div className="p-1.5 rounded-lg bg-stone-50 border border-stone-100">
                        <span className="text-stone-400 block text-[8px]">SEO</span>
                        <span className="font-bold text-[#1A1A1A]">100%</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-[#F4FAE6] border border-[#78B900]/20">
                        <span className="text-[#619500] block text-[8px]">Speed</span>
                        <span className="font-bold text-[#619500]">0.42s</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-stone-50 border border-stone-100">
                        <span className="text-stone-400 block text-[8px]">Design</span>
                        <span className="font-bold text-[#1A1A1A]">Custom</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: Source Code */}
                {activeTab === 'code' && (
                  <div className="w-full bg-[#1A1A1A] p-4 rounded-2xl font-mono text-[11px] text-stone-200 border border-stone-800 overflow-x-auto">
                    <div className="text-stone-500 mb-1">// Modern Architecture with CI Palette</div>
                    <p className="text-stone-400">
                      export default function <span className="text-[#78B900] font-bold">WaenStudioCore</span>() {'{'}
                    </p>
                    <p className="pl-3 text-stone-400">return (</p>
                    <p className="pl-6 text-stone-300">
                      {'<'}<span className="text-stone-100">CustomMinimalWebsite</span>
                    </p>
                    <p className="pl-9 text-stone-400">brandColor={<span className="text-[#78B900]">"#78b900cc"</span>}</p>
                    <p className="pl-9 text-stone-400">performanceScore={<span className="text-[#78B900]">100</span>}</p>
                    <p className="pl-9 text-stone-400">googleSEO={<span className="text-white">true</span>}</p>
                    <p className="pl-9 text-stone-400">mobileFirst={<span className="text-white">true</span>}</p>
                    <p className="pl-6 text-stone-300">{'/>'}</p>
                    <p className="pl-3 text-stone-400">);</p>
                    <p className="text-stone-400">{'}'}</p>
                    <div className="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-[9px] text-stone-400">
                      <span>✓ Clean TypeScript 5.8</span>
                      <span className="text-[#78B900]">0 Errors</span>
                    </div>
                  </div>
                )}

                {/* TAB 3: Speed Score */}
                {activeTab === 'speed' && (
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-stone-200 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#78B900] text-white flex items-center justify-center font-bold text-lg font-mono shadow-sm">
                          99
                        </div>
                        <div>
                          <h5 className="font-bold text-[#1A1A1A] text-xs">Google Core Web Vitals</h5>
                          <p className="text-[10px] text-stone-500">มาตรฐานความเร็วระดับสากล</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#F4FAE6] text-[#619500] text-[10px] font-semibold border border-[#78B900]/30 font-mono">
                        Grade A+
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                        <span className="text-stone-400 block text-[9px]">First Paint (FCP)</span>
                        <span className="text-[#619500] font-mono font-bold text-xs">0.35s</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                        <span className="text-stone-400 block text-[9px]">Largest Paint (LCP)</span>
                        <span className="text-[#1A1A1A] font-mono font-bold text-xs">0.58s</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: Architecture */}
                {activeTab === 'stack' && (
                  <div className="w-full space-y-2 text-xs">
                    {[
                      { title: 'React 19 & Next.js 14', desc: 'Zero bloat, instant rendering', tag: 'Fast' },
                      { title: 'Custom CMS & Admin', desc: 'จัดการข้อมูล สินค้า และบทความง่าย', tag: 'Easy' },
                      { title: 'Advanced Schema SEO', desc: 'ติดอันดับหน้าแรก Google สูงขึ้น', tag: 'Rank #1' },
                    ].map((item, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between shadow-xs">
                        <div>
                          <div className="font-semibold text-[#1A1A1A] text-xs">{item.title}</div>
                          <div className="text-[10px] text-stone-500">{item.desc}</div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F4FAE6] text-[9px] font-mono text-[#619500] font-semibold border border-[#78B900]/20">
                          {item.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Bottom Bezel Bar */}
              <div className="p-3 bg-white border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#78B900] inline-block animate-pulse" />
                  <span className="text-[#619500] font-semibold">Production Ready</span>
                </div>
                <span>NOMAD.ENGINE v2.4</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

