import React from "react";
import { motion } from "framer-motion";
import {
  FaBoxes,
  FaUserCheck,
  FaMotorcycle,
} from "react-icons/fa";
import { IOS_URL, ANDROID_URL } from "./HowItWorksSection";

// ── Dispatch-slip design tokens (shared with the rest of the Pickars site) ──
const PAPER_BG = "#FFFFFF";
const PAPER_BG_RAISED = "#FFFFFF";
const INK = "#17140F";
const INK_MUTED = "#6B6558";
const ACCENT = "#FF3B30";
const RULE = "#DCD5C6";

interface ConsignmentType {
  code: string; // manifest reference code, e.g. "PKG-01"
  title: string;
  subtitle: string;
  description: string;
  stamp: string;
  icon: React.ReactNode;
  features: string[];
}

const audienceData: ConsignmentType[] = [
  {
    code: "PKG-01",
    title: "Vendors & Merchants",
    subtitle: "Scale your business delivery",
    description:
      "Reliable same-day dispatch for online stores, Instagram vendors, and retail shops across Port Harcourt.",
    stamp: "Most Booked",
    icon: <FaBoxes />,
    features: [
      "Bulk delivery scheduling",
      "Cash on Delivery (COD) handling",
      "Priority business support",
    ],
  },
  {
    code: "PKG-02",
    title: "Everyday Customers",
    subtitle: "Fast personal errands",
    description:
      "Need to send a gift, documents, or personal items across town? Book a trusted rider in seconds.",
    stamp: "Instant",
    icon: <FaUserCheck />,
    features: [
      "Real-time GPS tracking",
      "Affordable flat rates",
      "No hidden pickup fees",
    ],
  },
  {
    code: "PKG-03",
    title: "Urgent Pickups",
    subtitle: "On-demand dispatch",
    description:
      "Got an immediate emergency pickup or drop-off? Get matched with the closest verified rider right away.",
    stamp: "12-min Avg",
    icon: <FaMotorcycle />,
    features: [
      "Average 12-min pickup",
      "Vetted & insured riders",
      "Available 24/7 round the clock",
    ],
  },
];



const PackageDeliverySection: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-32 font-['Lufga']"
      style={{ backgroundColor: '#FFF5F5', color: INK }}
    >
      {/* Faint manifest grid, like ruled paper on a clipboard */}
      {/* <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(${RULE} 0 1px, transparent 1px 42px)`,
        }}
      /> */}

      <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* SECTION HEADER — styled as a manifest header strip */}
        <div className="max-w-4xl mb-16 md:mb-20">
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            <span
              className="text-xs font-bold tracking-wide"
              style={{ color: INK_MUTED }}
            >
              Delivery manifest — Port Harcourt rates
            </span>
          </motion.div> */}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1.1] tracking-tight"
          >
            Send a packages for
            <br />
            <span style={{ color: ACCENT }}>as little as ₦3,000.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg font-medium leading-relaxed max-w-xl"
            style={{ color: INK_MUTED }}
          >
            Whether you run a booming e-commerce store or just need to drop off
            a package across town, Pickars connects you with a trusted rider in
            minutes.
          </motion.p>
        </div>

        {/* CONSIGNMENT CARDS — styled as torn-off shipping tags on a manifest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
          {audienceData.map((item, idx) => (
            <motion.div
              key={item.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col justify-between p-7 pt-9 border rounded-lg"
              style={{
                backgroundColor: PAPER_BG_RAISED,
                borderColor: RULE,
                borderStyle: "dashed",
              }}
            >
              {/* punch holes, top-left and top-right, like a tag on string */}
              <span
                className="absolute -top-2 left-6 w-4 h-4 rounded-full border"
                style={{ backgroundColor: PAPER_BG, borderColor: RULE }}
              />
              <span
                className="absolute -top-2 right-6 w-4 h-4 rounded-full border"
                style={{ backgroundColor: PAPER_BG, borderColor: RULE }}
              />

              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 flex items-center justify-center text-lg rounded-md"
                      style={{ backgroundColor: INK, color: PAPER_BG }}
                    >
                      {item.icon}
                    </div>
                    <span
                      className="text-[11px] font-bold tracking-wide"
                      style={{ color: INK_MUTED }}
                    >
                      {item.code}
                    </span>
                  </div>

                  {/* ink-stamp badge instead of a rounded pill */}
                  <span
                    className="text-[10px] font-black uppercase px-2.5 py-1 -rotate-6 border-2 rounded-md"
                    style={{ color: ACCENT, borderColor: ACCENT }}
                  >
                    {item.stamp}
                  </span>
                </div>

                <h3 className="text-xl font-black tracking-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-bold mb-4" style={{ color: ACCENT }}>
                  {item.subtitle}
                </p>

                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: INK_MUTED }}
                >
                  {item.description}
                </p>

                <ul
                  className="space-y-2.5 mb-8 pt-5 border-t"
                  style={{ borderColor: RULE }}
                >
                  {item.features.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-center gap-2.5 text-xs font-semibold"
                    >
                      <span
                        className="w-1 h-1"
                        style={{ backgroundColor: ACCENT }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* <a
                href={ANDROID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full py-3.5 px-4 text-sm font-black tracking-wide transition-colors rounded-[120px]"
                style={{
                  backgroundColor: INK,
                  color: PAPER_BG,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = ACCENT)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = INK)
                }
              >
                <span>Get started</span>
                <FaArrowRight className="text-xs" />
              </a> */}
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CALLOUT — an approved-for-dispatch waybill strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 border-2 rounded-lg"
          style={{ backgroundColor: INK, borderColor: INK, color: PAPER_BG }}
        >
          {/* rotated stamp seal */}
          <div
            className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 items-center justify-center rotate-[-14deg] text-center"
            style={{ borderColor: ACCENT, color: ACCENT }}
          >
            <span className="text-[10px] font-black uppercase leading-tight">
              Ready for
              <br />
              Dispatch
            </span>
          </div>

          <div className="text-center md:text-left z-10">
            <span
              className="font-bold uppercase tracking-wide text-xs mb-2 block"
              style={{ color: ACCENT }}
            >
              First delivery, three taps away
            </span>
            <h3 className="text-2xl md:text-4xl font-black tracking-tight max-w-md">
              Download Pickars and book a rider now.
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3 z-10 w-full md:w-auto">
            <a
              href={IOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 font-black text-sm tracking-wide transition-colors rounded-md"
              style={{ backgroundColor: PAPER_BG, color: INK }}
            >
              Download for iOS
            </a>
            <a
              href={ANDROID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 font-black text-sm tracking-wide transition-colors rounded-md"
              style={{ backgroundColor: ACCENT, color: PAPER_BG }}
            >
              Get the Android app
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PackageDeliverySection;
