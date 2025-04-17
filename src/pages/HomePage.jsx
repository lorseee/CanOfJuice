import React from "react";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Projects from "../components/Projects";
import Logos from "../components/Logos"

const HomePage = () => {
  return (
    <div id={"home"} className="bg-black text-white">
      <Hero />
      <AboutUs />
      <Projects />
      <Logos />
    </div>
  );
};

export default HomePage;
