/******************************************************************************
 * Works-categories.jsx – scrollable category bar and responsive project grid
 * (rev-K  •  7 May 2025)
 * Legal note: Author grants you an irrevocable, royalty-free, worldwide
 * licence to use, modify, and distribute this work in whole or in part.
 ******************************************************************************/

import React, {
  useState, useEffect, useRef, useMemo, useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import ScrollWrapper   from "../components/ScrollWrapper";
import { projects }    from "../constants";

/* A lower fraction = slower perceived scroll */
const SCROLL_STEP = 0.60;

/* ---------- Restore cached bar state ------------------------------------ */
const getCachedState = () => {
  try {
    const saved = sessionStorage.getItem("worksCategoryState");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const WorksCategories = ({ isPageLoaded = true, preserveState = false }) => {
  /* -------------------- State ------------------------------------------- */
  const cachedState = useMemo(
    () => (preserveState ? getCachedState() : null),
    [preserveState],
  );

  const [selectedCategory, setSelectedCategory] = useState(
    cachedState?.category || "all",
  );
  const [isLoading, setIsLoading]       = useState(false);
  const [canLeft,   setCanLeft]         = useState(false);
  const [canRight,  setCanRight]        = useState(false);
  const [mounted,   setMounted]         = useState(false);
  const [contentReady, setContentReady] = useState(false);

  const barRef   = useRef(null);
  const nav      = useNavigate();
  const inTransit = useRef(false);

  /* -------------------- Helpers ----------------------------------------- */
  const refreshArrows = useCallback(() => {
    const el = barRef.current;
    if (!el || el.offsetWidth === 0) return;
    setCanLeft (el.scrollLeft > 0);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  const scrollActiveIntoView = useCallback(() => {
    const el = barRef.current;
    if (!el) return;
    const active = el.querySelector(".works-category-btn.active");
    if (active) active.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, []);

  /* -------------------- Mount-time -------------------------------------- */
  useEffect(() => {
    setMounted(true);

    const timers = [
      setTimeout(refreshArrows,   0),
      setTimeout(refreshArrows, 150),
      setTimeout(refreshArrows, 500),
    ];

    if (preserveState && cachedState?.scrollLeft && barRef.current) {
      barRef.current.scrollLeft = cachedState.scrollLeft;
    }
    setContentReady(true);
    scrollActiveIntoView();

    return () => timers.forEach(clearTimeout);
  }, [refreshArrows, preserveState, cachedState, scrollActiveIntoView]);

  /* Re-check arrows once page images/fonts settle */
  useEffect(() => {
    if (!isPageLoaded || !mounted) return;
    refreshArrows();
    requestAnimationFrame(refreshArrows);
  }, [isPageLoaded, mounted, refreshArrows]);

  /* -------------------- Wheel / drag / resize listeners ---------------- */
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    /* Wheel → horizontal scroll */
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        refreshArrows();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    /* Click-drag */
    let down = false, startX = 0, startScroll = 0;
    const onDown = (e) => { down = true;  startX = e.pageX; startScroll = el.scrollLeft; };
    const onMove = (e) => { if (!down) return;
      e.preventDefault(); el.scrollLeft = startScroll - (e.pageX - startX); refreshArrows(); };
    const onUp   = () => { down = false; };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    /* Native scroll  → persist bar pos                                      */
    const onScroll = () => {
      refreshArrows();
      if (isPageLoaded) {
        sessionStorage.setItem("worksCategoryState", JSON.stringify({
          category: selectedCategory,
          scrollLeft: el.scrollLeft,
        }));
      }
    };
    el.addEventListener("scroll", onScroll);

    /* Resize / tab-visibility                                               */
    const onResize = () => { refreshArrows(); setTimeout(refreshArrows, 100); };
    const onVis    = () => { if (document.visibilityState === "visible")
                               setTimeout(refreshArrows, 100); };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    /* DOM mutations inside bar                                              */
    const mo = new MutationObserver(() => {
      if (!inTransit.current) refreshArrows();
    });
    mo.observe(el, { childList: true, subtree: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      mo.disconnect();
    };
  }, [refreshArrows, isPageLoaded, selectedCategory]);

  /* -------------------- Memoised helpers -------------------------------- */
  const getImage = useMemo(() => {
    const map = {};
    projects.items.forEach((p) => {
      map[p.id] = p.images?.main || "/images/projects/default/main.jpg";
    });
    return (id) => map[id] || "/images/projects/default/main.jpg";
  }, []);

  const filteredProjects = useMemo(
    () => (selectedCategory === "all"
            ? projects.items
            : projects.items.filter(
                (p) => p.category.trim().toLowerCase()
                       === selectedCategory.trim().toLowerCase())),
    [selectedCategory],
  );

  const activeCat = useMemo(
    () => projects.categories.find((c) => c.id === selectedCategory),
    [selectedCategory],
  );

  /* -------------------- Event handlers ---------------------------------- */
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

  /* ------------------------------------------------------------------ */
  const openProject = useCallback((id) => {
    /* Persist category-bar state as before */
    sessionStorage.setItem("worksCategoryState", JSON.stringify({
      category: selectedCategory,
      scrollLeft: barRef.current?.scrollLeft || 0,
    }));
    /* NEW ► remember which project card we should return to */
    sessionStorage.setItem("returnToProjectId", id);
    nav(`/project/${id}`);
  }, [nav, selectedCategory]);

  /* Fallback image */
  const onImgError = useCallback(
    (e) => { e.target.src = "/images/projects/default/main.jpg"; }, []);

  const scrollByStep = useCallback((dir) => {
    const el = barRef.current; if (!el) return;
    el.scrollBy({ left: el.clientWidth * SCROLL_STEP * dir, behavior: "smooth" });
  }, []);

  /* -------------------- Render ------------------------------------------ */
  return (
    <div className={`works-showcase-page ${contentReady ? "content-ready" : ""}`}>
      <ScrollWrapper id="works-showcase" index={0} className="works-showcase">
        {/* ---------- Category bar ---------- */}
        <div className="works-cat-wrapper">
          <button
            className={`works-cat-arrow left${canLeft ? "" : " disabled"}`}
            onClick={() => canLeft && scrollByStep(-1)}
            aria-label="Scroll categories left"
          >&#8249;</button>

          <div ref={barRef} className="works-categories" style={{ transform: "translateZ(0)" }}>
            {projects.categories.map((cat) => (
              <button
                key={cat.id}
                className={`works-category-btn${selectedCategory === cat.id ? " active" : ""}`}
                onClick={() => changeCategory(cat.id)}
              >{cat.label}</button>
            ))}
          </div>

          <button
            className={`works-cat-arrow right${canRight ? "" : " disabled"}`}
            onClick={() => canRight && scrollByStep(1)}
            aria-label="Scroll categories right"
          >&#8250;</button>
        </div>

        {/* ---------- Category description ---------- */}
        {activeCat?.description && (
          <p className="works-category-description">{activeCat.description}</p>
        )}

        {/* ---------- Grid / loading / empty states ---------- */}
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
            {filteredProjects.map((p, i) => (
              <div
                key={p.id}
                id={`card-${p.id}`}
                className="works-card"
                data-card-id={`card-${p.id}`}
                onClick={() => openProject(p.id)}
                style={{ transitionDelay: `${Math.min(i * 0.03, 0.3)}s` }}
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
                    <p className="works-card-desc">
                      {p.shortDescription || p.label || "View project"}
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
