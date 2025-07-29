import React from "react";

const TermsOfUse = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.header}>Terms of Use</h1>

        <p style={styles.paragraph}>
          These Terms govern your use of Pickars Dispatch Services’ platform for
          arranging, accepting, and completing deliveries.
        </p>

        <h2 style={styles.subheader}>1. User Eligibility</h2>
        <p style={styles.paragraph}>
          You must be at least 18 years old to use the app. By using our
          service, you agree to provide accurate and complete information.
        </p>

        <h2 style={styles.subheader}>2. Rider Conduct</h2>
        <p style={styles.paragraph}>
          Riders are expected to follow traffic laws, avoid unlawful substances,
          and deliver items promptly and securely. Failure to comply may result
          in permanent suspension.
        </p>

        <h2 style={styles.subheader}>3. Customer Responsibilities</h2>
        <p style={styles.paragraph}>
          Customers must ensure all package details are accurate and must not
          schedule deliveries of illegal, hazardous, or restricted items.
        </p>

        <h2 style={styles.subheader}>4. Payment</h2>
        <p style={styles.paragraph}>
          All payments are processed via our secure gateway. Riders receive
          earnings through verified bank accounts. We reserve the right to
          withhold payments in case of disputes.
        </p>

        <h2 style={styles.subheader}>5. Liability</h2>
        <p style={styles.paragraph}>
          Pickars is not liable for losses or damages arising from incorrect
          package info, rider negligence, or force majeure events. We are also
          not responsible for delays caused by traffic or technical issues.
        </p>

        <h2 style={styles.subheader}>6. Service Suspension</h2>
        <p style={styles.paragraph}>
          We reserve the right to suspend any account found violating our
          policies, without prior notice.
        </p>

        <h2 style={styles.subheader}>7. Dispute Resolution</h2>
        <p style={styles.paragraph}>
          All disputes will be resolved via arbitration in Lagos, Nigeria, in
          accordance with applicable laws.
        </p>

        <p style={styles.paragraph}>
          By continuing to use Pickars Dispatch Services, you agree to abide by
          these Terms. If you disagree with any part, please discontinue use of
          our app.
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

export default TermsOfUse;
