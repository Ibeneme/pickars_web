import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaApple, 
  FaCheckCircle, 
  FaMotorcycle, 
  FaTimes, 
  FaArrowRight, 
  FaMapMarkerAlt, 
  FaShieldAlt,
  FaLocationArrow,
  FaSearch
} from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

// Import store URL constants
import { ANDROID_URL, IOS_URL } from "../../components/Launcher/Laucher";

const CustomerAppSection: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const customerData = {
    tag: "For Customers",
    header: "Book a Dispatch Rider in Seconds",
    description:
      "Send packages across Port Harcourt with zero stress. Our professional riders handle the traffic while you sit back and focus on growing your business.",
    features: [
      "Real-time live GPS package tracking",
      "Transparent flat rates with zero hidden fees",
      "Verified, highly courteous dispatch riders",
    ],
  };

  // Real-world street route SVG path mimicking actual city grid turns
  // (Aba Road -> GRA Phase 2 -> Birabi St style layout)
  const streetRoutePath = "M 40 480 L 40 380 Q 40 350 70 350 L 180 350 Q 210 350 210 320 L 210 180 Q 210 150 180 150 L 90 150 Q 60 150 60 120 L 60 40";

  return (
    <>
      <section className="relative overflow-hidden bg-white px-6 py-20 md:py-32 font-sans border-b border-red-100">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-96 w-96 rounded-full bg-red-100/50 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* LEFT: TEXT CONTENT */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-[#FF0000] font-black text-xs uppercase tracking-widest"
              >
                <span className="h-2 w-2 rounded-full bg-[#FF0000] animate-pulse" />
                {customerData.tag}
              </motion.div>

              {/* Header */}
              <h2 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight text-gray-900">
                {customerData.header.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={
                      word.toLowerCase().includes("seconds") ||
                      word.toLowerCase().includes("dispatch")
                        ? "text-[#FF0000]"
                        : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </h2>

              {/* Subtext */}
              <p className="mb-8 max-w-xl text-base md:text-lg font-medium leading-relaxed text-gray-600">
                {customerData.description}
              </p>

              {/* Feature List */}
              <div className="mb-10 space-y-3.5">
                {customerData.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3.5 group"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-[#FF0000] group-hover:bg-[#FF0000] group-hover:text-white transition-colors">
                      <FaCheckCircle size={14} />
                    </div>
                    <span className="text-sm md:text-base font-bold text-gray-800">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Action & Store Download Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="group flex items-center justify-center gap-3 rounded-2xl bg-[#FF0000] px-7 py-4 text-white font-bold text-base shadow-lg shadow-red-500/25 transition-all hover:bg-red-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FaMotorcycle size={20} />
                  <span>Quick Dispatch Booking</span>
                  <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={IOS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-2xl bg-gray-900 px-5 py-3.5 text-white transition-transform hover:scale-105 active:scale-95"
                  >
                    <FaApple size={22} className="group-hover:rotate-12 transition-transform" />
                    <div className="text-left">
                      <p className="text-[9px] font-medium opacity-70 uppercase tracking-wider">
                        Download on
                      </p>
                      <p className="text-sm font-black leading-none mt-0.5">
                        App Store
                      </p>
                    </div>
                  </a>

                  <a
                    href={ANDROID_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-gray-900 transition-all hover:border-[#FF0000] hover:bg-red-50/50 hover:scale-105 active:scale-95"
                  >
                    <BiLogoPlayStore size={22} className="group-hover:rotate-12 transition-transform text-[#FF0000]" />
                    <div className="text-left">
                      <p className="text-[9px] font-medium opacity-70 uppercase tracking-wider text-gray-500">
                        Get it on
                      </p>
                      <p className="text-sm font-black leading-none mt-0.5">
                        Google Play
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: REAL GOOGLE MAPS PHONE MOCKUP */}
            <div className="relative flex justify-center lg:col-span-5">
              <div className="relative w-full max-w-[340px]">
                {/* Outer Glow Ring */}
                <div className="absolute -inset-4 rounded-[3.5rem] bg-gradient-to-tr from-red-500/20 via-red-200/40 to-transparent blur-2xl" />

                {/* Phone Frame */}
                <motion.div
                  initial={{ rotate: 2, y: 20 }}
                  whileInView={{ rotate: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative z-10 aspect-[9/18.5] w-full overflow-hidden rounded-[3rem] border-[9px] border-gray-900 bg-[#171c24] shadow-2xl ring-1 ring-white/20"
                >
                  {/* Phone Speaker Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 h-4 w-28 rounded-full bg-gray-900 flex items-center justify-center">
                    <div className="h-1.5 w-10 rounded-full bg-gray-800" />
                  </div>

                  {/* Google Maps Search Bar Overlay */}
                  <div className="absolute top-10 left-3.5 right-3.5 z-30">
                    <div className="flex items-center gap-2.5 rounded-xl bg-[#242f3e] px-3.5 py-2.5 shadow-lg border border-gray-700/60 text-gray-200">
                      <FaSearch className="text-[#FF0000]" size={13} />
                      <span className="text-xs font-semibold text-gray-300 truncate">
                        GRA Phase 2 ➔ Trans Amadi
                      </span>
                    </div>
                  </div>

                  {/* REAL GOOGLE MAP VECTOR CANVAS */}
                  <div className="absolute inset-0 z-10 opacity-90">
                    <svg className="h-full w-full bg-[#1e242e]" viewBox="0 0 280 520">
                      <defs>
                        {/* Google Maps Water/Land patterns */}
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FF0000" floodOpacity="0.4" />
                        </filter>
                      </defs>

                      {/* City Blocks & Landmass Visuals */}
                      <rect x="10" y="20" width="80" height="90" rx="8" fill="#242f3e" opacity="0.7" />
                      <rect x="105" y="20" width="165" height="110" rx="8" fill="#242f3e" opacity="0.7" />
                      <rect x="10" y="125" width="180" height="120" rx="8" fill="#242f3e" opacity="0.7" />
                      <rect x="200" y="145" width="70" height="180" rx="8" fill="#242f3e" opacity="0.7" />
                      <rect x="10" y="260" width="110" height="150" rx="8" fill="#242f3e" opacity="0.7" />
                      <rect x="130" y="340" width="140" height="160" rx="8" fill="#242f3e" opacity="0.7" />

                      {/* Secondary Street Network Lines (Google Maps Dark Style) */}
                      <g stroke="#38414e" strokeWidth="2.5" fill="none" strokeLinecap="round">
                        <line x1="0" y1="120" x2="280" y2="120" />
                        <line x1="0" y1="250" x2="280" y2="250" />
                        <line x1="0" y1="330" x2="280" y2="330" />
                        <line x1="100" y1="0" x2="100" y2="520" />
                        <line x1="195" y1="0" x2="195" y2="520" />
                      </g>

                      {/* Primary Highway / Main Avenue */}
                      <g stroke="#4e5d6c" strokeWidth="5" fill="none">
                        <path d="M 0 350 L 280 350" />
                        <path d="M 210 0 L 210 520" />
                      </g>

                      {/* ACTIVE GOOGLE MAPS NAVIGATION ROUTE */}
                      <path
                        d={streetRoutePath}
                        fill="none"
                        stroke="#1a73e8"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.3"
                      />
                      <motion.path
                        d={streetRoutePath}
                        fill="none"
                        stroke="#FF0000"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                      />

                      {/* STARTING PICKUP PIN */}
                      <g transform="translate(40, 480)">
                        <circle cx="0" cy="0" r="10" fill="#FF0000" opacity="0.2" />
                        <circle cx="0" cy="0" r="5" fill="#FF0000" stroke="#FFFFFF" strokeWidth="2" />
                      </g>

                      {/* DESTINATION DROPOFF PIN */}
                      <g transform="translate(60, 40)">
                        <circle cx="0" cy="0" r="8" fill="#22c55e" stroke="#FFFFFF" strokeWidth="2" />
                      </g>
                    </svg>

                    {/* RIDER MOTORCYCLE MARKER (Navigating exact street turn points) */}
                    <motion.div
                      animate={{
                        offsetPath: `path('${streetRoutePath}')`,
                        offsetDistance: ["0%", "100%"],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-0 left-0 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF0000] text-white shadow-lg ring-2 ring-white"
                      style={{
                        offsetRotate: "auto",
                      }}
                    >
                      <FaMotorcycle size={14} className="-rotate-90" />
                    </motion.div>
                  </div>

                  {/* Google Maps Location Floating Recenter Button */}
                  <div className="absolute right-3.5 top-24 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-[#242f3e] border border-gray-700 text-blue-400 shadow-md">
                    <FaLocationArrow size={12} />
                  </div>

                  {/* Floating In-App Live Rider Card */}
                  <div className="absolute bottom-5 left-3.5 right-3.5 z-30">
                    <div className="rounded-2xl bg-[#1f2937]/95 border border-gray-700/80 p-3.5 backdrop-blur-md shadow-2xl">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#FF0000]/20 border border-[#FF0000]/40 flex items-center justify-center text-[#FF0000] flex-shrink-0">
                          <FaMotorcycle size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest truncate">
                              Dispatch Rider Matched
                            </p>
                          </div>
                          <p className="text-xs font-bold text-white mt-0.5 truncate">
                            Arriving in 3 mins • 1.2 km
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SIDE DRAWER OVERLAY */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-gray-950/60 backdrop-blur-sm"
            />

            {/* Slide-Over Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white p-6 shadow-2xl flex flex-col justify-between border-l border-gray-100"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-red-50 text-[#FF0000]">
                      <FaMotorcycle size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900 leading-tight">
                        Instant Dispatch
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">
                        Request a rider in Port Harcourt
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                {/* Quick Request Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Pickup Location
                    </label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3.5 top-3.5 text-gray-400" size={14} />
                      <input
                        type="text"
                        placeholder="e.g. GRA Phase 2, Port Harcourt"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm font-medium text-gray-900 focus:border-[#FF0000] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF0000] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Delivery Destination
                    </label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3.5 top-3.5 text-red-500" size={14} />
                      <input
                        type="text"
                        placeholder="e.g. Peter Odili Road, Trans Amadi"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm font-medium text-gray-900 focus:border-[#FF0000] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF0000] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Item Category
                    </label>
                    <select className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm font-medium text-gray-900 focus:border-[#FF0000] focus:bg-white focus:outline-none transition-all">
                      <option>Documents & Contracts</option>
                      <option>Parcels & Packages</option>
                      <option>Food & Catering</option>
                      <option>Electronics & Fragile Items</option>
                    </select>
                  </div>

                  {/* Trust Banner */}
                  <div className="mt-6 rounded-2xl bg-red-50/70 border border-red-100 p-4 flex items-start gap-3">
                    <FaShieldAlt size={18} className="text-[#FF0000] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">
                      Every order is backed with instant live GPS tracking and verified rider identity protection.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <button
                  onClick={() => {
                    alert("Redirecting to rider dispatch request...");
                    setIsDrawerOpen(false);
                  }}
                  className="w-full py-4 rounded-xl bg-[#FF0000] text-white font-black text-sm tracking-wide shadow-lg shadow-red-500/25 hover:bg-red-700 transition-all active:scale-[0.98]"
                >
                  Confirm & Match Rider
                </button>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomerAppSection;