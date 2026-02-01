import React from "react";
import heroBg from "../../assets/images/driver/driverc.jpg";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import { motion } from "framer-motion";

const MidImage: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden py-16 px-4 md:px-8">
      {/* Background Image with Parallax-like fix */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Premium Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      {/* Responsive Glass Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-[700px] rounded-[40px] md:rounded-[60px] border border-white/10 bg-white/5 p-8 sm:p-12 md:p-20 text-center backdrop-blur-2xl shadow-2xl"
      >
        <span className="mb-4 block text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-red-600">
          Fast. Reliable. PH City.
        </span>

        <h2 className="mb-6 text-5xl sm:text-5xl md:text-7xl font-black leading-[1.1] text-white tracking-tighter">
          Your Logistics <br />
          <span className="text-red-600">Perfected.</span>
        </h2>

        <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-gray-300 md:text-lg opacity-80">
          Experience the next generation of delivery. Real-time tracking,
          professional riders, and seamless scheduling.
        </p>

        {/* Buttons: Stacked on mobile, row on desktop */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 text-black font-black text-sm uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 shadow-xl shadow-white/5">
            <FaApple size={22} /> App Store
          </button>
          <button className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-[#121212] border border-white/10 px-8 py-4 text-white font-black text-sm uppercase tracking-widest hover:bg-red-600 transition-all duration-300 shadow-xl shadow-black/20">
            <BiLogoPlayStore size={22} /> Play Store
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default MidImage;