import React, { useEffect } from "react";
import WorksHero from "../components/Works-hero";
import WorksCategories from "../components/Works-categories";

const WorksPage = () => {
  useEffect(() => {
    // Ensure page starts at the hero section on fresh load or refresh
    const scrollToTopOnLoad = () => {
      window.scrollTo(0, 0);
    };

    // Handle hash-based navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      if (!hash || hash === "#works" || hash === "#works-hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };
    
    // Call on initial load
    scrollToTopOnLoad();
    
    // Set up event listeners
    window.addEventListener('load', scrollToTopOnLoad);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('load', scrollToTopOnLoad);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  return (
    <div id="works" className="bg-black text-white">
      <WorksHero id="works-hero" />
      <WorksCategories />
    </div>
  );
};

export default WorksPage;