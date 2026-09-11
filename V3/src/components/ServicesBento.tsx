import { useState } from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';
import { 
  Smartphone, 
  TrendingUp, 
  ShoppingCart, 
  ShieldCheck, 
  Headphones, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesBentoProps {
  onOpenCalculator: () => void;
}

export const ServicesBento = ({ onOpenCalculator }: ServicesBentoProps) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES_DATA[0]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'ShoppingCart': return <ShoppingCart className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Headphones': return <Headphones className="w-5 h-5" />;
      case 'Clock': return <Clock className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#F0F0EE]/40 relative border-t border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#78B900]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#619500] font-mono">
              ALL-IN-ONE WEB SOLUTIONS
            </span>
            <span className="w-8 h-[1px] bg-[#78B900]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            ครบทุกบริการ <span className="text-[#78B900] italic font-serif font-normal">ในที่เดียว</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            เราให้บริการครอบคลุม ตั้งแต่การวางแผน UX/UI ออกแบบ พัฒนาระบบ ไปจนถึงการดูแลต่อเนื่องหลังเปิดตัว
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((srv, idx) => {
            const isSelected = selectedService.id === srv.id;
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => setSelectedService(srv)}
                className={`relative flex flex-col justify-between p-7 rounded-3xl border transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-white border-[#78B900] shadow-xl ring-1 ring-[#78B900]'
                    : 'bg-white border-[#E5E5E0] hover:border-[#78B900] shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
                }`}
                id={`service-card-${srv.id}`}
              >
                <div>
                  {/* Top bar with number and icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      isSelected 
                        ? 'bg-[#78B900] text-white shadow-md' 
                        : 'bg-[#F4FAE6] text-[#619500] group-hover:bg-[#78B900] group-hover:text-white'
                    }`}>
                      {getServiceIcon(srv.iconName)}
                    </div>
                    <span className={`font-mono text-2xl font-bold transition-colors ${isSelected ? 'text-[#78B900]' : 'text-stone-300 group-hover:text-stone-500'}`}>
                      {srv.number}
                    </span>
                  </div>

                  {/* Title & Badge */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#619500] transition-colors">
                      {srv.title}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-stone-500 mb-3">
                    {srv.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-stone-600 leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                {/* Highlights list */}
                <div className="pt-4 border-t border-stone-100 space-y-2">
                  {srv.highlights.slice(0, 2).map((hl, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-[#78B900] shrink-0" />
                      <span className="truncate">{hl}</span>
                    </div>
                  ))}

                  <div className="pt-2 flex items-center justify-between text-xs text-stone-400 group-hover:text-[#619500] transition-colors font-medium">
                    <span>คลิกเพื่อดูรายละเอียด</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Feature Deep Dive Drawer / Inspection Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E5E0] relative overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#78B900] text-white font-mono text-xs font-medium">
                  บริการที่เลือก: {selectedService.number}
                </span>
                <span className="text-xs text-stone-500 font-medium">{selectedService.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-2">
                {selectedService.title} - {selectedService.subtitle}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-5">
                {selectedService.details}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.highlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-[#F9F9F7] p-3 rounded-2xl border border-[#E5E5E0]">
                    <CheckCircle2 className="w-4 h-4 text-[#78B900] shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0] text-center">
              <div className="w-12 h-12 rounded-full bg-[#78B900] text-white flex items-center justify-center mb-3 shadow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#1A1A1A] mb-1">
                ต้องการปรึกษาการทำเว็บแบบนี้?
              </h4>
              <p className="text-xs text-stone-500 mb-4 leading-relaxed">
                เรายินดีให้คำปรึกษาและช่วยวางแผนโครงสร้างที่ตอบโจทย์ธุรกิจคุณฟรี
              </p>
              <button
                onClick={onOpenCalculator}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#78B900] hover:bg-[#68a000] text-white font-medium text-xs shadow-sm shadow-[#78B900]/20 transition-all"
              >
                <span>คำนวณราคาโปรเจกต์นี้</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

