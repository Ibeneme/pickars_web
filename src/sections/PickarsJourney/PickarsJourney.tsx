import React from "react";
import "./PickarsJourney.css";
import Founding from "../../assets/images/story/dev.jpg";
import Growth from "../../assets/images/story/timer.jpg";
import Excellence from "../../assets/images/story/rider.jpg";
import Future from "../../assets/images/story/earth.jpg";
// Define the structure for a journey stage item
interface JourneyStage {
  id: string;
  phase: string;
  title: string;
  description: string;
  image: string; // Added image property
}

// Data for Pickars' journey stages
const pickarsJourney: JourneyStage[] = [
  {
    id: "stage1",
    phase: "Founding",
    title: "Built from Scratch",
    description:
      "Pickars began as a personal mission of our founder, who coded the initial platform himself. With a laptop, a vision, and determination, he created a system to instantly connect individuals and businesses with reliable dispatch riders. This hands-on approach laid the foundation for a fast, seamless, and trustworthy delivery experience.",
    image: Founding, // Placeholder image
  },
  {
    id: "stage2",
    phase: "Growth",
    title: "Scaling Our Impact",
    description:
      "With the core platform live, we focused on expanding our network of verified riders and increasing our service areas. Strategic partnerships and continuous improvements in the user experience helped Pickars grow rapidly, gaining more satisfied customers and a strong presence in urban communities.",
    image: Growth, // Placeholder image
  },
  {
    id: "stage3",
    phase: "Excellence",
    title: "Refining the Experience",
    description:
      "Operational excellence became our priority. We enhanced rider training, optimized real-time tracking, and refined the platform for smooth usability. This stage reinforced Pickars as a reliable, convenient, and high-quality delivery service.",
    image: Excellence, // Placeholder image
  },
  {
    id: "stage4",
    phase: "Innovation & Future",
    title: "Pioneering Tomorrow",
    description:
      "Looking forward, Pickars continues to innovate. Plans include expanding into new communities, introducing AI-driven route optimization, and exploring new delivery verticals. Our vision is to remain a leader in last-mile delivery, constantly improving for our customers and riders alike.",
    image: Future, // Placeholder image
  },
];


const PickarsJourney: React.FC = () => {
  return (
    <div className="pickars-journey-container">
      <div className="pickars-journey-inner">
        <h1 className="pickars-journey-title">Pickars Story</h1>
        <p className="pickars-journey-subtitle">
          From concept to market leader, our commitment to efficient and
          reliable delivery drives every step.
        </p>

        {/* New wrapper for horizontal scrolling */}
        <div className="scrollable-grid-wrapper">
          <div className="journey-grid">
            {pickarsJourney.map((stage) => (
              <div key={stage.id} className="journey-card">
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="journey-card-image"
                />{" "}
                {/* Image added */}
                <span className="journey-phase-tag">{stage.phase}</span>
                <h2 className="journey-card-title">{stage.title}</h2>
                <p className="journey-description">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickarsJourney;
