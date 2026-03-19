import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  FiSearch,
  FiPlus,
  FiMinus,
  FiHelpCircle,
  FiTruck,
  FiCreditCard,
  FiArrowRight,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// Themed Palette
const Palette = {
  orange: "#FF6600",
  white: "#FFFFFF",
  deepDark: "#140700",
  lightGray: "#F8F8F8",
  border: "rgba(20, 7, 0, 0.08)",
};

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  faqs: FAQItem[];
}

const categories: Category[] = [
  {
    id: "support",
    name: "General",
    icon: <FiHelpCircle />,
    description: "Contact, hours & general info",
    faqs: [
      {
        id: "g1",
        question: "How do I contact support?",
        answer:
          "Our team is available 24/7. Reach us via WhatsApp for instant replies.",
      },
      {
        id: "g2",
        question: "What are your hours?",
        answer: "Dispatch is active 24/7, 365 days a year.",
      },
    ],
  },
  {
    id: "payments",
    name: "Payments",
    icon: <FiCreditCard />,
    description: "Wallet & refund questions",
    faqs: [
      {
        id: "p1",
        question: "How do refunds work?",
        answer:
          "Refunds are processed within 24–72 hours to your original method.",
      },
    ],
  },
  {
    id: "riders",
    name: "Riders",
    icon: <FiTruck />,
    description: "Onboarding & safety",
    faqs: [
      {
        id: "r1",
        question: "Become a rider?",
        answer: "Download the Pickars Rider app to start your onboarding.",
      },
    ],
  },
];

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  // TypeScript Variants
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVars: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="visible"
        style={styles.inner}
      >
        {/* Header Section */}
        <motion.header variants={itemVars} style={styles.header}>
          <div style={styles.badge}>PICKARS CONCIERGE</div>
          <h1 style={styles.mainTitle}>
            How can we <br />
            <span style={{ color: "#CCC" }}>assist you?</span>
          </h1>

          <div style={styles.searchContainer}>
            <FiSearch style={styles.searchIcon} />
            <input
              style={styles.searchInput}
              placeholder="Search help topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.header>

        {/* Categories Grid */}
        <motion.div variants={itemVars} style={styles.grid}>
          {categories.map((cat) => (
            <div key={cat.id} style={styles.catCard}>
              <div style={styles.catIcon}>{cat.icon}</div>
              <h3 style={styles.catTitle}>{cat.name}</h3>
              <p style={styles.catDesc}>{cat.description}</p>

              <div style={styles.faqList}>
                {cat.faqs.map((faq) => (
                  <div key={faq.id} style={styles.faqItem}>
                    <button
                      onClick={() =>
                        setOpenFAQ(openFAQ === faq.id ? null : faq.id)
                      }
                      style={styles.faqTrigger}
                    >
                      <span
                        style={{ fontWeight: 700, flex: 1, textAlign: "left" }}
                      >
                        {faq.question}
                      </span>
                      {openFAQ === faq.id ? (
                        <FiMinus color={Palette.orange} />
                      ) : (
                        <FiPlus />
                      )}
                    </button>
                    <AnimatePresence>
                      {openFAQ === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={styles.faqAnswer}
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Contact Action Cards */}
        <motion.div variants={itemVars} style={styles.contactSection}>
          <div style={styles.actionCard}>
            <div style={styles.pulseDot} />
            <h4 style={styles.actionTitle}>Call Dispatch</h4>
            <p style={styles.actionDesc}>
              Urgent issue with a live delivery? Speak to a controller.
            </p>
            <a href="tel:+2349164860591" style={styles.phoneLink}>
              +234 916 486 0591
            </a>
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }}
            href="https://wa.me/2349164860591"
            style={styles.whatsappCTA}
          >
            <FaWhatsapp size={24} style={{ marginRight: 12 }} />
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={{ fontSize: "10px", fontWeight: 900 }}>
                LIVE SUPPORT
              </div>
              <div style={{ fontSize: "18px", fontWeight: 800 }}>
                Message Now
              </div>
            </div>
            <FiArrowRight size={20} />
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    backgroundColor: Palette.white,
    minHeight: "100vh",
    padding: "120px 20px 80px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Lufga', sans-serif",
  },
  inner: { width: "100%", maxWidth: "1100px" },
  header: { textAlign: "center" as const, marginBottom: "60px" },
  badge: {
    display: "inline-block",
    padding: "6px 16px",
    borderRadius: "100px",
    backgroundColor: "rgba(255,102,0,0.1)",
    color: Palette.orange,
    fontSize: "10px",
    fontWeight: 900,
    letterSpacing: "2px",
    marginBottom: "20px",
  },
  mainTitle: {
    fontSize: "clamp(2.5rem, 8vw, 5rem)",
    fontWeight: 900,
    color: Palette.deepDark,
    lineHeight: 0.9,
    letterSpacing: "-2px",
  },
  searchContainer: {
    position: "relative" as const,
    maxWidth: "600px",
    margin: "40px auto 0",
  },
  searchIcon: {
    position: "absolute" as const,
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#999",
    fontSize: "20px",
  },
  searchInput: {
    width: "100%",
    padding: "20px 20px 20px 60px",
    borderRadius: "20px",
    border: `1.5px solid ${Palette.border}`,
    backgroundColor: Palette.lightGray,
    fontSize: "16px",
    outline: "none",
    fontFamily: "inherit",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    marginBottom: "60px",
  },
  catCard: {
    padding: "40px",
    borderRadius: "40px",
    backgroundColor: Palette.lightGray,
    border: `1px solid ${Palette.border}`,
  },
  catIcon: { fontSize: "32px", color: Palette.orange, marginBottom: "20px" },
  catTitle: { fontSize: "24px", fontWeight: 900, marginBottom: "10px" },
  catDesc: {
    fontSize: "14px",
    color: "#666",
    fontWeight: 600,
    marginBottom: "30px",
  },
  faqList: { display: "flex", flexDirection: "column" as const, gap: "15px" },
  faqItem: {
    backgroundColor: "#FFF",
    borderRadius: "20px",
    padding: "15px 20px",
    overflow: "hidden",
  },
  faqTrigger: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    padding: 0,
  },
  faqAnswer: {
    paddingTop: "15px",
    fontSize: "14px",
    color: "#777",
    lineHeight: 1.6,
    fontWeight: 500,
  },
  contactSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  actionCard: {
    padding: "40px",
    borderRadius: "40px",
    backgroundColor: "rgba(255,102,0,0.05)",
    border: "1.5px solid rgba(255,102,0,0.1)",
    textAlign: "center" as const,
  },
  pulseDot: {
    width: "8px",
    height: "8px",
    backgroundColor: Palette.orange,
    borderRadius: "50%",
    margin: "0 auto 15px",
    boxShadow: "0 0 10px rgba(255,102,0,0.5)",
  },
  actionTitle: {
    fontSize: "22px",
    fontWeight: 900,
    color: Palette.orange,
    marginBottom: "10px",
  },
  actionDesc: {
    fontSize: "14px",
    color: "#777",
    fontWeight: 600,
    marginBottom: "20px",
  },
  phoneLink: {
    fontSize: "24px",
    fontWeight: 900,
    color: Palette.deepDark,
    textDecoration: "none",
  },
  whatsappCTA: {
    display: "flex",
    alignItems: "center",
    padding: "24px 32px",
    borderRadius: "30px",
    backgroundColor: Palette.deepDark,
    color: "#FFF",
    textDecoration: "none",
  },
};

export default Support;
