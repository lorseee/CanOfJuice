import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef  = useRef(null);
  const textRef     = useRef(null);
  const lagRef      = useRef(null);
  const entranceTL  = useRef(null);   // main text-entrance timeline
  const lagTL       = useRef(null);   // opacity timeline
  const pinST       = useRef(null);   // sticky ScrollTrigger
  const resizeObs   = useRef(null);   // ResizeObserver

  useEffect(() => {
    const section = sectionRef.current;
    const text    = textRef.current;
    const lag     = lagRef.current;
    if (!section || !text || !lag) return;

    /* ── 1. Text entrance (unchanged window) ───────────────── */
    entranceTL.current = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: "top 30%",
        scrub: 2,                 // smoother response
        invalidateOnRefresh: true
      }
    })
    .fromTo(
      text,
      { y: 300, opacity: 0, scale: 0.7 },
      { y: 0,   opacity: 1, scale: 1, ease: "power2.out", duration: 3 }
    );

    /* ── 2. Sticky pin (+200 % of viewport) ───────────────── */
    pinST.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=200%",
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      fastScrollEnd: true
    });

    /* ── 3. Lag-section linear opacity fade ───────────────── */
    lagTL.current = gsap.timeline({
      scrollTrigger: {
        trigger: lag,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        ease: "none"        // perfectly linear mapping
      }
    })
    .fromTo(text, { opacity: 1 }, { opacity: 0.4 });

    /* ── 4. Keep ScrollTrigger fresh on resize ─────────────── */
    resizeObs.current = new ResizeObserver(() => ScrollTrigger.refresh(true));
    resizeObs.current.observe(section);

    /* ── 5. Cleanup on unmount ─────────────────────────────── */
    return () => {
      entranceTL.current?.kill();
      lagTL.current?.kill();
      pinST.current?.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      resizeObs.current?.disconnect();
    };
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Pinned hero section */}
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

      {/* Transparent “lag” spacer */}
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
