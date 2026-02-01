import React from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import ikenna from "../../assets/images/team/ikenna.png";
import boma from "../../assets/images/team/boma.png";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
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
    bio: "Shaping Pickars’ identity through delightful user experiences and high-impact digital branding.",
    photo: boma,
    linkedin: "https://www.linkedin.com/in/goodhead/",
  },
];

const TeamSection: React.FC = () => {
  return (
    <section className="bg-white py-24 font-['Lufga'] md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header Section */}
        <div className="mb-20 text-center mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-red-600"
          >
            The Minds Behind Pickars
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-6 text-5xl font-black leading-tight tracking-tighter text-[#121212] md:text-7xl"
          >
            Meet the <span className="text-red-600">Creators</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lg text-gray-500"
          >
            A focused duo building Nigeria’s most reliable courier and last‑mile
            experience.
          </motion.p>
        </div>

        {/* Team Grid - Focused 2-column layout */}
        <div className="grid gap-10 md:grid-cols-2 max-w-4xl mx-auto">
          {PICKARS_TEAM.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[50px] border border-gray-100 bg-[#f9f9f9] p-5 transition-all hover:bg-white hover:shadow-2xl hover:shadow-red-500/10"
            >
              {/* Media Container */}
              <div className="relative mb-8 overflow-hidden rounded-[40px] bg-gray-200 aspect-square">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Social Icons */}
                <div className="absolute bottom-6 left-6 flex gap-3 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#121212] shadow-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <FaLinkedinIn size={18} />
                    </a>
                  )}
                  {m.twitter && (
                    <a
                      href={m.twitter}
                      target="_blank"
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#121212] shadow-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <FaXTwitter size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Body Content */}
              <div className="px-4 pb-6 text-center md:text-left">
                <h3 className="text-3xl font-black tracking-tight text-[#121212]">
                  {m.name}
                </h3>
                <p className="mb-4 text-sm font-bold text-red-600 uppercase tracking-widest">
                  {m.role}
                </p>
                <p className="text-base leading-relaxed text-gray-500">
                  {m.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
