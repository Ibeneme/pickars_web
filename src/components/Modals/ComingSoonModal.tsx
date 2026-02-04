import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, Timer } from "lucide-react"; // Changed HardHat to Rocket

interface ComingSoonModalProps {
  show: boolean;
  onClose: () => void;
}

/* ------------------------------------------------ */
/* Target Launch Date */
/* ------------------------------------------------ */
const LAUNCH_DATE = new Date("2026-02-28T00:00:00").getTime();

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  show,
  onClose,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = LAUNCH_DATE - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-[40px] bg-white p-10 shadow-2xl"
          >
            {/* Close Icon */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <Rocket size={32} className="animate-bounce" />
              </div>

              {/* Title */}
              <h2 className="mb-2 text-4xl font-black tracking-tighter text-[#121212]">
                Launching <span className="text-red-600">Soon.</span>
              </h2>

              {/* Status Bar */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-600 border border-red-100">
                <Timer size={12} />
                Preparing for Port Harcourt
              </div>

              {/* Description */}
              <p className="mb-6 text-base leading-relaxed text-gray-500 font-medium">
                The countdown is on! We're bringing an innovative
                logistics network to Port Harcourt this February. Get ready for
                a new way to move.
              </p>

              {/* Countdown Grid */}
              <div className="mb-8 grid grid-cols-4 gap-3 text-center">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hrs", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Sec", value: timeLeft.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-gray-50 py-4 border border-gray-100"
                  >
                    <div className="text-2xl font-black text-[#121212] tabular-nums">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={onClose}
                className="w-full rounded-2xl bg-[#ff0000] py-4 text-sm font-black text-white transition-all hover:bg-black hover:shadow-xl active:scale-95 uppercase tracking-widest"
              >
                I'm Ready!
              </button>
            </div>

            {/* Background Glow */}
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-red-100 blur-3xl opacity-50" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
