import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaXTwitter,
  FaQuoteLeft,
} from "react-icons/fa6";

interface Comment {
  text: string;
  icon: React.ReactElement;
  name: string;
  color: string;
  bg: string;
}

const enrichComments = (comments: any[]): Comment[] =>
  comments.map((c) => {
    const type = c.icon.type;
    if (type === FaInstagram)
      return { ...c, color: "#E1306C", bg: "rgba(225,48,108,0.1)" };
    if (type === FaFacebookF)
      return { ...c, color: "#1877F2", bg: "rgba(24,119,242,0.1)" };
    if (type === FaXTwitter)
      return { ...c, color: "#121212", bg: "rgba(0,0,0,0.05)" };
    if (type === FaTiktok)
      return { ...c, color: "#00f2ea", bg: "rgba(0,242,234,0.1)" };
    return { ...c, color: "#ff0000", bg: "rgba(255,0,0,0.1)" };
  });

const row1Data = enrichComments([
  {
    text: "Best delivery experience ever! 🚀 I booked in seconds, the rider arrived exactly on time.",
    icon: <FaInstagram />,
    name: "Chiamaka Okafor",
  },
  {
    text: "Rider was on time & super friendly! Smooth process, great tracking updates.",
    icon: <FaFacebookF />,
    name: "Tunde Balogun",
  },
  {
    text: "Fast & safe package delivery 👍 My items were handled with care.",
    icon: <FaTiktok />,
    name: "Funmilayo Adeyemi",
  },
  {
    text: "My go-to service for urgent deliveries! Secure and professional.",
    icon: <FaXTwitter />,
    name: "Bola Akinwale",
  },
]);

const row2Data = enrichComments([
  {
    text: "Tracking was so accurate 📍 I could follow the rider in real-time. No guesswork.",
    icon: <FaInstagram />,
    name: "Amaka Umeh",
  },
  {
    text: "Affordable and reliable 💯 No hidden charges, just honest pricing.",
    icon: <FaFacebookF />,
    name: "Femi Olatunji",
  },
  {
    text: "Customer support blew my mind! Truly top-notch service.",
    icon: <FaTiktok />,
    name: "Sade Ogunbanjo",
  },
  {
    text: "Never once missed a delivery time ⏱️ Extremely consistent quality.",
    icon: <FaXTwitter />,
    name: "Ibrahim Yusuf",
  },
]);

const TickerRow = ({
  items,
  direction = "left",
}: {
  items: Comment[];
  direction?: "left" | "right";
}) => {
  // Triple the items to ensure no gaps during the infinite scroll
  const loopItems = [...items, ...items, ...items];

  return (
    <div className="group flex overflow-hidden py-4">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        // PAUSE ON HOVER: A pro feature for accessibility
        whileHover={{ animationPlayState: "paused" }}
        className="flex gap-6 whitespace-nowrap px-3"
      >
        {loopItems.map((item, idx) => (
          <div
            key={idx}
            className="relative flex w-[380px] flex-col justify-between rounded-[40px] border border-white bg-white/80 p-10 backdrop-blur-sm transition-all duration-500 hover:border-red-200 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.1)]"
          >
            <FaQuoteLeft className="absolute top-6 left-6 text-gray-100 text-4xl -z-10" />

            <p className="whitespace-normal text-[15px] font-medium leading-relaxed text-gray-700">
              {item.text}
            </p>

            <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
              <div className="flex flex-col">
                <span className="text-[13px] font-black uppercase tracking-tighter text-gray-900">
                  {item.name}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Verified User
                </span>
              </div>
              <motion.div
                whileHover={{ rotate: 360 }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm"
                style={{ backgroundColor: item.bg, color: item.color }}
              >
                {item.icon}
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const CommentsSection: React.FC = () => {
  const [count, setCount] = useState(150);
  const target = 6349;

  useEffect(() => {
    let startTime: number;
    const duration = 2500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing function for a more natural count-up
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * (target - 150) + 150));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-32 font-['Lufga']">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-20 px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-red-600 font-black text-sm uppercase tracking-[0.3em]"
          >
            Wall of Love
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-4 text-5xl font-black leading-[1] tracking-tighter md:text-8xl text-gray-900"
          >
            Dispatched over <br />
            <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
              {count.toLocaleString()}+
            </span>{" "}
            packages!
          </motion.h2>
        </div>
      </div>

      <div className="relative flex flex-col gap-6">
        {/* Mirror effect gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-40 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-40 bg-gradient-to-l from-[#fafafa] via-[#fafafa]/80 to-transparent" />

        <TickerRow items={row1Data} direction="left" />
        <TickerRow items={row2Data} direction="right" />
      </div>

      <div className="mt-20 text-center">
        <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">
          Trusted by thousands of businesses 
        </p>
      </div>
    </section>
  );
};

export default CommentsSection;
