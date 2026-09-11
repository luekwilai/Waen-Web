import { CLIENT_LOGOS, AGENCY_STATS } from '../data/mockData';
import { motion } from 'motion/react';

export const TrustMarquee = () => {
  return (
    <section className="py-16 border-y border-[#E5E5E0] bg-[#F0F0EE]/50 relative overflow-hidden">
      {/* Scroll Down Indicator */}
      <div className="flex flex-col items-center justify-center -mt-6 mb-10">
        <a 
          href="#portfolio"
          className="flex flex-col items-center gap-1.5 text-stone-400 hover:text-[#78B900] transition-colors group cursor-pointer"
        >
          <span className="text-[10px] uppercase font-mono tracking-widest font-semibold group-hover:tracking-wider transition-all">
            SCROLL DOWN
          </span>
          <div className="w-5 h-8 rounded-full border border-stone-300 flex items-start justify-center p-1 group-hover:border-[#78B900] transition-colors">
            <div className="w-1 h-2 rounded-full bg-[#78B900] animate-bounce" />
          </div>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-8 h-[1px] bg-[#78B900]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#619500] font-mono">
              TRUSTED BY LEADING BUSINESSES
            </p>
            <span className="w-8 h-[1px] bg-[#78B900]" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] tracking-tight">
            ได้รับความไว้วางใจจากธุรกิจและแบรนด์ชั้นนำ
          </h3>
        </div>
      </div>

      {/* Infinite Logo Marquee */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] py-2">
        <div className="animate-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[#E5E5E0] hover:border-[#78B900] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all group shrink-0"
            >
              <div className="w-7 h-7 rounded-full bg-[#F4FAE6] flex items-center justify-center font-bold text-xs text-[#619500] group-hover:bg-[#78B900] group-hover:text-white transition-colors">
                {client.label.charAt(0)}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#619500] transition-colors">
                  {client.label}
                </span>
                <span className="text-[10px] text-stone-400 font-light">
                  {client.industry}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Key Stat Metric Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {AGENCY_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-white border border-[#E5E5E0] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#78B900] transition-all group"
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] group-hover:text-[#78B900] font-mono tracking-tight transition-colors inline-block">
                  {stat.value}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#1A1A1A] mb-0.5">
                {stat.label}
              </h4>
              <p className="text-xs text-stone-500 font-light">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

