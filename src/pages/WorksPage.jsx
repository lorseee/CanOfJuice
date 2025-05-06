import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import WorksHero from "../components/Works-hero";
import WorksCategories from "../components/Works-categories";

const WorksPage = () => {
  // Track page loading and navigation states
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isBackNavigation, setIsBackNavigation] = useState(false);
  const lastScrollPosition = useRef(0);
  const location = useLocation();
  
  // Track first load vs subsequent loads
  const isFirstLoad = useRef(true);
  
  useEffect(() => {
    // Detect if this is a back navigation using history state
    const isNavigatingBack = window.performance && 
      window.performance.navigation && 
      window.performance.navigation.type === 2;
      
    // Also check for popstate events
    setIsBackNavigation(isNavigatingBack || !!sessionStorage.getItem('wasOnProjectPage'));
    
    // Always force manual scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    
    // Ensure works element is immediately visible (no flashing)
    document.documentElement.style.scrollBehavior = isBackNavigation ? "auto" : "smooth";
    
    // First load setup (refresh or direct URL)
    if (isFirstLoad.current) {
      // If NOT coming back from a project page, scroll to top
      if (!isBackNavigation) {
        // Use a visibility approach to prevent flashing
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.3s ease-in";
        
        // Reset scroll position using instant behavior
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
        
        // Fade in content after positioning is complete
        setTimeout(() => {
          document.body.style.opacity = "1";
          setPageLoaded(true);
        }, 50);
      } 
      // If coming back from project page, restore position
      else {
        const savedPosition = sessionStorage.getItem('scrollPosition');
        if (savedPosition) {
          // Make restoration instant to avoid jumps
          window.scrollTo({
            top: parseInt(savedPosition, 10),
            behavior: 'instant'
          });
        }
        setPageLoaded(true);
        // Clear the navigation flag
        sessionStorage.removeItem('wasOnProjectPage');
      }
      
      isFirstLoad.current = false;
    }
    
    // Save scroll position before navigation to project page
    const handleBeforeProjectNav = () => {
      lastScrollPosition.current = window.scrollY;
      sessionStorage.setItem('scrollPosition', lastScrollPosition.current);
      sessionStorage.setItem('wasOnProjectPage', 'true');
    };

    // Add event listener to links to project pages
    const projectLinks = document.querySelectorAll('.works-card');
    projectLinks.forEach(link => {
      link.addEventListener('click', handleBeforeProjectNav);
    });
    
    // Remove forced body opacity when component unmounts
    return () => {
      document.body.style.opacity = "";
      document.body.style.transition = "";
      document.documentElement.style.scrollBehavior = "";
      
      // Clean up event listeners
      projectLinks.forEach(link => {
        link.removeEventListener('click', handleBeforeProjectNav);
      });
    };
  }, [location]);

  // Force resize event to refresh layout calculations 
  // (particularly important for category arrows)
  useEffect(() => {
    if (pageLoaded) {
      const resizeTimers = [
        setTimeout(() => window.dispatchEvent(new Event('resize')), 100),
        setTimeout(() => window.dispatchEvent(new Event('resize')), 500)
      ];
      
      return () => resizeTimers.forEach(timer => clearTimeout(timer));
    }
  }, [pageLoaded]);
  
  return (
    <div 
      id="works" 
      className={pageLoaded ? "works-page-loaded" : "works-page-loading"}
    >
      <WorksHero id="works-hero" />
      <WorksCategories 
        isPageLoaded={pageLoaded} 
        preserveState={isBackNavigation} 
      />
    </div>
  );
};

export default WorksPage;