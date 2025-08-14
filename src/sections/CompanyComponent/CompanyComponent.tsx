import "./CompanyComponent.css"; // Import the CSS file for styling
import bgImage from "../../assets/images/story/rider.jpg"; // Ensure this path is correct

const CompanyComponent = () => {
  return (
    <section
      className="company-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Semi-transparent overlay for text legibility */}
      <div className="company-overlay"></div>

      <div className="company-content">
        <h1 className="company-title">About Pickars 💭</h1>
        <p className="company-description">
          Pickars makes sending and receiving packages in
          Nigeria easy and reliable. Our app connects you with trusted riders
          who deliver your items safely and on time, whether it’s documents,
          parcels, or online orders. We focus on convenience, speed, and
          dependable service for everyone.{" "}
        </p>
        {/* <div className="mission-vision-container">
          <div className="vision-card">
            <h2 className="card-title">Our Vision</h2>
            <p className="card-text">
              To be the undisputed leader and most trusted logistics technology
              platform in [Specify Region/Country], empowering individuals and
              businesses with unparalleled delivery solutions that foster
              stronger communities and accelerate economic growth. We envision a
              future where every delivery is an effortless, transparent, and
              environmentally responsible journey, contributing to a more
              connected and efficient world where logistical challenges are a
              thing of the past. Our aim is to set new industry standards for
              speed, security, sustainability, and customer satisfaction,
              transforming the way goods move.
            </p>
          </div>

          <div className="mission-card">
            <h2 className="card-title">Our Mission</h2>
            <p className="card-text">
              To deliver operational excellence through continuous innovation,
              unwavering integrity, and a deeply customer-centric approach. We
              are committed to building and maintaining a robust, intuitive, and
              highly secure platform that guarantees speed, reliability, and
              security for every single delivery, irrespective of size or
              distance. Furthermore, we are dedicated to fostering a supportive,
              empowering, and fair community for our invaluable network of
              riders, providing them with advanced tools, fair compensation, and
              opportunities for professional growth, while consistently
              contributing positively to the overall logistics ecosystem's
              growth, ethical practices, and digital transformation.
            </p>
          </div>
        </div> */}
        {/* <div className="core-values-container">
          <h2 className="core-values-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <span className="value-number">1.</span>
              <h3>Reliability</h3>
              <p>
                We are unyieldingly committed to providing consistent and
                dependable service. This means ensuring every delivery is
                handled with the utmost care, from pickup to drop-off, and
                reaches its intended destination securely and precisely on
                schedule, every single time. Our clients count on us for peace
                of mind, knowing their parcels are in safe hands from start to
                finish.
              </p>
            </div>
            <div className="value-item">
              <span className="value-number">2.</span>
              <h3>Innovation</h3>
              <p>
                We continuously embrace and integrate cutting-edge technologies
                and creative solutions to enhance our platform, optimize complex
                logistics processes, and significantly improve the overall user
                experience. We actively seek out new methods and tools to make
                deliveries faster, smarter, more transparent, and more seamless
                for everyone involved, pushing the boundaries of what's possible
                in last-mile delivery.
              </p>
            </div>
            <div className="value-item">
              <span className="value-number">3.</span>
              <h3>Integrity</h3>
              <p>
                We operate with unwavering honesty, complete transparency, and
                strong ethical principles in all our business interactions.
                Building and maintaining trust with our customers, our dedicated
                riders, and all partners is paramount to us, forming the bedrock
                of our long-term relationships and ensuring fairness in every
                transaction and interaction.
              </p>
            </div>
            <div className="value-item">
              <span className="value-number">4.</span>
              <h3>Customer-Centricity</h3>
              <p>
                Our customers' needs and satisfaction are unequivocally at the
                heart of everything we do. We actively listen to feedback, adapt
                our services to meet evolving demands, and consistently go the
                extra mile to not only meet but exceed their expectations and
                efficiently solve their unique delivery challenges, ensuring
                every experience is positive and hassle-free.
              </p>
            </div>
            <div className="value-item">
              <span className="value-number">5.</span>
              <h3>Empowerment</h3>
              <p>
                We are dedicated to empowering our riders by providing them with
                the best available tools, comprehensive support, fair
                compensation, and abundant opportunities they need to thrive
                professionally and personally. We deeply recognize their crucial
                role as the backbone of our success and value their
                contributions immensely, fostering a strong sense of partnership
                and growth.
              </p>
            </div>
            <div className="value-item">
              <span className="value-number">6.</span>
              <h3>Community</h3>
              <p>
                We believe in fostering a strong, interconnected, and supportive
                community among all our users, our dedicated riders, and our
                internal team members. We work collaboratively, sharing
                knowledge and resources, to achieve collective growth, mutual
                success, and a positive impact on the wider society and the
                local economies we serve.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default CompanyComponent;
