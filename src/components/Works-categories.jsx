/* Works-categories.jsx – rev-M1 – 12 May 2025
   • Category filter supports single or multiple category arrays
   • Updated to show primary service instead of generic “View project” text
------------------------------------------------------------------ */
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ScrollWrapper from "../components/ScrollWrapper";
import { projects } from "../constants";

const SCROLL_STEP = 0.60;

/* restore cached bar scroll */
const getCachedState = () => {
  try {
    const saved = sessionStorage.getItem("worksCategoryState");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const WorksCategories = ({ isPageLoaded = true, preserveState = false }) => {
  const cachedState = useMemo(() => (preserveState ? getCachedState() : null), [preserveState]);

  const [selectedCategory, setSelectedCategory] = useState(cachedState?.category || "all");
  const [isLoading,      setIsLoading]      = useState(false);
  const [canLeft,        setCanLeft]        = useState(false);
  const [canRight,       setCanRight]       = useState(false);
  const [contentReady,   setContentReady]   = useState(false);

  const barRef   = useRef(null);
  const navigate = useNavigate();
  const inTransit = useRef(false);

  /* refresh arrow visibility */
  const refreshArrows = useCallback(() => {
    const el = barRef.current;
    if (!el || el.offsetWidth === 0) return;
    setCanLeft (el.scrollLeft > 0);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  /* scroll active btn into view */
  const scrollActiveIntoView = useCallback(() => {
    const el = barRef.current;
    if (!el) return;
    const active = el.querySelector(".works-category-btn.active");
    if (active) active.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, []);

  /* mount */
  useEffect(() => {
    setContentReady(true);
    setTimeout(refreshArrows, 50);
    if (preserveState && cachedState?.scrollLeft && barRef.current) {
      barRef.current.scrollLeft = cachedState.scrollLeft;
    }
    scrollActiveIntoView();
  }, [refreshArrows, preserveState, cachedState, scrollActiveIntoView]);

  /* ---------- data helpers ---------- */
  const getImage = useMemo(() => {
    const map = {};
    projects.items.forEach((p) => {
      map[p.id] = p.images?.main || "/images/projects/default/main.jpg";
    });
    return (id) => map[id] || "/images/projects/default/main.jpg";
  }, []);

  // helper to extract primary service
  const getPrimaryService = useCallback((services) => {
    if (!services) return "";
    return String(services).split(',')[0].trim();
  }, []);

  /* ---------- filter projects ---------- */
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projects.items;
    return projects.items.filter(p => {
      const arr = Array.isArray(p.category) ? p.category : [p.category];
      return arr.some(cat =>
        cat.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      );
    });
  }, [selectedCategory]);

  const activeCat = useMemo(
    () => projects.categories.find(c => c.id === selectedCategory),
    [selectedCategory]
  );

  /* ---------- handlers ---------- */
  const changeCategory = useCallback((id) => {
    if (id === selectedCategory) return;
    inTransit.current = true;
    setIsLoading(true);

    setTimeout(() => {
      setSelectedCategory(id);
      setTimeout(() => {
        scrollActiveIntoView();
        setIsLoading(false);
        refreshArrows();
        inTransit.current = false;

        sessionStorage.setItem("worksCategoryState", JSON.stringify({
          category: id,
          scrollLeft: barRef.current?.scrollLeft || 0,
        }));
      }, 100);
    }, 80);
  }, [selectedCategory, refreshArrows, scrollActiveIntoView]);

  const openProject = useCallback((id) => {
    sessionStorage.setItem("worksCategoryState", JSON.stringify({
      category: selectedCategory,
      scrollLeft: barRef.current?.scrollLeft || 0,
    }));
    sessionStorage.setItem("returnToProjectId", id);
    navigate(`/project/${id}`);
  }, [navigate, selectedCategory]);

  const onImgError = useCallback((e) => {
    e.currentTarget.src = "/images/projects/default/main.jpg";
  }, []);

  const scrollByStep = useCallback((dir) => {
    const el = barRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * SCROLL_STEP * dir, behavior: "smooth" });
  }, []);

  /* ---------- render ---------- */
  return (
    <div className={`works-showcase-page ${contentReady ? "content-ready" : ""}`}>
      <ScrollWrapper id="works-showcase" index={0} className="works-showcase">
        {/* Category bar */}
        <div className="works-cat-wrapper">
          <button className={`works-cat-arrow left${canLeft ? "" : " disabled"}`} onClick={() => canLeft  && scrollByStep(-1)} aria-label="Scroll categories left">&#8249;</button>

          <div ref={barRef} className="works-categories">
            {projects.categories.map(cat => (
              <button
                key={cat.id}
                className={`works-category-btn${selectedCategory === cat.id ? " active" : ""}`}
                onClick={() => changeCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button className={`works-cat-arrow right${canRight ? "" : " disabled"}`} onClick={() => canRight && scrollByStep(1)} aria-label="Scroll categories right">&#8250;</button>
        </div>

        {/* Category description */}
        {activeCat?.description && (
          <p className="works-category-description">{activeCat.description}</p>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="works-loading"><div className="works-spinner" /></div>
        ) : filteredProjects.length === 0 ? (
          <div className="works-no-projects">
            <h3 className="works-no-projects-title">No projects found in this category</h3>
            <button className="works-view-all-btn" onClick={() => changeCategory("all")}>View all projects</button>
          </div>
        ) : (
          <div className="works-grid animate-in">
            {filteredProjects.map((p, i) => (
              <div
                key={p.id}
                id={`card-${p.id}`}
                className="works-card"
                onClick={() => {
                  if (p.id === 2) {
                    navigate("/case-studies/2"); // Wework
                  } else if (p.id === 17) {
                    navigate("/case-studies/17"); // Banana Sport
                  } else if (p.id === 10) {
                    navigate("/case-studies/10"); // Farm Stories
                  } else if (p.id === 29) {
                    navigate("/case-studies/29"); // 1131
                  } else {
                    openProject(p.id);
                  }
                }}
                style={{ transitionDelay: `${Math.min(i * 0.03, 0.3)}s` }}
              >
                <div className="works-card-image-container">
                  <img src={getImage(p.id)} alt={p.title} className="works-card-image" loading="lazy" onError={onImgError} />
                  <div className="works-card-overlay">
                    <h3 className="works-card-title">{p.title}</h3>
                    <p className="works-card-desc">{getPrimaryService(p.services)}</p>
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
