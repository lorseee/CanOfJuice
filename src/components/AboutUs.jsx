import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

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

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      style={{ backgroundImage: "url('/images/aboutus.JPG')" }}
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
          We are a design studio and manufacturing hub, dedicated to creating brands and crafting branded environments.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;