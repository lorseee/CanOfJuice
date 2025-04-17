import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollWrapper = ({ id, children, className }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".animate");

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            scrub: false,
            once: true,  // Ensures animation only plays once
          },
        }
      );
    });

    // Force GSAP to recalculate layout
    ScrollTrigger.refresh();
  }, []);

  return (
    <section ref={containerRef} id={id} className={`min-h-screen ${className}`}>
      {children}
    </section>
  );
};

export default ScrollWrapper;
