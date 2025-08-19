import React from "react";
import "./TeamSection.css";
import ikenna from "../../assets/images/team/ikenna.png";
import boma from "../../assets/images/team/boma.png";
import hr from "../../assets/images/team/hr.png";
// Define the data model for a team member
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string; // e.g. "/assets/team/alex.jpg" or import path
  linkedin?: string;
  twitter?: string;
};

const PICKARS_TEAM: TeamMember[] = [
  {
    id: "ikenna",
    name: "Ikenna Ibeneme",
    role: "CEO, Founder & CTO",
    bio: "Visionary founder leading Pickars’ mission with innovation, strategy, and technology expertise.",
    photo: ikenna,
    linkedin: "https://www.linkedin.com/in/ibeneme/",
    twitter: "https://x.com/Ibeneme_Ikenna",
  },
  {
    id: "boma",
    name: "Boma Goodhead",
    role: "UI Designer & Brand Strategist",
    bio: "Designs delightful user experiences while shaping Pickars’ brand identity across digital platforms.",
    photo: boma,
    linkedin: "https://www.linkedin.com/in/goodhead/",
  },
  {
    id: "melody",
    name: "Melody Dike",
    role: "Human Resources Manager",
    bio: "People-first HR leader fostering culture, growth, and collaboration within the Pickars team.",
    photo: hr,
  },
  //   {
  //     id: "david",
  //     name: "David Johnson",
  //     role: "Head of Operations",
  //     bio: "Oversees logistics, courier operations, and performance optimization to ensure reliable service delivery.",
  //     photo: "/assets/team/david.jpg",
  //     linkedin: "https://www.linkedin.com/",
  //   },
];

const TeamSection: React.FC = () => {
  return (
    <section className="team" aria-labelledby="team-heading">
      <div className="team-header">
        <p className="team-eyebrow">The Pickars Team</p>
        <h2 id="team-heading" className="team-title">
          Meet the <span style={{ color: "#ff0000" }}>Creatives</span> behind
          Pickars
        </h2>
        <p className="team-sub">
          A small, focused crew building Nigeria’s most reliable courier and
          last‑mile experience.
        </p>
      </div>
      <br />
      <ul className="team-grid" role="list">
        {PICKARS_TEAM.map((m) => (
          <li key={m.id} className="team-card">
            <figure className="team-media">
              <img src={m.photo} alt={`${m.name} — ${m.role}`} loading="lazy" />
            </figure>
            <div className="team-body">
              <h3 className="team-name">{m.name}</h3>
              <p className="team-role">{m.role}</p>
              <p className="team-bio">{m.bio}</p>
              <div className="team-links">
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${m.name} on LinkedIn`}
                  >
                    LinkedIn
                  </a>
                )}
                {m.twitter && (
                  <a
                    href={m.twitter}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${m.name} on X/Twitter`}
                  >
                    X
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TeamSection;
