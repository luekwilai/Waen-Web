import { useState } from 'react';
import { WORK_PROCESS_STEPS } from '../data/mockData';
import { 
  MessageSquare, 
  Palette, 
  Code2, 
  Rocket, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';

export const ProcessTimeline = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0: return <MessageSquare className="w-5 h-5" />;
      case 1: return <Palette className="w-5 h-5" />;
      case 2: return <Code2 className="w-5 h-5" />;
      case 3: return <Rocket className="w-5 h-5" />;
      default: return <MessageSquare className="w-5 h-5" />;
    }
  };

  return (
    <section id="process" className="py-24 bg-[#F0F0EE]/40 relative border-t border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#78B900]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#619500] font-mono">
              SYSTEMATIC WORKFLOW
            </span>
            <span className="w-8 h-[1px] bg-[#78B900]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            ทำงานอย่าง<span className="text-[#78B900] italic font-serif font-normal">เป็นระบบ</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            เราเริ่มต้น วิเคราะห์ ออกแบบ และพัฒนาอย่างมีมาตรฐาน เพื่อส่งมอบผลงานที่ดีที่สุดและตรงตามเป้าหมายของธุรกิจคุณ
          </p>
        </div>

        {/* Interactive Step Switcher for Mobile & Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {WORK_PROCESS_STEPS.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => setActiveStep(idx)}
              className={`p-5 rounded-3xl border text-left transition-all relative ${
                activeStep === idx
                  ? 'bg-white border-[#78B900] shadow-md ring-1 ring-[#78B900]'
                  : 'bg-white border-[#E5E5E0] hover:border-[#78B900] text-stone-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                  activeStep === idx ? 'bg-[#78B900] text-white shadow-xs' : 'bg-[#F0F0EE] text-stone-700'
                }`}>
                  {step.step}
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  {step.duration}
                </span>
              </div>
              <div className={`text-xs font-bold ${activeStep === idx ? 'text-[#619500]' : 'text-stone-600'}`}>
                {idx === 0 && 'พูดคุย & วางแผน'}
                {idx === 1 && 'ออกแบบ UI/UX'}
                {idx === 2 && 'พัฒนาเว็บไซต์'}
                {idx === 3 && 'ส่งมอบ & ดูแล'}
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Active Step Focus Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E5E5E0] relative overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#78B900] text-white flex items-center justify-center shadow-sm">
                  {getStepIcon(activeStep)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#619500]">
                      STEP {WORK_PROCESS_STEPS[activeStep].step}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-xs text-stone-500 font-mono">
                      {WORK_PROCESS_STEPS[activeStep].duration}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight">
                    {WORK_PROCESS_STEPS[activeStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                {WORK_PROCESS_STEPS[activeStep].description}
              </p>

              <div>
                <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                  สิ่งที่คุณจะได้รับในขั้นตอนนี้ (Deliverables)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {WORK_PROCESS_STEPS[activeStep].deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700 p-3.5 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0]">
                      <CheckCircle2 className="w-4 h-4 text-[#78B900] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stepper Navigation Actions */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl bg-[#F9F9F7] border border-[#E5E5E0] text-center">
              <span className="text-xs text-stone-500 mb-2">ความคืบหน้ากระบวนการ</span>
              <div className="w-full bg-[#E5E5E0] h-2 rounded-full mb-4 overflow-hidden">
                <div 
                  className="bg-[#78B900] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${((activeStep + 1) / WORK_PROCESS_STEPS.length) * 100}%` }}
                />
              </div>

              <div className="flex items-center gap-2 w-full">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="flex-1 py-2.5 rounded-full border border-[#E5E5E0] bg-white text-xs font-medium text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F0F0EE] shadow-xs"
                >
                  ขั้นตอนก่อนหน้า
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(WORK_PROCESS_STEPS.length - 1, activeStep + 1))}
                  disabled={activeStep === WORK_PROCESS_STEPS.length - 1}
                  className="flex-1 py-2.5 rounded-full bg-[#78B900] hover:bg-[#68a000] text-white font-medium text-xs shadow-sm shadow-[#78B900]/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ขั้นตอนถัดไป →
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-200 w-full flex items-center justify-center gap-1.5 text-[11px] text-stone-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#78B900]" />
                <span>การันตีส่งงานตรงกำหนด 100%</span>
              </div>
            </div>

          </div>
        </div>

        {/* Final Launch Ready Banner */}
        <div className="mt-10 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-[#E5E5E0] shadow-sm text-xs">
            <div className="w-5 h-5 rounded-full bg-[#78B900] text-white flex items-center justify-center font-bold text-[10px]">
              ✓
            </div>
            <span className="text-stone-700">
              เมื่อผ่านครบ 4 ขั้นตอน: <strong className="text-[#1A1A1A]">เว็บไซต์ของคุณพร้อมเปิดตัวสร้างยอดขายได้ทันที!</strong>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

