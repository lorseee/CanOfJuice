// ServicesPage.jsx – hard-reset scroll on mount
import React, { useLayoutEffect, useEffect } from "react";
import ServicesHero   from "../components/Services-hero";
import ServicesLists  from "../components/Services-Lists";

const ServicesPage = () => {
  /* 1. Force the viewport to (0,0) BEFORE first paint */
  useLayoutEffect(() => {
    // Temporarily override the browser’s automatic restoration
    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      // Restore the original behaviour on unmount
      return () => {
        window.history.scrollRestoration = previous;
      };
    }
    // Fallback for very old browsers
    window.scrollTo(0, 0);
  }, []);

  /* 2. Handle any URL hash after the top-reset */
  useEffect(() => {
    const scrollToHash = () => {
      const { hash } = window.location;
      if (hash && hash !== "#services" && hash !== "#services-hero") {
        // Small delay allows the target element to render
        setTimeout(() => {
          const el = document.getElementById(hash.substring(1));
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    };

    // Run once on mount
    scrollToHash();

    // Honour future hash changes while on this page
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  /* 3. Render */
  return (
    <div id="services">
      <ServicesHero id="services-hero" />
      <ServicesLists />
    </div>
  );
};

export default ServicesPage;
