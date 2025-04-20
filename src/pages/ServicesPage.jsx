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

  // Track section visibility
  const visibilityState = useRef({
    inContentSections: false,
    inHelpSection: false
  });

  // Immediate scroll reset on component mount
  useEffect(() => {
    // Using setTimeout with 0 delay ensures it runs after render
    setTimeout(() => window.scrollTo(0, 0), 0);
    
    // Disable browser's scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Set up event listener for hash changes (footer navigation)
    const handleHashChange = () => {
      // Check if hash indicates footer or help section
      if (window.location.hash === "#help" || window.location.hash === "#footer") {
        hideContainerImmediately();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Check hash on initial load
    handleHashChange();
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const showContainer = () => {
    if (slideContainerRef.current) {
      // Only show if we're in content sections and not in help section
      if (visibilityState.current.inContentSections && !visibilityState.current.inHelpSection) {
        gsap.to(slideContainerRef.current, { duration: 0.5, autoAlpha: 1 });
      }
    }
  };

  const hideContainer = () => {
    if (slideContainerRef.current) {
      gsap.to(slideContainerRef.current, { duration: 0.5, autoAlpha: 0 });
    }
  };

  const hideContainerImmediately = () => {
    if (slideContainerRef.current) {
      gsap.set(slideContainerRef.current, { autoAlpha: 0 });
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

    // COMPLETELY REVISED IMAGE TRANSITION LOGIC
    // Preload images to avoid flickering
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
      // Set initial state
      frontImageRef.current.src = currentImageState.current.designs;
      backImageRef.current.src = currentImageState.current.spaces;
      gsap.set(backImageRef.current, { opacity: 0 });
      
      // Apply rendering optimizations
      gsap.set([frontImageRef.current, backImageRef.current], {
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)" // Force GPU acceleration
      });
      
      // Ensure image container is hidden initially
      gsap.set(slideContainerRef.current, { autoAlpha: 0 });
    }

    // CONTENT SECTION VISIBILITY TRACKING
    // Create a ScrollTrigger to track when we're in the content sections
    if (contentContainerRef.current) {
      ScrollTrigger.create({
        trigger: contentContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => {
          visibilityState.current.inContentSections = true;
          // Only show if we're not in help section
          if (!visibilityState.current.inHelpSection) {
            showContainer();
          }
        },
        onLeave: () => {
          visibilityState.current.inContentSections = false;
          hideContainer();
        },
        onEnterBack: () => {
          visibilityState.current.inContentSections = true;
          // Only show if we're not in help section
          if (!visibilityState.current.inHelpSection) {
            showContainer();
          }
        },
        onLeaveBack: () => {
          visibilityState.current.inContentSections = false;
          hideContainer();
        }
      });
    }

    // HELP SECTION VISIBILITY TRACKING
    if (helpSectionRef.current) {
      ScrollTrigger.create({
        trigger: helpSectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          visibilityState.current.inHelpSection = true;
          hideContainerImmediately(); // Hide immediately when help section appears
        },
        onLeave: () => {
          visibilityState.current.inHelpSection = false;
          // Only show if we're in content sections
          if (visibilityState.current.inContentSections) {
            showContainer();
          }
        },
        onEnterBack: () => {
          visibilityState.current.inHelpSection = true;
          hideContainerImmediately();
        },
        onLeaveBack: () => {
          visibilityState.current.inHelpSection = false;
          // Only show if we're in content sections
          if (visibilityState.current.inContentSections) {
            showContainer();
          }
        }
      });
    }

    // IMPROVED IMAGE TRANSITION FUNCTION
    // This function handles the image swap with clearer transition thresholds
    const transitionImages = (fromSection, toSection, fromImage, toImage) => {
      ScrollTrigger.create({
        trigger: toSection.current,
        start: "top 66.67%", // Start transition earlier (when next section is 1/3 into view)
        end: "top 33.33%",   // Complete transition when next section is 2/3 into view
        scrub: true,
        onUpdate: (self) => {
          if (!frontImageRef.current || !backImageRef.current) return;
          
          // Make sure we have the correct images loaded
          if (self.progress === 0) {
            frontImageRef.current.src = fromImage;
            backImageRef.current.src = toImage;
            gsap.set(backImageRef.current, { opacity: 0 });
            return;
          }
          
          // When transition is complete, swap the images and reset
          if (self.progress === 1) {
            frontImageRef.current.src = toImage;
            backImageRef.current.src = toImage;
            gsap.set(backImageRef.current, { opacity: 0 });
            return;
          }
          
          // During transition - use a step function for cleaner transitions
          // Only start the transition once we're 50% through the scroll trigger
          const threshold = 0.5;
          let opacity;
          
          if (self.progress < threshold) {
            // Show first image fully until threshold
            opacity = 0;
          } else {
            // After threshold, quickly transition to second image
            // Map progress from 0.5-1.0 to 0-1
            opacity = (self.progress - threshold) * (1 / (1 - threshold));
          }
          
          gsap.to(backImageRef.current, { 
            opacity: opacity, 
            duration: 0.1, // Faster transition for snappier feel
            overwrite: true
          });
        }
      });
    };

    // Set up transitions between sections
    if (designsSectionRef.current && spacesSectionRef.current && installationsSectionRef.current) {
      transitionImages(
        designsSectionRef,
        spacesSectionRef,
        currentImageState.current.designs,
        currentImageState.current.spaces
      );
      
      transitionImages(
        spacesSectionRef,
        installationsSectionRef,
        currentImageState.current.spaces,
        currentImageState.current.installations
      );
    }

    // Handle direct navigation - if we start at a hash like #help or #footer
    if (window.location.hash === "#help" || window.location.hash === "#footer") {
      hideContainerImmediately();
    }

    // Force scroll position to top after GSAP has initialized
    ScrollTrigger.refresh();
    
    // Only reset to top if not at a specific hash
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

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

      {/* IMPROVED IMAGE CONTAINER - Responsive width for larger screens */}
      <div
        ref={slideContainerRef}
        className="fixed z-50 pointer-events-none rounded-2xl shadow-2xl"
        style={{
          top: "10px",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "min(600px, 90vw)", // Wider container on larger screens
          overflow: "hidden",
          opacity: 0, // Start hidden
          visibility: "hidden", // Start hidden
          borderRadius: "1rem",
          willChange: "opacity, transform",
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d" // Better 3D handling
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
        id="help"
        className="h-[50vh] flex items-center justify-center bg-white text-black relative z-40"
      >
        <h2 className="text-5xl font-bold">Need a Hand? We're happy to help!</h2>
      </div>
    </div>
  );
};

export default ServicesPage;