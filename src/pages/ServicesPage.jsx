import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollWrapper from "../components/ScrollWrapper";

// Only register the plugin on the client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

  // Add a mount state to prevent SSR issues
  const [isMounted, setIsMounted] = useState(false);

  // Track current image state with better error handling
  const currentImageState = useRef({
    designs: "/images/designs.jpg",
    spaces: "/images/spaces.jpg",
    installations: "/images/installations.jpg",
    current: "designs",
    defaultFallback: "/images/default.jpg"
  });

  // Track section visibility with useState for better reactivity
  const [visibilityState, setVisibilityState] = useState({
    inContentSections: false,
    inHelpSection: false
  });

  // Safely get an image URL with fallback
  const getSafeImageUrl = (key) => {
    return currentImageState.current[key] || currentImageState.current.defaultFallback;
  };

  // Ensure images are loaded properly with error handling
  useEffect(() => {
    if (!isMounted) return;
    
    // Preload images with error handling
    const preloadImages = () => {
      const images = [
        getSafeImageUrl('designs'),
        getSafeImageUrl('spaces'),
        getSafeImageUrl('installations')
      ];
      
      images.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}, falling back to default`);
        };
      });
    };
    
    preloadImages();
  }, [isMounted]);

  // Initialize mount state after component mounts
  useEffect(() => {
    setIsMounted(true);
    
    // Immediate scroll reset on component mount - safe for SSR
    if (typeof window !== 'undefined') {
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
    }
  }, []);

  const showContainer = () => {
    if (!isMounted || !slideContainerRef.current) return;
    
    // Only show if we're in content sections and not in help section
    if (visibilityState.inContentSections && !visibilityState.inHelpSection) {
      gsap.to(slideContainerRef.current, { 
        duration: 0.5, 
        autoAlpha: 1,
        overwrite: true  // Prevent animation conflicts
      });
    }
  };

  const hideContainer = () => {
    if (!isMounted || !slideContainerRef.current) return;
    
    gsap.to(slideContainerRef.current, { 
      duration: 0.5, 
      autoAlpha: 0,
      overwrite: true  // Prevent animation conflicts
    });
  };

  const hideContainerImmediately = () => {
    if (!isMounted || !slideContainerRef.current) return;
    
    gsap.set(slideContainerRef.current, { autoAlpha: 0 });
  };

  // Use layoutEffect for GSAP animations, but safely
  useLayoutEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;
    
    // Create a context for better cleanup
    let ctx = gsap.context(() => {
      const triggers = []; // Store ScrollTrigger instances for cleanup
      
      // Animate hero heading on mount
      if (heroRef.current) {
        const heroHeading = heroRef.current.querySelector("h1");
        if (heroHeading) {
          gsap.fromTo(heroHeading, 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 1 }
          );
        }
      }

      // SECTION HEADING ANIMATIONS
      // Animate section headings with scroll trigger
      [
        { ref: designsHeadingRef, id: 'designs-heading' },
        { ref: spacesHeadingRef, id: 'spaces-heading' },
        { ref: installationsHeadingRef, id: 'installations-heading' }
      ].forEach(({ ref, id }) => {
        if (ref.current) {
          const trigger = ScrollTrigger.create({
            id,
            trigger: ref.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              gsap.fromTo(
                ref.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
              );
            },
            onLeaveBack: () => {
              gsap.fromTo(
                ref.current,
                { opacity: 1, y: 0 },
                { opacity: 0, y: 30, duration: 0.8, ease: "power2.in" }
              );
            }
          });
          triggers.push(trigger);
        }
      });

      // IMPROVED LIST ANIMATIONS - With safer implementation
      const createListAnimation = (listRef, sectionRef, id, startPosition, endPosition) => {
        if (!listRef.current || !sectionRef.current) return;
        
        const items = Array.from(listRef.current.querySelectorAll("p"));
        if (!items.length) return;
        
        const trigger = ScrollTrigger.create({
          id: `${id}-in`,
          trigger: sectionRef.current,
          start: startPosition,
          end: endPosition,
          onEnter: () => {
            gsap.fromTo(
              items,
              { opacity: 0, y: 20 },
              { 
                opacity: 1, 
                y: 0, 
                stagger: 0.1,
                ease: "power2.out",
                duration: 0.4,
                overwrite: true
              }
            );
          },
          onLeaveBack: () => {
            gsap.fromTo(
              items,
              { opacity: 1, y: 0 },
              { 
                opacity: 0, 
                y: 20, 
                stagger: 0.05,
                ease: "power2.in",
                duration: 0.3,
                overwrite: true
              }
            );
          }
        });
        triggers.push(trigger);
      };

      // Create list animations for each section with unique IDs
      if (designsSectionRef.current && designsListRef.current) {
        createListAnimation(designsListRef, designsSectionRef, 'designs-list', "top 75%", "top 20%");
      }
      
      if (spacesSectionRef.current && spacesListRef.current) {
        createListAnimation(spacesListRef, spacesSectionRef, 'spaces-list', "top 75%", "top 20%");
      }
      
      if (installationsSectionRef.current && installationsListRef.current) {
        createListAnimation(installationsListRef, installationsSectionRef, 'installations-list', "top 75%", "top 20%");
      }

      // SPACES SECTION ANIMATION - With safer implementation
      if (spacesSectionRef.current) {
        const trigger = ScrollTrigger.create({
          id: 'spaces-movement',
          trigger: spacesSectionRef.current,
          start: "top bottom",
          end: "top 33.33%",
          scrub: 0.5,
          onUpdate: (self) => {
            // Use GSAP directly in onUpdate for more control
            const progress = self.progress;
            const yPos = 100 - (progress * 66.67); // From 100% to 33.33%
            gsap.set(spacesSectionRef.current, { y: `${yPos}%` });
          }
        });
        triggers.push(trigger);
      }
      
      // INSTALLATIONS SECTION ANIMATION - With safer implementation
      if (installationsSectionRef.current) {
        // Part 1: Move into position
        const trigger1 = ScrollTrigger.create({
          id: 'installations-movement-1',
          trigger: installationsSectionRef.current,
          start: "top bottom",
          end: "top 66.67%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            const yPos = 100 - (progress * 33.33); // From 100% to 66.67%
            gsap.set(installationsSectionRef.current, { y: `${yPos}%` });
          }
        });
        triggers.push(trigger1);
        
        // Part 2: Keep sticky until help section
        if (helpSectionRef.current) {
          const trigger2 = ScrollTrigger.create({
            id: 'installations-movement-2',
            trigger: helpSectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;
              const yPos = 66.67 - (progress * 66.67); // From 66.67% to 0%
              gsap.set(installationsSectionRef.current, { y: `${yPos}%` });
            }
          });
          triggers.push(trigger2);
        }
      }

      // Fade out all content and hero when help section appears - With safer implementation
      if (contentContainerRef.current && helpSectionRef.current) {
        const trigger = ScrollTrigger.create({
          id: 'content-fade',
          trigger: helpSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 0.5,
          onUpdate: (self) => {
            const opacity = 1 - self.progress;
            gsap.set(contentContainerRef.current, { opacity });
          }
        });
        triggers.push(trigger);
      }

      if (heroRef.current && helpSectionRef.current) {
        const trigger = ScrollTrigger.create({
          id: 'hero-help-fade',
          trigger: helpSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 0.5,
          onUpdate: (self) => {
            const opacity = 1 - self.progress;
            gsap.set(heroRef.current, { opacity });
          }
        });
        triggers.push(trigger);
      }

      // Hide the hero section when the designs section scrolls past it
      if (heroRef.current && designsSectionRef.current) {
        const trigger = ScrollTrigger.create({
          id: 'hero-designs-fade',
          trigger: designsSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          onUpdate: (self) => {
            const opacity = 1 - self.progress;
            gsap.set(heroRef.current, { opacity });
          }
        });
        triggers.push(trigger);
      }

      // COMPLETELY REVISED IMAGE TRANSITION LOGIC - With safer implementation
      if (frontImageRef.current && backImageRef.current) {
        // Set initial state
        frontImageRef.current.src = getSafeImageUrl('designs');
        backImageRef.current.src = getSafeImageUrl('spaces');
        gsap.set(backImageRef.current, { opacity: 0 });
        
        // Apply rendering optimizations
        gsap.set([frontImageRef.current, backImageRef.current], {
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d" // Better 3D support
        });
        
        // Add error handling for images
        frontImageRef.current.onerror = () => {
          console.warn("Failed to load front image, falling back to default");
          frontImageRef.current.src = getSafeImageUrl('defaultFallback');
        };
        
        backImageRef.current.onerror = () => {
          console.warn("Failed to load back image, falling back to default");
          backImageRef.current.src = getSafeImageUrl('defaultFallback');
        };
        
        // Ensure image container is hidden initially
        gsap.set(slideContainerRef.current, { autoAlpha: 0 });
      }

      // CONTENT SECTION VISIBILITY TRACKING - With safer implementation
      if (contentContainerRef.current) {
        const trigger = ScrollTrigger.create({
          id: 'content-visibility',
          trigger: contentContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          onEnter: () => {
            setVisibilityState(prev => ({...prev, inContentSections: true}));
            if (!visibilityState.inHelpSection) {
              showContainer();
            }
          },
          onLeave: () => {
            setVisibilityState(prev => ({...prev, inContentSections: false}));
            hideContainer();
          },
          onEnterBack: () => {
            setVisibilityState(prev => ({...prev, inContentSections: true}));
            if (!visibilityState.inHelpSection) {
              showContainer();
            }
          },
          onLeaveBack: () => {
            setVisibilityState(prev => ({...prev, inContentSections: false}));
            hideContainer();
          }
        });
        triggers.push(trigger);
      }

      // HELP SECTION VISIBILITY TRACKING - With safer implementation
      if (helpSectionRef.current) {
        const trigger = ScrollTrigger.create({
          id: 'help-visibility',
          trigger: helpSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
            setVisibilityState(prev => ({...prev, inHelpSection: true}));
            hideContainerImmediately();
          },
          onLeave: () => {
            setVisibilityState(prev => ({...prev, inHelpSection: false}));
            if (visibilityState.inContentSections) {
              showContainer();
            }
          },
          onEnterBack: () => {
            setVisibilityState(prev => ({...prev, inHelpSection: true}));
            hideContainerImmediately();
          },
          onLeaveBack: () => {
            setVisibilityState(prev => ({...prev, inHelpSection: false}));
            if (visibilityState.inContentSections) {
              showContainer();
            }
          }
        });
        triggers.push(trigger);
      }

      // IMPROVED IMAGE TRANSITION FUNCTION - With safer implementation
      const transitionImages = (fromSection, toSection, fromImageKey, toImageKey) => {
        if (!fromSection.current || !toSection.current) return;
        
        const fromImage = getSafeImageUrl(fromImageKey);
        const toImage = getSafeImageUrl(toImageKey);
        
        const trigger = ScrollTrigger.create({
          id: `transition-${fromImageKey}-to-${toImageKey}`,
          trigger: toSection.current,
          start: "top 66.67%",
          end: "top 33.33%",
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
            const threshold = 0.5;
            let opacity;
            
            if (self.progress < threshold) {
              opacity = 0;
            } else {
              opacity = (self.progress - threshold) * (1 / (1 - threshold));
            }
            
            gsap.to(backImageRef.current, { 
              opacity, 
              duration: 0.1,
              overwrite: true
            });
          }
        });
        triggers.push(trigger);
      };

      // Set up transitions between sections
      if (designsSectionRef.current && spacesSectionRef.current && installationsSectionRef.current) {
        transitionImages(
          designsSectionRef,
          spacesSectionRef,
          'designs',
          'spaces'
        );
        
        transitionImages(
          spacesSectionRef,
          installationsSectionRef,
          'spaces',
          'installations'
        );
      }

      // Handle direct navigation - if we start at a hash like #help or #footer
      if (typeof window !== 'undefined' && (window.location.hash === "#help" || window.location.hash === "#footer")) {
        hideContainerImmediately();
      }
      
      // Attach cleanup function to context
      return () => {
        // Clean up all ScrollTrigger instances
        triggers.forEach(trigger => {
          if (trigger) trigger.kill();
        });
      };
    });

    // Force scroll position to top after GSAP has initialized
    if (typeof window !== 'undefined') {
      // Use a safer approach for ScrollTrigger refresh
      setTimeout(() => {
        ScrollTrigger.refresh(true);
        
        // Only reset to top if not at a specific hash
        if (!window.location.hash) {
          window.scrollTo(0, 0);
        }
      }, 100);
    }

    return () => {
      // Clean up GSAP context
      if (ctx) ctx.revert();
    };
  }, [isMounted, visibilityState]);

  // Add an effect to refresh ScrollTrigger after all images are loaded
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;
    
    // Only refresh after all images have loaded
    const allImages = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = allImages.length;
    
    // If no images, just refresh
    if (totalImages === 0) {
      setTimeout(() => ScrollTrigger.refresh(), 100);
      return;
    }
    
    // Track loaded images
    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setTimeout(() => ScrollTrigger.refresh(), 100);
      }
    };
    
    allImages.forEach(img => {
      if (img.complete) {
        onImageLoad();
      } else {
        img.addEventListener('load', onImageLoad);
        img.addEventListener('error', onImageLoad); // Count errors as "loaded" to avoid blocking
      }
    });
    
    return () => {
      allImages.forEach(img => {
        img.removeEventListener('load', onImageLoad);
        img.removeEventListener('error', onImageLoad);
      });
    };
  }, [isMounted]);

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
          backfaceVisibility: "hidden"
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
              backfaceVisibility: "hidden"
            }}
            onError={(e) => { e.target.src = "/images/default.jpg"; }}
          />
          <img
            ref={backImageRef}
            alt="Next Section"
            src="/images/spaces.jpg"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            style={{ 
              willChange: "opacity", 
              backfaceVisibility: "hidden",
              opacity: 0 
            }}
            onError={(e) => { e.target.src = "/images/default.jpg"; }}
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