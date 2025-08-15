import React, { useRef, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./DeliverySteps.css";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

interface Service {
  title: string;
  description: string;
}

const services: Service[] = [
  {
    title: "Easy to Use",
    description:
      "Our platform is designed with simplicity in mind. Whether you’re a first-time user or a seasoned customer, you can easily navigate through the process of scheduling a delivery in just a few taps. No complicated forms, no confusing steps—just a seamless, intuitive experience from start to finish.",
  },
  {
    title: "Multiple Delivery Locations",
    description:
      "Save time and money by sending packages to multiple addresses in one go. Our multi-stop feature allows you to add several delivery points, arrange them in any order, and even include special instructions for each stop. Perfect for businesses, event organizers, or personal errands.",
  },
  {
    title: "Secure and Reliable",
    description:
      "We take your deliveries seriously. Every package is handled with care by our verified and trained riders. With end-to-end tracking, insurance options, and instant updates, you can rest assured that your items are in safe hands and will arrive exactly as promised.",
  },
  {
    title: "Real-Time Tracking",
    description:
      "Stay informed every step of the way. Our live tracking system allows you to see exactly where your rider is and the estimated time of arrival. No more guessing or waiting around—just transparent, accurate updates from pickup to drop-off.",
  },
  {
    title: "Fast & Efficient Service",
    description:
      "We value your time. That’s why we ensure your deliveries are dispatched quickly and arrive in the shortest time possible. By using smart routing and the closest available riders, we cut down delays while keeping costs reasonable.",
  },
  {
    title: "Dedicated Support",
    description:
      "Our friendly support team is always ready to assist you. Whether you have a question, need help with an order, or want to provide feedback, you can reach us via chat, email, or phone at any time of the day.",
  },
];

const ServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [allOpen, setAllOpen] = useState(true); // new state for all items open/closed

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 320; // card width + gap
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="delivery-steps">
      <h2 className="delivery-title">
        Where Every Delivery Becomes an Experience
      </h2>

      {/* Services */}
      <div className="cards-container" ref={containerRef}>
        {services.map((service, index) => (
          <div className="step-card" key={index}>
            <div className="step-content">
              <div className="step-header">
                <h3>{service.title}</h3>
                <button
                  className="toggle-btn"
                  onClick={() => setAllOpen(!allOpen)}
                >
                  {allOpen ? <FaMinus /> : <FaPlus />}
                </button>
              </div>
              {allOpen && <p>{service.description}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll arrows */}
      <div className="scroll-buttons">
        <button onClick={() => scroll("left")} className="scroll-btn">
          <FiChevronsLeft />
        </button>
        <button onClick={() => scroll("right")} className="scroll-btn">
          <FiChevronsRight />
        </button>
      </div>
    </section>
  );
};

export default ServicesSection;
