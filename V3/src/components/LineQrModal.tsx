import { X, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface LineQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LineQrModal = ({ isOpen, onClose }: LineQrModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('thawatsak');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/60 backdrop-blur-md">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-sm bg-white border border-[#E5E5E0] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-center flex flex-col items-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#F0F0EE] hover:bg-stone-200 text-stone-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-[#06C755]/10 text-[#06C755] flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 fill-current" />
          </div>

          <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">
            ติดต่อผ่าน Line Official
          </h3>
          <p className="text-xs text-stone-500 mb-6">
            สแกน QR Code หรือแอด Line ID เพื่อปรึกษาและส่งรายละเอียดโปรเจกต์ได้ทันที
          </p>

          {/* Simulated High-Res QR Code */}
          <div className="p-4 bg-white border border-[#E5E5E0] rounded-2xl shadow-sm mb-6">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://line.me/ti/p/~thawatsak&color=1A1A1A"
              alt="Line QR Code"
              className="w-44 h-44 object-contain rounded-lg"
            />
          </div>

          {/* Line ID box */}
          <div className="w-full p-3.5 rounded-2xl bg-[#F9F9F7] border border-[#E5E5E0] flex items-center justify-between mb-4">
            <div className="text-left">
              <span className="text-[10px] text-stone-400 block">Line ID:</span>
              <span className="text-sm font-mono font-bold text-[#1A1A1A]">thawatsak</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5E5E0] hover:bg-[#F0F0EE] text-xs font-semibold text-stone-700 transition-colors shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">คัดลอกแล้ว</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>คัดลอก</span>
                </>
              )}
            </button>
          </div>

          <a
            href="https://line.me/ti/p/~thawatsak"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-medium text-xs shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <span>เปิดแอปพลิเคชัน Line</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

