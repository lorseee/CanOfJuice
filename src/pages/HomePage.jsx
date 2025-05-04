import React, { useEffect } from "react";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Info from "../components/Info";
import Projects from "../components/Projects";
import Logos from "../components/Logos";

const HomePage = () => {
  useEffect(() => {
    // Force scroll restoration to manual
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Always scroll to top (ensures consistent reload)
    window.scrollTo(0, 0);

    // Delay scroll to hero
    setTimeout(() => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "instant" });
      }
    }, 100);
  }, []);

  return (
    <div id="home">
      <Hero id="hero" />
      <AboutUs />
      <Info />
      <Projects />
      <Logos />
    </div>
  );
};

export default HomePage;
