import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ScrollWrapper from "../components/ScrollWrapper";
import { projects, categories, projectImages } from "../constants";

const WorksCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false); // Changed default to false
  const projectsContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Pre-compute project images mapping for better performance
  const getProjectImage = useMemo(() => {
    const imageMap = {};
    projects.forEach(project => {
      imageMap[project.id] = projectImages[project.id]?.main || projectImages["default"].main;
    });
    return (id) => imageMap[id] || projectImages["default"].main;
  }, []);

  // Use useMemo to filter projects only when selectedCategory changes
  const filteredProjects = useMemo(() => {
    return selectedCategory === "all"
      ? projects
      : projects.filter(
          (project) =>
            project.category.trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
        );
  }, [selectedCategory]);

  const handleProjectClick = (id) => navigate(`/project/${id}`);

  const handleImageError = (e) => {
    e.target.src = projectImages["default"].main;
  };

  const handleBackToHero = () => {
    navigate("/works");
  };

  // Handle category change without artificial delay
  const handleCategoryChange = (categoryId) => {
    if (categoryId === selectedCategory) return; // Skip if already selected
    setSelectedCategory(categoryId);
  };

  return (
    <div className="works-showcase-page">
      <ScrollWrapper id="works-showcase" index={0} className="works-showcase">
        <div className="works-categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`works-category-btn ${
                selectedCategory === cat.id ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(cat.id)}
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
              onClick={() => handleCategoryChange("all")}
            >
              View all projects
            </button>
          </div>
        ) : (
          <div ref={projectsContainerRef} className="works-grid animate-in">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="works-card"
                onClick={() => handleProjectClick(project.id)}
                style={{
                  transitionDelay: `${Math.min(index * 0.03, 0.3)}s`, // Faster transitions with a cap
                }}
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

export default WorksCategories;