import React from "react";
import { motion } from "framer-motion";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

export const IOS_URL = "https://apps.apple.com/ng/app/pickars/id6746796884";
export const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.pickars.app&hl=en";

const Launcher: React.FC = () => {
  return (
    <div className="relative h-[76px] w-full overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-red-600 font-['Lufga'] text-white flex items-center shadow-lg md:hidden">
      {/* Moving Background Text */}
      <div className="absolute inset-0 flex items-center opacity-15 pointer-events-none select-none">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-2xl font-black whitespace-nowrap uppercase tracking-widest"
        >
          DOWNLOAD PICKARS APP • INSTANT DISPATCH IN PH • FAST & SECURE • GET A
          RIDER NOW • DOWNLOAD PICKARS APP • INSTANT DISPATCH IN PH •
        </motion.div>
      </div>

      <div className="relative z-10 w-full px-5 flex items-center justify-between">
        {/* Headline */}
        <div className="flex flex-col">
          <h2 className="text-xl font-black tracking-tight uppercase leading-none text-white">
            Get Pickars App
          </h2>
        </div>

        {/* Download Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={IOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on App Store"
            className="flex items-center justify-center h-11 w-11 bg-black/90 hover:bg-black text-white rounded-full border border-white/20 transition-transform active:scale-95 shadow-md"
          >
            <FaApple size={20} />
          </a>

          <a
            href={ANDROID_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
            className="flex items-center justify-center h-11 w-11 bg-black/90 hover:bg-black text-white rounded-full border border-white/20 transition-transform active:scale-95 shadow-md"
          >
            <BiLogoPlayStore size={22} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Launcher;
