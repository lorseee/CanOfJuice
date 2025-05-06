import React, { useRef, useEffect, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Use forwardRef to accept refs from parent components
const Hero = forwardRef(({ id = "hero", ...props }, ref) => {
  // Create an internal ref that we'll use for the ScrollTrigger logic
  const internalRef = useRef(null);
  
  // Combine refs - use the forwarded ref if available, otherwise use internal ref
  const sectionRef = ref || internalRef;

  useEffect(() => {
    const section = sectionRef.current;
    
    if (!section) return;

    // Allow a brief moment for the DOM to fully render and settle
    const initTimeout = setTimeout(() => {
      // Create a ScrollTrigger instance
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
        id: "hero-pin", // Add ID for easier debugging
      });
    }, 100);

    return () => {
      // Clean up the ScrollTrigger and timeout when component unmounts
      clearTimeout(initTimeout);
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) {
          st.kill();
        }
      });
    };
  }, [sectionRef]);

  return (
    <section 
      id={id}
      ref={sectionRef}
      className="hero-section"
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
});

// Add display name for easier debugging
Hero.displayName = "Hero";

export default Hero;