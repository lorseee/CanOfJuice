import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";     
import WorksPage from "../pages/WorksPage";     
import ServicesPage from "../pages/ServicesPage";  
import ProjectDetailPage from "../pages/ProjectDetailPage";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />           
      <Route path="/works" element={<WorksPage />} />
      <Route path="/services" element={<ServicesPage />} />   
      <Route path="/project/:id" element={<ProjectDetailPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
