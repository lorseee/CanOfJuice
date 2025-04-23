// src/components/Projects.jsx
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects as allProjects, projectImages } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);
  const viewAllRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const ctaRef = useRef(null);

  // Reset and collect project card refs
  projectRefs.current = [];
  const addToRefs = el => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  // Featured project IDs and mapping
  const featuredProjectIds = [16, 6, 18, 28, 19, 23, 11, 4];
  const featuredProjects = featuredProjectIds.map((id, index) => {
    const project = allProjects.find(p => p.id === id);
    let className;
    switch (index) {
      case 0: className = "project-card project-card-large"; break;
      case 1: className = "project-card project-card-medium"; break;
      case 2: className = "project-card project-card-medium-alt"; break;
      case 3: className = "project-card project-card-medium-tall"; break;
      case 4: className = "project-card project-card-large-right"; break;
      default: className = "project-card project-card-standard";
    }
    const formattedCategory = project.category
      .split("-")
      .map(w => w[0].toUpperCase() + w.slice(1))
      .join(" ");
    return {
      ...project,
      image: projectImages[id]?.main || projectImages.default.main,
      name: project.title,
      displayCategory: formattedCategory,
      className
    };
  });

  // Navigation handlers
  const handleProjectClick = id => navigate(`/project/${id}`);
  const handleViewAllClick = () => navigate("/works");
  const handleServicesClick = () => navigate("/services");

  // CTA rotating phrases
  const ctaPhrases = [
    "ENVIRONMENTAL GRAPHICS",
    "BRAND IDENTITY",
    "WAY FINDING",
    "COMMUNICATION DESIGNS",
    "ART INSTALLATIONS"
  ];
  const [ctaTextIndex, setCtaTextIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    let intervalId;
    const ctx = gsap.context(() => {
      // Heading animation
      const heading = headingRef.current;
      const headingWrapper = headingWrapperRef.current;
      if (heading && headingWrapper) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingWrapper,
              start: "top 300%",
              toggleActions: "play none none reverse"
            }
          }
        );
        gsap.to(heading, {
          xPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: headingWrapper,
            start: "top 25%",
            end: "bottom top",
            scrub: 0.5
          }
        });
      }

      // Project cards reveal & parallax
      if (projectRefs.current.length) {
        gsap.set(projectRefs.current, { opacity: 0, y: 100 });
        ScrollTrigger.batch(projectRefs.current, {
          start: "top bottom-=5%",
          onEnter: batch => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.1
            });
          }
        });
      }

      // View All Projects button animations & hover
      const viewAllBtn = viewAllRef.current;
      const leftLine = leftLineRef.current;
      const rightLine = rightLineRef.current;
      if (viewAllBtn && leftLine && rightLine) {
        gsap.set(viewAllBtn, { opacity: 0, y: 50, scale: 0.95 });
        gsap.set([leftLine, rightLine], { width: "100px", opacity: 0.5 });
        ScrollTrigger.create({
          trigger: viewAllBtn,
          start: "top 90%",
          onEnter: () => {
            gsap.to(viewAllBtn, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out"
            });
            gsap.to([leftLine, rightLine], {
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.3
            });
          }
        });
        viewAllBtn.addEventListener("mouseenter", () => {
          gsap.to(viewAllBtn, { scale: 1.02, duration: 0.3 });
          gsap.to(leftLine, { width: "100vw", duration: 0.3, ease: "power4.out" });
          gsap.to(rightLine, { width: "100vw", duration: 0.3, ease: "power4.out" });
        });
        viewAllBtn.addEventListener("mouseleave", () => {
          gsap.to(viewAllBtn, { scale: 1, duration: 0.3 });
          gsap.to([leftLine, rightLine], { width: "100px", duration: 0.6, ease: "power2.inOut" });
        });
      }

      // CTA fade-in & phrase cycling on scroll into view
      const ctaEl = ctaRef.current;
      if (ctaEl) {
        gsap.fromTo(
          ctaEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaEl,
              start: "top 80%",
              onEnter: () => {
                let i = 0;
                intervalId = setInterval(() => {
                  if (i < ctaPhrases.length) {
                    setCtaTextIndex(i);
                    i++;
                  } else {
                    clearInterval(intervalId);
                    setShowFinal(true);
                  }
                }, 1000); // each phrase stays visible for 3 seconds
              }
            }
          }
        );

        // CTA pop effect on hover
        ctaEl.addEventListener("mouseenter", () => {
          gsap.fromTo(
            ctaEl,
            { scale: 1 },
            { scale: 1.1, duration: 0.2, ease: "back.out(2)" }
          );
        });
        ctaEl.addEventListener("mouseleave", () => {
          gsap.to(ctaEl, { scale: 1, duration: 0.2, ease: "power2.out" });
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      clearInterval(intervalId);
    };
  }, []);

  // Compute decreasing opacity for each phrase
  const opacity = showFinal
    ? 1
    : 1 - ctaTextIndex / ctaPhrases.length;

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      <div className="projects-container">
        <div ref={headingWrapperRef} className="heading-wrapper">
          <h2 ref={headingRef} className="projects-heading">
            OUR WORK — FEATURED PROJECTS — OUR WORK — FEATURED PROJECTS — OUR WORK — FEATURED PROJECTS
          </h2>
        </div>

        <div className="projects-grid">
          {featuredProjects.map(proj => (
            <div
              key={proj.id}
              ref={addToRefs}
              className={proj.className}
              onClick={() => handleProjectClick(proj.id)}
            >
              <div className="project-inner">
                <div className="project-image-container">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="project-image"
                  />
                </div>
                <div className="project-overlay" />
                <div className="project-content">
                  <div className="project-details">
                    <p className="project-category">{proj.displayCategory}</p>
                    <h3 className="project-title">{proj.name}</h3>
                    <div className="project-divider" />
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleProjectClick(proj.id);
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

        <div className="view-all-wrapper">
          <div
            ref={viewAllRef}
            onClick={handleViewAllClick}
            className="view-all-btn"
          >
            <div ref={leftLineRef} className="view-all-line left-line" />
            <h3 className="view-all-text">VIEW ALL PROJECTS</h3>
            <div ref={rightLineRef} className="view-all-line right-line" />
          </div>
        </div>

        <div className="cta-wrapper">
          <div
            ref={ctaRef}
            className="cta-button"
            onClick={handleServicesClick}
          >
            <h2
              className="cta-text"
              style={{ opacity }}
            >
              {showFinal
                ? "CHECK OUT WHAT WE DO"
                : ctaPhrases[ctaTextIndex]}
            </h2>
            <span className="cta-arrow">→</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
