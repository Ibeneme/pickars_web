import React from "react";
import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export const IOS_URL = "https://apps.apple.com/ng/app/pickars/id6746796884";
export const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.pickars.app&hl=en";

const Launcher: React.FC = () => {
  return (
    <div className="relative h-[80px] w-full overflow-hidden bg-[#ff0000] font-sans text-white flex items-center shadow-xl md:hidden">
      {/* Moving Background Text */}
      <div className="absolute inset-0 flex items-center opacity-10 pointer-events-none">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="text-3xl font-black whitespace-nowrap uppercase"
        >
          DOWNLOAD THE APP • SHIP NOW • PICKARS LOGISTICS • PORT HARCOURT •
          DOWNLOAD THE APP • SHIP NOW •
        </motion.div>
      </div>

      <div className="relative z-10 w-full px-4 flex items-center justify-between">
        {/* Headline */}
        <div className="flex items-center gap-2">
          <h2 className="text-[22px] font-black tracking-tighter uppercase leading-none">
            Get the App
          </h2>
        </div>

        {/* Download Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={IOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black hover:bg-black/50 px-4 py-3 rounded-full backdrop-blur-md border border-white/20 transition-all active:scale-95"
          >
            <FaApple className="text-xl" />
          </a>

          <a
            href={ANDROID_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black hover:bg-black/50 px-4 py-3 rounded-full backdrop-blur-md border border-white/20 transition-all active:scale-95"
          >
            <FaGooglePlay className="text-lg" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Launcher;
