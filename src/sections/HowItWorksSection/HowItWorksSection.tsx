import React, { useRef } from "react";
import { motion, useScroll, useSpring, type Variants } from "framer-motion";
import { FaMapMarkerAlt, FaMotorcycle, FaBox, FaRoute } from "react-icons/fa";

const HowItWorksSection: React.FC = () => {
  const containerRef = useRef(null);

  // Mad Scroll Progress for the "Route Line"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 100, opacity: 0, rotateX: -20 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 80, damping: 12 },
    },
  };

  const steps = [
    {
      number: "01",
      icon: <FaMapMarkerAlt />,
      title: "Set Locations",
      description:
        "Quickly input pickup and drop-off. Add photos or special notes in seconds.",
      accent: "from-red-500 to-red-400",
    },
    {
      number: "02",
      icon: <FaMotorcycle />,
      title: "Instant Match",
      description:
        "We find the nearest rider in PH City. View ETA and rider details instantly.",
      accent: "from-orange-500 to-orange-400",
    },
    {
      number: "03",
      icon: <FaBox />,
      title: "Secure Pickup",
      description:
        "Rider confirms package details with photo proof for total peace of mind.",
      accent: "from-red-700 to-red-500",
    },
    {
      number: "04",
      icon: <FaRoute />,
      title: "Track & Receive",
      description:
        "Track the ride live. Recipient confirms arrival for a safe delivery.",
      accent: "from-emerald-600 to-emerald-400",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#fafafa] py-24 font-['Lufga'] md:py-40 perspective-1000"
    >
      {/* --- MAD BACKGROUND ANIMATION --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ rotate: 45, opacity: 0.03 }}
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] h-[1000px] w-[1200px] bg-[repeating-linear-gradient(90deg,#000,#000_1px,transparent_1px,transparent_80px)]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6">
        {/* Editorial Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="mb-6 rounded-full bg-red-600/10 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-red-600"
          >
            Seamless Flow
          </motion.div>
          <h2 className="text-6xl font-black leading-none tracking-tighter text-[#121212] md:text-8xl">
            How it
            <span className="ml-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
              works.
            </span>
          </h2>
        </div>

        {/* --- DYNAMIC ROUTE LINE --- */}
        <div className="absolute left-1/2 top-[55%] hidden h-1 w-[80%] -translate-x-1/2 -translate-y-1/2 lg:block">
          <svg width="100%" height="20" viewBox="0 0 1000 20" fill="none">
            <motion.path
              d="M0 10 Q 250 20 500 10 T 1000 10"
              stroke="#fee2e2"
              strokeWidth="4"
              strokeDasharray="12 12"
            />
            <motion.path
              d="M0 10 Q 250 20 500 10 T 1000 10"
              stroke="#ef4444"
              strokeWidth="4"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* 4-Step Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -15, rotateY: 5 }}
              className="group relative rounded-[3rem] bg-white p-6  transition-all duration-500"
            >
              {/* Floating Number */}
              <div className="absolute -top-6 -right-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#121212] font-black text-white  transition-transform group-hover:scale-110 group-hover:-rotate-12">
                {step.number}
              </div>

              <div
                className={`mb-10 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br ${step.accent} text-3xl text-white transition-all duration-700 group-hover:rounded-full group-hover:rotate-[360deg]`}
              >
                {step.icon}
              </div>

              <h3 className="mb-4 text-3xl font-black tracking-tighter text-[#121212]">
                {step.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {step.description}
              </p>

              {/* Step completion indicator */}
              <motion.div className="mt-8 h-1 w-0 bg-red-600 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
