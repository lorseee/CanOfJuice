import React, { useEffect, useRef, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const logoRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Animate logo
  useEffect(() => {
    if (logoRef.current) {
      const logoAnimation = gsap.to(logoRef.current, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "none",
      });

      return () => logoAnimation.kill();
    }
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, null, "#contact");
      window.dispatchEvent(new CustomEvent("navigateToContact"));
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] text-white py-3 px-4 flex items-center justify-between pointer-events-none">
      <Link to="/#home" className="pointer-events-auto">
        <img
          ref={logoRef}
          src="/images/logo.png"
          alt="Logo"
          className="h-16 w-auto"
        />
      </Link>

      {/* Desktop Menu */}
      <div
        className={`hidden md:flex ml-auto items-center space-x-6 pointer-events-auto transition-opacity duration-300 ${
          isScrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        <Link to="/works#works" className="hover:text-gray-300 transition-colors">Works</Link>
        <Link to="/services#services" className="hover:text-gray-300 transition-colors">Services</Link>
        <a href="#contact" className="hover:text-gray-300 transition-colors" onClick={handleContactClick}>
          Contact
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden pointer-events-auto">
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col items-start px-4 py-3 md:hidden z-[9999] pointer-events-auto">
          <Link to="/works#works" onClick={() => setMobileMenuOpen(false)} className="py-2">Works</Link>
          <Link to="/services#services" onClick={() => setMobileMenuOpen(false)} className="py-2">Services</Link>
          <a href="#contact" onClick={handleContactClick} className="py-2">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
