import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects as allProjects, projectImages } from "../constants";
import GalleryLayout from "../layouts/GalleryLayouts.jsx";


gsap.registerPlugin(ScrollTrigger);

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectId = parseInt(id);
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState([]);

  // Refs for animations with unique names
  const detailHeroRef = useRef(null);
  const detailTitleRef = useRef(null);
  const detailDescriptionRef = useRef(null);
  const detailInfoRef = useRef(null);
  const detailImagesRef = useRef(null);
  const detailGalleryRef = useRef(null); // New ref for the gallery section
  const detailRelatedProjectsRef = useRef(null);
  const detailRelatedProjectItemsRef = useRef([]);
  const detailViewAllBtnRef = useRef(null);
  
  detailRelatedProjectItemsRef.current = [];
  const addToDetailRelatedProjectRefs = (el) => {
    if (el && !detailRelatedProjectItemsRef.current.includes(el)) {
      detailRelatedProjectItemsRef.current.push(el);
    }
  };

  // Fixed getProjectImage function to ensure consistent image retrieval
  const getDetailProjectImage = (projectId, imageType = 'main') => {
    const id = projectId.toString();
    
    if (projectImages[id] && projectImages[id][imageType]) {
      return projectImages[id][imageType];
    }
    
    return projectImages["default"][imageType];
  };

  useEffect(() => {
    // Fetch project data
    const fetchedProject = allProjects.find(p => p.id === projectId);
    
    if (fetchedProject) {
      // Format category for display
      const formattedCategory = fetchedProject.category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Get main image for the current project
      const mainImage = getDetailProjectImage(fetchedProject.id, 'main');
      
      // Prepare project data using the proper image paths
      const projectData = {
        ...fetchedProject,
        displayCategory: formattedCategory,
        image: mainImage,
        // Add additional project images for gallery using the gallery array
        additionalImages: projectImages[fetchedProject.id]?.gallery || 
                          projectImages["default"].gallery
      };
      
      setProject(projectData);
      
      // Find related projects based on category
      const related = allProjects
        .filter(p => p.id !== projectId && p.category === fetchedProject.category)
        .slice(0, 3)
        .map(p => {
          // Get main image for each related project
          const relatedImage = getDetailProjectImage(p.id, 'main');
          
          const formattedRelatedCategory = p.category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
            
          return {
            ...p,
            image: relatedImage,
            displayCategory: formattedRelatedCategory
          };
        });
      
      setRelatedProjects(related);
      setIsLoading(false);
    } else {
      // Handle project not found
      navigate('/404');
    }
  }, [projectId, navigate]);

  useEffect(() => {
    if (!isLoading) {
      // Initialize animations
      const ctx = gsap.context(() => {
        // Hero section animation
        gsap.fromTo(detailHeroRef.current,
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 1.5,
            ease: "power2.out"
          }
        );
        
        // Title animation with upward movement
        if (detailTitleRef.current && detailTitleRef.current.children) {
          gsap.fromTo(detailTitleRef.current.children,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.2,
              ease: "power3.out"
            }
          );
        }
        
        // Description section animation with upward movement
        gsap.fromTo(detailDescriptionRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: detailDescriptionRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            }
          }
        );
        
        // Project info animation with upward movement
        gsap.fromTo(detailInfoRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: detailInfoRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            }
          }
        );
        
        // Gallery header animation
        if (detailImagesRef.current && detailImagesRef.current.querySelector('div')) {
          gsap.fromTo(detailImagesRef.current.querySelector('div'),
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: detailImagesRef.current,
                start: "top 80%",
                end: "top 60%",
                scrub: true,
              }
            }
          );
        }
        
        // Gallery section animation
        if (detailGalleryRef.current) {
          gsap.fromTo(detailGalleryRef.current,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: detailGalleryRef.current,
                start: "top 70%",
                end: "center 60%",
                scrub: true,
              }
            }
          );
        }
        
        // Related projects section animations
        if (detailRelatedProjectsRef.current && detailRelatedProjectsRef.current.querySelector('h2')) {
          gsap.fromTo(detailRelatedProjectsRef.current.querySelector('h2'),
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
              }
            }
          );
          
          // Related project items animation with staggered upward movement
          if (detailRelatedProjectItemsRef.current.length > 0) {
            gsap.fromTo(detailRelatedProjectItemsRef.current,
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
                }
              }
            );
          }
          
          // View all button animation
          if (detailViewAllBtnRef.current) {
            gsap.fromTo(detailViewAllBtnRef.current,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: detailViewAllBtnRef.current,
                  start: "top 90%",
                  end: "top 70%",
                  scrub: true,
                }
              }
            );
          }
        }
      });
  
      return () => ctx.revert();
    }
  }, [isLoading]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRelatedProjectClick = (id) => {
    navigate(`/project/${id}`);
    // Scroll to top when navigating to a new project
    window.scrollTo(0, 0);
  };

  const handleImageError = (e) => {
    console.log("Image failed to load:", e.target.src);
    e.target.src = projectImages["default"].main;
  };

  if (isLoading) {
    return (
      <div className="detail-loading-container">
        <div className="detail-loading-flex">
          <div className="detail-loading-spinner"></div>
          <p className="detail-loading-text">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="detail-page-main">
      {/* Hero section */}
      <div className="detail-hero-container">
        <div ref={detailHeroRef} className="detail-hero-inner">
          <div className="detail-hero-image-container">
            <img 
              src={project.image} 
              alt={project.title}
              className="detail-hero-image"
              onError={handleImageError}
            />
            
            {/* Hero content */}
            <div ref={detailTitleRef} className="detail-hero-content">
              {/* Category text */}
              <p className="detail-hero-category">
                {project.displayCategory}
              </p>
              
              {/* Title text */}
              <h1 className="detail-hero-title detail-animate-heading">
                {project.title}
              </h1>
              
              <div className="detail-hero-divider"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project content */}
      <div className="detail-project-content">
        <div className="detail-content-inner">
          {/* Project description */}
          <div className="detail-project-description-grid">
            <div ref={detailDescriptionRef} className="detail-description-section">
              <h2>About the Project</h2>
              <div className="detail-description-text">
                <p>
                  {project.longDescription || `For ${project.title}, we developed a comprehensive design strategy that aligned with the client's vision and brand identity. The project demanded innovative approaches and meticulous attention to detail to create a seamless user experience.`}
                </p>
                {project.additionalDescription && (
                  <p>{project.additionalDescription}</p>
                )}
              </div>
            </div>
            
            {/* Project details */}
            <div ref={detailInfoRef} className="detail-info-section">
              <h3>Project Details</h3>
              <ul className="detail-info-list">
                <li>
                  <p className="detail-info-label">Services</p>
                  <p className="detail-info-value">{project.displayCategory}</p>
                </li>
                <li>
                  <p className="detail-info-label">Year</p>
                  <p className="detail-info-value">{new Date().getFullYear()}</p>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Image gallery */}
          <div ref={detailImagesRef} className="detail-gallery-section">
            {/* Gallery header as vertical display */}
            <div className="detail-gallery-header">
              <h2 className="detail-gallery-title">Project</h2>
              <h2 className="detail-gallery-title">Gallery</h2>
              <h2 className="detail-gallery-title">Showcase</h2>
            </div>
            
            {/* Import gallery layout based on project ID */}
            <div ref={detailGalleryRef}>
              <GalleryLayout 
                projectId={project.id}
                images={project.additionalImages}
                handleImageError={handleImageError}
              />
            </div>
          </div>
          
          {/* Related projects section */}
          {relatedProjects.length > 0 && (
            <div ref={detailRelatedProjectsRef} className="detail-related-projects-section">
              <h2>Related Projects</h2>
              <div className="detail-related-projects-grid">
                {relatedProjects.map((relatedProject, index) => {
                  return (
                    <div 
                      key={relatedProject.id}
                      ref={addToDetailRelatedProjectRefs}
                      className="detail-related-project-item"
                      onClick={() => handleRelatedProjectClick(relatedProject.id)}
                    >
                      <div className="detail-related-project-image-wrapper">
                        <img 
                          src={relatedProject.image} 
                          alt={relatedProject.title}
                          className="detail-related-project-image"
                          onError={handleImageError}
                        />
                        <div className="detail-related-project-overlay"></div>
                      </div>
                      
                      <div className="detail-related-project-content">
                        <p className="detail-related-project-category">
                          {relatedProject.displayCategory}
                        </p>
                        <h3 className="detail-related-project-title">{relatedProject.title}</h3>
                        <div className="detail-related-project-divider"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProjectDetailPage;