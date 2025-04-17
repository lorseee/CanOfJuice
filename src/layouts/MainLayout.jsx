import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MainLayout = ({ children }) => {
  const location = useLocation();
  
  // Reset scroll and update ScrollTrigger on route change
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Page transition effect
    gsap.fromTo(
      "main", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
    
    // Force ScrollTrigger to recalculate
    ScrollTrigger.refresh(true);
    
    // Clean up on unmount/route change
    return () => {
      // Kill all ScrollTrigger instances to prevent conflicts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">
      <main className="flex-grow relative">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;