import React from "react";
import { motion, type Variants } from "framer-motion";
import DownloadButtons from "../../components/buttons/DownloadButtons";
import photo from "../../assets/images/use_app/nice.svg";

const HeroSection: React.FC = () => {
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
    <section className="relative isolate overflow-hidden bg-[#fff] pt-36 pb-16 font-['Lufga'] text-gray-900 md:pt-48 md:pb-24">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:gap-16">
        {/* ——— TOP: Centered bold header ——— */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center text-center max-w-5xl"
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
            className="mb-5 text-5xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl md:text-6xl lg:text-7xl"
          >
            Doorstep deliveries,{" "}
            <span className="relative inline-block text-[#FF0000]">
              got different.
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

        {/* ——— BOTTOM: Video ——— */}
        {/* ——— BOTTOM: Video ——— */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          //  variants={fadeUpVariant}
          className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] w-full max-h-[700px] max-w-7xl mx-auto "
        >
          <img
            src={photo}
            alt="Pickars service showcase"
            className="w-full h-auto object-cover block"
          />

          {/* Optional Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Pickars Text Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10 flex items-end gap-4"
          >
            {/* Imported Logo Image (Assuming square or shield logo) */}

            {/* Pickars Text */}
            <h3 className="text-white text-7xl sm:text-9xl font-black tracking-tighter font-['Lufga'] leading-none">
              Pickars<span style={{ color: "#ff0000" }}>.</span>
            </h3>
          </motion.div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-7xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-black ">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="aspect-[16/10] w-full object-cover sm:aspect-[16/9]"
            >
              <source src={sendVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>


          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-gray-100 bg-white/95 px-4 py-2.5 text-xs font-semibold text-gray-800 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Logistics made easy
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default HeroSection;
