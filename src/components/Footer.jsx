import React, { useEffect, useRef} from "react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import gsap from "gsap";


const Footer = () => {
  return (
    <footer id="contact" className="w-full bg-[#20355f] text-white py-12 z-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Logo */}
        <div className="mb-8">
        <img
          src="/images/footerlogo.png"
          alt="Logo"
          className="h-25 w-auto mx-auto"
        />
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaFacebookF size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:scoj@canofjuice.com" className="text-gray-400 hover:text-white transition">
            <FaEnvelope size={24} />
          </a>
          <a href="tel:+918041112345" className="text-gray-400 hover:text-white transition">
            <FaPhone size={24} />
          </a>
        </div>

        {/* Contact Info */}
        <div className="text-sm text-gray-400 mb-4">
          <p>10, 1st Main Rd, 1st Block Koramangala, Koramangala, Bengaluru, Karnataka 560034</p>
        </div>

        {/* Copyright Section */}
        <div className="text-xs text-gray-500">
          <p>©StudioCANOFJUICE - ALL REGISTERED</p>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-200 mt-2"></div>
      </div>
    </footer>
  );
};

export default Footer;
