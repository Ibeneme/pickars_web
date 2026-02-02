import React from "react";
import { motion, type Variants } from "framer-motion"; // Import Variants type
import {
  FaExclamationTriangle,
  FaLightbulb,
  FaUtensils,
  FaCheckCircle,
} from "react-icons/fa";

const ProblemIdea: React.FC = () => {
  // Explicitly typing these as Variants resolves the TS(2322) error
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 font-['Lufga'] md:py-40">
      {/* Rest of your component remains the same */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full bg-red-50/60 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gray-50 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 max-w-3xl"
        >
          <h2 className="text-5xl font-black leading-[1.1] tracking-tight text-[#121212] md:text-8xl">
            The <span className="text-red-600">Problem.</span> <br />
            The Spark.
          </h2>
          <div className="mt-8 h-2 w-24 bg-red-600" />
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <motion.article
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-10"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 text-gray-400"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
                <FaUtensils size={20} />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">
                The Origin Story
              </span>
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="text-3xl font-black leading-tight text-[#121212] md:text-4xl"
            >
              It started with a bowl of soup.
            </motion.h3>

            <motion.div
              variants={itemVariants}
              className="space-y-6 text-lg leading-relaxed text-gray-600"
            >
              <p>
                In February 2024, our founder was in Abuja and simply wanted a
                friend’s homemade soup delivered. What should have been a
                15-minute task became a{" "}
                <span className="font-bold text-black underline decoration-red-500/30 decoration-4 underline-offset-4">
                  logistics nightmare.
                </span>
              </p>

              <blockquote className="relative border-l-4 border-red-600 py-2 pl-8 text-xl font-medium italic text-gray-800">
                "Calls went unanswered, prices were erratic, and there was no
                way to know if the food would ever arrive."
              </blockquote>

              <div className="flex items-start gap-4 rounded-2xl border border-red-100 bg-red-50/30 p-6">
                <FaExclamationTriangle className="mt-1 flex-shrink-0 text-red-600" />
                <p className="text-sm leading-relaxed text-gray-700">
                  <span className="font-bold text-red-700">
                    The Realization:
                  </span>{" "}
                  This wasn’t just about soup—it was about a lack of trust in
                  the entire Nigerian delivery ecosystem.
                </p>
              </div>
            </motion.div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:col-span-6"
          >
            <div className="group relative overflow-hidden rounded-[40px] bg-[#0c0c0c] p-10 text-white shadow-2xl md:p-16">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-600/10 blur-3xl transition-all group-hover:bg-red-600/20" />

              <div className="relative z-10">
                <div className="mb-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/20">
                  <FaLightbulb size={28} />
                </div>

                <h3 className="mb-6 text-3xl font-black md:text-4xl">
                  The Pickars Vision.
                </h3>

                <p className="mb-10 text-lg leading-relaxed text-gray-400">
                  From frustration, we built{" "}
                  <span className="text-white font-bold">certainty.</span> We
                  reimagined delivery not as a service, but as a promise kept
                  every single time.
                </p>

                <ul className="space-y-6">
                  {[
                    "Verified Riders Only",
                    "Real-Time Transparency",
                    "Fair, Fixed Pricing",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em]"
                    >
                      <FaCheckCircle className="text-red-600" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-12 border-t border-white/10 pt-8">
                  <p className="text-sm italic text-gray-500">
                    Today, Pickars is the bridge between your needs and a
                    hassle-free reality.
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default ProblemIdea;
