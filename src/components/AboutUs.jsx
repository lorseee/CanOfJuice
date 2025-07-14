import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRefs = useRef([]);
  const lagRef = useRef(null);
  const entranceTL = useRef(null);
  const lagTL = useRef(null);
  const pinST = useRef(null);
  const resizeObs = useRef(null);

  const [ready, setReady] = useState(false);

  // Increased delay for AboutUs animations to avoid interfering with initial scroll
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const paragraphs = paragraphRefs.current;
    const lag = lagRef.current;
    
    if (!section || !heading || paragraphs.length === 0 || !lag) return;

    // Clear any existing ScrollTrigger instances first
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger === section || st.vars.trigger === lag) {
        st.kill();
      }
    });

    // Create a timeline for the entrance animations
    entranceTL.current = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "center 30%",
        scrub: 1.5,
        invalidateOnRefresh: true
      }
    });

    // Animate the heading first with a more dramatic entrance from bottom
    entranceTL.current.fromTo(
      heading,
      { y: 300, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, ease: "power3.out", duration: 1.2 }
    );

    // Animate each paragraph with a more dramatic entrance from bottom
    paragraphs.forEach((paragraph, index) => {
      entranceTL.current.fromTo(
        paragraph,
        { y: 300, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          ease: "power3.out", 
          duration: 1
        },
        "-=0.6" // Slight overlap for smoother sequence
      );
    });

    // Set up the pin
    pinST.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=150%", // Increased to give more scroll space for animations
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      fastScrollEnd: true,
      id: "about-pin"
    });

    // Fade out content as we scroll away
    lagTL.current = gsap.timeline({
      scrollTrigger: {
        trigger: lag,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        ease: "none",
        id: "about-lag"
      }
    }).fromTo([heading, ...paragraphs], { opacity: 1 }, { opacity: 0.3, stagger: 0.1 });

    // Use a debounced resize observer to prevent excessive refreshes
    let resizeTimeout;
    resizeObs.current = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 250);
    });
    resizeObs.current.observe(section);

    return () => {
      entranceTL.current?.kill();
      lagTL.current?.kill();
      pinST.current?.kill();
      resizeObs.current?.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, [ready]);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <section
        id="about"
        ref={sectionRef}
        style={{
          height: "100vh",
          backgroundImage: "url('/images/aboutus.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#f0f0f0",
          willChange: "transform",
        }}
      >
        <div
          className="content-overlay"
          style={{ willChange: "transform, opacity" }}
        >
          <h1 ref={headingRef} style={{ opacity: 0, transform: "translateY(100px)" }}>
            At Studio CANOFJUICE,<br />
            we keep it FRESH.
          </h1>
          
          <p ref={el => paragraphRefs.current[1] = el} style={{ opacity: 0, transform: "translateY(80px)" }}>
          FULL-SERVICE DESIGN + EXECUTION STUDIO SPECIALIZING IN <br />
          WAYFINDING, SIGNAGE SYSTEMS, AND BRANDING.
          </p>
          
          <br />
        </div>
      </section>

      <section
        ref={lagRef}
        className="about-lag"
        style={{
          height: "100vh",
          background: "transparent",
        
          pointerEvents: "none"
        }}
      />
    </div>
  );
};

export default AboutUs;