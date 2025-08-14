import SlidingPage from "../components/SlidingPgae/SlidingPage";
import CompanyComponent from "../sections/CompanyComponent/CompanyComponent";
import CoreValuesSection from "../sections/DeliverySteps/CoreValuesSection";
import PickarsJourney from "../sections/PickarsJourney/PickarsJourney";
import ProblemIdea from "../sections/ProblemIdea/ProblemIdea";

const Company = () => {
  return (
    <div>
      <CompanyComponent />
      <ProblemIdea />
      <PickarsJourney />
      <SlidingPage />
      <CoreValuesSection />
    </div>
  );
};

export default Company;
