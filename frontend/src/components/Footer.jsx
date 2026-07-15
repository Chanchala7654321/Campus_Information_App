import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram
} from "react-icons/fa6";

import "../styles/Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span>Campus Info</span>
          </div>
          <p>
            Comprehensive campus management system for tracking students,
            schools, and placements across multiple campuses.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Campus</Link>
          <Link to="/schools">Schools</Link>
          <Link to="/students">Students</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        {/* Resources */}
        <div className="footer-links">
          <h4>Resources</h4>
          <Link to="/map">Map View</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/admin">Admin Portal</Link>
        </div>

        {/* Social */}
        <div className="footer-social">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <FaFacebookF />
            <FaXTwitter />
            <FaLinkedinIn />
            <FaInstagram />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Campus Information System. All rights reserved.</p>
        <p>Powered by Readdy</p>
      </div>
    </footer>
  );
}
