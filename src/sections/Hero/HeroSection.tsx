import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import DownloadButtons from "../../components/buttons/DownloadButtons";
import photo from "../../assets/images/use_app/nice.svg";

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Main parallax for the image (moves slower than text)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Parallax + fade-in for the "Pickars." text overlay
  const pickarsY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const pickarsOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    [0, 0.3, 0.9, 1]
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 110, damping: 16 },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden bg-[#fff] pt-36 pb-16 font-['Lufga'] text-gray-900 md:pt-48 md:pb-24"
    >
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:gap-16">
        {/* ——— TOP: Centered bold header + buttons (Framer parallax + scroll trigger) ——— */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center text-center max-w-4xl"
        >
          {/* Ticket-style badge */}
          <motion.div
            variants={itemVariants}
            className="mb-5 px-5 py-2 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs uppercase tracking-widest cursor-default select-none"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            LOGISTICS
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl md:text-6xl lg:text-6xl"
          >
            Your doorstep deliveries,{" "}
            <span className="relative inline-block text-[#FF0000]">
              redefined.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-9 max-w-xl text-[16px] sm:text-[19px] font-medium leading-relaxed text-gray-600"
          >
            The smartest way to send and receive packages across Port Harcourt.
            Fast, secure, and built for you.
          </motion.p>

          {/* Download buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 mt-[-16px]"
          >
            <DownloadButtons />
          </motion.div>
        </motion.div>

        {/* ——— BOTTOM: Parallax Image Showcase ——— */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] w-full max-h-[700px] max-w-7xl mx-auto"
        >
          {/* Parallax moving image wrapper */}
          <motion.div style={{ y: imageY }} className="w-full h-full scale-110">
            <img
              src={photo}
              alt="Pickars service showcase"
              className="w-full h-auto object-cover block"
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Pickars Text Overlay - GSAP-style parallax + fade (Framer scroll trigger) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-150px" }}
            style={{
              y: pickarsY,
              opacity: pickarsOpacity,
            }}
            className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10 flex items-end gap-4"
          >
            <h3 className="text-white text-4xl sm:text-6xl font-black tracking-tighter font-['Lufga'] leading-none">
              Pickars<span style={{ color: "#ff0000" }}>.</span>
            </h3>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
