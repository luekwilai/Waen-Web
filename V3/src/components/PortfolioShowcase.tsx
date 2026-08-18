import { useState } from 'react';
import { PROJECTS_DATA } from '../data/mockData';
import { Project } from '../types';
import { ArrowUpRight, Gauge, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export const PortfolioShowcase = ({ onSelectProject }: PortfolioShowcaseProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'ทั้งหมด (All Works)' },
    { id: 'healthcare', label: 'คลินิก & สุขภาพ' },
    { id: 'ecommerce', label: 'E-Commerce ร้านค้า' },
    { id: 'corporate', label: 'องค์กร & ธุรกิจ' },
    { id: 'realestate', label: 'อสังหาริมทรัพย์' },
    { id: 'landing', label: 'Portfolio & Landing' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-[#F9F9F7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#78B900]" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[#619500] font-mono">
                SELECTED WORKS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              ผลงาน<span className="text-[#78B900] italic font-serif font-normal">ที่ผ่านมา</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
              ผลงานการออกแบบและพัฒนาเว็บไซต์จริงที่ช่วยยกระดับภาพลักษณ์ เพิ่มยอดขาย และครองอันดับ 1 บน Google
            </p>
          </div>

          {/* Metric Summary Badge with CI Green */}
          <div className="mt-6 md:mt-0 flex items-center gap-3 bg-white p-3.5 rounded-3xl border border-[#E5E5E0] shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-[#78B900] text-white flex items-center justify-center font-bold font-mono text-sm shadow-xs">
              99+
            </div>
            <div>
              <div className="text-xs font-bold text-[#1A1A1A]">Google Core Web Vitals</div>
              <div className="text-[11px] text-stone-500">ทุกเว็บการันตีความเร็วระดับสากล</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#78B900] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-[#1A1A1A] hover:bg-[#F0F0EE] border border-[#E5E5E0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col rounded-3xl bg-white border border-[#E5E5E0] overflow-hidden hover:border-[#78B900] hover:shadow-xl transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer"
                onClick={() => onSelectProject(project)}
                id={`project-card-${project.id}`}
              >
                {/* Project Image & Overlay */}
                <div className="relative aspect-video overflow-hidden bg-stone-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent opacity-80" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-white/90 backdrop-blur-md text-[#1A1A1A] border border-stone-200 font-semibold shadow-xs">
                      {project.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4FAE6] backdrop-blur-md text-[10px] font-mono text-[#619500] border border-[#78B900]/30 shadow-xs font-bold">
                    <Gauge className="w-3 h-3 text-[#78B900]" />
                    <span>{project.speedScore}/100</span>
                  </div>

                  {/* Impact Tag on image with CI green */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="px-3 py-1 rounded-full bg-[#78B900] text-white text-[10px] font-medium font-mono shadow-md">
                      {project.results[0].label}: {project.results[0].value}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center group-hover:bg-[#78B900] group-hover:text-white transition-colors shadow-md">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#619500] transition-colors line-clamp-1 mb-1.5">
                      {project.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack & Action */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 2).map((tech) => (
                        <span key={tech} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#F0F0EE] text-stone-600 font-mono">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 2 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F0F0EE] text-stone-400 font-mono">
                          +{project.techStack.length - 2}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-semibold text-[#619500] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>ดูเคสศึกษา</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

