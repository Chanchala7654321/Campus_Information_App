import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import "../styles/Contact.css";

export default function Contact() {
  const [message, setMessage] = useState("");
  const maxLength = 500;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! Our team will get back to you shortly.");
  };

  return (
    <div className="contact-page-v2">
      <div className="contact-wrapper">
        {/* Left Side: Let's Connect */}
        <div className="contact-left">
          <h1 className="title-connect">Let's Connect</h1>
          <p className="description-connect">
            Have questions about our campus information system? Want to learn more about student placements or campus facilities? We're here to help!
          </p>

          <div className="info-items">
            <div className="info-item">
              <div className="info-icon-square"><FaMapMarkerAlt /></div>
              <div className="info-text">
                <strong>Visit Us</strong>
                <p>Silicon Valley Campus<br/>123 Innovation Drive<br/>San Jose, CA 95110</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-square"><FaPhoneAlt /></div>
              <div className="info-text">
                <strong>Call Us</strong>
                <p>+1 (555) 123-4567<br/><span>Mon-Fri: 9:00 AM - 6:00 PM PST</span></p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-square"><FaEnvelope /></div>
              <div className="info-text">
                <strong>Email Us</strong>
                <p>info@campus-info.edu<br/>support@campus-info.edu</p>
              </div>
            </div>
          </div>

          <div className="follow-us">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-icon-box"><FaFacebookF /></a>
              <a href="#" className="social-icon-box"><FaTwitter /></a>
              <a href="#" className="social-icon-box"><FaLinkedinIn /></a>
              <a href="#" className="social-icon-box"><FaInstagram /></a>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="contact-right">
          <div className="message-card">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label>Full Name *</label>
                <input type="text" placeholder="John Doe" required />
              </div>

              <div className="form-field">
                <label>Email Address *</label>
                <input type="email" placeholder="john@example.com" required />
              </div>

              <div className="form-field">
                <label>Phone Number *</label>
                <input type="tel" placeholder="+1 (555) 123-4567" required />
              </div>

              <div className="form-field">
                <label>Subject *</label>
                <select required>
                  <option value="">Select a subject</option>
                  <option>General Inquiry</option>
                  <option>Admissions</option>
                  <option>Student Placement</option>
                  <option>Campus Facilities</option>
                </select>
              </div>

              <div className="form-field">
                <label>Message *</label>
                <textarea 
                  placeholder="Tell us how we can help you..." 
                  maxLength={maxLength}
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
                <span className="char-count">{message.length}/{maxLength} characters</span>
              </div>

              <button type="submit" className="send-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
