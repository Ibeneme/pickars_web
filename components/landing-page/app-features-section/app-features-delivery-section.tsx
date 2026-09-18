"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import redRiderImg from "@/assets/landing-page-images/delivery-options-ui.svg";

export default function AppFeaturesDeliveryOptions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 18,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden bg-[#fff] font-['Lufga'] text-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto overflow-hidden p-4 sm:p-8"
        >
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              whileHover={{ scale: 1.08, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mb-6 sm:mb-10 px-5 sm:px-6 py-2 max-w-[210px] sm:py-2.5 bg-[#ff0000] text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none"
              style={{
                maskImage:
                  "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
                WebkitMaskImage:
                  "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
              }}
            >
              FLEXIBLE BOOKING
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl md:text-6xl lg:text-6xl"
            >
              Set your route, Choose your delivery option{" "}
              <span className="text-[#FF0000]">with ease.</span>
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="mb-9 max-w-xl text-[16px] font-medium leading-relaxed text-gray-600 sm:text-[19px]"
            >
              Seamlessly select your pickup and delivery points, then pick the
              ideal delivery tier whether regular, impromptu, or premium
              tailored to your speed and budget.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative mx-auto w-full overflow-hidden rounded-[32px] sm:rounded-[40px]"
          >
            <motion.div
              style={{ y: mockupY }}
              className="relative h-[350px] w-full sm:h-[500px] lg:h-[650px]"
            >
              <Image
                src={redRiderImg}
                alt="Pickars App Pickup and Delivery Options Preview"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
