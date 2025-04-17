import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollWrapper from "../components/ScrollWrapper";
import { projects, categories, projectImages } from "../constants";

const WorksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Only reset scroll on initial component mount, not on category changes
  useEffect(() => {
    // Using setTimeout with 0 delay ensures it runs after render
    setTimeout(() => window.scrollTo(0, 0), 0);
    
    // Disable browser's scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []); // Empty dependency array means this runs only once on mount
  
  // Handle loading state separately when category changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const getProjectImage = (projectId) => {
    return projectImages[projectId]?.main || projectImages["default"].main;
  };

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter(
          (project) =>
            project.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
        );

  const handleProjectClick = (projectId) => navigate(`/project/${projectId}`);

  const handleImageError = (e) => {
    e.target.src = projectImages["default"].main;
  };

  return (
    <div className="slide-in-from-bottom">
      <style>{`
        .slide-in-from-bottom {
          animation: slideInFromBottom 0.8s ease forwards;
        }
        @keyframes slideInFromBottom {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-heading {
          animation: fadeInScale 1.2s ease-in-out forwards;
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Hero section - Always visible regardless of loading state */}
      <ScrollWrapper
        id="works"
        index={0}
        className="bg-black text-white h-screen flex justify-center items-center relative"
      >
        <div className="w-[80%] h-[80%] mx-auto rounded-lg overflow-hidden shadow-lg">
          <img
            src="/images/works-hero.png"
            alt="Works Hero"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <h1 className="animate-heading absolute inset-0 flex justify-center items-center text-[10vw] md:text-[7vw] lg:text-[5vw] font-extrabold text-white">
            OUR WORK
          </h1>
        </div>
      </ScrollWrapper>

      {/* Projects showcase section */}
      <ScrollWrapper id="works-showcase" index={2} >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-black text-white shadow-lg scale-105"
                    : "bg-black text-amber-300"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl text-black font-medium">
                No projects found in this category
              </h3>
              <button
                className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                onClick={() => setSelectedCategory("all")}
              >
                View all projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-lg overflow-hidden shadow-xl group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={getProjectImage(project.id)}
                      alt={project.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white text-2xl font-bold translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-300">
                        {project.shortDescription || "View project details"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollWrapper>
    </div>
  );
};

export default WorksPage;