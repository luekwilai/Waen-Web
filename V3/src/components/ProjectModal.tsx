import { Project } from '../types';
import { X, Gauge, Check, Smartphone, Laptop, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProjectForQuote: (projectName: string) => void;
}

export const ProjectModal = ({ project, onClose, onSelectProjectForQuote }: ProjectModalProps) => {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop');

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#1A1A1A]/60 backdrop-blur-md overflow-y-auto">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-[#E5E5E0] rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E0] bg-[#F9F9F7] sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#78B900] text-white">
                {project.categoryLabel}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] tracking-tight">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-stone-200 shadow-xs">
                <button
                  onClick={() => setActiveDevice('desktop')}
                  className={`p-1.5 rounded-full text-xs transition-colors ${activeDevice === 'desktop' ? 'bg-[#78B900] text-white shadow-xs' : 'text-stone-400 hover:text-stone-700'}`}
                >
                  <Laptop className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveDevice('mobile')}
                  className={`p-1.5 rounded-full text-xs transition-colors ${activeDevice === 'mobile' ? 'bg-[#78B900] text-white shadow-xs' : 'text-stone-400 hover:text-stone-700'}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white hover:bg-[#F0F0EE] border border-[#E5E5E0] text-stone-600 hover:text-[#1A1A1A] transition-colors shadow-xs"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 space-y-6">
            
            {/* Visual Preview / Mockup Area */}
            <div className="relative rounded-2xl overflow-hidden bg-[#F0F0EE] border border-[#E5E5E0] flex items-center justify-center p-4">
              <div className={`transition-all duration-300 ${
                activeDevice === 'mobile' ? 'max-w-[280px] rounded-3xl border-4 border-[#1A1A1A] shadow-2xl' : 'w-full rounded-xl'
              }`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover rounded-xl aspect-video"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Speed Tag */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4FAE6] border border-[#78B900]/30 text-[#619500] text-xs font-mono font-bold shadow-md">
                <Gauge className="w-4 h-4 text-[#78B900]" />
                <span>PageSpeed {project.speedScore}/100</span>
              </div>
            </div>

            {/* Business Impact Metric Grid */}
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                ผลลัพธ์และความสำเร็จของโปรเจกต์ (Key Results)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.results.map((res, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0]">
                    <span className="text-2xl font-bold font-mono text-[#78B900]">
                      {res.value}
                    </span>
                    <p className="text-xs text-stone-500 mt-1">{res.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                ภาพรวมและการออกแบบ
              </h4>
              <p className="text-sm text-stone-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Features & Deliverables */}
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                ฟีเจอร์หลักที่พัฒนา (Key Implemented Features)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700 p-3 rounded-xl bg-[#F9F9F7] border border-[#E5E5E0]">
                    <Check className="w-4 h-4 text-[#78B900] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                เทคโนโลยีที่ใช้ (Tech Stack)
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-[#F0F0EE] text-xs font-mono text-stone-700 border border-[#E5E5E0]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-[#F9F9F7] border-t border-[#E5E5E0]">
            <span className="text-xs text-stone-500 text-center sm:text-left">
              ต้องการเว็บไซต์ฟังก์ชันและดีไซน์แบบ <strong className="text-[#1A1A1A]">{project.title}</strong>?
            </span>
            
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onSelectProjectForQuote(project.title);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#78B900] hover:bg-[#68a000] text-white font-medium text-xs shadow-sm shadow-[#78B900]/25 transition-all"
              >
                <span>ต้องการเว็บแบบนี้ (ขอใบเสนอราคา)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

