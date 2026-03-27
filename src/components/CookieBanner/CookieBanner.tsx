import React, { useState, useEffect } from "react";
import { Cookie, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CookieBannerProps {
  onChoice: (accepted: boolean) => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onChoice }) => {
  const [isVisible, setIsVisible] = useState(false);
  const STORAGE_KEY = "pickars_cookies_accepted";

  useEffect(() => {
    const choice = localStorage.getItem(STORAGE_KEY);
    // Only show if no choice (true or false) exists
    if (choice === null) {
      const timer = setTimeout(() => setIsVisible(true), 1300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
    setTimeout(() => onChoice(true), 700);
  };

  const handleDecline = () => {
    // Save as false so we never ask again
    localStorage.setItem(STORAGE_KEY, "false");
    setIsVisible(false);
    setTimeout(() => onChoice(false), 700);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 120 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[10000] p-4 md:p-8 pointer-events-none"
        >
          <div className="max-w-[520px] mx-auto">
            <motion.div
              className="bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="p-8 md:p-10">
                <motion.div
                  className="flex items-center gap-5 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-red-500/25 rounded-full blur-3xl animate-pulse" />
                    <motion.div
                      whileHover={{ rotate: 18, scale: 1.12 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 12,
                      }}
                      className="relative bg-zinc-900 p-4 rounded-2xl border border-red-500/40"
                    >
                      <Cookie size={38} className="text-red-500" />
                    </motion.div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <ShieldCheck size={20} className="text-red-500" />
                      <span className="uppercase text-xs font-black tracking-[3px] text-red-500">
                        Privacy First
                      </span>
                    </div>
                    <h2 className="text-[28px] leading-none font-black tracking-tighter text-white">
                      Cookie Settings
                    </h2>
                  </div>
                </motion.div>

                <motion.p
                  className="text-zinc-400 text-[15.5px] leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  Pickars uses cookies to enhance your experience, optimize your
                  delivery routes, and keep your account secure. We value your
                  data as much as your time.
                </motion.p>

                <motion.div
                  className="flex flex-row gap-3"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.965 }}
                    onClick={handleAccept}
                    className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 
                      text-white font-black py-4 px-6 rounded-2xl text-xs uppercase tracking-[1.5px]
                      shadow-lg shadow-red-900/60 transition-all"
                  >
                    Accept All
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.965 }}
                    onClick={handleDecline}
                    className="flex-1 border border-white/20 hover:border-white/40 
                      hover:bg-white/5 text-zinc-300 font-bold py-4 px-6 rounded-2xl 
                      text-xs uppercase tracking-[1.5px] transition-all"
                  >
                    Decline
                  </motion.button>
                </motion.div>
              </div>

              <div className="px-8 py-4 border-t border-white/5 bg-black/40 text-center">
                <p className="text-[11px] text-zinc-500 tracking-wide">
                  Review our full{" "}
                  <a
                    href="/cookie-policy"
                    className="text-red-400 hover:text-red-500 underline decoration-1 underline-offset-4 font-bold"
                  >
                    Cookie Policy
                  </a>{" "}
                  to learn how we protect your information.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
