import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Title from "../../components/common/title/Title";
import "./style.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      await axios.post("/contact", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-container" id="contact-us">
      <Title title="Contact Us" />
      <p className="intro-text">Have questions? We'd love to hear from you!</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Write your message"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`submit-btn ${submitting ? "loading" : ""}`}
        >
          {submitting ? "Sending..." : "Send Message"}
        </button>

        {submitStatus === "success" && (
          <p className="success-message">Message sent successfully!</p>
        )}
        {submitStatus === "error" && (
          <p className="error-message">{errorMessage}</p>
        )}
      </form>

      <div className="contact-info">
        <h2>Other Ways to Reach Us</h2>
        <p>Email: resturant@gmail.com</p>
        <p>Phone: 0987332123</p>
        <p>Address: Shaikh Zaher, Lattakia City</p>
      </div>
    </div>
  );
};

export default ContactUs;
