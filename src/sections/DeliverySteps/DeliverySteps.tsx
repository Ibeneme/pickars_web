import React, { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import "./DeliverySteps.css";

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    title: "Download the App",
    description:
      "Get the Pickars app from the App Store or Google Play to start sending deliveries."
  },
  {
    title: "Get Started to Send a Delivery",
    description:
      "Sign up or log in to your account to access our dispatch services instantly."
  },
  {
    title: "Choose Pickup and Delivery Locations",
    description:
      "Enter your pickup point and delivery destination in just a few taps."
  },
  {
    title: "Multiple Delivery Locations",
    description:
      "Need to send to more than one place? Add multiple stops in a single order."
  },
  {
    title: "Get a Rider",
    description:
      "Our trusted dispatch riders will be assigned to your request in moments."
  },
  {
    title: "Fast Delivery to Your Doorstep",
    description:
      "Receive your package quickly and safely, with real-time tracking available."
  }
];

const DeliverySteps: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 320; // card width + gap
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="delivery-steps">
      <h2 className="delivery-title">How to Send a Delivery</h2>

      {/* Scroll arrows */}
      <div className="scroll-buttons">
        <button onClick={() => scroll("left")} className="scroll-btn">
          <FaArrowLeft />
        </button>
        <button onClick={() => scroll("right")} className="scroll-btn">
          <FaArrowRight />
        </button>
      </div>

      {/* Steps */}
      <div className="cards-container" ref={containerRef}>
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="step-number">{index + 1}</div>
            <div className="step-content">
              <div className="step-header">
                <h3>{step.title}</h3>
                <button
                  className="toggle-btn"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </button>
              </div>
              {openIndex === index && <p>{step.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeliverySteps;