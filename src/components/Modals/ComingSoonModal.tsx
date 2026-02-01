import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HardHat, Timer } from "lucide-react";

interface ComingSoonModalProps {
  show: boolean;
  onClose: () => void;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  show,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[1000000] flex items-center justify-center px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-[40px] bg-white p-10 shadow-2xl"
          >
            {/* Close Icon (Top Right) */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <HardHat size={32} />
              </div>

              <h2 className="mb-2 text-4xl font-black tracking-tighter text-[#121212]">
                Coming <span className="text-red-600">Soon.</span>
              </h2>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-600 border border-amber-100">
                <Timer size={12} />
                App Store Review in Progress
              </div>

              <p className="mb-8 text-base leading-relaxed text-gray-500">
                Our mobile experience is currently being polished and reviewed
                by Apple and Google. We’re making sure everything is perfect for
                your first delivery.
              </p>

              {/* Action Button */}
              <button
                onClick={onClose}
                className="w-full rounded-2xl bg-[#121212] py-4 text-sm font-bold text-white transition-all hover:bg-red-600 hover:shadow-xl hover:shadow-red-600/20 active:scale-95"
              >
                Got it, thanks!
              </button>
            </div>

            {/* Subtle Background Decoration */}
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-red-50 blur-3xl" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
