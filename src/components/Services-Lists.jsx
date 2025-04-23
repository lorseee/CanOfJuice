// ServicesLists.jsx - optimized version with adjusted visibility timing
import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollWrapper from "../components/ScrollWrapper"; 
import ServicesHero from "./Services-hero";

gsap.registerPlugin(ScrollTrigger);

const ServicesLists = () => {
  // Section refs
  const heroRef = useRef(null);
  const designsSectionRef = useRef(null);
  const spacesSectionRef = useRef(null);
  const installationsSectionRef = useRef(null);
  const helpSectionRef = useRef(null);
  const contentContainerRef = useRef(null);

  // Heading refs
  const designsHeadingRef = useRef(null);
  const spacesHeadingRef = useRef(null);
  const installationsHeadingRef = useRef(null);

  // List refs
  const designsListRef = useRef(null);
  const spacesListRef = useRef(null);
  const installationsListRef = useRef(null);

  // Image refs
  const slideContainerRef = useRef(null);
  const frontImageRef = useRef(null);
  const backImageRef = useRef(null);
  
  // State refs
  const [isMobile, setIsMobile] = useState(false);
  const activeSection = useRef("none");
  const scrollTriggersRef = useRef([]);
  const animationsInitialized = useRef(false);
  
  // Image paths consolidated in one place
  const imagePaths = {
    designs: "/images/designs.jpg",
    spaces: "/images/spaces.jpg",
    installations: "/images/installations.jpg",
    default: "/images/default.jpg"
  };

  // Check if we're on mobile - debounced resize handler
  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 640;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
      }
    };
    
    // Debounce the resize handler for better performance
    let resizeTimeout;
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(checkMobile, 200);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [isMobile]);

  // Handle hash changes and navigation
  useEffect(() => {
    // Set section IDs
    if (designsSectionRef.current) designsSectionRef.current.id = "designs";
    if (spacesSectionRef.current) spacesSectionRef.current.id = "spaces";
    if (installationsSectionRef.current) installationsSectionRef.current.id = "installations";
    if (helpSectionRef.current) helpSectionRef.current.id = "help";
    
    // Hide image container initially
    hideContainerImmediately();
    
    // Handle hash changes - using a single handler
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove the # symbol
      
      // Hide container for help/footer
      if (hash === "help" || hash === "footer") {
        hideContainerImmediately();
        return;
      }
      
      // Handle section navigation
      if (["designs", "spaces", "installations"].includes(hash)) {
        updateActiveSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Check hash on initial load
    handleHashChange();
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Image handling
  const updateActiveSection = (section) => {
    // Only process changes
    if (activeSection.current !== section) {
      const previousSection = activeSection.current;
      activeSection.current = section;
      
      // Perform image transition between valid sections
      if (["designs", "spaces", "installations"].includes(section) && 
          ["designs", "spaces", "installations"].includes(previousSection)) {
        crossfadeImages(previousSection, section);
      } else {
        // Just update visibility
        updateVisibleImage();
      }
    }
  };

  // Optimized crossfade - uses GSAP timeline once
  const crossfadeImages = (fromSection, toSection) => {
    if (!slideContainerRef.current || !frontImageRef.current || !backImageRef.current) return;
    
    // Show container if needed
    gsap.to(slideContainerRef.current, { 
      duration: 0.3, 
      autoAlpha: 1,
      overwrite: true
    });
    
    // Set back image to new section
    backImageRef.current.src = imagePaths[toSection] || imagePaths.default;
    
    // Make back image visible but transparent
    gsap.set(backImageRef.current, { 
      display: "block", 
      opacity: 0 
    });
    
    // Create single timeline for crossfade
    gsap.timeline()
      .to(backImageRef.current, { 
        duration: 0.8, 
        opacity: 1, 
        ease: "power2.inOut" 
      })
      .to(frontImageRef.current, { 
        duration: 0.8, 
        opacity: 0, 
        ease: "power2.inOut" 
      }, "-=0.8") // Start simultaneously
      .call(() => {
        // Swap images
        frontImageRef.current.src = backImageRef.current.src;
        gsap.set(frontImageRef.current, { opacity: 1 });
        gsap.set(backImageRef.current, { display: "none" });
      });
  };

  // Update visible image without crossfade
  const updateVisibleImage = () => {
    if (!slideContainerRef.current || !frontImageRef.current) return;
    
    // Hide for invalid sections
    if (activeSection.current === "none" || activeSection.current === "help") {
      hideContainer();
      return;
    }

    // Update front image
    if (imagePaths[activeSection.current]) {
      frontImageRef.current.src = imagePaths[activeSection.current];
      gsap.set(frontImageRef.current, { opacity: 1 });
      
      // Show container
      gsap.to(slideContainerRef.current, { 
        duration: 0.5, 
        autoAlpha: 1,
        overwrite: true
      });
    }
  };

  // Hide container with animation
  const hideContainer = () => {
    if (slideContainerRef.current) {
      gsap.to(slideContainerRef.current, { 
        duration: 0.5, 
        autoAlpha: 0,
        overwrite: true
      });
    }
  };

  // Hide container immediately
  const hideContainerImmediately = () => {
    if (slideContainerRef.current) {
      gsap.set(slideContainerRef.current, { autoAlpha: 0 });
    }
  };

  // Preload images efficiently
  useEffect(() => {
    // Preload all images at once
    Object.values(imagePaths).forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    // Set initial image state
    if (frontImageRef.current) {
      frontImageRef.current.src = imagePaths.designs;
    }
    
    if (backImageRef.current) {
      gsap.set(backImageRef.current, { display: "none" });
    }
  }, []);

  // Main animation setup - with debouncing for isMobile changes
  useLayoutEffect(() => {
    // Clean up any existing ScrollTriggers
    scrollTriggersRef.current.forEach(st => st.kill());
    scrollTriggersRef.current = [];
    
    // Wait until next tick to ensure DOM measurements are accurate
    requestAnimationFrame(() => {
      // Create all animations
      initializeAnimations();
    });
    
    // Cleanup on unmount
    return () => {
      scrollTriggersRef.current.forEach(st => st.kill());
      scrollTriggersRef.current = [];
    };
  }, [isMobile]);
  
  // Consolidated animation initialization
  const initializeAnimations = () => {
    // Reset any existing animations
    gsap.set([designsHeadingRef.current, spacesHeadingRef.current, installationsHeadingRef.current], { clearProps: "all" });
    
    // Only on desktop: Reset positioning for spaces and installations
    if (!isMobile) {
      gsap.set(spacesSectionRef.current, { y: "100%" });
      gsap.set(installationsSectionRef.current, { y: "100%" });
    } else {
      // On mobile: ensure normal positioning
      gsap.set([spacesSectionRef.current, installationsSectionRef.current], { clearProps: "y" });
      gsap.set(contentContainerRef.current, { height: "auto" });
    }

    // Create heading animations
    [
      { ref: designsHeadingRef, section: "designs" },
      { ref: spacesHeadingRef, section: "spaces" },
      { ref: installationsHeadingRef, section: "installations" }
    ].forEach(({ ref, section }) => {
      if (ref.current) {
        const headingTrigger = ScrollTrigger.create({
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(ref.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true
            });
          },
          onLeaveBack: () => {
            gsap.to(ref.current, {
              opacity: 0,
              y: 30,
              duration: 0.5,
              ease: "power2.in",
              overwrite: true
            });
          }
        });
        
        scrollTriggersRef.current.push(headingTrigger);
      }
    });

    // Create list animations
    createListAnimations();
    
    // Create section movements (desktop only)
    if (!isMobile) {
      createDesktopSectionAnimations();
    }
    
    // Create section visibility tracking
    createSectionTracking();
    
    // Fade out content when help section appears
    createHelpSectionAnimations();
    
    // Set initial state based on hash
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      if (["designs", "spaces", "installations"].includes(hash)) {
        updateActiveSection(hash);
      } else if (hash === "help" || hash === "footer") {
        hideContainerImmediately();
      }
    }
  };
  
  // List animations with performance optimizations
  const createListAnimations = () => {
    const listConfigs = [
      { listRef: designsListRef, headingRef: designsHeadingRef, sectionRef: designsSectionRef },
      { listRef: spacesListRef, headingRef: spacesHeadingRef, sectionRef: spacesSectionRef },
      { listRef: installationsListRef, headingRef: installationsHeadingRef, sectionRef: installationsSectionRef }
    ];
    
    listConfigs.forEach(({ listRef, headingRef, sectionRef }) => {
      if (!listRef.current || !headingRef.current) return;
      
      const items = listRef.current.querySelectorAll("p");
      
      // Initial state
      gsap.set(items, { opacity: 0, y: 20 });
      
      // Create scroll trigger for appear animation
      const listTrigger = ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 70%",
        end: "bottom top",
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true
          });
        },
        onLeaveBack: () => {
          gsap.to(items, {
            opacity: 0,
            y: 20,
            stagger: 0.05,
            duration: 0.3,
            ease: "power2.in",
            overwrite: true
          });
        }
      });
      
      scrollTriggersRef.current.push(listTrigger);
    });
  };
  
  // Desktop-only section animations
  const createDesktopSectionAnimations = () => {
    // SPACES SECTION
    if (spacesSectionRef.current) {
      const spacesTrigger = ScrollTrigger.create({
        trigger: spacesSectionRef.current,
        start: "top bottom",
        end: "top 33.33%",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          // Smoother transform using GSAP's utility
          gsap.set(spacesSectionRef.current, { 
            y: gsap.utils.interpolate(100, 33.33, progress) + "%" 
          });
        }
      });
      
      scrollTriggersRef.current.push(spacesTrigger);
    }
    
    // INSTALLATIONS SECTION - PART 1
    if (installationsSectionRef.current) {
      const installationsTrigger1 = ScrollTrigger.create({
        trigger: installationsSectionRef.current,
        start: "top bottom",
        end: "top 66.67%",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(installationsSectionRef.current, { 
            y: gsap.utils.interpolate(100, 66.67, progress) + "%" 
          });
        }
      });
      
      scrollTriggersRef.current.push(installationsTrigger1);
      
      // INSTALLATIONS SECTION - PART 2
      if (helpSectionRef.current) {
        const installationsTrigger2 = ScrollTrigger.create({
          trigger: helpSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(installationsSectionRef.current, { 
              y: gsap.utils.interpolate(66.67, 0, progress) + "%" 
            });
          }
        });
        
        scrollTriggersRef.current.push(installationsTrigger2);
      }
    }
  };
  
  // Section visibility tracking - optimized with adjusted timing
  const createSectionTracking = () => {
    if (isMobile) {
      // Mobile approach - simpler tracking with adjusted timing
      [
        { ref: designsSectionRef, section: "designs", startPoint: "top 70%", endPoint: "bottom 30%" }, // Extended visibility
        { ref: spacesSectionRef, section: "spaces", startPoint: "top 50%", endPoint: "bottom 50%" },   // Reduced visibility
        { ref: installationsSectionRef, section: "installations", startPoint: "top 60%", endPoint: "bottom 40%" }
      ].forEach(({ ref, section, startPoint, endPoint }) => {
        if (ref.current) {
          const sectionTrigger = ScrollTrigger.create({
            trigger: ref.current,
            start: startPoint,
            end: endPoint,
            onToggle: (self) => {
              if (self.isActive) {
                updateActiveSection(section);
              }
            }
          });
          
          scrollTriggersRef.current.push(sectionTrigger);
        }
      });
    } else {
      // Desktop approach - more precise tracking with adjusted timing
      if (designsListRef.current) {
        const designsTrigger = ScrollTrigger.create({
          trigger: designsListRef.current,
          // Extended visibility for designs when scrolling back
          start: "top 20%",         // Moved from 10% to 20% for earlier activation
          end: "bottom 0%",         // Extended to bottom 0% for longer visibility
          onToggle: (self) => {
            if (self.isActive) {
              updateActiveSection("designs");
            } else if (self.direction < 0 && !self.isActive) {
              // Only when scrolling up and not active
              updateActiveSection("none");
            }
          }
        });
        
        scrollTriggersRef.current.push(designsTrigger);
      }
      
      if (spacesListRef.current) {
        const spacesTrigger = ScrollTrigger.create({
          trigger: spacesListRef.current,
          // Reduced visibility for spaces when scrolling back
          start: "top 95%",         // Moved from 90% to 95% for later activation
          end: "bottom 30%",        // Changed from 10% to 30% for earlier deactivation
          onToggle: (self) => {
            if (self.isActive) {
              updateActiveSection("spaces");
            } else if (self.direction < 0 && !self.isActive) {
              // When scrolling back and spaces section is no longer active
              // This will help designs section take over earlier
              if (designsListRef.current) {
                const designsBounds = designsListRef.current.getBoundingClientRect();
                if (designsBounds.bottom > 0) {
                  updateActiveSection("designs");
                }
              }
            }
          }
        });
        
        scrollTriggersRef.current.push(spacesTrigger);
      }
      
      if (installationsListRef.current) {
        const installationsTrigger = ScrollTrigger.create({
          trigger: installationsListRef.current,
          start: "top 90%",
          end: "bottom 10%",
          onToggle: (self) => {
            if (self.isActive) {
              updateActiveSection("installations");
            } else if (self.direction > 0 && !self.isActive) {
              // Only when scrolling down and not active
              updateActiveSection("none");
            } else if (self.direction < 0 && !self.isActive) {
              // When scrolling back and installations section is no longer active
              if (spacesListRef.current) {
                const spacesBounds = spacesListRef.current.getBoundingClientRect();
                if (spacesBounds.top < window.innerHeight * 0.95 && spacesBounds.bottom > window.innerHeight * 0.3) {
                  updateActiveSection("spaces");
                }
              }
            }
          }
        });
        
        scrollTriggersRef.current.push(installationsTrigger);
      }
    }
    
    // Help section tracking
    if (helpSectionRef.current) {
      const helpTrigger = ScrollTrigger.create({
        trigger: helpSectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) {
            updateActiveSection("help");
          } else if (self.direction < 0 && !self.isActive) {
            // Only check previous section when scrolling up
            checkVisibleSection();
          }
        }
      });
      
      scrollTriggersRef.current.push(helpTrigger);
    }
  };
  
  // Check which section is visible with adjusted thresholds
  const checkVisibleSection = () => {
    const viewportHeight = window.innerHeight;
    
    // Customized visibility function with adjusted thresholds
    const checkVisible = (el, topThreshold, bottomThreshold) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < viewportHeight * topThreshold && rect.bottom > viewportHeight * bottomThreshold;
    };
    
    // Check in reverse order with adjusted thresholds
    // - installations gets standard visibility
    // - spaces gets reduced visibility (smaller window)
    // - designs gets extended visibility (larger window)
    if (checkVisible(installationsListRef.current, 0.9, 0)) {
      updateActiveSection("installations");
    } else if (checkVisible(spacesListRef.current, 0.95, 0.3)) { // Reduced visibility window
      updateActiveSection("spaces");
    } else if (checkVisible(designsListRef.current, 0.9, -0.1)) { // Extended visibility window
      updateActiveSection("designs");
    } else {
      updateActiveSection("none");
    }
  };
  
  // Help section animations
  const createHelpSectionAnimations = () => {
    if (contentContainerRef.current && helpSectionRef.current) {
      const contentFadeTrigger = ScrollTrigger.create({
        trigger: helpSectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(contentContainerRef.current, { 
            opacity: 1 - self.progress 
          });
        }
      });
      
      scrollTriggersRef.current.push(contentFadeTrigger);
    }
    
    if (heroRef.current && helpSectionRef.current) {
      const heroFadeTrigger = ScrollTrigger.create({
        trigger: helpSectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(heroRef.current, { 
            opacity: 1 - self.progress 
          });
        }
      });
      
      scrollTriggersRef.current.push(heroFadeTrigger);
    }
  };

  return (
    <div className="services-container relative">
      {/* FLOATING IMAGE CONTAINER - WITH CROSSFADE */}
      <div ref={slideContainerRef} className="floating-image-container">
        <div className="floating-image-wrapper">
          <img
            ref={frontImageRef}
            alt="Current Section"
            src={imagePaths.designs}
            className="floating-image"
            onError={(e) => { 
              e.target.src = imagePaths.default; 
            }}
          />
          <img
            ref={backImageRef}
            alt="Next Section"
            src={imagePaths.spaces}
            className="floating-image floating-image-back"
            onError={(e) => { 
              e.target.src = imagePaths.default; 
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
        className="help-section"
      >
        <h2 className="help-heading">Need a Hand? We're happy to help!</h2>
      </div>
    </div>
  );
};

export default ServicesLists;