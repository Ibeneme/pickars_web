import React, { useState } from "react";
import { FiChevronsUp, FiChevronsDown } from "react-icons/fi"; // Importing Chevron icons from react-icons/fi
import "./FAQ.css";
import { NavIcon } from "../../components/NavIcon/NavIcon";
// AOS imports removed as per request
// import AOS from "aos";
// import "aos/dist/aos.css";
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
      "You can easily book a dispatch rider through our Pickars Courier Limited mobile application or website. Simply enter your pickup and delivery locations, details of the item, and preferred time, and we'll connect you with an available rider.",
  },
  {
    question: "What types of items can I send?",
    answer:
      "You can send a wide range of items, including documents, packages, food, groceries, and more. However, please note that we do not permit the delivery of illegal, hazardous, or prohibited items such as weapons, illegal substances, or stolen goods. Please refer to our Terms and Conditions for a full list of prohibited items.",
  },
  {
    question: "How are delivery fees calculated?",
    answer:
      "Delivery fees are calculated based on factors such as distance, item size/weight, urgency, and current demand. The exact fee will be displayed to you before you confirm your booking. There are no hidden charges.",
  },
  {
    question: "Can I track my delivery in real-time?",
    answer:
      "Yes! Our Platform provides real-time tracking for all active deliveries. Once a rider is assigned, you can view their location on the map and receive updates on the status of your delivery until it reaches its destination.",
  },
  {
    question: "What if my item is damaged or lost during delivery?",
    answer:
      "While we connect you with reliable riders, Pickars Courier Limited acts as a platform facilitator and is not liable for items during transit. We encourage users to refer to our Terms and Conditions regarding liability for damaged or lost items. We strive to connect you with professional riders, and any concerns can be reported to our support team.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Our dedicated customer support team is available to assist you. You can reach us via email at support@pickars.com, through the in-app chat feature, or by calling our customer service hotline. We aim to respond promptly to all inquiries.",
  },
  {
    question: "Do you offer services for businesses?",
    answer:
      "Yes, Pickars Courier Limited offers tailored solutions for businesses of all sizes, from small enterprises to large corporations. Our business services include bulk deliveries, scheduled pickups, and customizable logistics support. Please contact us at support@pickars.com for more details on our business solutions.",
  },
  {
    question: "How do you ensure the safety of my personal information?",
    answer:
      "We prioritize the security of your personal data. We implement robust security measures, including encryption and strict access controls, to protect your information from unauthorized access, use, or disclosure. Please refer to our Privacy Policy for detailed information on how we handle your data.",
  },
  {
    question: "What are your operating hours?",
    answer:
      "Our platform is available 24/7 for booking delivery requests. Rider availability may vary depending on location and time of day. Our customer support operates during specific hours, which are detailed on our 'Contact Us' page.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Pickars Courier Limited currently operates in major cities across [Specify Region/Country, e.g., Nigeria], with plans for continuous expansion. You can check our app or website for an updated list of serviced areas.",
  },
  {
    question: "Can I schedule a delivery for a future date/time?",
    answer:
      "Absolutely! Our platform allows you to schedule deliveries for a specific future date and time that is convenient for you. This feature is perfect for planning ahead.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various secure payment methods, including major credit/debit cards and mobile money options. All transactions are processed through secure third-party payment gateways to ensure your financial data is protected.",
  },
  {
    question: "Is there a weight or size limit for packages?",
    answer:
      "Yes, there are weight and size limitations for packages to ensure safe and efficient transport by our riders. Specific limits depend on the vehicle type (e.g., motorcycle, car) and will be clearly communicated during the booking process. For unusually large or heavy items, please contact customer support for special arrangements.",
  },
  {
    question: "Can I cancel a delivery after booking?",
    answer:
      "You can cancel a delivery request through the app. However, a cancellation fee may apply if a rider has already accepted the request and is en route. Please refer to our Terms and Conditions for detailed information on our cancellation policy.",
  },
  {
    question: "How do I become a rider with Pickars Courier Limited?",
    answer:
      "We are always looking for reliable and professional dispatch riders to join our network. You can find more information about rider requirements and the application process on our 'Become a Rider' section of the website or by contacting our support team directly.",
  },
];

const FAQPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div style={{ maxWidth: 500 }}>
        <h1 className="faq-header">Frequently Asked Questions</h1>
        <p className="faq-subtext">
          Get answers to some of the most common questions about our services.
          If you have further inquiries, feel free to reach out to us!
        </p>
      </div>

      <div className="navbar-icons">
        <NavIcon icon={FaApple} fontSize={40} padding={18} />
        <NavIcon icon={BiLogoPlayStore} fontSize={40} padding={18} />
      </div>
      <br />
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${activeIndex === index ? "active" : ""}`}
          // data-aos="fade-up" // AOS data attributes removed
          // data-aos-delay={index * 100} // AOS data attributes removed
        >
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            <h3 className="faq-title">{faq.question}</h3>
            <span
              style={{
                marginLeft: 12,
                backgroundColor: activeIndex === index ? "#ff0000" : "#000", // red if active, black if not

                borderRadius: "50%",
                padding: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {activeIndex === index ? (
                <FiChevronsUp size={20} color="#fff" /> // white icon when active
              ) : (
                <FiChevronsDown size={20} color="#fff" /> // white icon when inactive
              )}
            </span>
          </div>
          {activeIndex === index && (
            <p className="faq-answer">
              {faq?.answer?.split(" ").map((word, i) =>
                word.includes("support@pickars.com") ? (
                  <span key={i} className="highlighted-email">
                    {word}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQPage;
