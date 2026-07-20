import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa6";

// Import your global store constants
// Updated import path
import { ANDROID_URL, IOS_URL } from "../../components/Launcher/Laucher";

// --- Types & Data ---
interface Comment {
  name: string;
  location: string;
  text: string;
}

const commentsData: Comment[] = [
  {
    name: "Tamuno S.", // Ijaw
    location: "Borikiri",
    text: "Fastest delivery service in Port Harcourt! My package was delivered to Borikiri in under an hour.",
  },
  {
    name: "Nneka O.", // Igbo
    location: "Garrison",
    text: "The real-time tracking is a game changer for my online boutique at Garrison market.",
  },
  {
    name: "Baridule K.", // Ogoni
    location: "Eleme",
    text: "Affordable door-to-door delivery all the way to Eleme. Very respectful riders!",
  },
  {
    name: "Musa A.", // Hausa
    location: "Oil Mill",
    text: "Reliable and honest. Pickars helps me send stock across PH without any stress.",
  },
  {
    name: "Tariere P.", // Ijaw
    location: "GRA Phase 2",
    text: "I love how easy it is to book a bike. Makes sending urgent documents so effortless.",
  },
  {
    name: "Chidubem E.", // Igbo
    location: "Ada George",
    text: "Safe and dependable. I never worry about fragile items getting damaged when dispatched.",
  },
  {
    name: "Sira M.", // Ogoni
    location: "Trans-Amadi",
    text: "Pickars respects delivery schedules better than any other local dispatch service in PH.",
  },
  {
    name: "Ibrahim S.", // Hausa
    location: "Mile 1, Diobu",
    text: "Great rates for small business owners. Highly recommended to deliver daily packages.",
  },
];

// Helper to apply subtle dynamic curvature to each card
const getRotation = (index: number, total: number) => {
  const middle = (total - 1) / 2;
  const offset = index - middle;
  return offset * 2.5;
};

const CommentsSection: React.FC = () => {
  const [count, setCount] = useState(150);
  const target = 6349;

  // Counter animation
  useEffect(() => {
    let startTime: number;
    count
    const duration = 2500;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * (target - 150) + 150));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  // --- DEVICE REDIRECT LOGIC ---
  const handleDeliverNow = () => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      window.open(ANDROID_URL, "_blank");
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.open(IOS_URL, "_blank");
    } else {
      window.open("https://pickars.com", "_blank");
    }
  };

  // Duplicate items for continuous seamless looping
  const loopItems = [
    ...commentsData,
    ...commentsData,
    ...commentsData,
    ...commentsData,
  ];

  return (
    <section className="relative overflow-hidden bg-[#FFF5F5] py-24 md:py-36 font-sans border-y border-red-100/60">
      {/* SECTION HEADER */}
      <div className="relative z-20 px-6 max-w-3xl mx-auto text-center mb-16 md:mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black leading-[1.2] tracking-tight text-gray-900"
        >
          Sending, your Packages are{" "}
          <span className="text-[#FF0000]">Our Priorities</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-[20px] text-gray-600 leading-relaxed max-w-2xl mx-auto"
        >
          From Diobu market goods to Trans-Amadi, we keep packages moving
          fast, giving your business good wings and going strong across PH!
        </motion.p>
      </div>

      {/* INFINITE SCROLLING TICKER */}
      <div className="relative flex overflow-hidden py-8">
        {/* Faint red gradient edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-20 md:w-48 bg-gradient-to-r from-[#FFF5F5] via-[#FFF5F5]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-20 md:w-48 bg-gradient-to-l from-[#FFF5F5] via-[#FFF5F5]/80 to-transparent" />

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 whitespace-normal px-4 items-center"
        >
          {loopItems.map((item, idx) => {
            const rotationDegree = getRotation(
              idx % commentsData.length,
              commentsData.length
            );

            return (
              <div
                key={idx}
                style={{
                  transform: `rotate(${rotationDegree}deg)`,
                }}
                className="relative flex-shrink-0 w-[360px] md:w-[450px] bg-white rounded-[28px] p-6 md:p-7 border border-red-100 flex items-center gap-5 transition-transform duration-300 hover:scale-105"
              >
                {/* Yolat-Style Scalloped Starburst Badge */}
                <div
                  className="flex-shrink-0 w-14 h-14 bg-red-100 text-red-600 flex items-center justify-center"
                  style={{
                    maskImage:
                      "radial-gradient(circle 6px at calc(100% - 3px) 50%, #0000 99%, #000 100%)",
                    WebkitMaskImage:
                      "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/12px 12px repeat",
                  }}
                >
                  <FaQuoteLeft className="text-base text-red-600" />
                </div>

                {/* Card Content */}
                <div className="flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-2 font-bold text-gray-900 text-[20px]">
                    <span className="truncate">{item.name}</span>
                    <span className="inline-block text-[12px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-100/50">
                      {item.location}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[16px] text-gray-600 font-normal leading-relaxed line-clamp-3">
                    "{item.text}"
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* FOOTER CTA */}
      <div className="mt-16 md:mt-24 text-center px-6 max-w-2xl mx-auto">
        <p className="text-gray-400 font-bold text-[10px] md:text-xs tracking-widest uppercase mb-6">
          Trusted by thousands of Port Harcourt businesses & residents
        </p>

        <motion.button
          onClick={handleDeliverNow}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#ff0000] text-white px-10 py-5 rounded-full font-black  text-[20px] md:text-[24px]  transition-colors"
        >
          Send a Package Now
        </motion.button>
      </div>
    </section>
  );
};

export default CommentsSection;
