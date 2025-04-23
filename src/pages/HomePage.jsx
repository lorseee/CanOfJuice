import React, { useEffect } from "react";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Projects from "../components/Projects";
import Logos from "../components/Logos";

const HomePage = () => {
  useEffect(() => {
    setTimeout(() => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); 
  }, []);
  

  return (
    <div id="home" className="bg-black text-white">
      <Hero id="hero" />
      <AboutUs />
      <Projects />
      <Logos />
    </div>
  );
};

export default HomePage;