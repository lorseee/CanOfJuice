import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const navigate = useNavigate();

  // Primary marquee
  const headingRef        = useRef(null);
  const headingWrapperRef = useRef(null);
  // Secondary marquee
  const subtitleRef        = useRef(null);
  const subtitleWrapperRef = useRef(null);

  const projectRefs = useRef([]);
  const viewAllRef  = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef= useRef(null);

  projectRefs.current = [];
  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  // Featured projects
  const featuredProjectIds = [16, 6, 18, 28, 19, 23, 13, 4];
  const featuredProjects = featuredProjectIds.map((id, i) => {
    const p = projects.items.find((x) => x.id === id);
    const catArr = Array.isArray(p.category) ? p.category : [p.category];
    const displayCategory =
      projects.categories.find((c) => c.id === catArr[0])?.label ?? catArr[0];
    const cardClasses = [
      "project-card-large",
      "project-card-medium",
      "project-card-medium-alt",
      "project-card-medium-tall",
      "project-card-large-right",
    ];
    const className = `project-card ${cardClasses[i] || "project-card-standard"}`;

    return {
      ...p,
      image: p.images.main,
      name: p.title,
      displayCategory,
      className,
    };
  });

  // Navigation
  const goProject = (id) => navigate(`/project/${id}`);
  const goAll     = ()   => navigate("/works");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Primary marquee animation
      if (headingRef.current && headingWrapperRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingWrapperRef.current,
              start: "top 300%",
            },
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

      // Cards reveal
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

      // View All button
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

      // Secondary marquee animation
      if (subtitleRef.current && subtitleWrapperRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: -200 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtitleWrapperRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions:"restart none none none",
               slideInLeft: 'slideInLeft 1s ease-out forwards',
            },
          }
        );
        gsap.to(subtitleRef.current, {
          xPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: subtitleWrapperRef.current,
            start: "top 25%",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Projects Section */}
      <section className="projects-section">
        <div className="projects-container">
          {/* Primary marquee */}
          <div ref={headingWrapperRef} className="heading-wrapper">
            <h2 ref={headingRef} className="projects-heading">
              OUR WORK — FEATURED PROJECTS — OUR WORK — FEATURED PROJECTS — OUR
              WORK — FEATURED PROJECTS
            </h2>
          </div>

          {/* Projects grid */}
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All button */}
          <div className="view-all-wrapper">
            <div ref={viewAllRef} onClick={goAll} className="view-all-btn">
              <div ref={leftLineRef} className="view-all-line left-line" />
              <h3 className="view-all-text">VIEW ALL PROJECTS</h3>
              <div ref={rightLineRef} className="view-all-line right-line" />
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section (white, full-width) */}
      <section className="expertise-section">
        <div className="projects-container">
          {/* Secondary marquee */}
          <div ref={subtitleWrapperRef} className="heading-wrapper">
            <h2 ref={subtitleRef} className="projects-heading">
              WE ARE EXPERTS IN CREATING STRATEGIC 
            </h2>
          </div>
          {/* Static expertise text */}
          <p className="expertise-text">
            identities / campaigns / websites / books &amp; <br /> publications /
            signage &amp; wayfinding / exhibitions / <br /> branded environments
          </p>
        </div>
      </section>
    </>
  );
};

export default Projects;
