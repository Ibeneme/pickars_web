import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiSearch, FiPhoneCall, FiMail } from "react-icons/fi";
import { FaShieldAlt, FaMapMarkedAlt, FaUserCheck } from "react-icons/fa";

// --- NEW SECTION: SAFETY & TRUST ---
const SafetySection: React.FC = () => {
  const safetyFeatures = [
    {
      icon: <FaShieldAlt />,
      title: "Secure Goods",
      desc: "Every package is handled with military-grade care and tracked until it reaches the hands of your recipient.",
    },
    {
      icon: <FaUserCheck />,
      title: "Verified Riders",
      desc: "Our riders undergo rigorous background checks and training to ensure professionalism and security.",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Geofenced Pathing",
      desc: "Smart routing ensures riders stay on path, giving you accurate ETAs and complete peace of mind.",
    },
  ];

  return (
    <section className="bg-white py-24 md:py-32 font-['Lufga']">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {safetyFeatures.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[3rem] bg-[#fafafa] border border-gray-100 transition-all group"
            >
              <div className="h-16 w-16 rounded-2xl bg-white  flex items-center justify-center text-2xl text-red-600 mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-[#121212] mb-4 uppercase tracking-tighter">
                {item.title}
              </h3>
              <p className="text-gray-500 font-bold leading-relaxed lowercase">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- NEW SECTION: CONTACT CTA ---
const ContactCTA: React.FC = () => {
  return (
    <section className="bg-white py-20 font-['Lufga']">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[4rem] bg-[#121212] p-12 md:p-24 overflow-hidden relative">
          {/* Decorative background text */}
          <div className="absolute top-0 right-0 text-[15rem] font-black text-white/[0.02] leading-none pointer-events-none translate-x-1/4 select-none">
            HELP
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
                Still <span className="text-red-600">Stuck?</span>
              </h2>
              <p className="text-gray-400 text-xl font-bold max-w-md mx-auto lg:mx-0">
                Our support experts are ready to assist you 24/7.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href="mailto:support@pickars.com"
                className="flex items-center gap-4 bg-white text-[#121212] px-10 py-6 rounded-3xl font-black text-lg hover:scale-105 transition-transform "
              >
                <FiMail size={24} /> Email Us
              </a>
              <a
                href="tel:+2340000000"
                className="flex items-center gap-4 bg-red-600 text-white px-10 py-6 rounded-3xl font-black text-lg hover:scale-105 transition-transform "
              >
                <FiPhoneCall size={24} /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- EXISTING FAQ PAGE ---
const faqs = [
  {
    question: "What is Pickars Courier Limited?",
    answer:
      "Pickars Courier Limited is a technology platform that connects individuals and businesses with independent dispatch riders for efficient and reliable delivery services. We make it easy to book and manage your deliveries through our mobile app and website.",
  },
  {
    question: "How do I book a dispatch rider?",
    answer:
      "You can easily book a dispatch rider through our mobile application or website. Simply enter your pickup and delivery locations, details of the item, and preferred time—we'll do the rest.",
  },
  {
    question: "What types of items can I send?",
    answer:
      "You can send documents, packages, food, groceries, and more. We do not permit illegal, hazardous, or prohibited items like weapons or stolen goods. See our Terms and Conditions for the full list.",
  },
  {
    question: "How are delivery fees calculated?",
    answer:
      "Fees are based on distance, item size/weight, and current demand. The exact fee is displayed transparently before you confirm—no hidden charges.",
  },
];

const FAQPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="bg-[#FAFAFA] py-24 px-6 font-['Lufga'] pt-[160px]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:h-fit">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs font-black uppercase tracking-[0.4em] text-red-600 mb-6 block"
              >
                Support Center
              </motion.span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#121212] leading-[0.9] mb-8">
                Got <br /> <span className="text-gray-300">Questions?</span>
              </h1>
              <div className="relative mb-10 group">
                <FiSearch
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
                  size={22}
                />
                <input
                  type="text"
                  placeholder="Search topics..."
                  className="w-full bg-white border border-gray-200 rounded-3xl py-6 pl-16 pr-8 outline-none focus:border-red-600/20 transition-all text-lg"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-7 space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    layout
                    className={`group rounded-[40px] border transition-all ${
                      activeIndex === index
                        ? "border-red-600/10 bg-white "
                        : "border-gray-200 bg-white/50"
                    }`}
                  >
                    <button
                      onClick={() =>
                        setActiveIndex(activeIndex === index ? null : index)
                      }
                      className="w-full flex items-center justify-between p-8 md:p-10 text-left"
                    >
                      <h3
                        className={`text-xl md:text-2xl font-black tracking-tight ${
                          activeIndex === index
                            ? "text-red-600"
                            : "text-[#121212]"
                        }`}
                      >
                        {faq.question}
                      </h3>
                      <div
                        className={`h-12 w-12 flex items-center justify-center rounded-2xl transition-all ${
                          activeIndex === index
                            ? "bg-red-600 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {activeIndex === index ? (
                          <FiMinus size={22} />
                        ) : (
                          <FiPlus size={22} />
                        )}
                      </div>
                    </button>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="px-8 md:px-10 pb-10 text-gray-500 font-bold leading-relaxed lowercase"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <SafetySection />
      <ContactCTA />
    </>
  );
};

export default FAQPage;
