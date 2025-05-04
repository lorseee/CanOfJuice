import React, { useEffect, useState } from "react";
import WorksHero from "../components/Works-hero";
import WorksCategories from "../components/Works-categories";

const WorksPage = () => {
  // Track page loading state
  const [pageLoaded, setPageLoaded] = useState(false);
  
  useEffect(() => {
    // Mark the component as ready to render
    setPageLoaded(true);
    
    // Reset scroll position on mount
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Ensure the works element is visible immediately
    const worksElement = document.getElementById("works");
    if (worksElement) {
      worksElement.style.opacity = "1";
    }

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

    // Set up event listeners
    window.addEventListener('DOMContentLoaded', handleHashChange);
    window.addEventListener('load', () => {
      handleHashChange();
      // Force a refresh of layouts after everything is loaded
      window.dispatchEvent(new Event('resize'));
    });
    window.addEventListener('hashchange', handleHashChange);
    
    // Force resize after a short delay to ensure all elements are rendered
    const resizeTimers = [
      setTimeout(() => window.dispatchEvent(new Event('resize')), 100),
      setTimeout(() => window.dispatchEvent(new Event('resize')), 500),
      setTimeout(() => window.dispatchEvent(new Event('resize')), 1000)
    ];
    
    return () => {
      window.removeEventListener('DOMContentLoaded', handleHashChange);
      window.removeEventListener('load', handleHashChange);
      window.removeEventListener('hashchange', handleHashChange);
      resizeTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);
  
  return (
    <div id="works" style={{ opacity: 1 }}> {/* Ensure visibility from the start */}
      <WorksHero id="works-hero" />
      <WorksCategories isPageLoaded={pageLoaded} />
    </div>
  );
};

export default WorksPage;