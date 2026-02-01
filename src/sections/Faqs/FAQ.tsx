import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiSearch, FiMessageCircle } from "react-icons/fi";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

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
  {
    question: "Can I track my delivery in real-time?",
    answer:
      "Yes! Once a rider is assigned, you can view their live location on the map and receive status updates until the package reaches its destination.",
  },
  {
    question: "What if my item is damaged or lost?",
    answer:
      "While we facilitate connections with reliable riders, Pickars is a platform provider. We encourage users to review our Terms regarding liability and report any concerns to our support team.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Reach us via email at support@pickars.com, through our in-app chat, or by calling our hotline. We aim for prompt responses to every inquiry.",
  },
  {
    question: "Do you offer services for businesses?",
    answer:
      "Yes! From bulk deliveries to scheduled pickups, we offer tailored logistics for businesses of all sizes. Contact support@pickars.com for custom solutions.",
  },
];

const FAQPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-[#FAFAFA] py-24 px-6 font-['Lufga'] pt-[160px]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT COLUMN: Sticky Info & Search */}
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

            <p className="text-gray-500 text-lg mb-10 max-w-md">
              Find everything you need to know about Pickars. Can't find an
              answer? Our team is just a chat away.
            </p>

            {/* Modern Search Input */}
            <div className="relative mb-10 group">
              <FiSearch
                className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors"
                size={22}
              />
              <input
                type="text"
                placeholder="Search topics..."
                className="w-full bg-white border border-gray-200 rounded-3xl py-6 pl-16 pr-8 outline-none focus:border-red-600/20 focus:ring-8 focus:ring-red-600/5 transition-all text-lg shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 rounded-2xl bg-[#0c0c0c] px-6 py-4 text-white hover:bg-red-600 transition-all shadow-lg hover:-translate-y-1">
                <FaApple size={20} />{" "}
                <span className="text-sm font-bold tracking-tight">
                  App Store
                </span>
              </button>
              <button className="flex items-center gap-3 rounded-2xl bg-[#0c0c0c] px-6 py-4 text-white hover:bg-red-600 transition-all shadow-lg hover:-translate-y-1">
                <BiLogoPlayStore size={20} />{" "}
                <span className="text-sm font-bold tracking-tight">
                  Play Store
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: The FAQ Accordions */}
          <div className="lg:col-span-7 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <motion.div
                    layout
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`group rounded-[40px] border transition-all duration-500 overflow-hidden ${
                      activeIndex === index
                        ? "border-red-600/10 bg-white shadow-2xl shadow-red-600/5"
                        : "border-gray-200/50 bg-white/50 backdrop-blur-sm hover:border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() =>
                        setActiveIndex(activeIndex === index ? null : index)
                      }
                      className="w-full flex items-center justify-between p-8 md:p-10 text-left outline-none"
                    >
                      <h3
                        className={`text-xl md:text-2xl font-black tracking-tight transition-colors duration-300 ${
                          activeIndex === index
                            ? "text-red-600"
                            : "text-[#121212]"
                        }`}
                      >
                        {faq.question}
                      </h3>
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${
                          activeIndex === index
                            ? "bg-red-600 text-white rotate-180"
                            : "bg-gray-100 text-gray-400 group-hover:bg-[#121212] group-hover:text-white"
                        }`}
                      >
                        {activeIndex === index ? (
                          <FiMinus size={22} />
                        ) : (
                          <FiPlus size={22} />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.04, 0.62, 0.23, 0.98],
                          }}
                        >
                          <div className="px-8 md:px-10 pb-10 text-gray-500 leading-relaxed text-lg border-t border-gray-50 pt-8">
                            {faq.answer.split(" ").map((word, i) =>
                              word.includes("@") ? (
                                <span
                                  key={i}
                                  className="text-red-600 font-bold underline decoration-2 underline-offset-4 cursor-pointer hover:text-[#121212] transition-colors"
                                >
                                  {word}{" "}
                                </span>
                              ) : (
                                <span key={i}>{word} </span>
                              )
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center rounded-[40px] border-2 border-dashed border-gray-200"
                >
                  <FiMessageCircle
                    size={48}
                    className="mx-auto text-gray-300 mb-4"
                  />
                  <p className="text-gray-400 text-xl font-medium">
                    No results found for "{searchTerm}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Background Elements */}
        <div className="fixed top-0 right-0 -z-10 h-screen w-screen overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-red-100/50 blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-gray-200/50 blur-[100px]" />
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
