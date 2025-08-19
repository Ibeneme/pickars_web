import SlidingPage from "../components/SlidingPgae/SlidingPage";
import CompanyComponent from "../sections/CompanyComponent/CompanyComponent";
import TeamSection from "../sections/CompanyComponent/TeamSection";
import CoreValuesSection from "../sections/DeliverySteps/CoreValuesSection";
import PickarsJourney from "../sections/PickarsJourney/PickarsJourney";
import ProblemIdea from "../sections/ProblemIdea/ProblemIdea";

const Company = () => {
  return (
    <div>
      <CompanyComponent />
      <ProblemIdea />
      <PickarsJourney />
  
      <CoreValuesSection />    <TeamSection />
      <SlidingPage />
    </div>
  );
};

export default Company;
