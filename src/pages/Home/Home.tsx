import SlidingPage from "../../components/SlidingPgae/SlidingPage";
import CommentsSection from "../../sections/CommentsSection/CommentsSection";
import CustomerRiderSection from "../../sections/CustomerRiderSection/CustomerRiderSection";
import ServicesSection from "../../sections/DeliverySteps/OurServices";
import HeroSection from "../../sections/Hero/HeroSection";
import "./Home.css";

const Home = () => {
  return (
    <div className="">
      <HeroSection />
      <SlidingPage />
      <ServicesSection />
      <CustomerRiderSection />
      <CommentsSection />
    </div>
  );
};

export default Home;
