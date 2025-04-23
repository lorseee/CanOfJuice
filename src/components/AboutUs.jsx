import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const lagRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const lag = lagRef.current;

    if (!section || !text || !lag) return;

    // Create a main timeline for better control
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: "top 30%",
        scrub: 2, // Reduced from 5 for smoother response
        invalidateOnRefresh: true, // Better handling of resize events
      }
    });

    // Refine text animation with intermediate steps for smoother fade-in
    timelineRef.current.fromTo(
      text,
      { 
        y: 300, 
        opacity: 0, 
        scale: 0.7 
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        ease: "power2.out", // Changed to power2 for smoother ease
        duration: 3, // Slightly reduced for crisper animation
        immediateRender: true
      }
    );

    // Pin with improved performance settings
    ScrollTrigger.create({
      trigger: section,
      start: "top top", 
      end: "+=200%",
      pin: true,
      pinSpacing: false,
      anticipatePin: 1, // Pre-calculates pin position for smoother initiation
      fastScrollEnd: true, // Improves performance on fast scrolling
    });

    // Improve lag section animation with smoother opacity transitions
    const lagTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: lag,
        start: "top bottom",
        end: "bottom top", 
        scrub: 1, // More responsive scrub
        onEnter: () => {
          gsap.to(text, { 
            opacity: 0.7, 
            duration: 0.8, // Faster response
            ease: "power3.inOut" // Smoother ease
          });
        },
        onLeave: () => {
          gsap.to(text, { 
            opacity: 0.4, 
            duration: 0.5,
            ease: "power2.out" 
          });
        },
        onLeaveBack: () => {
          // Add reverse animation for smoother scrolling up
          gsap.to(text, { 
            opacity: 0.7, 
            duration: 0.5,
            ease: "power2.in" 
          });
        },
        onEnterBack: () => {
          // Add reverse animation for scrolling up
          gsap.to(text, { 
            opacity: 1, 
            duration: 0.8,
            ease: "power3.inOut" 
          });
        }
      }
    });

    // Use ResizeObserver for better responsiveness
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh(true);
    });
    
    resizeObserver.observe(section);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      timelineRef.current.kill();
      lagTimeline.kill();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <section
          id="about"
          ref={sectionRef}
          style={{
            backgroundImage: "url('/images/aboutus.JPG')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform", // Hardware acceleration hint
          }}
        >
          <div
            ref={textRef}
            className="content-overlay"
            style={{
              willChange: "transform, opacity", // Performance optimization
            }}
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

        {/* Lag section with improved performance attributes */}
        <section
          ref={lagRef}
          className="about-lag"
          style={{
            height: "100vh",
            background: "transparent",
            position: "relative",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
};

export default AboutUs;