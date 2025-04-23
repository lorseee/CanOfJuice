// ServicesHero.jsx - fixed version
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollWrapper from "../components/ScrollWrapper";

const ServicesHero=() => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      const heroHeading = heroRef.current.querySelector("h1");
      gsap.fromTo(heroHeading, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 });
     }
    });
    
  return (
    <ScrollWrapper
      ref={heroRef}
      id="services-hero"
      index={0}
      className="services-hero slide-in-from-bottom"
    >
      <div className="services-hero-image-container">
        <img
          src="/images/services-hero.jpg"
          alt="Services Hero"
          className="services-hero-image"
          onError={(e) => { 
            console.log("Hero image failed to load:", e.target.src);
            e.target.src = "/images/default.jpg"; 
          }}
        />
        <h1 className="services-hero-title animate-heading">
          OUR SERVICES
        </h1>
      </div>
    </ScrollWrapper>
  );
};

export default ServicesHero;