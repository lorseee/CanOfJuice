import React, { useEffect, useRef, useState, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../constants";


gsap.registerPlugin(ScrollTrigger);

/* lazy gallery layouts */
const layoutModules = import.meta.glob(
  "../layouts/ProjectLayouts/GalleryLayouts*.jsx"
);

const ProjectDetailPage = () => {
  const { id }      = useParams();
  const projectId   = Number(id);
  const navigate    = useNavigate();

  const [project,  setProject]  = useState(null);
  const [isLoading,setLoading]  = useState(true);
  const [related,  setRelated]  = useState([]);
  const [Gallery,  setGallery]  = useState(null);

  /* modal */
  const [modalOpen,setModal]    = useState(false);
  const [current,  setCurrent]  = useState(0);

  /* refs */
  const heroRef = useRef(null);
  const descRef = useRef(null);
  const infoRef = useRef(null);
  const imgsRef = useRef(null);
  const galRef  = useRef(null);
  const relWrap = useRef(null);
  const relItms = useRef([]);
  relItms.current = [];
  const pushRel = (el) =>
    el && !relItms.current.includes(el) && relItms.current.push(el);

  /* ───────── fetch data / layout ───────── */
  useEffect(() => {
    window.scrollTo(0, 0);

    const p = projects.items.find((x) => x.id === projectId);
    if (!p) return navigate("/404");

    const catArr = Array.isArray(p.category) ? p.category : [p.category];
    const displayCategory =
      projects.categories.find((c) => c.id === catArr[0])?.label ?? catArr[0];

    setProject({
      ...p,
      categories: catArr,
      displayCategory,
      image: p.images.main,
      additionalImages: p.images.gallery || [],
    });

    /* related */
    setRelated(
      projects.items
        .filter((x) => {
          const arr = Array.isArray(x.category) ? x.category : [x.category];
          return x.id !== projectId && arr.some((c) => catArr.includes(c));
        })
        .slice(0, 3)
        .map((x) => {
          const first = (Array.isArray(x.category) ? x.category : [x.category])[0];
          return {
            ...x,
            displayCategory:
              projects.categories.find((c) => c.id === first)?.label ?? first,
            image: x.images.cover,
          };
        })
    );

    const path     = `../layouts/ProjectLayouts/GalleryLayouts${projectId}.jsx`;
    const fallback = "../layouts/ProjectLayouts/GalleryLayoutsDefault.jsx";
    (layoutModules[path] ?? layoutModules[fallback])()
      .then((mod) => {
        setGallery(() => mod.default);
        setLoading(false);
      });
  }, [projectId, navigate]);

  /* ───────── GSAP entrances ───────── */
  useEffect(() => {
    if (isLoading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });

      [descRef, infoRef, imgsRef, galRef].forEach((r) => {
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
              end:   "top 50%",
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
              end:   "top 60%",
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          relItms.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            scrollTrigger: {
              trigger: relWrap.current,
              start: "top 70%",
              end:   "center 60%",
              scrub: true,
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, [isLoading]);

  /* ───────── modal helpers ───────── */
  const openModal  = (i) => { setCurrent(i); setModal(true);  document.body.classList.add("modal-open"); };
  const closeModal = (e) => { if (e){e.stopPropagation();} setModal(false); document.body.classList.remove("modal-open"); };
  const next = () => setCurrent((i) => (i + 1) % project.additionalImages.length);
  const prev = () => setCurrent((i) => (i - 1 + project.additionalImages.length) % project.additionalImages.length);
  const errImg = (e) => (e.currentTarget.src = "/images/placeholder.jpg");

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
  const formattedServices = (project.services || project.displayCategory || "")
  .split(",")
  .map((svc) => svc.trim()) // remove leading/trailing spaces
  .filter((svc) => svc.length > 0)
  .sort((a, b) => a.length - b.length); // sort shortest to longest
  /* =======================  RENDER  ======================= */
  return (
    <main className="detail-page-main">

      {/* ── HERO (75 % black, 25 % white) ── */}
      <header ref={heroRef} className="detail-hero-container">
        <div className="detail-hero-bg-split" />
        <div className="detail-hero-image-container">
          <img
            src={project.image}
            alt={project.title}
            className="detail-hero-image"
            onError={errImg}
          />
        </div>
      </header>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <section className="detail-project-content">
        <div className="detail-content-inner">

          {/* description + info */}
          <div ref={descRef} className="detail-project-description-grid">
            <div className="detail-description-section">
              <h2>{project.title}</h2>
              <div className="detail-description-text">
                <p>
                  {project.longDescription ||
                   `For ${project.title}, we developed a comprehensive design strategy aligned with the client’s brand vision.`}
                </p>
                {project.additionalDescription && <p>{project.additionalDescription}</p>}
              </div>

            
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
  {formattedServices.map((svc, idx) => (
    <span key={idx} className="block">{svc}</span>
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

          {/* gallery */}
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
                         className="w-full h-64 object-cover rounded-lg shadow-md transition-opacity duration-300 hover:opacity-85 cursor-pointer"

                        />
                        <div className="detail-gallery-overlay" />
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

          {/* related */}
          {related.length > 0 && (
            <div ref={relWrap} className="detail-related-projects-section">
              <h2>Related&nbsp;Projects</h2>
              <div className="detail-related-projects-grid">
                {related.map((r) => (
                  <article
                    key={r.id}
                    ref={pushRel}
                    className="detail-related-project-item"
                    onClick={() => {
                      if (r.id === 2) {
                        navigate("/case-studies/2"); // Wework
                      } else if (r.id === 17) {
                        navigate("/case-studies/17"); // Banana Sport
                      } else if (r.id === 10) {
                        navigate("/case-studies/10"); // Farm Stories
                      } else {
                        navigate(`/project/${r.id}`);
                      }
                    }}
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
                      <p className="detail-related-project-category">{r.displayCategory}</p>
                      <h3 className="detail-related-project-title">{r.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── MODAL ─────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <button
            className="modal-close-btn"
            onClick={(e) => { e.stopPropagation(); closeModal(); }}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24"
                 fill="none" stroke="white" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            className="modal-edge-nav modal-prev-edge"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >&#10094;</button>

          <button
            className="modal-edge-nav modal-next-edge"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >&#10095;</button>

          <div className="image-modal-content">
            <img
              src={project.additionalImages[current]}
              alt=""
              className="modal-image"
              onError={errImg}
            />
          </div>

          <div className="modal-thumb-strip" onClick={(e) => e.stopPropagation()}>
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

/* clickable wrapper */
const GalleryWrapper = ({ Layout, images, err, open }) => {
  useEffect(() => {
    const imgs = document.querySelectorAll(".detail-gallery-section img");
    imgs.forEach((img) => {
      const idx = images.indexOf(img.getAttribute("src"));
      const handler = () => open(idx);
      img.style.cursor = "pointer";
      img.removeEventListener("click", handler);
      img.addEventListener("click", handler);
    });
    return () => imgs.forEach((img) => img.removeEventListener("click", open));
  }, [images, open]);

  return <Layout images={images} handleImageError={err} />;
};

export default ProjectDetailPage;
