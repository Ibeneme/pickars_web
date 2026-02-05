import React, { useRef } from "react";
import { motion, useScroll, useSpring, type Variants } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaMotorcycle,
  FaBox,
  FaRoute,
  FaCheckCircle,
} from "react-icons/fa";

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });

  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4 },
    },
  };

  const stepVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const steps = [
    {
      number: "01",
      icon: <FaMapMarkerAlt className="text-4xl" />,
      title: "Set Locations",
      description:
        "Tap to pin your pickup. We’ve made it as easy as sending a text.",
      miniMap: (
        <div className="relative h-72 w-full max-w-lg rounded-[2.5rem] overflow-hidden bg-white border border-gray-100 group">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [3, -3, 3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[20%] top-[30%] z-20"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-600 text-white">
              <FaMapMarkerAlt size={28} />
            </div>
          </motion.div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300">
            <motion.path
              d="M 110 120 Q 200 120, 280 200"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="10 10"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute right-[20%] bottom-[25%] h-6 w-6 rounded-full bg-green-500 border-[4px] border-green-100"
          />
        </div>
      ),
      side: "right",
    },
    {
      number: "02",
      icon: <FaMotorcycle className="text-4xl" />,
      title: "Instant Match",
      description:
        "Our smart engine finds the best rider for your route in the blink of an eye.",
      miniMap: (
        <div className="relative h-72 w-full max-w-lg rounded-[2.5rem] overflow-hidden bg-[#121212]">
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ef4444_0%,transparent_70%)]"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="relative h-40 w-40 border border-white/10 rounded-full"
            >
              <motion.div className="absolute -top-2 left-1/2 h-4 w-4 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
            </motion.div>
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute h-16 w-16 rounded-full bg-red-600 flex items-center justify-center text-white"
            >
              <FaMotorcycle size={28} />
            </motion.div>
          </div>
        </div>
      ),
      side: "left",
    },
    {
      number: "03",
      icon: <FaBox className="text-4xl" />,
      title: "Secure Pickup",
      description:
        "Every item is verified. No guesswork, just pure transparency.",
      miniMap: (
        <div className="relative h-72 w-full max-w-lg rounded-[2.5rem] overflow-hidden bg-red-50 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="h-36 w-36 rounded-[2rem] bg-white flex items-center justify-center relative"
          >
            <FaBox className="text-red-600" size={50} />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="absolute -top-4 -right-4 h-12 w-12 bg-green-500 rounded-full flex items-center justify-center text-white border-4 border-red-50"
            >
              <FaCheckCircle size={20} />
            </motion.div>
          </motion.div>
        </div>
      ),
      side: "right",
    },
    {
      number: "04",
      icon: <FaRoute className="text-4xl" />,
      title: "Track & Deliver",
      description:
        "Watch your package glide through the city to its destination.",
      miniMap: (
        <div className="relative h-72 w-full max-w-lg rounded-[2.5rem] overflow-hidden bg-gray-900">
          <svg
            className="absolute inset-0 h-full w-full opacity-20"
            viewBox="0 0 400 300"
          >
            <path d="M0 150 H400 M200 0 V300" stroke="white" strokeWidth="1" />
          </svg>

          <motion.div
            style={{ offsetPath: "path('M 50 150 Q 200 50, 350 150')" }}
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute h-10 w-10 bg-white rounded-full flex items-center justify-center text-red-600"
          >
            <FaMotorcycle size={20} />
          </motion.div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
            <span className="text-white text-xs font-bold tracking-widest uppercase">
              Live Tracking
            </span>
          </div>
        </div>
      ),
      side: "left",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-24 md:py-40 font-['Lufga'] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            Simple Steps
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#121212] tracking-tighter"
          >
            How It <span className="text-red-600">Works.</span>
          </motion.h2>
        </div>

        {/* Sweet vertical line */}
        <div className="absolute left-1/2 top-[400px] bottom-40 w-[1px] bg-gray-100 -translate-x-1/2 hidden lg:block">
          <motion.div
            style={{ scaleY: pathProgress, originY: 0 }}
            className="w-full h-full bg-red-400"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-32 md:space-y-40"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={stepVariants}
              className={`flex flex-col lg:flex-row items-center gap-16 ${
                step.side === "left" ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 w-full flex justify-center">
                {step.miniMap}
              </div>

              <div className="flex-1 text-center lg:text-left">
                <motion.span
                  whileInView={{ rotate: [0, 15, 0] }}
                  className="inline-flex items-center justify-center h-14 w-14 rounded-[1.2rem] bg-gray-50 text-[#121212] mb-8 text-xl font-black"
                >
                  {step.number}
                </motion.span>

                <h3 className="text-4xl md:text-5xl font-black text-[#121212] mb-4 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-lg text-gray-500 leading-relaxed max-w-sm mx-auto lg:mx-0">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Sweet background pulses */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-50 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-50 rounded-full blur-[100px] opacity-50" />
      </div>
    </section>
  );
};

export default HowItWorksSection;
