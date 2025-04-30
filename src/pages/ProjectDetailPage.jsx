/*  ProjectDetailPage.jsx  – dynamic gallery-layout loader
    ------------------------------------------------------ */
    import React, {
      useEffect,
      useRef,
      useState,
      Suspense,
    } from "react";
    import { useParams, useNavigate } from "react-router-dom";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import {
      projects as allProjects,
      projectImages,
    } from "../constants";
    
    gsap.registerPlugin(ScrollTrigger);
    
    /* ---------------------------------------------------------
       1.  Pre-declare every gallery layout file in /layouts
           Vite turns this into a keyed object whose values
           are loader functions (() => import(...)).
    --------------------------------------------------------- */
    const layoutModules = import.meta.glob(
      "../layouts/ProjectLayouts/GalleryLayouts*.jsx"
    );
    
    const ProjectDetailPage = () => {
      /* ---------------- basic state ---------------- */
      const { id } = useParams();
      const projectId = Number(id);
      const navigate = useNavigate();
    
      const [project, setProject] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [relatedProjects, setRelatedProjects] = useState([]);
    
      /* -------- state for the dynamic component ----- */
      const [GalleryLayout, setGalleryLayout] = useState(null);
    
      /* -------------------- refs -------------------- */
      const detailHeroRef = useRef(null);
      const detailTitleRef = useRef(null);
      const detailDescriptionRef = useRef(null);
      const detailInfoRef = useRef(null);
      const detailImagesRef = useRef(null);
      const detailGalleryRef = useRef(null);
      const detailRelatedProjectsRef = useRef(null);
      const detailViewAllBtnRef = useRef(null);
      const detailRelatedProjectItemsRef = useRef([]);
      detailRelatedProjectItemsRef.current = [];
      const addToDetailRelatedProjectRefs = (el) => {
        if (el && !detailRelatedProjectItemsRef.current.includes(el)) {
          detailRelatedProjectItemsRef.current.push(el);
        }
      };
    
      /* ------------ helpers ------------ */
      const getImage = (pid, type = "main") =>
        projectImages[pid]?.[type] ??
        projectImages.default[type];
    
      /* ---------------------------------------------------
         2.  Fetch project data & choose gallery-layout file
      --------------------------------------------------- */
      useEffect(() => {
        const fetched = allProjects.find((p) => p.id === projectId);
        if (!fetched) return navigate("/404");
    
        /* prettify the category */
        const displayCategory = fetched.category
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
    
        setProject({
          ...fetched,
          displayCategory,
          image: getImage(fetched.id),
          additionalImages:
            projectImages[fetched.id]?.gallery ??
            projectImages.default.gallery,
        });
    
        /* choose a layout component -------------------- */
        const path = `../layouts/ProjectLayouts/GalleryLayouts${projectId}.jsx`;
        const fallback = "../layouts/ProjectLayouts/GalleryLayoutsDefault.jsx";
    
        (layoutModules[path] ?? layoutModules[fallback])()
          .then((mod) => {
            setGalleryLayout(() => mod.default);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Layout import failed:", err);
            if (path !== fallback && layoutModules[fallback]) {
              layoutModules[fallback]().then((mod) =>
                setGalleryLayout(() => mod.default)
              );
            } else {
              setGalleryLayout(() => () => <p>No gallery layout.</p>);
            }
            setIsLoading(false);
          });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [projectId, navigate]);
    
      /* -------------- GSAP animations --------------- */
      useEffect(() => {
        if (isLoading) return;
        const ctx = gsap.context(() => {
          /* hero fade-in */
          gsap.fromTo(
            detailHeroRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5, ease: "power2.out" }
          );
          /* title tween */
          gsap.fromTo(
            detailTitleRef.current.children,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.2,
              ease: "power3.out",
            }
          );
          /* section triggers – identical to your original code */
          const triggers = [
            detailDescriptionRef,
            detailInfoRef,
            detailImagesRef,
            detailGalleryRef,
          ];
          triggers.forEach((ref) => {
            if (ref.current) {
              gsap.fromTo(
                ref.current,
                { y: 100, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 1.2,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: ref.current,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: true,
                  },
                }
              );
            }
          });
          /* related projects fade-ups … unchanged */
          if (detailRelatedProjectsRef.current) {
            gsap.fromTo(
              detailRelatedProjectsRef.current.querySelector("h2"),
              { y: 100, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: detailRelatedProjectsRef.current,
                  start: "top 80%",
                  end: "top 60%",
                  scrub: true,
                },
              }
            );
            gsap.fromTo(
              detailRelatedProjectItemsRef.current,
              { y: 100, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: detailRelatedProjectsRef.current,
                  start: "top 70%",
                  end: "center 60%",
                  scrub: true,
                },
              }
            );
          }
        });
        return () => ctx.revert();
      }, [isLoading]);
    
      /* -------------- misc handlers ----------------- */
      const handleRelatedClick = (pid) => {
        navigate(`/project/${pid}`);
        window.scrollTo(0, 0);
      };
      const handleImageError = (e) => {
        e.target.src = projectImages.default.main;
      };
    
      /* -------------- loading guard ----------------- */
      if (isLoading || !project || !GalleryLayout) {
        return (
          <div className="detail-loading-container">
            <div className="detail-loading-flex">
              <div className="detail-loading-spinner"></div>
              <p className="detail-loading-text">Loading project…</p>
            </div>
          </div>
        );
      }
    
      /* ------------------- render ------------------- */
      return (
        <main className="detail-page-main">
          {/* HERO ------------------------------------------------ */}
          <div className="detail-hero-container">
            <div ref={detailHeroRef} className="detail-hero-inner">
              <div className="detail-hero-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="detail-hero-image"
                  onError={handleImageError}
                />
                <div ref={detailTitleRef} className="detail-hero-content">
                  <p className="detail-hero-category">
                    {project.displayCategory}
                  </p>
                  <h1 className="detail-hero-title detail-animate-heading">
                    {project.title}
                  </h1>
                  <div className="detail-hero-divider" />
                </div>
              </div>
            </div>
          </div>
    
          {/* MAIN CONTENT --------------------------------------- */}
          <div className="detail-project-content">
            <div className="detail-content-inner">
              {/* description & info */}
              <div className="detail-project-description-grid">
                <div
                  ref={detailDescriptionRef}
                  className="detail-description-section"
                >
                  <h2>About the Project</h2>
                  <div className="detail-description-text">
                    <p>
                      {project.longDescription ??
                        `For ${project.title}, we developed a comprehensive design strategy that aligned with the client's vision and brand identity.`}
                    </p>
                    {project.additionalDescription && (
                      <p>{project.additionalDescription}</p>
                    )}
                  </div>
                </div>
                <div
                  ref={detailInfoRef}
                  className="detail-info-section"
                >
                  <h3>Project Details</h3>
                  <ul className="detail-info-list">
                    <li>
                      <p className="detail-info-label">Services</p>
                      <p className="detail-info-value">
                        {project.displayCategory}
                      </p>
                    </li>
                    <li>
                      <p className="detail-info-label">Year</p>
                      <p className="detail-info-value">
                        {new Date().getFullYear()}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
    
              {/*  GALLERY – dynamic layout  */}
              <div
                ref={detailImagesRef}
                className="detail-gallery-section"
              >
                <div ref={detailGalleryRef}>
                  <Suspense fallback={<p>Loading gallery…</p>}>
                    <GalleryLayout
                      projectId={project.id}
                      images={project.additionalImages}
                      handleImageError={handleImageError}
                    />
                  </Suspense>
                </div>
              </div>
    
              {/* RELATED PROJECTS -------------------------------- */}
              {relatedProjects.length > 0 && (
                <div
                  ref={detailRelatedProjectsRef}
                  className="detail-related-projects-section"
                >
                  <h2>Related Projects</h2>
                  <div className="detail-related-projects-grid">
                    {relatedProjects.map((rp) => (
                      <div
                        key={rp.id}
                        ref={addToDetailRelatedProjectRefs}
                        className="detail-related-project-item"
                        onClick={() => handleRelatedClick(rp.id)}
                      >
                        <div className="detail-related-project-image-wrapper">
                          <img
                            src={rp.image}
                            alt={rp.title}
                            onError={handleImageError}
                            className="detail-related-project-image"
                          />
                          <div className="detail-related-project-overlay" />
                        </div>
                        <div className="detail-related-project-content">
                          <p className="detail-related-project-category">
                            {rp.displayCategory}
                          </p>
                          <h3 className="detail-related-project-title">
                            {rp.title}
                          </h3>
                          <div className="detail-related-project-divider" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      );
    };
    
    export default ProjectDetailPage;
    