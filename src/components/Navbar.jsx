import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
      if (window.scrollY > 50) {
        setIsScrolled(true); 
      } else {
        setIsScrolled(false); 
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] text-white py-3 px-4 flex justify-between items-center pointer-events-none">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold pointer-events-auto"> 
        <img
          ref={logoRef}
          src="/images/logo.png"
          alt="Logo"
          className="h-14 w-auto"
        />
      </Link>

      {/* Navigation Links */}
      <div
        className={`space-x-6 pointer-events-auto transition-all duration-300 ${isScrolled ? "opacity-0" : "opacity-100"}`}
        style={{ marginTop: "5px" }} // Adjust this value to move the text higher
      >  
        <Link to="/works" className="hover:text-gray-300 transition-colors">Works</Link>
        <Link to="/services" className="hover:text-gray-300 transition-colors">Services</Link>
        <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
