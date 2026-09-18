"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import appMockup from "@/assets/landing-page-images/app-mockups/phone_f.svg";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";

export default function AppFeaturesHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

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

  const features = [
    {
      number: "01",
      title: "Fair & Upfront Pricing",
      description:
        "Get budget-friendly delivery rates with zero hidden fees, whether you're sending a quick item or managing daily business shipments.",
    },
    {
      number: "02",
      title: "Live GPS Tracking",
      description:
        "Track your dispatch rider on an interactive map in real time, from the instant they pick up your item until it's safely dropped off.",
    },
    {
      number: "03",
      title: "Vetted & Safe Handling",
      description:
        "Rest easy knowing your packages are handled by verified, trained riders committed to swift and secure door-to-door delivery.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden bg-[#fff] py-20 font-['Lufga'] text-gray-900 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-4 sm:mb-6 px-5 sm:px-6 py-2 max-w-[210px] sm:py-2.5 bg-[#000] text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            APP EXPERIENCE
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-6xl"
          >
            Engineered for <span className="text-[#FF0000]">speed</span> and
            total reliability.
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-xl text-base font-medium text-gray-600 sm:text-lg"
          >
            Discover why thousands of individuals and businesses rely on Pickars
            for their daily logistics.
          </motion.p>
        </motion.div>

        <div className="mx-auto overflow-hidden rounded-[32px] bg-black sm:rounded-[40px]">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex h-full flex-col justify-between p-6 sm:p-10 lg:col-span-6 lg:p-12"
            >
              <div>
                <motion.h3
                  variants={itemVariants}
                  className="mb-8 text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
                >
                  The Pickars App
                </motion.h3>
                <div className="flex flex-col gap-4 sm:gap-6">
                  {features.map((feature) => (
                    <motion.div
                      key={feature.number}
                      variants={itemVariants}
                      className="group flex items-start gap-4 rounded-2xl bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] sm:gap-5 sm:p-6"
                    >
                      <motion.div
                        variants={itemVariants}
                        className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center bg-[#ff0000] px-5 py-2 text-[11px] font-black uppercase tracking-widest text-white sm:text-xs select-none cursor-default"
                        style={{
                          maskImage:
                            "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
                          WebkitMaskImage:
                            "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
                        }}
                      >
                        {feature.number}
                      </motion.div>
                      <div className="flex flex-col gap-1">
                        <h4 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                          {feature.title}
                        </h4>
                        <p className="text-sm font-normal leading-relaxed text-gray-300 sm:text-base">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-2 sm:mt-10">
                <DownloadButtons dark={true} alignLeft={true} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative flex h-full min-h-[400px] w-full items-center justify-end overflow-hidden lg:col-span-6 lg:min-h-full"
            >
              <div className="relative flex h-full w-full items-center justify-end overflow-hidden">
                <motion.div
                  style={{ y: mockupY }}
                  className="relative h-[500px] w-full scale-105 sm:h-[600px] lg:h-full"
                >
                  <Image
                    src={appMockup}
                    alt="Pickars App Interface Mockup"
                    fill
                    className="block object-cover object-right "
                    priority
             
                  />
                </motion.div>
                <div className="absolute bottom-6 right-6 z-10 rounded-2xl border border-white/10 bg-gray-900/90 px-5 py-3 text-white backdrop-blur-md">
                  <p className="text-xs font-medium text-gray-400">
                    Available on
                  </p>
                  <p className="text-sm font-bold tracking-wide">
                    iOS & Android
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
