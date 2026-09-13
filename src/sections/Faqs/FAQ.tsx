import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FiSearch, FiPlus, FiMinus } from "react-icons/fi";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "01",
    question: "What is Pickars Courier Limited?",
    answer:
      "Pickars Courier Limited is a technology platform that connects individuals and businesses with independent dispatch riders for efficient and reliable delivery services. We make it easy to book and manage your deliveries through our mobile app and website.",
  },
  {
    id: "02",
    question: "How do I book a dispatch rider?",
    answer:
      "Simply download the Pickars mobile app or visit our website, enter your pickup and drop-off locations, select your delivery option, and confirm your booking. A nearby dispatch rider will be assigned instantly.",
  },
  {
    id: "03",
    question: "What types of items can I send?",
    answer:
      "You can send documents, parcels, food, clothing, electronics, and general merchandise, provided they fit securely on a dispatch motorcycle and do not contain prohibited or illegal items.",
  },
  {
    id: "04",
    question: "How are delivery fees calculated?",
    answer:
      "Delivery fees are calculated based on the total distance between the pickup and drop-off points, current traffic conditions, and package size. You will always see the exact price upfront before confirming.",
  },
];

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState<string | null>("01");

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18,
      },
    },
  };

  return (
    <section className="relative min-h-[85vh] w-full bg-white px-4 pb-20 pt-28 font-['Lufga'] text-gray-900 sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
        >
          {/* Left Column: Title & Search */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 flex flex-col items-start">
              {/* Ticket-style Badge */}
              <motion.div
                variants={itemVariants}
                className="mb-6 inline-block cursor-default select-none bg-[#FF0000] px-5 py-2 text-[11px] font-black uppercase tracking-widest text-white sm:text-xs"
                style={{
                  maskImage:
                    "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
                  WebkitMaskImage:
                    "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
                }}
              >
                SUPPORT CENTER
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl font-black leading-[0.95] tracking-tight text-gray-900 sm:text-7xl"
              >
                Got <br />
                <span className="text-[#FF0000]">Questions?</span>
              </motion.h1>

              {/* Search Bar (Border Removed, Modern Gray Fill) */}
              <motion.div
                variants={itemVariants}
                className="mt-8 w-full max-w-md"
              >
                <div className="relative flex items-center rounded-2xl bg-gray-100/80 transition-colors focus-within:bg-gray-100">
                  <FiSearch className="absolute left-4 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search topics..."
                    className="w-full bg-transparent py-4 pl-12 pr-4 text-base font-medium text-gray-900 outline-none placeholder:text-gray-400"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Accordion List (Border-free Soft Cards) */}
          <div className="lg:col-span-7">
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3.5"
            >
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isOpen = openId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`overflow-hidden rounded-2xl transition-all duration-300 ${
                        isOpen
                          ? "bg-gray-50/90"
                          : "bg-gray-50/50"
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(faq.id)}
                        className="flex w-full items-center justify-between p-5 text-left sm:p-6"
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4 text-base font-bold tracking-tight text-gray-900 sm:text-lg">
                          {faq.question}
                        </span>
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                            isOpen
                              ? "bg-[#FF0000] text-white"
                              : "bg-gray-200/60 text-gray-600"
                          }`}
                        >
                          {isOpen ? (
                            <FiMinus className="h-4 w-4" />
                          ) : (
                            <FiPlus className="h-4 w-4" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="px-5 pb-5 pt-1 text-sm font-normal leading-relaxed text-gray-600 sm:px-6 sm:pb-6 sm:text-base">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
                  No matching topics found for "{searchTerm}".
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQPage;
