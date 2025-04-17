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
      className="h-screen w-full flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: "url('/images/aboutus.JPG')" }}
    >
      {/* Content overlay */}
      <div 
        ref={textRef}
        className="relative z-10 max-w-5xl text-center space-y-6 bg-opacity-60 p-12 rounded-lg"
      >
        <h1 className="text-5xl font-bold text-white leading-snug">
          At Studio CANOFJUICE, <br />
          we keep it FRESH.
        </h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed text-white">
          We are a design studio and manufacturing hub, dedicated to creating brands and crafting branded environments.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
