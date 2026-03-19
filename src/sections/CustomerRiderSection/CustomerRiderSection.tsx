import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaApple, FaCheckCircle, FaMotorcycle } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
// Importing the links you defined earlier
import { ANDROID_URL, IOS_URL } from "../Hero/HeroSection";

const CustomerRiderSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"customer" | "rider">("customer");

  const content = {
    customer: {
      tag: "For You",
      header: "Book a Dispatch Rider",
      description:
        "Send packages across the city with zero stress. Our professional riders handle the traffic while you grow your business.",
      features: [
        "Real-time GPS tracking",
        "Transparent flat rates",
        "Verified professional riders",
      ],
    },
    rider: {
      tag: "For Earners",
      header: "Become a Dispatch Rider",
      description:
        "Turn your bike into a revenue engine. Enjoy flexible hours, instant payouts, and a steady stream of requests.",
      features: [
        "Flexible work hours",
        "Weekly / daily payouts",
        "Performance bonuses",
      ],
    },
  };

  const active = content[activeTab];

  return (
    <section className="relative overflow-hidden bg-[#fafafa] px-6 py-24 font-['Lufga'] md:py-40">
      <div className="mx-auto max-w-7xl">
        {/* 1. ACTIVATED TOGGLE */}
        <div className="mb-24 flex justify-center">
          <div className="inline-flex rounded-full bg-gray-200/50 p-1.5 backdrop-blur-md">
            {(["customer", "rider"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-10 py-3 text-sm font-bold transition-colors duration-500 capitalize z-10 ${
                  activeTab === tab ? "text-white" : "text-gray-500"
                }`}
              >
                <span className="relative z-20">{tab}</span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-full bg-[#ff0000]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-12 lg:grid-cols-12 lg:gap-24"
          >
            {/* TEXT SIDE */}
            <div className="lg:col-span-7">
              <motion.span className="mb-6 inline-block font-black text-[#ff0000] tracking-wider text-xs uppercase">
                {active.tag}
              </motion.span>

              <h2 className="mb-8 text-[3.5rem] font-black leading-[0.9] tracking-tighter text-[#121212] md:text-[6.5rem]">
                {active.header.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={
                      word.replace(/[.,]/g, "").toLowerCase() === "rider"
                        ? "text-red-600"
                        : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </h2>

              <p className="mb-12 max-w-xl text-xl font-bold leading-relaxed text-gray-500 md:text-2xl">
                {active.description}
              </p>

              <div className="mb-14 space-y-5">
                {active.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <FaCheckCircle className="text-[#ff0000]" size={20} />
                    <span className="text-lg font-bold text-[#121212]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* 2. UPDATED STORE BUTTONS WITH LINKS */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={IOS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl bg-[#121212] px-8 py-4 text-white transition-all hover:scale-105 active:scale-95"
                >
                  <FaApple
                    size={28}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  <div className="text-left">
                    <p className="text-[10px] font-medium opacity-60">
                      Download on the
                    </p>
                    <p className="text-lg font-black leading-none">App Store</p>
                  </div>
                </a>
                <a
                  href={ANDROID_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 text-[#121212] transition-all hover:border-[#ff0000] hover:scale-105 active:scale-95"
                >
                  <BiLogoPlayStore
                    size={28}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  <div className="text-left">
                    <p className="text-[10px] font-medium opacity-60">
                      Get it on
                    </p>
                    <p className="text-lg font-black leading-none">
                      Google Play
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* 3. PHONE VISUAL */}
            <div className="relative flex justify-center lg:col-span-5">
              <div className="relative w-full max-w-[380px]">
                <motion.div
                  initial={{ rotate: 5, y: 40 }}
                  whileInView={{ rotate: 0, y: 0 }}
                  viewport={{ once: true }}
                  className="relative z-10 aspect-[9/18.5] w-full overflow-hidden rounded-[3.5rem] border-[10px] border-[#121212] bg-[#121212]"
                >
                  {/* Phone Internal UI Content */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                      backgroundSize: "40px 40px",
                    }}
                  />

                  <svg className="absolute inset-0 h-full w-full p-12">
                    <motion.path
                      d="M 60 350 C 60 250, 250 300, 250 150 S 100 100, 100 50"
                      fill="transparent"
                      stroke="#ff0000"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <circle cx="100" cy="50" r="6" fill="#ff0000" />
                  </svg>

                  <motion.div
                    animate={{
                      offsetPath:
                        "path('M 60 350 C 60 250, 250 300, 250 150 S 100 100, 100 50')",
                      offsetDistance: ["0%", "100%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute z-20 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/50"
                  >
                    <FaMotorcycle size={18} />
                  </motion.div>

                  <div className="absolute bottom-8 left-4 right-4">
                    <div className="rounded-3xl bg-[#1e1e1e] border border-white/5 p-5 backdrop-blur-md">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-red-600/20 flex items-center justify-center text-red-600">
                          {activeTab === "customer" ? (
                            <FaMotorcycle size={22} />
                          ) : (
                            <FaCheckCircle size={22} />
                          )}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-0.5">
                            {activeTab === "customer"
                              ? "Rider Status"
                              : "Active Orders"}
                          </p>
                          <p className="text-lg font-black text-white">
                            {activeTab === "customer"
                              ? "4 Mins Away"
                              : "12 Nearby"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <div className="absolute -inset-10 -z-10 rounded-full bg-red-600/10 blur-[120px]" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CustomerRiderSection;
