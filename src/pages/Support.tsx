import React, { useState } from "react";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Support request submitted:", formData);
    alert("Thank you! We'll get back to you shortly.");
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.inner}>
        <h1 style={styles.title}>Need Help?</h1>
        <p style={styles.subtitle}>
          We're here to support your Pickars journey.
        </p>

        <section style={styles.section}>
          <h2 style={styles.heading}>Contact Us</h2>
          <p style={styles.text}>
            Email:{" "}
            <a href="mailto:support@pickars.com" style={styles.link}>
              support@pickars.com
            </a>
            <br />
            Phone:{" "}
            <a href="tel:+2348012345678" style={styles.link}>
              +234 801 234 5678
            </a>
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Submit a Request</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <textarea
              name="issue"
              placeholder="Describe your issue..."
              value={formData.issue}
              onChange={handleChange}
              required
              rows={5}
              style={styles.textarea}
            ></textarea>
            <button type="submit" style={styles.button}>
              Submit
            </button>
          </form>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Frequently Asked Questions</h2>
          <ul style={styles.faqList}>
            <li style={styles.faqItem}>
              <strong>How do I book a dispatch?</strong>
              <p style={styles.faqText}>
                Download the Pickars app and follow the steps to schedule a pickup
                and drop-off.
              </p>
            </li>
            <li style={styles.faqItem}>
              <strong>Can I cancel a delivery?</strong>
              <p style={styles.faqText}>
                Yes. Cancellations are allowed within 5 minutes of booking without
                a fee.
              </p>
            </li>
            <li style={styles.faqItem}>
              <strong>How do I track my delivery?</strong>
              <p style={styles.faqText}>
                Use the live tracking link sent to your email or open the app to
                see real-time updates.
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#121212",
    color: "white",
    minHeight: "100vh",
    padding: "4rem 1rem",
    fontFamily: "'Lufga', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: -16
  },
  inner: {
    width: "100%",
    maxWidth: "600px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "0.5rem",
    color: "#fff",
  },
  subtitle: {
    fontSize: "1.1rem",
    textAlign: "center",
    marginBottom: "2rem",
    color: "#ddd",
  },
  section: {
    marginBottom: "3rem",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#ff0000",
  },
  text: {
    fontSize: "1rem",
    color: "#ccc",
  },
  link: {
    color: "#ff0000",
    textDecoration: "underline",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  textarea: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  button: {
    backgroundColor: "#ff0000",
    color: "#fff",
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: 600,
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  faqList: {
    listStyle: "none",
    padding: 0,
  },
  faqItem: {
    marginBottom: "1.5rem",
  },
  faqText: {
    color: "#bbb",
    fontSize: "0.95rem",
  },
} as const;

export default Support;