import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import notificationsMockup from "../../assets/images/use_app/phone_g.svg"; // Update path as needed

const AFNotifications: React.FC = () => {
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
        {/* ——— MAIN CONTAINER (Clean White Background Showcase) ——— */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto overflow-hidden p-4 sm:p-8"
        >
          {/* Centralized Header Content */}
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            {/* Ticket-style badge */}
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-block cursor-default select-none bg-[#FF0000] px-5 py-2 text-[11px] font-black uppercase tracking-widest text-white sm:text-xs"
              style={{
                maskImage:
                  "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
                WebkitMaskImage:
                  "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
              }}
            >
              SMART ALERTS
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl md:text-6xl lg:text-6xl"
            >
              Prompt Notifications, you{" "}
              <span className="text-[#FF0000]">never lose</span> an update.
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="mb-9 max-w-xl text-[16px] font-medium leading-relaxed text-gray-600 sm:text-[19px]"
            >
              Stay steps ahead with intelligent, real-time push notifications
              designed to keep you completely informed on every shipment status
              change instantly.
            </motion.p>
          </div>

          {/* Full Image Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative mx-auto w-full overflow-hidden rounded-[32px] sm:rounded-[40px]"
          >
            <motion.div style={{ y: mockupY }} className="w-full">
              <img
                src={notificationsMockup}
                alt="Pickars App Smart Notifications Preview"
                className="block h-auto w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AFNotifications;
