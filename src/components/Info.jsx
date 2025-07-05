import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Info = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const countersRef = useRef(null);
  const lagRef = useRef(null);
  const [isPhone, setIsPhone] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsPhone(window.innerWidth <= 768);
  };
  handleResize(); // set on mount
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const countersContainer = countersRef.current;
    const lag = lagRef.current;
    if (!section || !text || !countersContainer || !lag) return;

    // Text entrance
    const entranceTL = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: "top 30%",
        scrub: 2,
        invalidateOnRefresh: true,
      },
    }).fromTo(
      text,
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, ease: "power2.out", duration: 2 }
    );

    // Pin the section
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=200%",
      pin: true,
      pinSpacing: false,
    });

    // Description fade-in
    const lines = text.querySelectorAll(".desc-line");
    gsap.set(lines, { opacity: 0.2 });
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top+=100",
        end: "bottom top",
        scrub: true,
      },
    }).to(lines, {
      opacity: 1,
      duration: 0.5,
      stagger: { each: 0.3 },
      ease: "power1.out",
    });

    // Counter animation (delayed to proper scroll point)
    const counters = countersContainer.querySelectorAll(".counter-value");

    requestAnimationFrame(() => {
      const counterTL = gsap.timeline({ paused: true });

      counters.forEach((el) => {
        const end = +el.dataset.target;
        const plus = el.dataset.plus === "true";
        const obj = { value: 0 };
        counterTL.to(
          obj,
          {
            value: end,
            duration: 1.5,
            ease: "power1.out",
            onUpdate: () => {
              const value = Math.ceil(obj.value);
              const formatted = value === 750000 
                ? `<span style="white-space: nowrap; font-size: 2.4rem;font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;">${value.toLocaleString()} <span style="font-size: 1.2rem">sqft</span></span>`
                : value + (plus ? "+" : "");
              el.innerHTML = formatted;
            },
          },
          0
        );
      });

      ScrollTrigger.create({
        trigger: countersContainer,
        start: "top 65%", // Fix: Starts when counters are closer to center
        onEnter: () => counterTL.play(),
        once: true,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <section
        id="about"
        ref={sectionRef}
        style={{
          minHeight: "100vh",
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 1.5rem",
        }}
      >
        <div
          ref={textRef}
          style={{
            maxWidth: "1200px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "2.5rem",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT: Static Heading */}
          <div style={{
            flex: "1 1 280px",
            minWidth: "260px",
            display: "flex",
            alignItems: "flex-start",
            marginTop: isPhone? "1rem": "-0.5rem",
            marginLeft: isPhone? "-1rem" : "2rem", // Adjust margin for smaller screens
            
          }}>
            <h1 style={{
              
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
      
              
              color: "#000"
            }}>
              ABOUT OUR <br /> STUDIO
            </h1>
          </div>

          {/* RIGHT: Aligned Content */}
            <div style={{
              flex: "2 1 400px",
              display: "flex",
              flexDirection: "column",
              gap: "1.75rem",
              alignItems: "flex-start"    // ensure left-alignment
            }}>
              <div>
                <h2 style={{
                  margin: 0,
                  marginBottom: "0.65rem",     // ← give the same spacing you had on <p>’s bottom
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#000"
                }}>
                  STUDIO CANOFJUICE
                </h2>

                          {[
                "We bring spaces to life — from concept, design to on-site execution —",
                "creating environments that inspire, guide, and connect.",
                "For over 10 years, we've crafted iconic spaces for clients across industries, blending creativity with precision to deliver impactful experiences.",
              ].map((line, i) => (
                <p
                  key={i}
                  className="desc-line"
                  style={{
                    fontSize: "1.15rem",
                    lineHeight: 1.7,
                    margin: 0,
                    marginBottom: "0.65rem",
                    color: "#111"
                  }}
                >
                  {i === 0 ? (
                    <>
                      {line}<br />
                    </>
                  ) : line}
                </p>
              ))}
            </div>
            {/* COUNTERS */}
            <div
              ref={countersRef}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
                justifyContent: "flex-start",
              }}
            >
              {[
                { target: 100, label: "Happy Clients", plus: true },
                { target: 150, label: "Design Projects", plus: true },
                { target: 750000, label: <span>Branded&nbsp;Environments</span>, plus: false },
               
              ].map((c, idx) => (
                <div key={idx} style={{
                  flex: "1 1 100px",
                  minWidth: "120px",
                  textAlign: "left"
                }}>
                  <div
                    className="counter-value"
                    data-target={c.target}
                    data-plus={c.plus}
                    style={{
                      fontSize: "2.4rem",
                      fontWeight: 800,
                      marginBottom: ".25rem",
                      color: "#000",
                    }}
                  >
                    0{c.plus ? "+" : ""}
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#666" }}>{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={lagRef}
        style={{
          height: "100vh",
          background: "transparent",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default Info;
