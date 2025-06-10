import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";     
import WorksPage from "../pages/WorksPage";     
import ServicesPage from "../pages/ServicesPage";  
import ProjectDetailPage from "../pages/ProjectDetailPage";
import CaseStudies from "../pages/CaseStudies";
import NotFound from "../pages/NotFound";
import GalleryLayouts1 from "../layouts/ProjectLayouts/GalleryLayouts1";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />           
      <Route path="/works" element={<WorksPage />} />
      <Route path="/services" element={<ServicesPage />} />   
      <Route path="/project/:id" element={<ProjectDetailPage />} />
      <Route path="/case-studies/:id" element={<CaseStudies />} />
      <Route path="/gallery-1" element={<GalleryLayouts1 />} />
      <Route path="*" element={<NotFound />} /> 
    </Routes>
  );
};

export default AppRoutes;
