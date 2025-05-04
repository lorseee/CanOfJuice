import React, { useEffect, useRef, useState, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------
   1. Pre-declare every gallery layout file in /layouts
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
  
  /* -------- state for the image modal ----- */
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /* -------- state for the dynamic component ----- */
  const [GalleryLayout, setGalleryLayout] = useState(null);

  /* -------------------- refs -------------------- */
  const detailHeroRef = useRef(null);
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

  /* ---------------------------------------------------
     2. Fetch project data & choose gallery-layout file
  --------------------------------------------------- */
  useEffect(() => {
    // Scroll to top when projectId changes or on initial load
    window.scrollTo(0, 0);
    
    const fetched = projects.items.find((p) => p.id === projectId);
    if (!fetched) return navigate("/404");

    /* prettify the category */
    const displayCategory = fetched.category
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    setProject({
      ...fetched,
      displayCategory,
      image: fetched.images.main,
      additionalImages: fetched.images.gallery || [],
    });

    // Find related projects with the same category
    const related = projects.items
      .filter(p => p.category === fetched.category && p.id !== projectId)
      .slice(0, 3);
      
    const relatedWithImages = related.map(p => ({
      ...p,
      displayCategory: p.category
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      image: p.images.main
    }));
      
    setRelatedProjects(relatedWithImages);

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
      /* section triggers */
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
      /* related projects fade-ups */
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
    e.target.src = "/images/placeholder.jpg"; // Adjust with your placeholder path
  };
  
  /* -------------- modal handlers ----------------- */
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
    // Prevent scrolling when modal is open
    document.body.classList.add('modal-open');
  };
  
  const closeModal = () => {
    setModalOpen(false);
    // Re-enable scrolling
    document.body.classList.remove('modal-open');
  };
  
  const nextImage = (e) => {
    if (e) {
      e.stopPropagation(); // Prevent closing modal when clicking navigation
    }
    if (project && project.additionalImages) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % project.additionalImages.length
      );
    }
  };
  
  const prevImage = (e) => {
    if (e) {
      e.stopPropagation(); // Prevent closing modal when clicking navigation
    }
    if (project && project.additionalImages) {
      setCurrentImageIndex((prev) => 
        (prev - 1 + project.additionalImages.length) % project.additionalImages.length
      );
    }
  };

  /* -------------- function to stop propagation in modal content -------------- */
  const handleModalContentClick = (e) => {
    e.stopPropagation(); // Stop the click from propagating to overlay
  };

  /* -------------- keyboard navigation for modal ----------------- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Add touchstart event listeners for mobile swipe
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e) => {
      if (!modalOpen) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      // Swipe threshold
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe left, go to next
          nextImage();
        } else {
          // Swipe right, go to previous
          prevImage();
        }
      }
    };
    
    let touchStartX = 0;
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [modalOpen, project]);

  /* -------------- loading guard ----------------- */
  if (isLoading || !project) {
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
      {/* HERO - Full Screen ------------------------------------------------ */}
      <div className="detail-hero-container">
        <div ref={detailHeroRef} className="detail-hero-inner">
          <div className="detail-hero-image-container">
            <img
              src={project.image}
              alt={project.title}
              className="detail-hero-image"
              onError={handleImageError}
            />
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
              <h2>{project.title}</h2>
              <div className="detail-description-text">
                <p>
                  {project.longDescription ||
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
                    {project.year || new Date().getFullYear()}
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

          {/*  GALLERY – dynamic layout with clickable images */}
          {project.additionalImages && project.additionalImages.length > 0 && (
            <div
              ref={detailImagesRef}
              className="detail-gallery-section"
            >
              <div ref={detailGalleryRef} className="detail-gallery-container">
                {/* If no dynamic layout is available, show a simple grid */}
                {!GalleryLayout ? (
                  <div className="detail-gallery-grid">
                    {project.additionalImages.map((img, index) => (
                      <div key={index} className="detail-gallery-item">
                        <img
                          src={img}
                          alt={`${project.title} - Image ${index + 1}`}
                          onClick={() => openModal(index)}
                          onError={handleImageError}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Suspense fallback={<p>Loading gallery…</p>}>
                    <ImageGalleryWrapper
                      Layout={GalleryLayout}
                      projectId={project.id}
                      images={project.additionalImages}
                      handleImageError={handleImageError}
                      openModal={openModal}
                    />
                  </Suspense>
                )}
              </div>
            </div>
          )}

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
                      {rp.label && (
                        <p className="detail-related-project-label">
                          {rp.label}
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
      
      {/* Image Modal - Fullscreen and closable by clicking anywhere */}
      {modalOpen && project.additionalImages && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div className="image-modal-content" onClick={handleModalContentClick}>
            <img 
              src={project.additionalImages[currentImageIndex]} 
              alt={`Project image ${currentImageIndex + 1}`}
              className="modal-image"
              onError={handleImageError}
            />
            
            <button 
              className="modal-close-btn" 
              onClick={closeModal}
              aria-label="Close image modal"
            >
              &times;
            </button>
            
            <div className="modal-navigation">
              <button 
                className="modal-nav-btn modal-prev-btn"
                onClick={prevImage}
                aria-label="Previous image"
              >
                &#10094;
              </button>
              
              <div className="modal-counter">
                {currentImageIndex + 1} / {project.additionalImages.length}
              </div>
              
              <button 
                className="modal-nav-btn modal-next-btn"
                onClick={nextImage}
                aria-label="Next image"
              >
                &#10095;
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

// Wrapper component for gallery to make images clickable
const ImageGalleryWrapper = ({ Layout, projectId, images, handleImageError, openModal }) => {
  // Add click handler to the rendered gallery
  React.useEffect(() => {
    // Find all gallery images after the component has rendered
    const galleryImages = document.querySelectorAll('.detail-gallery-section img');
    galleryImages.forEach((img, index) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => openModal(index));
    });
    
    return () => {
      // Cleanup
      galleryImages.forEach((img) => {
        img.removeEventListener('click', openModal);
      });
    };
  }, [openModal]);
  
  return (
    <Layout 
      projectId={projectId}
      images={images}
      handleImageError={handleImageError}
    />
  );
};

export default ProjectDetailPage;