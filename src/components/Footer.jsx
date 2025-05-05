import React from "react";
import { FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo - On the left */}
          <div className="footer-logo">
            <img
              src="/images/logo.png"
              alt="Logo"
            />
          </div>

          {/* Contact Info - Centered */}
          <div className="footer-center">
            <div className="contact-info">
              <p>10, 1st Main Rd, 1st Block Koramangala, Bengaluru, Karnataka 560034</p>
              <p>080 4147 5441 | canofjuice@gmail.com</p>
            </div>
          </div>

          {/* Right side with heading and social icons */}
          <div className="footer-right">
            {/* Get in touch heading */}
            <h3 className="get-in-touch">GET IN TOUCH WITH US</h3>
            
            {/* Social Icons - Under heading */}
            <div className="social-icons">
              <a
                href="https://www.instagram.com/studiocanofjuice/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/studio-canofjuice/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=scoj@canofjuice.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaEnvelope size={24} />
              </a>
              <a
                href="tel:+918041475441"
                className="social-icon"
              >
                <FaPhone size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;