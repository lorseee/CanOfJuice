// ServicesLists.jsx - modified version
import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollWrapper from "../components/ScrollWrapper"; 
import ServicesHero from "./Services-hero";

gsap.registerPlugin(ScrollTrigger);

const ServicesLists = () => {
  const heroRef = useRef(null);
  const designsSectionRef = useRef(null);
  const spacesSectionRef = useRef(null);
  const installationsSectionRef = useRef(null);
  const helpSectionRef = useRef(null);
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
  
  // Track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Track current image state with console debugging
  const currentImageState = useRef({
    designs: "/images/designs.jpg",
    spaces: "/images/spaces.jpg",
    installations: "/images/installations.jpg",
    current: "designs"
  });

  // Track active section for proper image display
  const activeSection = useRef("none"); // none, designs, spaces, installations
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Don't attempt to scroll on component mount 
  // Remove the section-specific scrolling from this component

  // Immediate scroll reset on component mount
  useEffect(() => {
    // Hide image container immediately on mount
    if (slideContainerRef.current) {
      gsap.set(slideContainerRef.current, { autoAlpha: 0 });
    }
    
    // Set up event listener for hash changes (footer navigation)
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      // Hide container for footer/help
      if (hash === "#help" || hash === "#footer") {
        hideContainerImmediately();
        return;
      }
      
      // Handle specific section navigation
      if (hash === "#designs") {
        updateActiveSection("designs");
      } else if (hash === "#spaces") {
        updateActiveSection("spaces");
      } else if (hash === "#installations") {
        updateActiveSection("installations");
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Check hash on initial load
    handleHashChange();
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Add id attributes to each section for hash navigation
  useEffect(() => {
    // Ensure all sections have IDs for hash navigation
    if (designsSectionRef.current) {
      designsSectionRef.current.id = "designs";
    }
    
    if (spacesSectionRef.current) {
      spacesSectionRef.current.id = "spaces";
    }
    
    if (installationsSectionRef.current) {
      installationsSectionRef.current.id = "installations";
    }
  }, []);

  // Handle hash changes
  const handleHashChange = () => {
    const hash = window.location.hash;
    
    // Hide container for footer/help
    if (hash === "#help" || hash === "#footer") {
      hideContainerImmediately();
      return;
    }
    
    // Handle specific section navigation
    if (hash === "#designs") {
      updateActiveSection("designs");
    } else if (hash === "#spaces") {
      updateActiveSection("spaces");
    } else if (hash === "#installations") {
      updateActiveSection("installations");
    }
  };

  const updateActiveSection = (section) => {
    console.log("Setting active section:", section);
    
    // Only process section changes
    if (activeSection.current !== section) {
      const previousSection = activeSection.current;
      activeSection.current = section;
      
      // Perform image transition when changing between valid sections
      if (section !== "none" && section !== "help" && previousSection !== "none" && previousSection !== "help") {
        crossfadeImages(previousSection, section);
      } else {
        // Simply update visibility
        updateVisibleImage();
      }
    }
  };

  // New function to handle the crossfade between images
  const crossfadeImages = (fromSection, toSection) => {
    if (!slideContainerRef.current || !frontImageRef.current || !backImageRef.current) return;

    console.log(`Crossfading from ${fromSection} to ${toSection}`);
    
    // Show container if not already visible
    gsap.to(slideContainerRef.current, { 
      duration: 0.3, 
      autoAlpha: 1 
    });
    
    // Set back image to new section's image
    backImageRef.current.src = currentImageState.current[toSection];
    
    // Make sure back image is visible but fully transparent
    gsap.set(backImageRef.current, { 
      display: "block", 
      opacity: 0 
    });
    
    // Create crossfade animation
    const tl = gsap.timeline();
    
    // Fade in back image while fading out front image
    tl.to(backImageRef.current, { 
      duration: 0.8, 
      opacity: 1, 
      ease: "power2.inOut" 
    });
    
    tl.to(frontImageRef.current, { 
      duration: 0.8, 
      opacity: 0, 
      ease: "power2.inOut" 
    }, "-=0.8"); // Start at same time as back image fade in
    
    // Once animation completes, swap images and reset
    tl.add(() => {
      // Move back image content to front image
      frontImageRef.current.src = backImageRef.current.src;
      
      // Reset opacity values
      gsap.set(frontImageRef.current, { opacity: 1 });
      gsap.set(backImageRef.current, { display: "none" });
      
      console.log("Crossfade complete, now showing:", toSection);
    });
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
      
      // Reset opacity for front image
      gsap.set(frontImageRef.current, { opacity: 1 });
      
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

    // SECTION HEADING ANIMATIONS - Make them appear earlier
    // Animate section headings with scroll trigger
    [designsHeadingRef, spacesHeadingRef, installationsHeadingRef].forEach((ref) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%", // Makes heading appear sooner
              toggleActions: "play none none reverse"
            },
          }
        );
      }
    });

    // Create list animations for each section
    // Create staggered animations for each list item that sync with section transitions
    // These animations should start AFTER headings are visible
    const createListAnimation = (listRef, headingRef, sectionRef, startPosition, endPosition) => {
      if (!listRef.current || !headingRef.current) return;
      
      const items = listRef.current.querySelectorAll("p");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current, // Use heading as trigger
          start: "top 70%", // Start after heading enters view
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

    // Create list animations for each section - now using headings as reference
    createListAnimation(designsListRef, designsHeadingRef, designsSectionRef, "top 90%", "top 50%");
    createListAnimation(spacesListRef, spacesHeadingRef, spacesSectionRef, "top 90%", "top 50%");
    createListAnimation(installationsListRef, installationsHeadingRef, installationsSectionRef, "top 90%", "top 50%");

    // Only apply staggered section animations on desktop
    if (!isMobile) {
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
    }

    // Fade out all content and hero when help section appears - works on both mobile and desktop
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

    // SECTION VISIBILITY TRACKING - Show/hide appropriate images
    // Only track visibility if we're not on mobile
    if (!isMobile) {
      // DESIGNS SECTION
      if (designsSectionRef.current) {
        ScrollTrigger.create({
          trigger: designsListRef.current,  
          start: "top 10%", 
          end: "top 30%",
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
            updateActiveSection("designs");
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
    } else {
      // On mobile, we'll use a different approach for section visibility
      // Reset any transforms from desktop layout
      if (spacesSectionRef.current) {
        gsap.set(spacesSectionRef.current, { y: 0 });
      }
      
      if (installationsSectionRef.current) {
        gsap.set(installationsSectionRef.current, { y: 0 });
      }
      
      // Make sure container heights are auto for mobile
      if (contentContainerRef.current) {
        gsap.set(contentContainerRef.current, { height: "auto" });
      }

      // Track all sections with a simple in/out visibility
      [designsSectionRef, spacesSectionRef, installationsSectionRef].forEach((sectionRef, index) => {
        if (sectionRef.current) {
          const sectionName = ["designs", "spaces", "installations"][index];
          
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 60%", 
            end: "bottom 40%", 
            onEnter: () => {
              console.log(`Mobile: Entered ${sectionName} section`);
              updateActiveSection(sectionName);
            },
            onLeave: () => {
              // Don't update here, let the next section handle it
            },
            onEnterBack: () => {
              console.log(`Mobile: Entered back ${sectionName} section`);
              updateActiveSection(sectionName);
            },
            onLeaveBack: () => {
              // Don't update here, let the previous section handle it
            }
          });
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
      
      // Hide back image initially
      gsap.set(backImageRef.current, { display: "none" });
    }

    // Handle direct navigation - if we start at a hash like #help or #footer
    if (window.location.hash === "#help" || window.location.hash === "#footer") {
      hideContainerImmediately();
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isMobile]); // Re-run when isMobile changes

  return (
    <div className="services-container relative">

      {/* FLOATING IMAGE CONTAINER - WITH CROSSFADE */}
      <div ref={slideContainerRef} className="floating-image-container">
        <div className="floating-image-wrapper">
          <img
            ref={frontImageRef}
            alt="Current Section"
            src="/images/designs.jpg"
            className="floating-image"
            onError={(e) => { 
              console.log("Front image failed to load:", e.target.src);
              e.target.src = "/images/default.jpg"; 
            }}
          />
          <img
            ref={backImageRef}
            alt="Next Section"
            src="/images/spaces.jpg"
            className="floating-image floating-image-back"
            onError={(e) => { 
              console.log("Back image failed to load:", e.target.src);
              e.target.src = "/images/default.jpg"; 
            }}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div ref={contentContainerRef} className="content-container">
        {/* DESIGNS */}
        <div
          ref={designsSectionRef}
          className="section-base section-designs"
        >
          <div className="container mx-auto section-inner">
            <div className="section-heading-container">
              <h3 ref={designsHeadingRef} className="section-heading">
                Visual Design
              </h3>
            </div>
            <div ref={designsListRef} className="section-list-container">
              <p className="section-list-item">Web Design</p>
              <p className="section-list-item">Logo Design</p>
              <p className="section-list-item">Brand Identity</p>
              <p className="section-list-item">Packaging Design</p>
              <p className="section-list-item">Communication Design</p>
            </div>
          </div>
        </div>

        {/* SPACES */}
        <div
          ref={spacesSectionRef}
          className="section-base section-spaces"
        >
          <div className="container mx-auto section-inner">
            <div className="section-heading-container">
              <h3 ref={spacesHeadingRef} className="section-heading">
                Space Design
              </h3>
            </div>
            <div ref={spacesListRef} className="section-list-container">
              <p className="section-list-item">Retail Display</p>
              <p className="section-list-item">Exhibition Design</p>
              <p className="section-list-item">Branded Environments</p>
              <p className="section-list-item">Environmental Graphics</p>
              <p className="section-list-item">Wayfinding and Signages</p>
            </div>
          </div>
        </div>

        {/* INSTALLATIONS */}
        <div
          ref={installationsSectionRef}
          className="section-base section-installations"
        >
          <div className="container mx-auto section-inner">
            <div className="section-heading-container">
              <h3 ref={installationsHeadingRef} className="section-heading">
                Art Installations
              </h3>
            </div>
            <div ref={installationsListRef} className="section-list-container">
              <p className="section-list-item">Wall Murals</p>
              <p className="section-list-item">Fine Art Printing</p>
              <p className="section-list-item">Custom Wallpapers</p>
              <p className="section-list-item">Store Window Display</p>
              <p className="section-list-item">Custom Art Installations</p>
              <p className="section-list-item">Signages & Name Boards</p>
            </div>
          </div>
        </div>
      </div>

      {/* HELP SECTION */}
      <div
        ref={helpSectionRef}
        id="help"
        className="help-section"
      >
        <h2 className="help-heading">Need a Hand? We're happy to help!</h2>
      </div>
    </div>
  );
};

export default ServicesLists;