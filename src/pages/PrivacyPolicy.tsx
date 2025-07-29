import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.header}>Privacy Policy</h1>

        <p style={styles.paragraph}>
          Pickars Dispatch Services values your privacy. This policy explains how we
          collect, use, and protect your information when you use our platform as a
          customer, rider, or dispatcher.
        </p>

        <h2 style={styles.subheader}>Information We Collect</h2>
        <p style={styles.paragraph}>
          We collect personal data including your name, phone number, delivery
          addresses, and payment information. We also collect real-time GPS location
          from riders for tracking and logistics purposes.
        </p>

        <h2 style={styles.subheader}>How We Use Your Information</h2>
        <p style={styles.paragraph}>
          Information is used to facilitate deliveries, match you with available
          riders, calculate trip distances, and ensure safe transactions. We may also
          use your data for analytics to improve service efficiency.
        </p>

        <h2 style={styles.subheader}>Location Tracking</h2>
        <p style={styles.paragraph}>
          Our app continuously tracks rider locations to provide customers with
          real-time updates. Riders consent to GPS tracking while active on the app.
        </p>

        <h2 style={styles.subheader}>Data Sharing & Retention</h2>
        <p style={styles.paragraph}>
          We do not sell your data. Some data may be shared with payment providers or
          government authorities only when legally required. We retain transaction and
          delivery history for a minimum of 2 years.
        </p>

        <h2 style={styles.subheader}>Your Rights</h2>
        <p style={styles.paragraph}>
          You may request deletion, correction, or access to your data anytime by
          contacting us at <strong>privacy@pickars.com</strong>.
        </p>

        <h2 style={styles.subheader}>Cookies</h2>
        <p style={styles.paragraph}>
          We use cookies to improve your app experience. You can disable cookies in
          your browser settings, but some features may be limited.
        </p>

        <p style={styles.paragraph}>
          This policy may be updated periodically. Please review it regularly.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#121212",
    color: "#ffffff",
    fontFamily: "Lufga, sans-serif",
    padding: "3rem 1rem",
    minHeight: "100vh",
  },
  content: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    fontSize: "2.5rem",
    marginBottom: "2rem",
    fontWeight: "700",
  },
  subheader: {
    fontSize: "1.5rem",
    marginTop: "1.5rem",
    marginBottom: "1rem",
    fontWeight: "600",
  },
  paragraph: {
    fontSize: "1.1rem",
    lineHeight: "1.8",
    marginBottom: "1.25rem",
    fontWeight: "400",
  },
};

export default PrivacyPolicy;