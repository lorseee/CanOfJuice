/*  ProjectDetailPage.jsx  –  rev-I-4  (09 May 2025)  */
import React, { useEffect, useRef, useState, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

/* — lazy-import every gallery layout — */
const layoutModules = import.meta.glob(
  "../layouts/ProjectLayouts/GalleryLayouts*.jsx"
);

const ProjectDetailPage = () => {
  const { id }    = useParams();
  const projectId = Number(id);
  const navigate  = useNavigate();

  const [project,  setProject]  = useState(null);
  const [isLoading,setLoading]  = useState(true);
  const [related,  setRelated]  = useState([]);
  const [Gallery,  setGallery]  = useState(null);

  /* modal state */
  const [modalOpen,setModal]    = useState(false);
  const [current,  setCurrent]  = useState(0);

  /* GSAP + DOM refs */
  const heroRef = useRef(null);
  const descRef = useRef(null);          /* — target for arrow scroll */
  const infoRef = useRef(null);
  const imgsRef = useRef(null);
  const galRef  = useRef(null);
  const relWrap = useRef(null);

  const relItems = useRef([]); relItems.current = [];
  const pushRel  = el =>
    el && !relItems.current.includes(el) && relItems.current.push(el);

  /* ── fetch project & layout ───────────────────────── */
  useEffect(() => {
    window.scrollTo(0, 0);
    const p = projects.items.find(x => x.id === projectId);
    if (!p) return navigate("/404");

    const displayCategory =
      projects.categories.find(c => c.id === p.category)?.label ?? p.category;

    setProject({
      ...p,
      displayCategory,
      image: p.images.main,
      additionalImages: p.images.gallery || [],
    });

    setRelated(
      projects.items
        .filter(x => x.category === p.category && x.id !== projectId)
        .slice(0, 3)
        .map(x => ({
          ...x,
          displayCategory:
            projects.categories.find(c => c.id === x.category)?.label ?? x.category,
          image: x.images.main,
        }))
    );

    const path     = `../layouts/ProjectLayouts/GalleryLayouts${projectId}.jsx`;
    const fallback = "../layouts/ProjectLayouts/GalleryLayoutsDefault.jsx";
    (layoutModules[path] ?? layoutModules[fallback])().then(mod => {
      setGallery(() => mod.default);
      setLoading(false);
    });
  }, [projectId, navigate]);

  /* ── GSAP entrances (unchanged) ───────────────────── */
  useEffect(() => {
    if (isLoading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
      [descRef, infoRef, imgsRef, galRef].forEach(r => {
        if (!r.current) return;
        gsap.fromTo(
          r.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            scrollTrigger: {
              trigger: r.current,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            },
          }
        );
      });
      if (relWrap.current) {
        gsap.fromTo(
          relWrap.current.querySelector("h2"),
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            scrollTrigger: {
              trigger: relWrap.current,
              start: "top 80%",
              end: "top 60%",
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          relItems.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: relWrap.current,
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

  /* ── modal helpers (unchanged) ────────────────────── */
  const openModal  = i => {
    setCurrent(i);
    setModal(true);
    document.body.classList.add("modal-open");
  };
  const closeModal = () => {
    setModal(false);
    document.body.classList.remove("modal-open");
  };
  const next = () =>
    setCurrent(i => (i + 1) % project.additionalImages.length);
  const prev = () =>
    setCurrent(i => (i - 1 + project.additionalImages.length) % project.additionalImages.length);

  /* — key / swipe listeners (unchanged) — */
  useEffect(() => {
    if (!modalOpen) return;
    let startX = 0;
    const key = e => {
      if (e.key === "Escape")     closeModal();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    const ts = e => (startX = e.touches[0].clientX);
    const te = e => {
      const d = startX - e.changedTouches[0].clientX;
      if (Math.abs(d) > 50) (d > 0 ? next : prev)();
    };
    window.addEventListener("keydown",    key);
    window.addEventListener("touchstart", ts);
    window.addEventListener("touchend",   te);
    return () => {
      window.removeEventListener("keydown",    key);
      window.removeEventListener("touchstart", ts);
      window.removeEventListener("touchend",   te);
    };
  }, [modalOpen]);

  const errImg = e => (e.target.src = "/images/placeholder.jpg");

  /* ↓ arrow scroll helper — stops right at title */
  const scrollToTitle = () => {
    if (!descRef.current) return;
    const absTop =
      descRef.current.getBoundingClientRect().top + window.pageYOffset; // ← absolute
    window.scrollTo({ top: absTop - 180, behavior: "smooth" });
  };

  if (isLoading || !project) {
    return (
      <div className="detail-loading-container">
        <div className="detail-loading-flex">
          <div className="detail-loading-spinner" />
          <p className="detail-loading-text">Loading project…</p>
        </div>
      </div>
    );
  }

  /* —————————————————————————————————————————————————————————————— */
  return (
    <main className="detail-page-main">
      {/* HERO */}
      <div className="detail-hero-container">
        <div ref={heroRef} className="detail-hero-inner">
          <div className="detail-hero-image-container">
            <img
              src={project.image}
              alt={project.title}
              className="detail-hero-image"
              onError={errImg}
            />
          </div>
        </div>

        {/* ↓ static (no-bounce) scroll arrow */}
        <button
          aria-label="Scroll down"
          className="detail-scroll-arrow"
          onClick={scrollToTitle}
        >
          <span className="detail-scroll-arrow-icon">&#x21A1;</span>
        </button>
      </div>

      {/* BODY */}
      <div className="detail-project-content">
        <div className="detail-content-inner">
          {/* Description + Info */}
          <div ref={descRef} className="detail-project-description-grid">
            <div className="detail-description-section">
              <h2>{project.title}</h2>
              <div className="detail-description-text">
                <p>
                  {project.longDescription ||
                    `For ${project.title}, we developed a comprehensive design strategy aligned with the client's brand vision.`}
                </p>
                {project.additionalDescription && (
                  <p>{project.additionalDescription}</p>
                )}
              </div>

              {/* Fancy link-style button */}
              {[3, 17, 23, 29].includes(project.id) && (
                <button
                  className="detail-case-study-btn"
                  onClick={() =>
                    navigate("/case-studies", { state: { caseId: project.caseStudyId } })
                  }
                >
                  View&nbsp;the&nbsp;Case&nbsp;Study
                </button>
              )}
            </div>

            <div ref={infoRef} className="detail-info-section">
              <ul className="detail-info-list">
                <li>
                  <p className="detail-info-label">Year</p>
                  <p className="detail-info-value">
                    {project.year || new Date().getFullYear()}
                  </p>
                </li>
                <li>
                  <p className="detail-info-label">Services</p>
                  <p className="detail-info-value">
                    {(project.services || project.displayCategory)
                      .split(",")
                      .map((svc, idx) => (
                        <span key={idx} className="block">
                          {svc.trim()}
                        </span>
                      ))}
                  </p>
                </li>
                {project.label && (
                  <li>
                    <p className="detail-info-label">Label</p>
                    <p className="detail-info-value">{project.label}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Gallery */}
          {project.additionalImages.length > 0 && (
            <div ref={imgsRef} className="detail-gallery-section">
              <div ref={galRef}>
                {!Gallery ? (
                  <div className="detail-gallery-grid">
                    {project.additionalImages.map((src, i) => (
                      <div key={i} className="detail-gallery-item">
                        <img
                          src={src}
                          alt={`${project.title} – ${i + 1}`}
                          onClick={() => openModal(i)}
                          onError={errImg}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Suspense fallback={<p>Loading gallery…</p>}>
                    <GalleryWrapper
                      Layout={Gallery}
                      images={project.additionalImages}
                      err={errImg}
                      open={openModal}
                    />
                  </Suspense>
                )}
              </div>
            </div>
          )}

          {/* Related (unchanged) */}
          {related.length > 0 && (
            <div ref={relWrap} className="detail-related-projects-section">
              <h2>Related&nbsp;Projects</h2>
              <div className="detail-related-projects-grid">
                {related.map(r => (
                  <div
                    key={r.id}
                    ref={pushRel}
                    className="detail-related-project-item"
                    onClick={() => navigate(`/project/${r.id}`)}
                  >
                    <div className="detail-related-project-image-wrapper">
                      <img
                        src={r.image}
                        alt={r.title}
                        className="detail-related-project-image"
                        onError={errImg}
                      />
                      <div className="detail-related-project-overlay" />
                    </div>
                    <div className="detail-related-project-content">
                      <p className="detail-related-project-category">
                        {r.displayCategory}
                      </p>
                      <h3 className="detail-related-project-title">
                        {r.title}
                      </h3>
                      {r.label && (
                        <p className="detail-related-project-label">
                          {r.label}
                        </p>
                      )}
                      <div className="detail-related-project-divider" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL (unchanged) */}
      {modalOpen && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div className="modal-global-counter">
            {current + 1} / {project.additionalImages.length}
          </div>
          <button
            className="modal-edge-nav modal-prev-edge"
            onClick={e => {
              e.stopPropagation(); prev();
            }}
          >&#10094;</button>
          <button
            className="modal-edge-nav modal-next-edge"
            onClick={e => {
              e.stopPropagation(); next();
            }}
          >&#10095;</button>
          <div className="image-modal-content">
            <img
              src={project.additionalImages[current]}
              alt=""
              className="modal-image"
              onError={errImg}
            />
          </div>
          <div className="modal-thumb-strip" onClick={e => e.stopPropagation()}>
            {project.additionalImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className={`modal-thumb ${i === current ? "active" : ""}`}
                onClick={() => setCurrent(i)}
                onError={errImg}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

/* wrapper so every dynamic layout is clickable (unchanged) */
const GalleryWrapper = ({ Layout, images, err, open }) => {
  useEffect(() => {
    const imgs = document.querySelectorAll(".detail-gallery-section img");
    imgs.forEach(img => {
      const idx = images.indexOf(img.getAttribute("src"));
      const handler = () => open(idx);
      img.style.cursor = "pointer";
      img.removeEventListener("click", handler);
      img.addEventListener("click", handler);
    });
    return () => imgs.forEach(img => img.removeEventListener("click", open));
  }, [images, open]);

  return <Layout images={images} handleImageError={err} />;
};

export default ProjectDetailPage;
