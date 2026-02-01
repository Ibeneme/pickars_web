import React from "react";
import "./MidImage.css";
import heroBg from "../../assets/images/driver/driverc.jpg"; // replace with your image path
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

const MidImage: React.FC = () => {
  return (
    <section
      className="mid-image"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="mid-overlay" />
      <div className="relative z-10 mx-6 flex max-w-[600px] flex-col items-center rounded-[50px] border border-white/10 bg-white/5 p-12 text-center backdrop-blur-3xl md:p-16">
        <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-red-500">
          Fast. Reliable. PH City.
        </span>

        <h2 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-7xl tracking-tighter">
          Your Logistics <br />
          <span className="text-red-600">Perfected.</span>
        </h2>

        <p className="mb-10 text-sm leading-relaxed text-gray-300 md:text-base">
          Experience the next generation of delivery. Real-time tracking,
          professional riders, and seamless scheduling at your fingertips.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-3 rounded-2xl bg-white px-8 py-3.5 text-black font-bold hover:bg-red-600 hover:text-white transition-all">
            <FaApple size={20} /> App Store
          </button>
          <button className="flex items-center gap-3 rounded-2xl bg-white px-8 py-3.5 text-black font-bold hover:bg-red-600 hover:text-white transition-all">
            <BiLogoPlayStore size={20} /> Play Store
          </button>
        </div>
      </div>
    </section>
  );
};

export default MidImage;
