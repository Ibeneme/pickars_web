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
    <div style={lightModeStyles.pageContainer}>
      <div style={lightModeStyles.inner}>
        <h1 style={lightModeStyles.title}>Need Help?</h1>
        <p style={lightModeStyles.subtitle}>
          We're here to support your Pickars journey.
        </p>

        <section style={lightModeStyles.section}>
          <h2 style={lightModeStyles.heading}>Contact Us</h2>
          <p style={lightModeStyles.text}>
            Email:{" "}
            <a href="mailto:support@pickars.com" style={lightModeStyles.link}>
              support@pickars.com
            </a>
            <br />
            Phone:{" "}
            <a href="tel:+2348012345678" style={lightModeStyles.link}>
              +234 801 234 5678
            </a>
          </p>
        </section>

        <section style={lightModeStyles.section}>
          <h2 style={lightModeStyles.heading}>Submit a Request</h2>
          <form onSubmit={handleSubmit} style={lightModeStyles.form}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={lightModeStyles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={lightModeStyles.input}
            />
            <textarea
              name="issue"
              placeholder="Describe your issue..."
              value={formData.issue}
              onChange={handleChange}
              required
              rows={5}
              style={lightModeStyles.textarea}
            ></textarea>
            <button type="submit" style={lightModeStyles.button}>
              Submit
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

const lightModeStyles = {
  pageContainer: {
    backgroundColor: "#f9f9f9", // Light background
    color: "#333", // Dark text
    minHeight: "100vh",
    padding: "4rem 1rem",
    paddingTop: "120px", // Added requested padding
    fontFamily: "'Lufga', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: -16,
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
    color: "#1a1a1a", // Darker title color
  },
  subtitle: {
    fontSize: "1.1rem",
    textAlign: "center",
    marginBottom: "2rem",
    color: "#555", // Dark subtitle color
  },
  section: {
    marginBottom: "3rem",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#131313", // A better contrasting accent color for light mode
  },
  text: {
    fontSize: "1rem",
    color: "#444", // Dark text
  },
  link: {
    color: "#131313", // Accent color for links
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
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#333",
  },
  textarea: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    backgroundColor: "#131313", // Accent color for the button
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
    color: "#666", // Slightly lighter dark text for FAQ content
    fontSize: "0.95rem",
  },
} as const;

export default Support;
