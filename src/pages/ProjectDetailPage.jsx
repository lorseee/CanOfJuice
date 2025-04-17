import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects as allProjects, projectImages } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectId = parseInt(id);
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState([]);

  // Refs for animations
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const infoRef = useRef(null);
  const imagesRef = useRef(null);
  const imageRefs = useRef([]);
  const relatedProjectsRef = useRef(null);
  const relatedProjectItemsRef = useRef([]);
  const viewAllBtnRef = useRef(null);
  
  imageRefs.current = [];
  const addToImageRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };
  
  relatedProjectItemsRef.current = [];
  const addToRelatedProjectRefs = (el) => {
    if (el && !relatedProjectItemsRef.current.includes(el)) {
      relatedProjectItemsRef.current.push(el);
    }
  };

  // Helper function to determine image layout styling based on project and image index
  const getImageLayoutStyle = (projectId, imageIndex, layout, category) => {
    // Base styling with no fixed height - use aspect ratio instead
    let baseClasses = "overflow-hidden";
    
    switch(layout) {
      case "mosaic":
        // Mosaic layout with varying aspect ratios
        if (imageIndex === 0) {
          return `${baseClasses} md:col-span-2 aspect-[16/9]`;
        } else if (imageIndex % 3 === 1) {
          return `${baseClasses} aspect-square`;
        } else if (imageIndex % 3 === 2) {
          return `${baseClasses} aspect-[4/3]`;
        } else {
          return `${baseClasses} aspect-[3/2]`;
        }
      
      case "staggered":
        // Staggered layout with alternating aspect ratios
        if (imageIndex === 0) {
          return `${baseClasses} md:col-span-2 aspect-[21/9]`;
        } else if (imageIndex % 2 === 0) {
          return `${baseClasses} md:col-span-1 aspect-[3/4]`;
        } else {
          return `${baseClasses} md:col-span-1 aspect-[4/3]`;
        }
        
      case "vertical":
        // Vertical oriented layout
        if (imageIndex === 0) {
          return `${baseClasses} md:col-span-2 aspect-[16/9]`;
        } else {
          return `${baseClasses} aspect-[3/4]`;
        }
        
      case "horizontal":
        // Horizontal oriented layout
        if (imageIndex === 0) {
          return `${baseClasses} md:col-span-2 aspect-[21/9]`;
        } else if (imageIndex % 3 === 1) {
          return `${baseClasses} md:col-span-2 aspect-[16/9]`;
        } else {
          return `${baseClasses} aspect-[16/10]`;
        }
        
      case "fullwidth":
        // Each image takes full width with varying aspect ratios
        return `${baseClasses} md:col-span-2 ${imageIndex % 2 === 0 ? 'aspect-[21/9]' : 'aspect-[16/9]'}`;
        
      default:
        // Category-based layouts with aspect ratios instead of fixed heights
        if (category === "brand-identity") {
          return `${baseClasses} ${imageIndex === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'}`;
        } else if (category === "food-beverages") {
          return `${baseClasses} ${imageIndex === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`;
        } else if (category === "sports-fitness") {
          return `${baseClasses} ${imageIndex % 2 === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`;
        } else if (category === "work-spaces") {
          return `${baseClasses} ${imageIndex === 0 ? 'md:col-span-2 aspect-[16/9]' : (imageIndex % 3 === 1 ? 'aspect-[3/2]' : 'aspect-[4/3]')}`;
        } else if (category === "industrial") {
          return `${baseClasses} ${imageIndex === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[3/2]'}`;
        } else {
          // Default for other categories
          return `${baseClasses} ${imageIndex === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`;
        }
    }
  };

  // Fixed getProjectImage function to ensure consistent image retrieval
  const getProjectImage = (projectId, imageType = 'main') => {
    const id = projectId.toString();
    
    if (projectImages[id] && projectImages[id][imageType]) {
      return projectImages[id][imageType];
    }
    
    return projectImages["default"][imageType];
  };

  // Function to determine the gallery grid layout
  const getGalleryGridLayout = (layout, category) => {
    switch(layout) {
      case "mosaic":
        return "grid grid-cols-1 md:grid-cols-3 gap-6";
      case "staggered":
        return "grid grid-cols-1 md:grid-cols-2 gap-8";
      case "vertical":
        return "grid grid-cols-1 md:grid-cols-2 gap-8";
      case "horizontal":
        return "grid grid-cols-1 md:grid-cols-2 gap-6";
      case "fullwidth":
        return "grid grid-cols-1 gap-8";
      default:
        // Category-based layouts
        if (category === "brand-identity") {
          return "grid grid-cols-1 md:grid-cols-3 gap-6";
        } else if (category === "food-beverages") {
          return "grid grid-cols-1 md:grid-cols-2 gap-8";
        } else {
          return "grid grid-cols-1 md:grid-cols-2 gap-8";
        }
    }
  };

  // Logging function to help debug image paths
  const logImageInfo = (project, type) => {
    console.log(`${type} image for project ${project.id} (${project.title}):`, project.image);
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
      const mainImage = getProjectImage(fetchedProject.id, 'main');
      
      // Prepare project data using the proper image paths
      const projectData = {
        ...fetchedProject,
        displayCategory: formattedCategory,
        image: mainImage,
        // Add additional project images for gallery using the gallery array
        additionalImages: projectImages[fetchedProject.id]?.gallery || 
                          projectImages["default"].gallery,
        // Get layout type for this project
        layoutType: projectImages[fetchedProject.id]?.layout || 'default'
      };
      
      setProject(projectData);
      
      // Find related projects based on category
      const related = allProjects
        .filter(p => p.id !== projectId && p.category === fetchedProject.category)
        .slice(0, 3)
        .map(p => {
          // Get main image for each related project
          const relatedImage = getProjectImage(p.id, 'main');
          
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
      
      // Log for debugging
      console.log("Main project image:", mainImage);
      related.forEach(p => console.log(`Related project ${p.id} image:`, p.image));
      
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
        gsap.fromTo(heroRef.current,
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 1.5,
            ease: "power2.out"
          }
        );
        
        // Title animation with upward movement
        if (titleRef.current && titleRef.current.children) {
          gsap.fromTo(titleRef.current.children,
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
        gsap.fromTo(descriptionRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            }
          }
        );
        
        // Project info animation with upward movement
        gsap.fromTo(infoRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            }
          }
        );
        
        // Gallery header animation
        if (imagesRef.current && imagesRef.current.querySelector('div')) {
          gsap.fromTo(imagesRef.current.querySelector('div'),
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: imagesRef.current,
                start: "top 80%",
                end: "top 60%",
                scrub: true,
              }
            }
          );
        }
        
        // Gallery images animation with staggered upward movement
        if (imageRefs.current.length > 0) {
          gsap.fromTo(imageRefs.current,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imagesRef.current,
                start: "top 70%",
                end: "center 60%",
                scrub: true,
              }
            }
          );
        }
        
        // Related projects section animations
        if (relatedProjectsRef.current && relatedProjectsRef.current.querySelector('h2')) {
          gsap.fromTo(relatedProjectsRef.current.querySelector('h2'),
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: relatedProjectsRef.current,
                start: "top 80%",
                end: "top 60%",
                scrub: true,
              }
            }
          );
          
          // Related project items animation with staggered upward movement
          if (relatedProjectItemsRef.current.length > 0) {
            gsap.fromTo(relatedProjectItemsRef.current,
              { y: 100, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: relatedProjectsRef.current,
                  start: "top 70%",
                  end: "center 60%",
                  scrub: true,
                }
              }
            );
          }
          
          // View all button animation
          if (viewAllBtnRef.current) {
            gsap.fromTo(viewAllBtnRef.current,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: viewAllBtnRef.current,
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
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-2 border-white rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-light">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative bg-black text-white min-h-screen">
      {/* Hero section styled like ServicesPage */}
      <div className="sticky top-0 h-screen w-full z-0">
        <div ref={heroRef} className="h-full w-full flex justify-center items-center bg-black">
          <div className="w-[80%] h-[80%] mx-auto rounded-lg overflow-hidden shadow-lg relative">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            
            {/* Hero content with better positioning and visibility */}
            <div ref={titleRef} className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
              {/* Category text */}
              <p className="relative z-10 text-sm md:text-base font-light tracking-widest uppercase mb-3">
                {project.displayCategory}
              </p>
              
              {/* Title text */}
              <h1 className="relative z-10 text-4xl md:text-6xl font-bold text-white animate-heading">
                {project.title}
              </h1>
              
              <div className="relative z-10 w-24 h-[1px] bg-white opacity-70 mt-4"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project content */}
      <div className="relative z-10 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
          {/* Project description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            <div ref={descriptionRef} className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-light mb-8">About the Project</h2>
              <div className="space-y-6 text-lg font-light text-gray-300">
                <p>
                  {project.longDescription || `For ${project.title}, we developed a comprehensive design strategy that aligned with the client's vision and brand identity. The project demanded innovative approaches and meticulous attention to detail to create a seamless user experience.`}
                </p>
                {project.additionalDescription && (
                  <p>{project.additionalDescription}</p>
                )}
              </div>
            </div>
            
            {/* Project details */}
            <div ref={infoRef} className="lg:col-span-1">
              <h3 className="text-2xl font-light mb-6">Project Details</h3>
              <ul className="space-y-6">
                <li>
                  <p className="text-sm font-light uppercase tracking-widest text-gray-400 mb-1">Services</p>
                  <p className="text-lg">{project.displayCategory}</p>
                </li>
                <li>
                  <p className="text-sm font-light uppercase tracking-widest text-gray-400 mb-1">Year</p>
                  <p className="text-lg">{new Date().getFullYear()}</p>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Image gallery - Modified for proper aspect ratios */}
          <div ref={imagesRef} className="mb-24">
            {/* Gallery header as vertical display */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-light mb-4">Project</h2>
              <h2 className="text-3xl md:text-4xl font-light mb-4">Gallery</h2>
              <h2 className="text-3xl md:text-4xl font-light">Showcase</h2>
            </div>
            
            {/* Dynamic gallery layout based on project type */}
            <div className={getGalleryGridLayout(project.layoutType, project.category)}>
              {project.additionalImages.map((image, index) => {
                // Get layout style based on project and image index
                const layoutStyle = getImageLayoutStyle(
                  project.id, 
                  index, 
                  project.layoutType, 
                  project.category
                );
                
                return (
                  <div 
                    key={index}
                    ref={addToImageRefs}
                    className={layoutStyle}
                  >
                    <div className="w-full h-full relative">
                      <img 
                        src={image} 
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-105"
                        onError={handleImageError}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Related projects section */}
          {relatedProjects.length > 0 && (
            <div ref={relatedProjectsRef}>
              <h2 className="text-3xl md:text-4xl font-light mb-12">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject, index) => {
                  // Debug logging
                  console.log(`Rendering related project ${relatedProject.id} with image:`, relatedProject.image);
                  
                  return (
                    <div 
                      key={relatedProject.id}
                      ref={addToRelatedProjectRefs}
                      className="relative overflow-hidden group cursor-pointer aspect-[4/3]"
                      onClick={() => handleRelatedProjectClick(relatedProject.id)}
                    >
                      <div className="absolute inset-0">
                        <img 
                          src={relatedProject.image} 
                          alt={relatedProject.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 group-hover:bg-opacity-50 transition-all duration-500"></div>
                      </div>
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <p className="text-sm font-light tracking-widest uppercase mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          {relatedProject.displayCategory}
                        </p>
                        <h3 className="text-2xl font-light tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">{relatedProject.title}</h3>
                        <div className="mt-4 w-12 h-[1px] bg-white opacity-0 group-hover:opacity-70 transform origin-left scale-x-0 group-hover:scale-x-100 transition-all duration-500"></div>
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