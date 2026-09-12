import React from "react";
import { motion, useInView, type Variants } from "framer-motion";
import DownloadButtons from "../../components/buttons/DownloadButtons";
import photo from "../../assets/images/use_app/person.svg";

const PackageDeliverySection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#fff] pt-16 sm:pt-24 md:pt-8 pb-16 font-['Lufga'] text-gray-900"
    >
      {/* Centralized Main Wrapper */}
      <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center">
        {/* Top Header Text Content */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: -2 } : {}}
            whileHover={{ scale: 1.08, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-4 sm:mb-6 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            AFFORDABLE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl md:text-6xl lg:text-6xl"
          >
            We Pick It Up. We Deliver It.{" "}
            <span className="relative inline-block text-[#FF0000]">
              Simple.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ lineHeight: 1.6 }}
            className="mt-[-8px] text-[16px] sm:text-[20px] text-gray-600 font-medium leading-relaxed max-w-2xl px-2 sm:px-0"
          >
            Got something to send? Pickars gets a trusted rider to you in
            minutes, so your package can get where it needs to go.{" "}
          </motion.p>

          <div style={{ marginTop: 16 }}>
            <DownloadButtons />
          </div>
        </div>

        {/* Centralized Image Banner Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] w-full max-h-[700px] max-w-7xl mx-auto "
        >
          <img
            src={photo}
            alt="Pickars service showcase"
            className="w-full h-auto object-cover block"
          />

          {/* Optional Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Pickars Text Overlay - GSAP-style parallax + scroll trigger */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-150px" }}
            style={{
              y: isInView ? 0 : 20,
              opacity: isInView ? 1 : 0,
            }}
            className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10"
          >
            <h3 className="text-white text-4xl sm:text-6xl font-black tracking-tighter font-['Lufga']">
              Pickars<span style={{ color: "#ff0000" }}>.</span>
            </h3>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PackageDeliverySection;
