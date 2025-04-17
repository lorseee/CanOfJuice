import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollWrapper from "../components/ScrollWrapper"; 

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  const heroRef = useRef(null);
  const designsSectionRef = useRef(null);
  const spacesSectionRef = useRef(null);
  const installationsSectionRef = useRef(null);
  const helpSectionRef = useRef(null);
  const footerRef = useRef(null);
  const contentContainerRef = useRef(null);

  const designsHeadingRef = useRef(null);
  const spacesHeadingRef = useRef(null);
  const installationsHeadingRef = useRef(null);

  const designsListRef = useRef(null);
  const spacesListRef = useRef(null);
  const installationsListRef = useRef(null);

  const slideContainerRef = useRef(null);
  const frontImageRef = useRef(null);
  const backImageRef = useRef(null);

  // Track current image state
  const currentImageState = useRef({
    designs: "/images/designs.jpg",
    spaces: "/images/spaces.jpg",
    installations: "/images/installations.jpg",
    current: "designs"
  });

  // Immediate scroll reset on component mount
  useEffect(() => {
    // Using setTimeout with 0 delay ensures it runs after render
    setTimeout(() => window.scrollTo(0, 0), 0);
    
    // Disable browser's scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  const showContainer = () => {
    if (slideContainerRef.current) {
      gsap.to(slideContainerRef.current, { duration: 0.5, autoAlpha: 1 });
    }
  };

  const hideContainer = () => {
    if (slideContainerRef.current) {
      gsap.to(slideContainerRef.current, { duration: 0.5, autoAlpha: 0 });
    }
  };

  useLayoutEffect(() => {
    // Animate hero heading on mount
    if (heroRef.current) {
      const heroHeading = heroRef.current.querySelector("h1");
      gsap.fromTo(heroHeading, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 });
    }

    // SECTION HEADING ANIMATIONS
    // Animate section headings with scroll trigger
    [designsHeadingRef, spacesHeadingRef, installationsHeadingRef].forEach((ref) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            },
          }
        );
      }
    });

    // IMPROVED LIST ANIMATIONS
    // Create staggered animations for each list item that sync with section transitions
    const createListAnimation = (listRef, sectionRef, startPosition, endPosition) => {
      if (!listRef.current) return;
      
      const items = listRef.current.querySelectorAll("p");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: startPosition,
          end: endPosition,
          scrub: 0.5,
        }
      });
      
      // Stagger the items with a small delay between each
      tl.fromTo(
        items,
        { 
          opacity: 0, 
          y: 20 
        },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          ease: "power2.out",
          duration: 0.4
        }
      );
      
      // Add reverse animation when scrolling back
      const reverseTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: startPosition,
          scrub: 0.5,
        }
      });
      
      reverseTimeline.fromTo(
        items,
        { 
          opacity: 1, 
          y: 0 
        },
        { 
          opacity: 0, 
          y: 20, 
          stagger: 0.05,
          ease: "power2.in",
          duration: 0.3
        }
      );
    };

    // Create list animations for each section
    createListAnimation(designsListRef, designsSectionRef, "top 75%", "top 20%");
    createListAnimation(spacesListRef, spacesSectionRef, "top 75%", "top 20%");
    createListAnimation(installationsListRef, installationsSectionRef, "top 75%", "top 20%");

    // SPACES SECTION ANIMATION
    if (spacesSectionRef.current) {
      gsap.fromTo(
        spacesSectionRef.current,
        { y: "100%" },
        {
          y: "33.33%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: spacesSectionRef.current,
            start: "top bottom",
            end: "top 33.33%",
            scrub: 0.5,
          },
        }
      );
    }
    
    // INSTALLATIONS SECTION ANIMATION - PART 1: Move into position
    if (installationsSectionRef.current) {
      gsap.fromTo(
        installationsSectionRef.current,
        { y: "100%" },
        {
          y: "66.67%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: installationsSectionRef.current,
            start: "top bottom",
            end: "top 66.67%",
            scrub: 0.5,
          },
        }
      );
      
      // INSTALLATIONS SECTION ANIMATION - PART 2: Keep sticky until help section
      gsap.fromTo(
        installationsSectionRef.current, 
        { y: "66.67%" }, 
        {
          y: "0%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: helpSectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 0.5,
          },
        }
      );
    }

    // Fade out all content and hero when help section appears
    if (contentContainerRef.current && helpSectionRef.current) {
      gsap.to(contentContainerRef.current, {
        scrollTrigger: {
          trigger: helpSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 0.5,
        },
        opacity: 0,
      });
    }

    if (heroRef.current && helpSectionRef.current) {
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: helpSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 0.5,
        },
        opacity: 0,
      });
    }

    // Hide the hero section when the designs section scrolls past it
    if (heroRef.current && designsSectionRef.current) {
      gsap.to(heroRef.current, {
        opacity: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: designsSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }

    // IMPROVED IMAGE TRANSITION LOGIC WITH PLATEAUS
    // Set up initial images and preload them to avoid flickering
    const preloadImages = () => {
      const images = [
        currentImageState.current.designs,
        currentImageState.current.spaces,
        currentImageState.current.installations
      ];
      
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
    
    if (frontImageRef.current && backImageRef.current) {
      frontImageRef.current.src = currentImageState.current.designs;
      backImageRef.current.src = currentImageState.current.spaces;
      gsap.set(backImageRef.current, { opacity: 0 });
      
      // Apply GPU acceleration to reduce flickering
      gsap.set([frontImageRef.current, backImageRef.current], {
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        perspective: 1000
      });
    }

    // Show container initially when designs section is visible
    ScrollTrigger.create({
      trigger: designsSectionRef.current,
      start: "top top",
      onEnter: showContainer,
      onLeaveBack: hideContainer,
    });

    // Create an update function for image transitions that will be used by ScrollTriggers
    // This version ensures images have plateaus of full opacity
    const updateImages = (fromImage, toImage, progress) => {
      if (!frontImageRef.current || !backImageRef.current) return;
      
      // Set the right image sources based on direction of scroll
      if (frontImageRef.current.src !== fromImage && progress < 0.5) {
        frontImageRef.current.src = fromImage;
      }
      
      if (backImageRef.current.src !== toImage) {
        backImageRef.current.src = toImage;
      }
      
      // Modified progress to create plateaus at the beginning and end
      let transitionProgress;
      
      // Only transition in the middle 60% of the scroll (20% plateau at each end)
      if (progress <= 0.2) {
        // First 20% - keep fromImage at full opacity
        transitionProgress = 0;
      } else if (progress >= 0.8) {
        // Last 20% - keep toImage at full opacity
        transitionProgress = 1;
        
        // If we're at full progress, update the front image to be the destination
        if (progress >= 0.95) {
          frontImageRef.current.src = toImage;
          gsap.set(backImageRef.current, { opacity: 0 });
        }
      } else {
        // Middle 60% - map progress from 0.2-0.8 to 0-1 for the transition
        transitionProgress = (progress - 0.2) / 0.6;
      }
      
      // Apply the opacity transition
      gsap.to(backImageRef.current, { 
        opacity: transitionProgress, 
        duration: 0.2,
        ease: "power1.inOut"
      });
    };

    // Designs to Spaces transition
    const designsToSpacesST = ScrollTrigger.create({
      trigger: spacesSectionRef.current,
      start: "top bottom",
      end: "top 33.33%",
      scrub: 0.5,
      onUpdate: (self) => {
        updateImages(
          currentImageState.current.designs,
          currentImageState.current.spaces,
          self.progress
        );
        
        // When we're nearly completed the transition, update the current image state
        if (self.progress >= 0.95) {
          currentImageState.current.current = "spaces";
        } else if (self.progress <= 0.05) {
          currentImageState.current.current = "designs";
        }
      }
    });

    // Spaces to Installations transition
    const spacesToInstallationsST = ScrollTrigger.create({
      trigger: installationsSectionRef.current,
      start: "top bottom",
      end: "top 66.67%", 
      scrub: 0.5,
      onUpdate: (self) => {
        updateImages(
          currentImageState.current.spaces,
          currentImageState.current.installations,
          self.progress
        );
        
        // When we're nearly completed the transition, update the current image state
        if (self.progress >= 0.95) {
          currentImageState.current.current = "installations";
        } else if (self.progress <= 0.05) {
          currentImageState.current.current = "spaces";
        }
      }
    });

    // Hide images when transitioning to help section
    ScrollTrigger.create({
      trigger: helpSectionRef.current,
      start: "top bottom",
      end: "top top",
      scrub: 0.5,
      onUpdate: (self) => {
        if (slideContainerRef.current) {
          gsap.to(slideContainerRef.current, { 
            autoAlpha: 1 - self.progress,
            duration: 0.2,
            ease: "power1.inOut"
          });
        }
      },
    });

    // Force scroll position to top after GSAP has initialized
    ScrollTrigger.refresh();
    window.scrollTo(0, 0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* HERO - Updated to match Works Page */}
      <ScrollWrapper
        ref={heroRef}
        id="services"
        index={0}
        className="bg-black text-white h-screen flex justify-center items-center slide-in-from-bottom"
      >
        <style>{`
          .slide-in-from-bottom {
            animation: slideInFromBottom 0.8s ease forwards;
          }
          @keyframes slideInFromBottom {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-heading {
            animation: fadeInScale 1.2s ease-in-out forwards;
          }
          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>

        <div className="w-[80%] h-[80%] mx-auto rounded-lg overflow-hidden shadow-lg">
          <img
            src="/images/services-hero.jpg"
            alt="Services Hero"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "/images/default.jpg"; }}
          />
          <h1 className="animate-heading absolute inset-0 flex justify-center items-center text-[10vw] md:text-[7vw] lg:text-[5vw] font-extrabold text-black">
            OUR SERVICES
          </h1>
        </div>
      </ScrollWrapper>

      {/* IMAGE CONTAINER - Improved to reduce flickering and maintain full opacity plateaus */}
      <div
        ref={slideContainerRef}
        className="fixed z-50 pointer-events-none rounded-2xl shadow-2xl"
        style={{
          top: "10px",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "400px",
          overflow: "hidden",
          opacity: 0,
          borderRadius: "1rem",
          willChange: "opacity, transform",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="relative w-full h-full">
          <img
            ref={frontImageRef}
            alt="Current Section"
            src="/images/designs.jpg"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            style={{ 
              willChange: "opacity", 
              backfaceVisibility: "hidden",
              transform: "translateZ(0)", // Force GPU acceleration
            }}
          />
          <img
            ref={backImageRef}
            alt="Next Section"
            src="/images/spaces.jpg"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            style={{ 
              willChange: "opacity", 
              backfaceVisibility: "hidden",
              transform: "translateZ(0)", // Force GPU acceleration
              opacity: 0 
            }}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div ref={contentContainerRef} style={{ height: "400vh" }}>
        {/* DESIGNS */}
        <div
          ref={designsSectionRef}
          className="h-screen sticky top-0 z-10 bg-gray-50 text-black overflow-hidden"
        >
          <div className="container mx-auto px-8 py-4 h-full flex items-start">
            <div className="w-1/3 pr-4">
              <h3 ref={designsHeadingRef} className="text-4xl font-bold">
                Visual Design
              </h3>
            </div>
            <div ref={designsListRef} className="w-2/3 text-right">
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Web Design</p>
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Logo Design</p>
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Brand Identity</p>
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Packaging Design</p>
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Communication Design</p>
            </div>
          </div>
        </div>

        {/* SPACES */}
        <div
          ref={spacesSectionRef}
          className="h-screen sticky top-0 z-20 bg-[#20355f] text-gray-200 overflow-hidden"
        >
          <div className="container mx-auto px-8 py-4 h-full flex items-start">
            <div className="w-1/3 pr-4">
              <h3 ref={spacesHeadingRef} className="text-4xl font-bold">
                Space Design
              </h3>
            </div>
            <div ref={spacesListRef} className="w-2/3 text-right">
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Retail Display</p>
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Exhibition Design</p>
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Branded Environments</p>
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Environmental Graphics</p>
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Wayfinding and Signages</p>
            </div>
          </div>
        </div>

        {/* INSTALLATIONS */}
        <div
          ref={installationsSectionRef}
          className="h-screen sticky top-0 z-30 bg-black text-white overflow-hidden"
        >
          <div className="container mx-auto px-8 py-4 h-full flex items-start">
            <div className="w-1/3 pr-4">
              <h3 ref={installationsHeadingRef} className="text-4xl font-bold">
                LED Installations
              </h3>
            </div>
            <div ref={installationsListRef} className="w-2/3 text-right">
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Wall Murals</p>
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Fine Art Printing</p>
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Custom Wallpapers</p>
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Store Window Display</p>
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Custom Art Installations</p>
              <p className="text-xl" style={{ willChange: "opacity, transform" }}>Signages & Name Boards</p>
            </div>
          </div>
        </div>
      </div>

      {/* HELP SECTION */}
      <div
        ref={helpSectionRef}
        className="h-[50vh] flex items-center justify-center bg-white text-black relative z-40"
      >
        <h2 className="text-5xl font-bold">Need a Hand? We're happy to help!</h2>
      </div>
    </div>
  );
};

export default ServicesPage;