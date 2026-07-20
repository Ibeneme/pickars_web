import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Package,
  Navigation,
  Lock,
  Hotel,
  Wine,
  Crosshair,
  Building2,
} from "lucide-react";

const RealtimeTrackingMapFull: React.FC = () => {
  // Animated progress value (0% to 100%) for the rider moving strictly along street lines
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth, continuous loop moving the rider down the street network
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.2));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // SVG Path following exact map street turns
  const streetRoutePath =
    "M 160 700 L 160 540 Q 160 500 200 500 L 480 500 Q 520 500 520 460 L 520 260 Q 520 220 560 220 L 840 220";

  return (
    <div className="relative w-screen h-[60vh] md:h-screen overflow-hidden bg-[#ffffff] font-sans select-none border-b border-gray-100 md:border-none">
      {/* 1. CLEAN WHITE MAP WITH FAINT BLUE RIVERS & FLAT STREET NETWORK */}
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base Canvas */}
        <rect width="1000" height="800" fill="#ffffff" />

        {/* --- FAINT BLUE WATERWAYS & RIVERS (LAYERED UNDER STREETS) --- */}
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Main Meandering River Channel */}
          <path
            d="M -50 300 Q 150 280 280 360 T 550 480 T 800 450 T 1050 520"
            stroke="#e0f2fe"
            strokeWidth="32"
            fill="none"
          />
          {/* Inner River Core Accent */}
          <path
            d="M -50 300 Q 150 280 280 360 T 550 480 T 800 450 T 1050 520"
            stroke="#bae6fd"
            strokeWidth="12"
            fill="none"
            opacity="0.6"
          />

          {/* Secondary Feeder Creek Branch */}
          <path
            d="M 280 360 Q 220 200 180 50"
            stroke="#e0f2fe"
            strokeWidth="18"
            fill="none"
          />
          <path
            d="M 280 360 Q 220 200 180 50"
            stroke="#bae6fd"
            strokeWidth="6"
            fill="none"
            opacity="0.6"
          />

          {/* Small Waterfront Lagoon Basin */}
          <path
            d="M 780 450 Q 860 380 920 420 Q 960 480 880 500 Z"
            fill="#e0f2fe"
            opacity="0.8"
          />
        </g>

        {/* Minimal Parks / Greenery accents */}
        <rect x="80" y="80" width="180" height="90" rx="12" fill="#f8faf6" />
        <rect x="640" y="600" width="220" height="110" rx="12" fill="#f8faf6" />

        {/* --- ROAD NETWORK LAYER (#f4f4f4 FLAT CANVAS STREETS) --- */}
        <g stroke="#f4f4f4" strokeLinecap="round">
          {/* Minor Local Residential Grid Lines */}
          <g strokeWidth="8">
            <line x1="80" y1="0" x2="80" y2="800" />
            <line x1="240" y1="0" x2="240" y2="800" />
            <line x1="320" y1="0" x2="320" y2="800" />
            <line x1="400" y1="0" x2="400" y2="800" />
            <line x1="600" y1="0" x2="600" y2="800" />
            <line x1="680" y1="0" x2="680" y2="800" />
            <line x1="760" y1="0" x2="760" y2="800" />
            <line x1="920" y1="0" x2="920" y2="800" />

            <line x1="0" y1="100" x2="1000" y2="100" />
            <line x1="0" y1="180" x2="1000" y2="180" />
            <line x1="0" y1="340" x2="1000" y2="340" />
            <line x1="0" y1="420" x2="1000" y2="420" />
            <line x1="0" y1="580" x2="1000" y2="580" />
            <line x1="0" y1="660" x2="1000" y2="660" />
          </g>

          {/* Primary Avenue Corridors */}
          <g strokeWidth="16">
            <line x1="160" y1="0" x2="160" y2="800" />
            <line x1="480" y1="0" x2="480" y2="800" />
            <line x1="520" y1="0" x2="520" y2="800" />
            <line x1="840" y1="0" x2="840" y2="800" />

            <line x1="0" y1="220" x2="1000" y2="220" />
            <line x1="0" y1="260" x2="1000" y2="260" />
            <line x1="0" y1="500" x2="1000" y2="500" />
          </g>
        </g>

        {/* --- ACTIVE ROUTE & MOVING RIDER --- */}
        <path
          d={streetRoutePath}
          stroke="#ffe5e5"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={streetRoutePath}
          stroke="#FF0000"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* START POINT MARKER */}
        <g transform="translate(160, 700)">
          <circle cx="0" cy="0" r="10" fill="#FF0000" opacity="0.2" />
          <circle
            cx="0"
            cy="0"
            r="5"
            fill="#FF0000"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </g>

        {/* END POINT MARKER */}
        <g transform="translate(840, 220)">
          <circle cx="0" cy="0" r="12" fill="#22c55e" opacity="0.2" />
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="#22c55e"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
        </g>

        {/* RIDER MARKER */}
        <g
          style={{
            offsetPath: `path('${streetRoutePath}')`,
            offsetDistance: `${progress}%`,
            offsetRotate: "auto",
          }}
        >
          <rect
            x="-14"
            y="-14"
            width="28"
            height="28"
            rx="14"
            fill="#FF0000"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </g>
      </svg>

      {/* 2. MAP POI MARKERS & OVERLAYS */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Stinson Hotel */}
        <div className="absolute top-[23%] right-[10%] flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl text-xs font-bold text-gray-800 border border-gray-200">
          <span className="p-1 bg-pink-500 text-white rounded-lg">
            <Hotel size={12} />
          </span>
          <span>Stinson Hotel</span>
        </div>

        {/* Sanclin Hotel */}
        <div className="absolute top-[60%] left-[18%] flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl text-xs font-bold text-gray-800 border border-gray-200">
          <span className="p-1 bg-pink-500 text-white rounded-lg">
            <Hotel size={12} />
          </span>
          <span>Sanclin Hotel</span>
        </div>

        {/* NIA Lounge */}
        <div className="absolute top-[30%] right-[42%] flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl text-xs font-bold text-gray-800 border border-gray-200">
          <span className="p-1 bg-amber-500 text-white rounded-lg">
            <Wine size={12} />
          </span>
          <span>NIA LOUNGE</span>
        </div>

        {/* Trans-Amadi Commercial Hub */}
        <div className="absolute top-[12%] left-[45%] flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl text-xs font-bold text-gray-800 border border-gray-200">
          <span className="p-1 bg-blue-600 text-white rounded-lg">
            <Building2 size={12} />
          </span>
          <span>Trans-Amadi Plaza</span>
        </div>

        {/* Street Typography */}
        <span className="absolute bottom-[20%] left-[10%] text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          Elioparanwo Road
        </span>
        <span className="absolute top-[36%] left-[34%] text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          ADC Express Road
        </span>
        <span className="absolute top-[18%] right-[28%] text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          Aba - Port Harcourt Expressway
        </span>
      </div>

      {/* 3. RIDERS NEARBY FLOATING BADGE */}
      <div className="absolute top-6 left-4 md:left-10 z-20 flex items-center gap-3">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center border-2 border-white">
            W
          </div>
          <div className="w-8 h-8 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center border-2 border-white">
            A
          </div>
          <div className="w-8 h-8 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center border-2 border-white">
            J
          </div>
        </div>
        <div className="px-4 py-2 bg-white rounded-full text-xs md:text-sm font-black text-gray-900 border border-gray-200">
          3 riders nearby on standby
        </div>
      </div>

      {/* 4. RE-CENTER LOCATION BUTTON */}
      <button className="absolute bottom-6 md:bottom-28 right-6 z-20 p-3.5 bg-white text-red-600 rounded-full border border-gray-200 active:scale-95 transition-transform">
        <Crosshair size={20} />
      </button>

      {/* 5. BOTTOM ACTION PANEL (DESKTOP/TABLET ONLY) */}
      <div className="hidden md:block absolute bottom-0 inset-x-0 z-30 max-w-lg mx-auto p-4">
        <div className="bg-white rounded-[32px] p-6 border border-gray-200">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

          <div className="mb-5">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              Find a Dispatch Rider
            </h3>
            <p className="text-xs font-medium text-gray-500 mt-0.5">
              Connect with verified riders nearby for instant pickup
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black text-white p-3 pl-5 rounded-full flex items-center justify-between hover:bg-zinc-900 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                <Navigation size={18} className="fill-current rotate-45" />
              </div>
              <span className="font-bold text-sm tracking-wide">
                Get a Dispatch Rider
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
              <ArrowRight size={18} />
            </div>
          </motion.button>

          <div className="w-full bg-gray-50 p-3 pl-5 rounded-full flex items-center justify-between border border-gray-200 mt-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                <Package size={18} />
              </div>
              <span className="font-bold text-sm text-gray-500">
                Track Your Package
              </span>
            </div>
            <div className="px-3 py-1.5 bg-gray-200/70 rounded-full text-[10px] font-black tracking-wider text-gray-500 flex items-center gap-1">
              <Lock size={10} /> COMING SOON
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeTrackingMapFull;
