// WorksHero.jsx - fixed version
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollWrapper from "../components/ScrollWrapper";

const WorksHero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      const heroHeading = heroRef.current.querySelector("h1");
      
        gsap.fromTo(
          heroHeading, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 1 }
        );
      }
    }
  , []); // Added dependency array

  return (
    <ScrollWrapper
      ref={heroRef}
      id="works-hero"
      index={0}
      className="works-hero slide-in-from-bottom"
    >
      <div className="works-hero-image-container">
        <img
          src="/images/works-hero.jpg"
          alt="Works Hero"
          className="works-hero-image"
          onError={(e) => { 
            console.log("Hero image failed to load:", e.target.src);
            e.target.src = "/images/default.jpg"; 
          }}
        />
        <h1 className="works-hero-title animate-heading">
          OUR SERVICES
        </h1>
      </div>
    </ScrollWrapper>
  );
};

export default WorksHero;
