import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Logos = () => {
  const marqueeRef = useRef(null);
  const logos = [
    "/images/brands/brand1.png", "/images/brands/brand2.png", "/images/brands/brand3.png", "/images/brands/brand4.png", "/images/brands/brand5.png",
    "/images/brands/brand6.png", "/images/brands/brand7.png", "/images/brands/brand8.png", "/images/brands/brand9.png", "/images/brands/brand10.png",
    "/images/brands/brand11.png", "/images/brands/brand12.png", "/images/brands/brand13.png", "/images/brands/brand14.png", "/images/brands/brand15.png",
    "/images/brands/brand16.png", "/images/brands/brand17.png", "/images/brands/brand18.png", "/images/brands/brand19.png", "/images/brands/brand20.png",
    "/images/brands/brand21.png", "/images/brands/brand22.png", "/images/brands/brand23.png", "/images/brands/brand24.png", "/images/brands/brand25.png",
    "/images/brands/brand26.png", "/images/brands/brand27.png", "/images/brands/brand28.png", "/images/brands/brand29.png", "/images/brands/brand30.png",
    "/images/brands/brand31.jpg", "/images/brands/brand32.png", "/images/brands/brand33.png", "/images/brands/brand34.png"
  ];
  
  useEffect(() => {
    // Set CSS variables for responsive marquee
    if (marqueeRef.current) {
      // Fixed logo width and spacing for consistency
      const logoWidth = 120; // Slightly reduced width for better proportions
      const logoSpacing = 40; // Equal spacing (20px on each side)
      const totalItemWidth = logoWidth + logoSpacing;
      
      marqueeRef.current.style.setProperty('--logo-count', logos.length);
      marqueeRef.current.style.setProperty('--logo-width', `${logoWidth}px`);
      marqueeRef.current.style.setProperty('--logo-spacing', `${logoSpacing}px`);
      marqueeRef.current.style.setProperty('--total-item-width', `${totalItemWidth}px`);
    }
  }, [logos.length]);

  return (
    <div className="logos-section">
      <h2 className="logos-heading">
        Clients Who Trust Us
      </h2>

      <div
        ref={marqueeRef}
        className="marquee-container"
      >
        <div className="marquee-content animate-marquee responsive-marquee">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div key={`first-${index}`} className="logo-item">
              <div className="logo-wrapper">
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="logo-image"
                />
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless looping */}
          {logos.map((logo, index) => (
            <div key={`second-${index}`} className="logo-item">
              <div className="logo-wrapper">
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="logo-image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logos;