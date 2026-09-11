import { MessageCircle, Calculator, Sparkles } from 'lucide-react';

interface FloatingQuickContactProps {
  onOpenLineModal: () => void;
  onOpenCalculator: () => void;
}

export const FloatingQuickContact = ({ onOpenLineModal, onOpenCalculator }: FloatingQuickContactProps) => {
  return (
    <aside aria-label="Quick Actions" className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 backdrop-blur-xl border-t border-[#E5E5E0] px-4 py-2.5 shadow-2xl">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        
        {/* Calculator Button */}
        <button
          onClick={onOpenCalculator}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#F0F0EE] border border-[#E5E5E0] text-stone-800 text-xs font-medium hover:bg-[#F4FAE6] hover:text-[#619500] hover:border-[#78B900] transition-all"
        >
          <Calculator className="w-3.5 h-3.5 text-[#619500]" />
          <span>คำนวณราคา</span>
        </button>

        {/* Line Button */}
        <button
          onClick={onOpenLineModal}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#06C755] text-white text-xs font-medium shadow-sm transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>คุยทาง Line</span>
        </button>

        {/* Request Quote Button */}
        <a
          href="#contact"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#78B900] text-white text-xs font-medium shadow-sm shadow-[#78B900]/25 transition-all text-center"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>ขอใบเสนอราคา</span>
        </a>

      </div>
    </aside>
  );
};

