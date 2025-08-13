import React, { useRef, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./DeliverySteps.css"; // Assuming this CSS file is styled correctly
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

interface Value {
  title: string;
  description: string;
}

const companyValues: Value[] = [
  {
    title: "Customer-Centric Simplicity",
    description:
      "Our platform is designed with you in mind. We believe that technology should make life easier, not more complicated. That's why we've built a seamless, intuitive experience that gets your delivery scheduled in just a few taps. We focus on simplicity so you can focus on what matters.",
  },
  {
    title: "Unwavering Reliability",
    description:
      "We understand that every package is important. Our commitment is to provide a service you can always count on. From our verified riders to our end-to-end tracking and insurance options, we handle every item with the utmost care, ensuring it arrives safely and on time, every time.",
  },
  {
    title: "Driven by Efficiency",
    description:
      "We value your time. Our mission is to eliminate delays and provide the fastest, most efficient delivery possible. By using smart routing and connecting you with the closest available rider, we ensure your items are dispatched quickly and reach their destination without unnecessary waiting.",
  },
  {
    title: "Transparency and Trust",
    description:
      "Trust is at the core of what we do. Our real-time tracking system provides complete transparency, allowing you to see exactly where your delivery is at all times. We believe in open communication and honest service, so you're always informed and never left in the dark.",
  },
  {
    title: "Empowering Community",
    description:
      "We're more than just a delivery service; we're a network connecting people. Our platform empowers both our customers and our riders, creating a thriving ecosystem. We provide dedicated support and tools to ensure every member of our community feels valued and supported.",
  },
];

const CoreValuesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [allOpen, setAllOpen] = useState(true); // state for all items open/closed

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
    <section className="delivery-steps" style={{}}>
      <h2 className="delivery-title">Our Core Values</h2>

      <div className="cards-container" ref={containerRef}>
        {companyValues.map((value, index) => (
          <div className="step-card" key={index}>
            <div className="step-content">
              <div className="step-header">
                <h3>{value.title}</h3>
                <button
                  className="toggle-btn"
                  onClick={() => setAllOpen(!allOpen)}
                >
                  {allOpen ? <FaMinus /> : <FaPlus />}
                </button>
              </div>
              {allOpen && <p>{value.description}</p>}
            </div>
          </div>
        ))}
      </div>

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

export default CoreValuesSection;
