import React from "react";
import "./ProblemIdea.css";

const ProblemIdea: React.FC = () => {
  return (
    <div className="problem-idea-container">
      <div className="problem-idea-inner">
        <h1 className="problem-idea-title">
          <span style={{ color: "#ff0000" }}>The Problem.</span> The Idea.
        </h1>
        {/* <p className="problem-idea-subtitle">
          Discover the pivotal moment that sparked the creation of Pickars.
        </p> */}

        <section className="story-section">
          <div className="story-card">
            {/* <h2 className="story-card-title">
               Simple Need, A Complex Challenge
            </h2> */}
            <p className="story-description">
              In February 2024, our founder was visiting Abuja from Port
              Harcourt. He wanted a friend’s homemade soup delivered to him, but
              getting a reliable rider was surprisingly difficult. Calls went
              unanswered, prices were too high, and there was no guarantee the
              food would arrive safely.
            </p>
            <p className="story-description">
              This problem wasn’t just about soup. People often struggle to get
              important items – documents, groceries, or packages – delivered
              quickly and safely. It was clear that finding trustworthy delivery
              services was a real challenge for many Nigerians.
            </p>
            <p className="story-description">
              From this frustration, Pickars was born: a simple platform that
              connects users with verified, reliable riders, making deliveries
              fast, safe, and hassle-free every time.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProblemIdea;
