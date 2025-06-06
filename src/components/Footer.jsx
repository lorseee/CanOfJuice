import { FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";


const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        {/* Logo */}
        <div className="footer-logo">
          <img src="/images/logo.png" alt="Logo" />
        </div>
        <div className="footer-text">
          <p>Let's Collaborate !!</p>
        </div>

        {/* Divider below logo */}
        <div className="footer-divider" />

        {/* Body: address on left, social on right */}
        <div className="footer-body">
          {/* Left: Contact Info */}
          <div className="footer-left">
            <div className="footer-contact">
              <p>10, 1st Main Rd, 1st Block Koramangala, Bengaluru, Karnataka 560034</p>
              <p>080 4147 5441 | canofjuice@gmail.com</p>
            </div>
          </div>

          {/* Right: Social Media */}
          <div className="footer-right">
            <div className="social-icons">
              <a
                href="https://www.instagram.com/studiocanofjuice/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/studio-canofjuice/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=scoj@canofjuice.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaEnvelope />
              </a>
              <a href="tel:+918041475441" className="social-icon">
                <FaPhone />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
