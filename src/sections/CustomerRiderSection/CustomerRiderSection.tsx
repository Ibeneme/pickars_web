import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage1 from "../../assets/images/cr/customer.png";
import heroImage2 from "../../assets/images/cr/customer.png";
import { FaApple, FaCheckCircle } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

const CustomerRiderSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"customer" | "rider">("customer");

  const content = {
    customer: {
      tag: "For You",
      header: "Book a Dispatch Rider",
      description:
        "Send packages across the city with zero stress. Our professional riders handle the traffic while you handle your business.",
      features: [
        "Real-time GPS Tracking",
        "Transparent Flat Rates",
        "Verified Professional Riders",
      ],
      image: heroImage1,
      theme: "#ff0000",
      accent: "bg-[#ff0000]",
    },
    rider: {
      tag: "For Earners",
      header: "Become our Rider",
      description:
        "Turn your bike into a money-making machine. Flexible hours, instant payouts, and a steady stream of requests.",
      features: [
        "Flexible Work Hours",
        "Weekly/Daily Payouts",
        "Performance Bonuses",
      ],
      image: heroImage2,
      theme: "#ff0000", // Keeping it red for brand consistency or change to orange if preferred
      accent: "bg-[#ff0000]",
    },
  };

  const active = content[activeTab];

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 font-['Lufga'] md:py-32">
      {/* Background Ambient Glow */}
      <motion.div
        animate={{
          backgroundColor:
            activeTab === "customer"
              ? "rgba(255,0,0,0.03)"
              : "rgba(255,0,0,0.05)",
        }}
        className="absolute inset-0 -z-10 transition-colors duration-1000"
      />

      <div className="mx-auto max-w-7xl">
        {/* Modern Toggle */}
        <div className="mb-20 flex justify-center">
          <div className="inline-flex rounded-2xl bg-gray-100 p-1.5 shadow-sm">
            {["customer", "rider"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "customer" | "rider")}
                className={`relative px-10 py-3 text-sm font-black uppercase tracking-widest transition-colors ${
                  activeTab === tab ? "text-white" : "text-gray-500"
                }`}
              >
                <span className="relative z-10">{tab}</span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-xl bg-[#ff0000] shadow-lg shadow-red-200"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Split Layout */}
        <AnimatePresence>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "customer" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === "customer" ? 20 : -20 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="grid items-center gap-16 lg:grid-cols-2"
          >
            {/* Text Side */}
            <div className="order-1 lg:order-1">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 inline-block font-bold uppercase tracking-[0.3em] bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
              >
                {active.tag}
              </motion.span>

              <h2 className="mb-6 text-[3rem] font-black leading-[1.05] tracking-tighter text-[#121212] md:text-[5rem]">
                {active.header.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={
                      word.toLowerCase() === "rider"
                        ? "bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
                        : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-gray-500 md:text-xl">
                {active.description}
              </p>

              {/* Feature List */}
              <div className="mb-10 space-y-4">
                {active.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-[#ff0000]" />
                    <span className="font-bold text-[#121212]">{feature}</span>
                  </div>
                ))}
              </div>

              {/* App Store Buttons */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <FaApple />, label: "App Store" },
                  { icon: <BiLogoPlayStore />, label: "Play Store" },
                ].map((btn, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-3 rounded-2xl border-2 border-gray-100 bg-white px-6 py-3 transition-all hover:border-[#ff0000] hover:text-[#ff0000]"
                  >
                    <span className="text-xl">{btn.icon}</span>
                    <span className="text-sm font-bold">{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="order-1 flex justify-center lg:order-2">
              <div className="relative">
                {/* Decorative blobs behind phone */}
                <div className="absolute -inset-10 -z-10 animate-pulse rounded-full bg-red-100/50 blur-3xl" />

                <motion.img
                  initial={{
                    rotate: activeTab === "customer" ? -5 : 5,
                    scale: 0.9,
                  }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  src={active.image}
                  alt={active.header}
                  className="h-auto w-full max-w-[400px] object-contain "
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CustomerRiderSection;
