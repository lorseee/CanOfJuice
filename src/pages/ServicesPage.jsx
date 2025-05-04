// ServicesPage.jsx - fixed version
import React, { useEffect } from "react";
import ServicesHero from "../components/Services-hero";
import ServicesLists from "../components/Services-Lists";

const ServicesPage = () => {
  useEffect(() => {
    // Handle hash navigation
    const handleScroll = () => {
      const hash = window.location.hash;
      
      // If no hash or hash is for the services section itself, scroll to top
      if (!hash || hash === "#services" || hash === "#services-hero") {
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
    
    // Execute once on mount
    handleScroll();
    
    // Also add an event listener for hash changes
    window.addEventListener('hashchange', handleScroll);
    
    return () => {
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);
  
  return (
    <div id="services" >
      <ServicesHero id="services-hero" />
      <ServicesLists />
    </div>
  );
};

export default ServicesPage;