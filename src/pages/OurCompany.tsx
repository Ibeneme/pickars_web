import React from "react";
import { CompanyHero } from "../sections/CompanyComponent/CompanyHero";
import { Mission } from "../sections/CompanyComponent/Mission";
import { CompanyCoreValues } from "../sections/CompanyComponent/CompanyCoreValues";
import InfiniteTownsMarquee from "../sections/HowItWorksSection/InfiniteTowns";

const CompanyPage: React.FC = () => {
  return (
    <div className="bg-[#FFF5F5] font-['Lufga'] text-black overflow-hidden">
      <CompanyHero />
      <Mission />
      <InfiniteTownsMarquee />
      <CompanyCoreValues />
    </div>
  );
};

export default CompanyPage;
