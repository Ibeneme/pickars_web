import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaLightbulb, FaUtensils } from "react-icons/fa";

const ProblemIdea: React.FC = () => {
  return (
    <section className="relative bg-white px-6 py-24 font-['Lufga'] md:py-32 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-red-50/50 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[2.5rem] font-black leading-tight tracking-tighter text-[#121212] md:text-7xl"
          >
            <span className="text-red-600">The Problem.</span>{" "}
            <br className="md:hidden" />
            The Spark.
          </motion.h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Side: The Problem (The Frustration) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
              <FaUtensils size={24} />
            </div>

            <h3 className="text-3xl font-black text-[#121212]">
              It started with a bowl of soup.
            </h3>

            <div className="space-y-6 text-lg leading-relaxed text-gray-500">
              <p>
                In February 2024, our founder was in Abuja and simply wanted a
                friend’s homemade soup delivered. What should have been a
                15-minute task became a{" "}
                <span className="font-bold text-gray-900">
                  logistics nightmare.
                </span>
              </p>
              <p className="border-l-4 border-red-600 pl-6 italic">
                "Calls went unanswered, prices were erratic, and there was no
                way to know if the food would ever arrive."
              </p>
              <div className="flex items-start gap-4 rounded-3xl bg-gray-50 p-6">
                <FaExclamationTriangle className="mt-1 flex-shrink-0 text-red-600" />
                <p className="text-sm">
                  This wasn’t just about soup—it was about a lack of trust in
                  the entire Nigerian delivery ecosystem.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: The Idea (The Solution) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex flex-col justify-center rounded-[48px] bg-[#0c0c0c] p-10 text-white md:p-16"
          >
            <div className="absolute -right-8 -top-8 hidden h-32 w-32 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl lg:flex">
              <FaLightbulb size={40} className="animate-pulse" />
            </div>

            <h3 className="mb-6 text-3xl font-black">The Pickars Vision.</h3>

            <p className="mb-8 text-lg leading-relaxed text-gray-300">
              From that frustration, Pickars was born. We didn't just want to
              build another app; we wanted to build{" "}
              <span className="text-white font-bold">certainty.</span>
            </p>

            <ul className="space-y-4 text-sm font-medium uppercase tracking-widest text-red-500">
              <li className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-red-600" /> Verified
                Riders Only
              </li>
              <li className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-red-600" />{" "}
                Real-Time Transparency
              </li>
              <li className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-red-600" /> Fair,
                Fixed Pricing
              </li>
            </ul>

            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="text-sm text-gray-400">
                Today, Pickars is the bridge between you and a hassle-free
                delivery experience.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemIdea;
