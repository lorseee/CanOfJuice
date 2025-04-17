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
  const buttonRef = useRef(null);
  const projectRefs = useRef([]);
  const changingTextRef = useRef(null);
  const staticTextRef = useRef(null);
  const viewAllRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const rotatingTextSectionRef = useRef(null);
  
  // State for rotating text
  const [textIndex, setTextIndex] = useState(0);
  const [showFinalText, setShowFinalText] = useState(false);
  const [startTextRotation, setStartTextRotation] = useState(false);
  const rotatingTexts = [
    "ENVIRONMENTAL GRAPHICS",
    "BRAND IDENTITY",
    "WAY FINDING",
    "COMMUNICATION DESIGNS",
    "ART INSTALLATIONS",
    "MORE.."
  ];

  projectRefs.current = [];
  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  // Featured project IDs
  const featuredProjectIds = [16, 6, 18, 28, 19, 23, 11, 4];
  const featuredProjects = featuredProjectIds.map((id, index) => {
    const project = allProjects.find((p) => p.id === id);
    let className;
    switch (index) {
      case 0:
        className = "col-span-8 col-start-1 row-span-2 row-start-1 h-[80vh]";
        break;
      case 1:
        className = "col-span-4 col-start-9 row-span-1 row-start-1 h-[40vh]";
        break;
      case 2:
        className = "col-span-4 col-start-9 row-span-1 row-start-2 h-[35vh]";
        break;
      case 3:
        className = "col-span-4 col-start-1 row-span-2 row-start-3 h-[75vh]";
        break;
      case 4:
        className = "col-span-8 col-start-5 row-span-2 row-start-3 h-[75vh]";
        break;
      case 5:
        className = "col-span-4 col-start-1 row-span-1 row-start-5 h-[60vh]";
        break;
      case 6:
        className = "col-span-4 col-start-5 row-span-1 row-start-5 h-[60vh]";
        break;
      case 7:
        className = "col-span-4 col-start-9 row-span-1 row-start-5 h-[60vh]";
        break;
      default:
        className = "col-span-4 row-span-1 h-[50vh]";
    }
    
    const formattedCategory = project.category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      ...project,
      image: projectImages[project.id]?.main || projectImages.default.main,
      name: project.title,
      displayCategory: formattedCategory,
      className
    };
  });

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleViewAllClick = () => {
    navigate("/works");
  };

  // Rotating text effect
  useEffect(() => {
    if (startTextRotation && !showFinalText) {
      const interval = setInterval(() => {
        setTextIndex((prevIndex) => {
          if (prevIndex === rotatingTexts.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              setShowFinalText(true);
            }, 1500);
            return prevIndex;
          }
          return (prevIndex + 1) % rotatingTexts.length;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTextRotation, showFinalText]);

  useEffect(() => {
    if (changingTextRef.current && startTextRotation) {
      gsap.fromTo(
        changingTextRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: textIndex === rotatingTexts.length - 1 ? 1 : 0.5,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    }
  }, [textIndex, startTextRotation]);

  // Final text animation
  useEffect(() => {
    if (showFinalText && changingTextRef.current) {
      gsap.fromTo(
        changingTextRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out"
        }
      );
    }
  }, [showFinalText]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      const headingWrapper = headingWrapperRef.current;
      
      if (heading && headingWrapper) {
        // Initial reveal
        gsap.fromTo(
          heading,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingWrapper,
              start: "top 300%",
              toggleActions: "play none none reverse"
            }
          }
        );
        // Horizontal slide
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

      const rotatingTextSection = rotatingTextSectionRef.current;
      if (rotatingTextSection) {
        ScrollTrigger.create({
          trigger: rotatingTextSection,
          start: "top 80%",
          onEnter: () => {
            setStartTextRotation(true);
          },
          once: true
        });
      }

      const staticText = staticTextRef.current;
      if (staticText) {
        gsap.fromTo(
          staticText,
          { opacity: 0.8 },
          {
            opacity: 1,
            fontWeight: "900",
            color: "#ffffff",
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: staticText,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Projects
      if (projectRefs.current.length > 0) {
        gsap.set(projectRefs.current, { opacity: 0, y: 100 });
        ScrollTrigger.batch(projectRefs.current, {
          start: "top bottom-=5%",
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              stagger: 0.1,
              overwrite: true
            });
          },
          once: false
        });
        
        projectRefs.current.forEach((project, index) => {
          const image = project.querySelector("img");
          const direction = index % 2 === 0 ? 1 : -1;
          
          if (image) {
            ScrollTrigger.create({
              trigger: project,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              onUpdate: (self) => {
                gsap.to(image, {
                  y: (self.progress * 25 * direction) - (12.5 * direction),
                  scale: 1 + self.progress * 0.05,
                  duration: 0.5,
                  ease: "none"
                });
              }
            });
          }
          
          ScrollTrigger.create({
            trigger: project,
            start: "top 85%",
            end: "center center",
            scrub: 1,
            onUpdate: (self) => {
              const rotationAmount = direction * 0.5;
              gsap.to(project, {
                rotateZ: self.progress * rotationAmount,
                ease: "power1.out"
              });
            }
          });
        });
      }

      // Optional button animation
      const button = buttonRef.current;
      if (button) {
        gsap.fromTo(
          button,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: button,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // View All Projects + Lines
      const viewAllButton = viewAllRef.current;
      const leftLine = leftLineRef.current;
      const rightLine = rightLineRef.current;
      
      if (viewAllButton && leftLine && rightLine) {
        gsap.set(viewAllButton, {
          opacity: 0,
          y: 50,
          scale: 0.95
        });
        gsap.set([leftLine, rightLine], {
          width: "100px",
          opacity: 0.5
        });
        
        ScrollTrigger.create({
          trigger: viewAllButton,
          start: "top 90%",
          onEnter: () => {
            gsap.to(viewAllButton, {
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
          },
          once: false
        });
        
        viewAllButton.addEventListener("mouseenter", () => {
          gsap.to(viewAllButton, {
            scale: 1.02,
            duration: 0.3
          });
          gsap.to(leftLine, {
            width: "40vw",
            duration: 0.3,
            ease: "power4.out"
          });
          gsap.to(rightLine, {
            width: "40vw",
            duration: 0.3,
            ease: "power4.out"
          });
        });
        
        viewAllButton.addEventListener("mouseleave", () => {
          gsap.to(viewAllButton, {
            scale: 1,
            duration: 0.3
          });
          gsap.to([leftLine, rightLine], {
            width: "100px",
            duration: 0.6,
            ease: "power2.inOut"
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full overflow-hidden bg-black text-white min-h-screen"
    >
      <div className="mx-auto max-w-[1800px] px-6 md:px-12">
        <div
          ref={headingWrapperRef}
          className="w-full flex items-center h-[40vh] md:h-[50vh]"
        >
          <h2
            ref={headingRef}
            className="text-6xl md:text-8xl lg:text-[9rem] font-extrabold whitespace-nowrap w-[200%] engraving-effect"
          >
            OUR WORK — FEATURED PROJECTS — OUR WORK — FEATURED PROJECTS
          </h2>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 relative">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={addToRefs}
              className={`${project.className} relative overflow-hidden group transform transition-all duration-1000 cursor-pointer`}
              style={{
                transformOrigin: index % 2 === 0 ? "left center" : "right center"
              }}
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="relative h-full w-full overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-1200 ease-out transform-gpu"
                  />
                </div>
                <div className="absolute inset-0 opacity-20 group-hover:opacity-60 transition-opacity duration-1000 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-20">
                  <div className="transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                    <p className="text-white text-sm md:text-base font-light tracking-widest uppercase mb-2">
                      {project.displayCategory}
                    </p>
                    <h3 className="text-white text-2xl md:text-4xl font-light tracking-wide">
                      {project.name}
                    </h3>
                    <div className="mt-4 w-16 h-[1px] bg-white opacity-70 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out delay-100" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project.id);
                      }}
                      className="text-white/70 text-sm md:text-base mt-3 font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 flex items-center hover:text-white"
                      aria-label={`View ${project.name} project details`}
                    >
                      View project details{" "}
                      <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute bottom-8 right-8 w-[1px] h-8 bg-white/50 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 delay-150" />
                  <div className="absolute bottom-8 right-8 w-8 h-[1px] bg-white/50 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-150" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL PROJECTS BUTTON */}
        {/* Increased from mb-32 to mb-48 */}
        <div className="w-full flex justify-center pt-16 mb-48 overflow-hidden">
          <div
            ref={viewAllRef}
            onClick={handleViewAllClick}
            className="cursor-pointer transform relative group flex items-center"
            aria-label="View all projects"
          >
            <div
              ref={leftLineRef}
              className="h-px bg-white/50 mr-6 transition-all duration-300"
            />
            <h3 className="text-xl md:text:2xl lg:text-4xl font-light tracking-wider text-white whitespace-nowrap">
              VIEW ALL PROJECTS
            </h3>
            <div
              ref={rightLineRef}
              className="h-px bg-white/50 ml-6 transition-all duration-300"
            />
          </div>
        </div>

        {/* ROTATING TEXT SECTION */}
        {/* Increased from mb-32 to mb-48 */}
        <div
          ref={rotatingTextSectionRef}
          className="w-full flex justify-center md:h-[10vh] relative overflow-hidden cursor-pointer mb-48"
          onClick={() => navigate("/services")}
        >
          <div className="relative flex items-center flex-nowrap max-w-full px-4">
            <h2
              ref={staticTextRef}
              className="text-4xl md:text-6xl lg:text-8xl font-extrabold whitespace-nowrap mr-6 engraving-effect"
            >
              {showFinalText ? "CHECK OUT" : "WE DO"}
            </h2>
            <div className="relative overflow-hidden">
              <div className="flex items-center">
                <h2
                  ref={changingTextRef}
                  className={`text-4xl md:text-6xl lg:text-8xl font-bold whitespace-nowrap engraving-effect transition-all duration-500 ${
                    textIndex === rotatingTexts.length - 1 || showFinalText
                      ? "text-white"
                      : "text-white/80"
                  }`}
                >
                  {showFinalText
                    ? "WHAT WE DO →"
                    : startTextRotation
                    ? rotatingTexts[textIndex]
                    : rotatingTexts[0]}
                </h2>
                {showFinalText && (
                  <span
                    className="text-white text-5xl md:text-7xl lg:text-8xl ml-6 font-light"
                  >
                  </span>
                )}
              </div>
              {(textIndex === rotatingTexts.length - 1 || showFinalText) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-white/50 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
