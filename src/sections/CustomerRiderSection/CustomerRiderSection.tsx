import React, { useState } from "react";
import "./CustomerRiderSection.css";
import heroImage1 from "../../assets/images/cr/customer.png";
import heroImage2 from "../../assets/images/cr/driver.png";
import { NavIcon } from "../../components/NavIcon/NavIcon";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

const CustomerRiderSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"customer" | "rider">("customer");

  const content = {
    customer: {
      header: "Book a dispatch rider",
      description:
        "Book a dispatch rider in just a few taps and track your parcel in real time. We guarantee safe delivery, transparent pricing, and professional riders. From daily errands to urgent parcels, we make deliveries a seamless experience.",
      image: heroImage1,
    },
    rider: {
      header: "Ya!, Become our rider",
      description:
        "Accept delivery requests in just a few taps and get real-time updates on every trip. Earn with transparent pricing, enjoy timely payouts, and ride with confidence. Whether it’s daily errands or urgent parcels, we make every delivery smooth, secure, and rewarding for you.",
      image: heroImage2,
    },
  };

  const activeContent = content[activeTab];

  return (
    <section className="cr-section">
      {/* Toggle Buttons */}
      <div className="cr-toggle">
        <button
          className={activeTab === "customer" ? "active" : ""}
          onClick={() => setActiveTab("customer")}
        >
          Customer
        </button>
        <button
          className={activeTab === "rider" ? "active" : ""}
          onClick={() => setActiveTab("rider")}
        >
          Rider
        </button>
      </div>

      {/* Content */}
      <div className="cr-content">
        <h2>{activeContent.header}</h2>
        <p>{activeContent.description}</p>

        <div className="navbar-icons">
          <NavIcon icon={FaApple} fontSize={24} padding={16} />
          <NavIcon icon={BiLogoPlayStore} fontSize={24} padding={16} />
        </div>

        <img src={activeContent.image} alt={activeContent.header} />
      </div>
    </section>
  );
};

export default CustomerRiderSection;
