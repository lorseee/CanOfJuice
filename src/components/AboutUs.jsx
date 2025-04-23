import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const lagRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const lag = lagRef.current;

    if (!section || !text || !lag) return;

    // Animate text
    gsap.fromTo(
      text,
      { y: 300, opacity: 0, scale: 0.7 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "power1.out",
        duration: 4,
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 30%",
          scrub: 5,
        },
      }
    );

    // Pin AboutUs section but with a modified end point to allow complete overlay
    ScrollTrigger.create({
      trigger: section,
      start: "top top", 
      end: "+=200%", // Pin for twice the section's height for complete overlay
      pin: true,
      pinSpacing: false,
    });

    // Create a lag buffer that delays when the next section overlaps
    ScrollTrigger.create({
      trigger: lag,
      start: "top bottom",
      end: "bottom top", 
      scrub: true,
      onEnter: () => {
        // Optional: Fade text as next section appears
        gsap.to(text, { 
          opacity: 0.7, 
          duration: 1.5,
          ease: "power2.inOut" 
        });
      },
      onLeave: () => {
        // Further reduce opacity as lag section is fully scrolled
        gsap.to(text, { 
          opacity: 0.4, 
          duration: 1,
          ease: "power1.out" 
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div style={{ position: "relative" }}>
        <section
          id="about"
          ref={sectionRef}
          style={{
            backgroundImage: "url('/images/aboutus.JPG')",
          }}
        >
          <div
            ref={textRef}
            className="content-overlay"
          >
            <h1>
              At Studio CANOFJUICE, <br />
              we keep it FRESH.
            </h1>
            <p>
              From concept to on-site execution, we create bold brand spaces and visuals that stand out and stay memorable.
            </p>
          </div>
        </section>

        {/* Lag section - positioned immediately after the AboutUs section */}
        <section
          ref={lagRef}
          className="about-lag"
          style={{
            height: "100vh", // Full viewport height for the lag
            background: "transparent",
            position: "relative",
            zIndex: 0,
            pointerEvents: "none", // Allows clicking through
          }}
        />
      </div>
    </>
  );
};

export default AboutUs;