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

  // Track current image state with console debugging
  const currentImageState = useRef({
    designs: "/images/designs.jpg",
    spaces: "/images/spaces.jpg",
    installations: "/images/installations.jpg",
    current: "designs"
  });

  // Track active section for proper image display
  const activeSection = useRef("none"); // none, designs, spaces, installations

  // Immediate scroll reset on component mount
  useEffect(() => {
    console.log("Component mounted, resetting scroll");
    // Using setTimeout with 0 delay ensures it runs after render
    setTimeout(() => window.scrollTo(0, 0), 0);
    
    // Hide image container immediately on mount
    if (slideContainerRef.current) {
      gsap.set(slideContainerRef.current, { autoAlpha: 0 });
    }
    
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

  // Debug loaded image paths
  useEffect(() => {
    console.log("Image paths:", {
      designs: currentImageState.current.designs,
      spaces: currentImageState.current.spaces,
      installations: currentImageState.current.installations
    });
  }, []);

  const updateActiveSection = (section) => {
    console.log("Setting active section:", section);
    activeSection.current = section;
    updateVisibleImage();
  };

  const updateVisibleImage = () => {
    if (!slideContainerRef.current || !frontImageRef.current) return;

    console.log("Updating visible image for section:", activeSection.current);
    
    // Only show container if we're in a valid section
    if (activeSection.current === "none" || activeSection.current === "help") {
      hideContainer();
      return;
    }

    // Switch front image based on active section
    if (frontImageRef.current) {
      frontImageRef.current.src = currentImageState.current[activeSection.current];
      
      // Show the container with the appropriate image
      gsap.to(slideContainerRef.current, { 
        duration: 0.5, 
        autoAlpha: 1,
        onStart: () => {
          console.log("Now showing image for:", activeSection.current);
        }
      });
    }
  };

  const hideContainer = () => {
    if (slideContainerRef.current) {
      gsap.to(slideContainerRef.current, { 
        duration: 0.5, 
        autoAlpha: 0,
        onComplete: () => {
          console.log("Image container hidden");
        } 
      });
    }
  };

  const hideContainerImmediately = () => {
    if (slideContainerRef.current) {
      gsap.set(slideContainerRef.current, { autoAlpha: 0 });
      console.log("Image container hidden immediately");
    }
  };

  useLayoutEffect(() => {
    // Force hide container at start
    hideContainerImmediately();
    
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

    // Create list animations for each section
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

    // Create list animations for each section - adjusted to your 90% specification
    createListAnimation(designsListRef, designsSectionRef, "top 90%", "top 60%");
    createListAnimation(spacesListRef, spacesSectionRef, "top 90%", "top 60%");
    createListAnimation(installationsListRef, installationsSectionRef, "top 90%", "top 60%");

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

    // SECTION VISIBILITY TRACKING - Show/hide appropriate images
    // DESIGNS SECTION
    if (designsSectionRef.current) {
      ScrollTrigger.create({
        trigger: designsListRef.current,  // Track the list specifically
        start: "top 90%", // Changed to 90% as requested
        end: "bottom 10%",
        onEnter: () => {
          console.log("Entered designs section");
          updateActiveSection("designs");
        },
        onLeave: () => {
          console.log("Left designs section");
          // Don't update here, let the next section handle it
        },
        onEnterBack: () => {
          console.log("Entered back designs section");
          updateActiveSection("designs");
        },
        onLeaveBack: () => {
          console.log("Left back designs section");
          updateActiveSection("none");
        }
      });
    }

    // SPACES SECTION
    if (spacesSectionRef.current) {
      ScrollTrigger.create({
        trigger: spacesListRef.current,  // Track the list specifically
        start: "top 90%",
        end: "bottom 10%",
        onEnter: () => {
          console.log("Entered spaces section");
          updateActiveSection("spaces");
        },
        onLeave: () => {
          console.log("Left spaces section");
          // Don't update here, let the next section handle it
        },
        onEnterBack: () => {
          console.log("Entered back spaces section");
          updateActiveSection("spaces");
        },
        onLeaveBack: () => {
          console.log("Left back spaces section");
          // Let the previous section handle it
        }
      });
    }

    // INSTALLATIONS SECTION
    if (installationsSectionRef.current) {
      ScrollTrigger.create({
        trigger: installationsListRef.current,  // Track the list specifically
        start: "top 90%",
        end: "bottom 10%",
        onEnter: () => {
          console.log("Entered installations section");
          updateActiveSection("installations");
        },
        onLeave: () => {
          console.log("Left installations section");
          updateActiveSection("none");
        },
        onEnterBack: () => {
          console.log("Entered back installations section");
          updateActiveSection("installations");
        },
        onLeaveBack: () => {
          console.log("Left back installations section");
          // Let previous section handle it
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
          console.log("Entered help section");
          updateActiveSection("help");
        },
        onLeave: () => {
          console.log("Left help section");
          // Don't update here
        },
        onEnterBack: () => {
          console.log("Entered back help section");
          updateActiveSection("help");
        },
        onLeaveBack: () => {
          console.log("Left back help section");
          // Check which section we're in
          if (installationsSectionRef.current && installationsListRef.current) {
            const installationsBounds = installationsListRef.current.getBoundingClientRect();
            if (installationsBounds.top < window.innerHeight * 0.9 && installationsBounds.bottom > 0) {
              updateActiveSection("installations");
              return;
            }
          }
          
          if (spacesSectionRef.current && spacesListRef.current) {
            const spacesBounds = spacesListRef.current.getBoundingClientRect();
            if (spacesBounds.top < window.innerHeight * 0.9 && spacesBounds.bottom > 0) {
              updateActiveSection("spaces");
              return;
            }
          }
          
          if (designsSectionRef.current && designsListRef.current) {
            const designsBounds = designsListRef.current.getBoundingClientRect();
            if (designsBounds.top < window.innerHeight * 0.9 && designsBounds.bottom > 0) {
              updateActiveSection("designs");
              return;
            }
          }
          
          updateActiveSection("none");
        }
      });
    }

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
        console.log("Preloading image:", src);
      });
    };
    
    preloadImages();
    
    if (frontImageRef.current && backImageRef.current) {
      // Set initial state - hidden
      frontImageRef.current.src = currentImageState.current.designs;
      gsap.set(slideContainerRef.current, { autoAlpha: 0 });
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
      {/* HERO */}
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
            onError={(e) => { 
              console.log("Hero image failed to load:", e.target.src);
              e.target.src = "/images/default.jpg"; 
            }}
          />
          <h1 className="animate-heading absolute inset-0 flex justify-center items-center text-[10vw] md:text-[7vw] lg:text-[5vw] font-extrabold text-black">
            OUR SERVICES
          </h1>
        </div>
      </ScrollWrapper>

      {/* UPDATED FLOATING IMAGE CONTAINER - SINGLE IMAGE APPROACH */}
      <div
        ref={slideContainerRef}
        className="fixed z-50 pointer-events-none rounded-2xl shadow-2xl"
        style={{
          top: "10px",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "min(600px, 90vw)", 
          overflow: "hidden",
          opacity: 0,
          visibility: "hidden",
          borderRadius: "1rem"
        }}
      >
        <div className="relative w-full h-full">
          <img
            ref={frontImageRef}
            alt="Current Section"
            src="/images/designs.jpg"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            onError={(e) => { 
              console.log("Front image failed to load:", e.target.src);
              e.target.src = "/images/default.jpg"; 
            }}
          />
          <img
            ref={backImageRef}
            style={{ display: 'none' }} // We're not using this in the new approach
            alt="Next Section"
            src="/images/spaces.jpg"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            onError={(e) => { 
              console.log("Back image failed to load:", e.target.src);
              e.target.src = "/images/default.jpg"; 
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
                Art Installations
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