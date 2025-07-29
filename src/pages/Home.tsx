
import "./Home.css";

const Home = () => {
  const handleContactClick = () => {
    window.location.href = "mailto:support@pickars.com";
  };

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="hero-content">
          <h1 className="hero-title">Pickars Courier Limited</h1>
          <p className="hero-description">Fast delivery and reliable dispatch services at your fingertips.</p>
          <button className="contact-btn" onClick={handleContactClick}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;