import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollWrapper from "../components/ScrollWrapper";
import { projects, categories, projectImages } from "../constants";

const WorksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const getProjectImage = (id) =>
    projectImages[id]?.main || projectImages["default"].main;

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter(
          (project) =>
            project.category.trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
        );

  const handleProjectClick = (id) => navigate(`/project/${id}`);

  const handleImageError = (e) => {
    e.target.src = projectImages["default"].main;
  };

  return (
    <div className="works-page works-slide-in">
      <ScrollWrapper
          id="works"
          index={0}
          className="works-hero slide-in-from-bottom"
        >
          <div className="works-hero-wrapper">
            <img
              src="/images/works-hero.png"
              alt="Works Hero"
              className="works-hero-image"
              onError={handleImageError}
            />
            <h1 className="works-hero-title animate-heading">OUR WORK</h1>
          </div>
        </ScrollWrapper>


      <ScrollWrapper id="works-showcase" index={2} className="works-showcase">
        <div className="works-categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`works-category-btn ${
                selectedCategory === cat.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="works-loading">
            <div className="works-spinner" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="works-no-projects">
            <h3 className="works-no-projects-title">
              No projects found in this category
            </h3>
            <button
              className="works-view-all-btn"
              onClick={() => setSelectedCategory("all")}
            >
              View all projects
            </button>
          </div>
        ) : (
          <div className="works-grid">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="works-card"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="works-card-image-container">
                  <img
                    src={getProjectImage(project.id)}
                    alt={project.title}
                    className="works-card-image"
                    onError={handleImageError}
                    loading="lazy"
                  />
                  <div className="works-card-overlay">
                    <h3 className="works-card-title">{project.title}</h3>
                    <p className="works-card-desc">
                      {project.shortDescription || "View project details"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollWrapper>
    </div>
  );
};

export default WorksPage;
