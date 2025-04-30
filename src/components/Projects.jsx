import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects as allProjects, projectImages } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  /* ──────────────────────────── refs & helpers ─────────────────────────── */
  const navigate              = useNavigate();
  const headingRef            = useRef(null);
  const headingWrapperRef     = useRef(null);
  const sectionRef            = useRef(null);
  const projectRefs           = useRef([]);
  const viewAllRef            = useRef(null);
  const leftLineRef           = useRef(null);
  const rightLineRef          = useRef(null);
  const ctaRef                = useRef(null);

  projectRefs.current = [];
  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  /* ──────────────────────────── project data ───────────────────────────── */
  const featuredProjectIds = [16, 6, 18, 28, 19, 23, 11, 4];

  const featuredProjects = featuredProjectIds.map((id, index) => {
    const project = allProjects.find((p) => p.id === id);

    const cardClasses = [
      "project-card-large",
      "project-card-medium",
      "project-card-medium-alt",
      "project-card-medium-tall",
      "project-card-large-right",
    ];

    const className = `project-card ${
      cardClasses[index] || "project-card-standard"
    }`;

    const displayCategory = project.category
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");

    return {
      ...project,
      image: projectImages[id]?.main || projectImages.default.main,
      name: project.title,
      displayCategory,
      className,
    };
  });

  /* ──────────────────────────── navigation ─────────────────────────────── */
  const goProject  = (id) => navigate(`/project/${id}`);
  const goAll      = ()   => navigate("/works");
  const goServices = ()   => navigate("/services");

  /* ──────────────────────────── CTA copy loop ──────────────────────────── */
  const phrases = [
    "ENVIRONMENTAL GRAPHICS",
    "BRAND IDENTITY",
    "WAY FINDING",
    "COMMUNICATION DESIGN",
    "ART INSTALLATIONS",
  ];

  const [idx, setIdx]       = useState(0);
  const [showFinal, setFin] = useState(false);

  /* ──────────────────────────── animations ─────────────────────────────── */
  useEffect(() => {
    let intervalId;

    const ctx = gsap.context(() => {
      /* Heading fade-in & marquee */
      if (headingRef.current && headingWrapperRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: headingWrapperRef.current, start: "top 300%" },
          }
        );

        gsap.to(headingRef.current, {
          xPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: headingWrapperRef.current,
            start: "top 25%",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      /* Card reveal */
      if (projectRefs.current.length) {
        gsap.set(projectRefs.current, { opacity: 0, y: 150 });

        ScrollTrigger.batch(projectRefs.current, {
          start: "top bottom-=20%",
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.1,
            }),
        });
      }

      /* “View all” button animation + hover */
      if (viewAllRef.current && leftLineRef.current && rightLineRef.current) {
        gsap.set(viewAllRef.current, { opacity: 0, y: 50, scale: 0.95 });
        gsap.set([leftLineRef.current, rightLineRef.current], {
          width: "100px",
          opacity: 0.5,
        });

        ScrollTrigger.create({
          trigger: viewAllRef.current,
          start: "top 90%",
          onEnter: () => {
            gsap.to(viewAllRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
            });
            gsap.to([leftLineRef.current, rightLineRef.current], {
              opacity: 1,
              duration: 0.8,
              delay: 0.3,
            });
          },
        });

        viewAllRef.current.addEventListener("mouseenter", () => {
          gsap.to(viewAllRef.current, { scale: 1.02, duration: 0.3 });
          gsap.to([leftLineRef.current, rightLineRef.current], {
            width: "100vw",
            duration: 0.3,
          });
        });

        viewAllRef.current.addEventListener("mouseleave", () => {
          gsap.to(viewAllRef.current, { scale: 1, duration: 0.3 });
          gsap.to([leftLineRef.current, rightLineRef.current], {
            width: "100px",
            duration: 0.6,
          });
        });
      }

      /* CTA fade-in + rotating copy */
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 80%",
              onEnter: () => {
                let i = 0;
                intervalId = setInterval(() => {
                  if (i < phrases.length) {
                    setIdx(i++);
                  } else {
                    clearInterval(intervalId);
                    setFin(true);
                  }
                }, 1000);
              },
            },
          }
        );

        ctaRef.current.addEventListener("mouseenter", () =>
          gsap.to(ctaRef.current, { scale: 1.1, duration: 0.2 })
        );
        ctaRef.current.addEventListener("mouseleave", () =>
          gsap.to(ctaRef.current, { scale: 1, duration: 0.2 })
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      clearInterval(intervalId);
    };
  }, []);

  const txtOpacity = showFinal ? 1 : 1 - idx / phrases.length;

  /* ──────────────────────────── JSX ────────────────────────────────────── */
  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      <div className="projects-container">
        {/* ----- heading ----- */}
        <div ref={headingWrapperRef} className="heading-wrapper">
          <h2 ref={headingRef} className="projects-heading">
            OUR WORK — FEATURED PROJECTS — OUR WORK — FEATURED PROJECTS — OUR
            WORK — FEATURED PROJECTS
          </h2>
        </div>

        {/* ----- grid ----- */}
        <div className="projects-grid">
          {featuredProjects.map((p) => (
            <div
              key={p.id}
              ref={addToRefs}
              className={p.className}
              onClick={() => goProject(p.id)}
            >
              <div className="project-inner">
                <div className="project-image-container">
                  <img src={p.image} alt={p.name} className="project-image" />
                </div>

                <div className="project-overlay" />

                <div className="project-content">
                  <div className="project-details">
                    <p className="project-category">{p.displayCategory}</p>
                    <h3 className="project-title">{p.name}</h3>
                    <div className="project-divider" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goProject(p.id);
                      }}
                      className="project-view-btn"
                    >
                      View Project <span className="project-arrow">→</span>
                    </button>
                  </div>
                </div>

                <div className="project-accent">
                  <div className="project-accent-vertical" />
                  <div className="project-accent-horizontal" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ----- view-all button ----- */}
        <div className="view-all-wrapper">
          <div ref={viewAllRef} onClick={goAll} className="view-all-btn">
            <div ref={leftLineRef} className="view-all-line left-line" />
            <h3 className="view-all-text">VIEW ALL PROJECTS</h3>
            <div ref={rightLineRef} className="view-all-line right-line" />
          </div>
        </div>

        {/* ----- CTA banner ----- */}
        <div className="cta-wrapper">
          <div ref={ctaRef} className="cta-button" onClick={goServices}>
            <h2 className="cta-text" style={{ opacity: txtOpacity }}>
              {showFinal ? "CHECK OUT WHAT WE DO" : phrases[idx]}
            </h2>
            <span className="cta-arrow">→</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
