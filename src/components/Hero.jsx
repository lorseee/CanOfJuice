import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    if (!section) return;

    // Create a ScrollTrigger instance
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: true,
    });

    return () => {
      // Clean up the ScrollTrigger when component unmounts
      trigger.kill();
    };
  }, []);

  return (
    <section id={"hero"}
      ref={sectionRef}
      className="h-screen bg-black flex items-center justify-center"
    >
      <div className="w-[80%] h-[80%] rounded-lg overflow-hidden shadow-lg bg-white">
        <img 
          src="/videos/video.gif" 
          alt="Hero GIF" 
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;