
import { motion } from "framer-motion";
import {

  FaSearch,
  FaTruckLoading,
  FaClock,
  FaBoxOpen,
} from "react-icons/fa";

const TrackingPage = () => {
  return (
    <main className="min-h-screen bg-[#f9f9f9] font-['Lufga'] text-[#121212] pt-[120px]">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-[80px]">
        {/* --- HEADER SECTION --- */}
        <div className="mb-12 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.5em] text-red-600"
          >
            Logistics Dashboard
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black tracking-tighter md:text-7xl text-[#121212]"
          >
            Track your <span className="text-red-600">Package.</span>
          </motion.h1>
          <p className="mt-4 text-gray-500 max-w-xl">
            Enter your unique tracking ID below to see exactly where your
            delivery is and when it will arrive at your doorstep.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* --- LEFT: TRACKING INPUT & STATUS --- */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[40px] border border-gray-200 bg-white p-8 "
            >
              <label className="mb-4 block text-sm font-bold uppercase tracking-widest text-gray-400">
                Tracking ID
              </label>
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="PK-9920-X12"
                  className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-6 py-4 text-[#121212] outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/5 transition-all"
                />
                <button className="absolute right-2 top-2 bottom-2 rounded-xl bg-red-600 px-6 text-white font-bold hover:bg-red-700 transition-colors ">
                  <FaSearch />
                </button>
              </div>

              {/* --- COMING SOON OVERLAY --- */}
              <div className="relative overflow-hidden rounded-3xl bg-red-50 border border-red-100 p-8">
                <div className="absolute -right-6 -top-6 text-red-600/5">
                  <FaBoxOpen size={140} />
                </div>
                <div className="relative z-10">
                  <span className="inline-block rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase text-white mb-4">
                    Upcoming Feature
                  </span>
                  <h3 className="text-2xl font-black text-[#121212]">
                    Live Tracking
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    We are integrating real-time GPS coordinates. Soon, you will
                    be able to contact your rider directly from this map.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT: MAP PREVIEW --- */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[500px] w-full overflow-hidden rounded-[40px] border border-gray-200 bg-white "
            >
              {/* Light Mode Map Background */}
              <div className="absolute inset-0 opacity-50">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="grid-light"
                      width="50"
                      height="50"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 50 0 L 0 0 0 50"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-light)" />
                  {/* Styled "Streets" */}
                  <path
                    d="M0 200 L 1000 200"
                    stroke="#f3f4f6"
                    strokeWidth="20"
                    fill="transparent"
                  />
                  <path
                    d="M300 0 L 300 600"
                    stroke="#f3f4f6"
                    strokeWidth="30"
                    fill="transparent"
                  />
                </svg>
              </div>

              {/* Animated Rider Marker */}
              <motion.div
                animate={{
                  x: [150, 300, 280, 450],
                  y: [400, 350, 200, 150],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute z-30"
              >
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-red-600/30" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white transform -rotate-12">
                    <FaTruckLoading size={24} />
                  </div>
                </div>
              </motion.div>

              {/* Map Floating UI */}
              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between rounded-3xl border border-gray-100 bg-white/90 p-6 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <FaClock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Est. Arrival
                    </p>
                    <p className="text-lg font-black text-[#121212]">TBD</p>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Driver Status
                  </p>
                  <p className="text-sm font-bold text-green-600 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Awaiting Signal
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- STEP PROGRESSION --- */}
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: "Order Confirmed", active: true },
            { label: "Rider Assigned", active: false },
            { label: "In Transit", active: false },
            { label: "Delivered", active: false },
          ].map((step, i) => (
            <div
              key={i}
              className={`p-6 rounded-[32px] border ${
                step.active
                  ? "border-red-100 bg-red-50/50"
                  : "border-gray-200 bg-white"
              } transition-all`}
            >
              <div
                className={`h-1.5 w-12 rounded-full mb-4 ${
                  step.active ? "bg-red-600" : "bg-gray-200"
                }`}
              />
              <span
                className={`text-xs font-black uppercase tracking-widest ${
                  step.active ? "text-[#121212]" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default TrackingPage;
