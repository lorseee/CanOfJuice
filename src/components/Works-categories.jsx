import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ScrollWrapper from "../components/ScrollWrapper";
import { projects } from "../constants";

/* ↓  lower fraction  =  slower perceived scroll (was 0.60) */
const SCROLL_STEP = 0.60;

// Save category state between navigations
const getCachedState = () => {
  try {
    const saved = sessionStorage.getItem('worksCategoryState');
    return saved ? JSON.parse(saved) : null;
  } catch(e) {
    return null;
  }
};

const WorksCategories = ({ isPageLoaded = true, preserveState = false }) => {
  // Get cached state if navigating back
  const cachedState = useMemo(() => preserveState ? getCachedState() : null, [preserveState]);
  
  const [selectedCategory, setSelectedCategory] = useState(cachedState?.category || "all");
  const [isLoading, setIsLoading] = useState(false);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  const barRef = useRef(null);
  const navigate = useNavigate();
  const categoryTransitionActive = useRef(false);
  
  /* ---------------------------------------------------- */
  /* helper: check and update arrow enable/disable states */
  const refreshArrows = useCallback(() => {
    const el = barRef.current;
    if (!el) return;
    
    // Ensure element has dimensions
    if (el.offsetWidth === 0) return;
    
    const newCanLeft = el.scrollLeft > 0;
    const newCanRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;
    
    setCanLeft(newCanLeft);
    setCanRight(newCanRight);
  }, []);

  /* ---------------------------------------------------- */
  /* Mount effect - critical for initial display */
  useEffect(() => {
    setIsComponentMounted(true);
    
    // Initial arrow refresh with progressive timing
    const refreshTimers = [
      setTimeout(refreshArrows, 0),
      setTimeout(refreshArrows, 150),
      setTimeout(refreshArrows, 500)
    ];
    
    // Restore scroll position of category bar if coming back
    if (preserveState && cachedState?.scrollLeft && barRef.current) {
      barRef.current.scrollLeft = cachedState.scrollLeft;
    }
    
    setContentReady(true);
    
    return () => refreshTimers.forEach(timer => clearTimeout(timer));
  }, [refreshArrows, preserveState, cachedState]);

  /* ---------------------------------------------------- */
  /* Handle page loaded state */
  useEffect(() => {
    if (isPageLoaded && isComponentMounted) {
      refreshArrows();
      
      // Force a refresh of the UI
      requestAnimationFrame(() => {
        const el = barRef.current;
        if (el) {
          setCanLeft(el.scrollLeft > 0);
          setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
        }
      });
    }
  }, [isPageLoaded, isComponentMounted, refreshArrows]);

  /* ---------------------------------------------------- */
  /* Scroll event handling effect */
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    /* wheel => horizontal */
    const onWheel = e => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        refreshArrows();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    /* click-drag */
    let down = false, startX = 0, startScroll = 0;
    const onDown = e => { down = true; startX = e.pageX; startScroll = el.scrollLeft; };
    const onMove = e => {
      if (!down) return;
      e.preventDefault();
      el.scrollLeft = startScroll - (e.pageX - startX);
      refreshArrows();
    };
    const onUp = () => { down = false; };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    /* respond to scroll events */
    const onScroll = () => {
      refreshArrows();
      
      // Cache scroll position for return navigation
      if (isPageLoaded) {
        const state = {
          category: selectedCategory,
          scrollLeft: el.scrollLeft
        };
        sessionStorage.setItem('worksCategoryState', JSON.stringify(state));
      }
    };
    el.addEventListener("scroll", onScroll);

    /* handle window resize for responsive layouts */
    const onResize = () => {
      refreshArrows();
      // Double check in case of slow layout updates
      setTimeout(refreshArrows, 100);
    };
    window.addEventListener("resize", onResize);

    /* handle visibility changes - important for tab switching */
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setTimeout(refreshArrows, 100);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    /* MutationObserver to detect DOM changes that might affect scrolling */
    const observer = new MutationObserver(() => {
      if (!categoryTransitionActive.current) {
        refreshArrows();
      }
    });
    
    observer.observe(el, { 
      childList: true, 
      subtree: true, 
      attributes: true, 
      attributeFilter: ['class', 'style']
    });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
    };
  }, [refreshArrows, isPageLoaded, selectedCategory]);

  /* ---------------------------------------------------- */
  /* data memoization */
  const getImage = useMemo(() => {
    const map = {};
    projects.items.forEach(p => { 
      map[p.id] = p.images?.main || "/images/projects/default/main.jpg"; 
    });
    return id => map[id] || "/images/projects/default/main.jpg";
  }, []);

  const filteredProjects = useMemo(() => (
    selectedCategory === "all"
      ? projects.items
      : projects.items.filter(p => p.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase())
  ), [selectedCategory]);

  const activeCat = useMemo(() => 
    projects.categories.find(c => c.id === selectedCategory), 
  [selectedCategory]);

  /* ---------------------------------------------------- */
  /* event handlers */
  const changeCategory = useCallback(id => {
    if (id !== selectedCategory) {
      // Set a flag to prevent flickering during category change
      categoryTransitionActive.current = true;
      
      // Create temporary loading state
      setIsLoading(true);
      
      // Short timeout to allow loading state to be visible
      setTimeout(() => {
        // Change category
        setSelectedCategory(id);
        
        // Reset scroll position on category change
        if (barRef.current) {
          barRef.current.scrollLeft = 0;
        }
        
        // Short delay to ensure DOM has updated
        setTimeout(() => {
          setIsLoading(false);
          refreshArrows();
          categoryTransitionActive.current = false;
          
          // Update cache
          const state = {
            category: id,
            scrollLeft: 0
          };
          sessionStorage.setItem('worksCategoryState', JSON.stringify(state));
        }, 150);
      }, 100);
    }
  }, [selectedCategory, refreshArrows]);
  
  const openProject = useCallback(id => {
    // Save current category state before navigation
    const state = {
      category: selectedCategory,
      scrollLeft: barRef.current?.scrollLeft || 0
    };
    sessionStorage.setItem('worksCategoryState', JSON.stringify(state));
    
    // Navigate to project
    navigate(`/project/${id}`);
  }, [navigate, selectedCategory]);
  
  const onImgError = useCallback(e => { 
    e.target.src = "/images/projects/default/main.jpg"; 
  }, []);

  const scrollByStep = useCallback(dir => {
    const el = barRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * SCROLL_STEP * dir, behavior: "smooth" });
    /* refreshArrows will run via 'scroll' listener */
  }, []);

  /* ---------------------------------------------------- */
  /* render with fade-in transition for initial appearance */
  return (
    <div className={`works-showcase-page ${contentReady ? 'content-ready' : ''}`}>
      <ScrollWrapper id="works-showcase" index={0} className="works-showcase">

        {/* ------------ category bar with arrows ------------ */}
        <div className="works-cat-wrapper">
          <button
            className={`works-cat-arrow left${canLeft ? "" : " disabled"}`}
            onClick={() => canLeft && scrollByStep(-1)}
            aria-label="Scroll categories left"
          >&#8249;</button>

          <div 
            ref={barRef} 
            className="works-categories"
            style={{ 
              // Force hardware acceleration
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)"
            }}
          >
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

          <button
            className={`works-cat-arrow right${canRight ? "" : " disabled"}`}
            onClick={() => canRight && scrollByStep(1)}
            aria-label="Scroll categories right"
          >&#8250;</button>
        </div>

        {/* ------------ description ------------ */}
        {activeCat?.description && (
          <p className="works-category-description">{activeCat.description}</p>
        )}

        {/* ------------ grid / empty / spinner ------------ */}
        {isLoading ? (
          <div className="works-loading"><div className="works-spinner" /></div>
        ) : filteredProjects.length === 0 ? (
          <div className="works-no-projects">
            <h3 className="works-no-projects-title">No projects found in this category</h3>
            <button className="works-view-all-btn" onClick={() => changeCategory("all")}>
              View all projects
            </button>
          </div>
        ) : (
          <div className="works-grid animate-in">
            {filteredProjects.map((p,i) => (
              <div
                key={p.id}
                className="works-card"
                onClick={() => openProject(p.id)}
                style={{ transitionDelay: `${Math.min(i*0.03,0.3)}s` }}
              >
                <div className="works-card-image-container">
                  <img
                    src={getImage(p.id)}
                    alt={p.title}
                    className="works-card-image"
                    loading="lazy"
                    onError={onImgError}
                  />
                  <div className="works-card-overlay">
                    <h3 className="works-card-title">{p.title}</h3>
                    <p className="works-card-desc">{p.shortDescription || p.label || "View project"}</p>
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