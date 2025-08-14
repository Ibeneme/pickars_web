import React, { useState } from "react";
import "./LostItem.css";

const LostItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    itemDescription: "",
    pickupDeliveryCode: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for modal visibility

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lost item report submitted:", formData);
    // You would typically send this data to an API here

    // After successful submission, show the modal
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      itemDescription: "",
      pickupDeliveryCode: "",
    });
  };

  const closeModal = () => {
    setIsSubmitted(false);
  };

  return (
    <>
      <div
        className={`lost-item-container ${
          isSubmitted ? "blurred-background" : ""
        }`}
      >
        <div className="lost-item-content">
          <h1 className="lost-item-title">Report a Lost Item</h1>
          <p className="lost-item-description">
            We understand how frustrating it is to lose something. Please fill
            out the form below with as much detail as possible, and we will do
            our best to help you find your item.
          </p>

          <form className="lost-item-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., John Doe"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="e.g., john.doe@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pickupDeliveryCode">
                Pickup or Delivery Code
              </label>
              <input
                type="text"
                id="pickupDeliveryCode"
                name="pickupDeliveryCode"
                value={formData.pickupDeliveryCode}
                onChange={handleChange}
                placeholder="e.g., A1B2C3D4"
              />
            </div>
            <div className="form-group">
              <label htmlFor="itemDescription">Description of Lost Item</label>
              <textarea
                id="itemDescription"
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleChange}
                rows={6}
                placeholder="e.g., a black wallet with ID, a pair of sunglasses in a red case, etc."
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Submit Report
            </button>
          </form>
        </div>
      </div>

      {/* The Modal */}
      {isSubmitted && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-emoji">🥹</span>
            <h2 className="modal-title">Submitted, we are on it! 🥹</h2>
            <p className="modal-message">
              Your report has been successfully submitted. We'll keep you in the
              loop and notify you of any updates. Thank you for helping us
              improve our services!
            </p>
            <button
              onClick={closeModal}
              className="submit-btn"
              style={{
                width: "100%",
                marginTop: 48,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LostItem;
