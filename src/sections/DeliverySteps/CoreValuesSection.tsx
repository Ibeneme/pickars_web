import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Value {
  title: string;
  description: string;
}

const companyValues: Value[] = [
  {
    title: "Customer-Centric Simplicity",
    description:
      "Our platform is designed with you in mind. We believe technology should make life easier, not more complicated. Schedule in just a few taps.",
  },
  {
    title: "Unwavering Reliability",
    description:
      "Every package is important. From verified riders to end-to-end tracking, we handle every item with the utmost care and precision.",
  },
  {
    title: "Driven by Efficiency",
    description:
      "We value your time. Our smart routing connects you with the closest available rider to eliminate delays and unnecessary waiting.",
  },
  {
    title: "Transparency and Trust",
    description:
      "Trust is our core. Real-time tracking provides complete transparency, so you're always informed and never left in the dark.",
  },
  {
    title: "Empowering Community",
    description:
      "We're a network connecting people. Our platform empowers both customers and riders, creating a thriving and valued ecosystem.",
  },
];

const CoreValuesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open the first one by default

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 400;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#080808] py-24 font-['Lufga'] md:py-32">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.4em] text-red-600"
            >
              The Foundation
            </motion.span>
            <h2 className="text-5xl font-black tracking-tighter text-white md:text-7xl">
              What Makes us <span className="text-gray-500">Pickars.</span>
            </h2>
          </div>

          <div className="hidden gap-3 md:flex">
            <button
              onClick={() => scroll("left")}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-white transition-all hover:bg-white hover:text-black"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-white transition-all hover:bg-white hover:text-black"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={containerRef}
          className="no-scrollbar flex gap-6 overflow-x-auto pb-10"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {companyValues.map((value, index) => (
            <motion.div
              key={index}
              style={{ scrollSnapAlign: "start" }}
              className={`relative min-w-[320px] md:min-w-[420px] rounded-[40px] border p-8 transition-all duration-500 ${
                openIndex === index
                  ? "border-red-600/50 bg-white/10 backdrop-blur-2xl"
                  : "border-white/5 bg-white/5"
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-4xl font-black text-white/10">
                    0{index + 1}
                  </span>
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all ${
                      openIndex === index
                        ? "bg-red-600 text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </button>
                </div>

                <h3 className="mb-6 text-2xl font-black text-white md:text-3xl leading-tight">
                  {value.title}
                </h3>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-sm leading-relaxed text-gray-400"
                    >
                      {value.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
