import React from "react";
import { CompanyHero } from "../sections/CompanyComponent/CompanyHero";
import { Mission } from "../sections/CompanyComponent/Mission";
import { CompanyCoreValues } from "../sections/CompanyComponent/CompanyCoreValues";
import UberDispatchFlow from "../sections/CompanyComponent/PickarsDispatchMap";

const CompanyPage: React.FC = () => {
  return (
    <div className="bg-[#FFF5F5] font-['Lufga'] text-black overflow-hidden">
      <CompanyHero />
      <Mission />
      <CompanyCoreValues />
      <UberDispatchFlow/>
    </div>
  );
};

export default CompanyPage;
