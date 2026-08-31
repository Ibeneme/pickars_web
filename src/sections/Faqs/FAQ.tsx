import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiSearch, } from "react-icons/fi";



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
    </>
  );
};

export default FAQPage;
