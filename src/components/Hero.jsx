import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    if (!section) return;

    // Modified ScrollTrigger with explicit end point
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom-=100% top", // Adjust end point
      pin: true,
      pinSpacing: false,
      scrub: true,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section 
      id="hero"
      ref={sectionRef}
      className="hero-section"
      style={{ height: "100vh" }} // Inline style for direct control
    >
      <div className="hero-container">
        <img 
          src="/videos/video.gif" 
          alt="Hero GIF" 
          className="hero-media"
        />
      </div>
    </section>
  );
};

export default Hero;