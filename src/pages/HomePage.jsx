import React, { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Info from "../components/Info";
import Projects from "../components/Projects";
import Logos from "../components/Logos";

const HomePage = () => {
  const heroRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Force scroll restoration to manual to prevent browser auto-scrolling
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Mark that initial load has happened
    if (initialLoad) {
      // Stronger approach to ensure we're at the top of the page
      const forceScrollTop = () => {
        // Use both approaches for maximum browser compatibility
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      // Execute scroll reset immediately
      forceScrollTop();
      
      // Add additional scroll resets with progressive delays for reliability
      const scrollTimers = [
        setTimeout(forceScrollTop, 0),
        setTimeout(() => {
          forceScrollTop();
          setInitialLoad(false);
        }, 400)
      ];

      // Clean up all timers
      return () => {
        scrollTimers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [initialLoad]);

  // Prevent AboutUs animations from running too early
  useEffect(() => {
    if (!initialLoad) return;
    
    // Add event listener to detect any scroll that happens after initial load
    const handleScroll = () => {
      // If we detect scroll before the component is fully set up, force back to top
      if (initialLoad) {
        window.scrollTo(0, 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialLoad]);

  return (
    <div id="home">
      <Hero ref={heroRef} />
      <AboutUs initialLoad={initialLoad} />
      <Info />
      <Projects />
      <Logos />
    </div>
  );
};

export default HomePage;