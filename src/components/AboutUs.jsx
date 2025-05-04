import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const lagRef = useRef(null);
  const entranceTL = useRef(null);
  const lagTL = useRef(null);
  const pinST = useRef(null);
  const resizeObs = useRef(null);

  const [ready, setReady] = useState(false);

  // Delay mount by 300ms to allow hero scroll to complete first
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const section = sectionRef.current;
    const text = textRef.current;
    const lag = lagRef.current;
    if (!section || !text || !lag) return;

    entranceTL.current = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: "top 30%",
        scrub: 2,
        invalidateOnRefresh: true
      }
    }).fromTo(
      text,
      { y: 300, opacity: 0, scale: 0.7 },
      { y: 0, opacity: 1, scale: 1, ease: "power2.out", duration: 3 }
    );

    pinST.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=200%",
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      fastScrollEnd: true
    });

    lagTL.current = gsap.timeline({
      scrollTrigger: {
        trigger: lag,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        ease: "none"
      }
    }).fromTo(text, { opacity: 1 }, { opacity: 0.4 });

    resizeObs.current = new ResizeObserver(() => ScrollTrigger.refresh(true));
    resizeObs.current.observe(section);

    return () => {
      entranceTL.current?.kill();
      lagTL.current?.kill();
      pinST.current?.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      resizeObs.current?.disconnect();
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
          willChange: "transform"
        }}
      >
        <div
          ref={textRef}
          className="content-overlay"
          style={{ willChange: "transform, opacity" }}
        >
          <h1>
            At Studio CANOFJUICE,<br />
            we keep it FRESH.
          </h1>
          <p>
            From concept to on-site execution, we create bold brand spaces and
            visuals that stand out and stay memorable.
          </p>
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
