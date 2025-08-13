import React from "react";
import "./SlidingPage.css";

const SlidingPage: React.FC = () => {
  const values = [
    "FAST & RELIABLE DELIVERIES",
    "TRUSTED DISPATCH RIDERS",
    "AFFORDABLE RATES",
    "SAFE & SECURE PACKAGES",
    "REAL-TIME TRACKING",
    "24/7 CUSTOMER SUPPORT",
    "ECO-FRIENDLY TRANSPORTATION",
    "ON-DEMAND SERVICE",
    "CITYWIDE COVERAGE",
    "SEAMLESS APP EXPERIENCE",
  ];

  // Join with extra spaces (CSS will ensure consistent spacing)
//  const slidingText = values.join(" ");

  return (
    <div className="sliding-page">
      <div className="sliding-track">
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <span key={i} className="sliding-text">
              {values.map((sentence, idx) => (
                <span key={idx} className="sliding-sentence">
                  {sentence}
                </span>
              ))}
            </span>
          ))}
      </div>
    </div>
  );
};

export default SlidingPage;