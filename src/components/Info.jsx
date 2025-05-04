import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Info = () => {
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1e1e1e",
          willChange: "transform"
        }}
      >
        <div
          ref={textRef}
          className="content-overlay"
          style={{ 
            willChange: "transform, opacity",
            textAlign: "center",
            color: "#fff",
            padding: "2rem"
          }}
        >
          <ul className="category-list" style={{ 
            listStyle: "none", 
            padding: 0,
            fontSize: "1.5rem",
            fontWeight: "300",
            lineHeight: "2.5"
          }}>
            <li>identities</li>
            <li>campaigns</li>
            <li>websites</li>
            <li>books & publications</li>
            <li>signage & wayfinding</li>
            <li>exhibitions</li>
            <li>branded environments</li>
          </ul>
        </div>
      </section>

      {/* Transparent "lag" spacer */}
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

export default Info;