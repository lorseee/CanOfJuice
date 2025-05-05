import React, { useEffect, useRef, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import gsap from "gsap";

const Navbar = () => {
  const logoRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (logoRef.current) {
      const logoAnimation = gsap.to(logoRef.current, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "none",
      });

      return () => {
        logoAnimation.kill();
      };
    }

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

        <div
          className={`ml-auto flex items-center space-x-6 pointer-events-auto transition-all duration-300 ${
            isScrolled ? "opacity-0" : "opacity-100"
          }`}
        >
          <Link to="/works#works" className="hover:text-gray-300 transition-colors">Works</Link>
          <Link to="/services#services" className="hover:text-gray-300 transition-colors">Services</Link>
          <a href="#contact" className="hover:text-gray-300 transition-colors" onClick={handleContactClick}>
            Contact
          </a>
        </div>
      </nav>

  );
};

export default Navbar;