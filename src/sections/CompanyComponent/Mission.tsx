import React from "react";
import { ANDROID_URL, IOS_URL } from "../../constants";
import { motion, type Variants } from "framer-motion";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import woman_and_phone from "../../assets/images/about/phone_in_pocket.jpeg";
import photo from "../../assets/images/about/photo.svg";

// Animation variants for cleaner code and staggered reveals
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export const Mission: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#FFF5F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 md:space-y-8">
        {/* Top Grid: Mission Content & First Image */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left Column: Mission Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="relative bg-black rounded-[32px] sm:rounded-[40px] p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden min-h-[500px] sm:min-h-[580px]"
          >
            <div
              className="mb-2 mt-4 sm:mb-3 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none w-fit inline-block"
              style={{
                maskImage:
                  "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
                WebkitMaskImage:
                  "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
              }}
            >
              Our Core Mission
            </div>

            <div className="my-6">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.08]">
                The Pickars Mission
              </h2>
              <p className="mt-5 text-base sm:text-lg font-normal leading-relaxed text-zinc-300">
                We started Pickars out of a simple frustration: sending items
                across Port Harcourt shouldn't require countless phone calls,
                unreliable dispatchers, or endless tracking anxiety.
              </p>
              <p className="mt-4 text-base sm:text-lg font-normal leading-relaxed text-zinc-300">
                Today, we back your business and personal deliveries with
                state-of-the-art route tracking, elite vetted riders, and
                absolute accountability from pickup to doorstep.
              </p>
            </div>

            {/* App Download Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 pb-4 mt-2">
              {/* Google Play Button */}
              <a
                href={ANDROID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-5 py-3 rounded-xl font-semibold inline-flex items-center justify-center space-x-3 w-full sm:w-auto"
              >
                <BiLogoPlayStore className="w-6 h-6 shrink-0 text-gray-900" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                    Download on
                  </p>
                  <p className="text-sm font-bold leading-none">Play Store</p>
                </div>
              </a>

              {/* App Store Button */}
              <a
                href={IOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-5 py-3 rounded-xl font-semibold inline-flex items-center justify-center space-x-3 w-full sm:w-auto"
              >
                <FaApple className="w-5 h-5 shrink-0 text-gray-900" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                    Download on
                  </p>
                  <p className="text-sm font-bold leading-none">App Store</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: First Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleInVariant}
            className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] min-h-[500px] sm:min-h-[580px] h-full"
          >
            <img
              src={woman_and_phone}
              alt="Delivery rider navigating city"
              className="w-full h-full object-cover absolute inset-0"
            />
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] w-full"
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
            className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10"
          >
            <h3 className="text-white text-7xl sm:text-9xl font-black tracking-tighter font-['Lufga']">
              Pickars<span style={{ color: "#ff0000" }}>.</span>
            </h3>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
