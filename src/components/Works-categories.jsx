/* =========================================================================
   WORKS CATEGORIES (React) – 2025-05-01 rev-B
   ========================================================================= */
   import React, { useState, useEffect, useRef, useMemo } from "react";
   import { useNavigate } from "react-router-dom";
   import ScrollWrapper from "../components/ScrollWrapper";
   import { projects, categories, projectImages } from "../constants";
   
   /* ↓  lower fraction  =  slower perceived scroll (was 0.85) */
   const SCROLL_STEP = 0.60;
   
   const WorksCategories = () => {
     const [selectedCategory, setSelectedCategory] = useState("all");
     const [isLoading, setIsLoading]             = useState(false);
     const [canLeft,   setCanLeft]               = useState(false);
     const [canRight,  setCanRight]              = useState(false);
   
     const barRef = useRef(null);
     const navigate = useNavigate();
   
     /* ---------------------------------------------------- */
     /* helper: check and update arrow enable/disable states */
     const refreshArrows = () => {
       const el = barRef.current;
       if (!el) return;
       setCanLeft(el.scrollLeft > 0);
       setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
     };
   
     /* ---------------------------------------------------- */
     /* on first mount: scroll reset + attach scroll helpers */
     useEffect(() => {
       /* reset page scroll */
       setTimeout(() => window.scrollTo(0, 0), 0);
       if ("scrollRestoration" in history) history.scrollRestoration = "manual";
   
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
   
       /* respond to touch scroll too */
       el.addEventListener("scroll", refreshArrows);
       refreshArrows();
   
       return () => {
         el.removeEventListener("wheel", onWheel);
         el.removeEventListener("mousedown", onDown);
         el.removeEventListener("mousemove", onMove);
         window.removeEventListener("mouseup", onUp);
         el.removeEventListener("scroll", refreshArrows);
       };
     }, []);
   
     /* ---------------------------------------------------- */
     /* data memoisation */
     const getImage = useMemo(() => {
       const map = {};
       projects.forEach(p => { map[p.id] = projectImages[p.id]?.main || projectImages["default"].main; });
       return id => map[id] || projectImages["default"].main;
     }, []);
   
     const filteredProjects = useMemo(() => (
       selectedCategory === "all"
         ? projects
         : projects.filter(p => p.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase())
     ), [selectedCategory]);
   
     const activeCat = useMemo(() => categories.find(c => c.id === selectedCategory), [selectedCategory]);
   
     /* ---------------------------------------------------- */
     /* event handlers */
     const changeCategory = id => id !== selectedCategory && setSelectedCategory(id);
     const openProject   = id => navigate(`/project/${id}`);
     const onImgError    = e  => { e.target.src = projectImages["default"].main; };
   
     const scrollByStep = dir => {
       const el = barRef.current;
       if (!el) return;
       el.scrollBy({ left: el.clientWidth * SCROLL_STEP * dir, behavior: "smooth" });
       /* refreshArrows will run via 'scroll' listener */
     };
   
     /* ---------------------------------------------------- */
     /* render */
     return (
       <div className="works-showcase-page">
         <ScrollWrapper id="works-showcase" index={0} className="works-showcase">
   
           {/* ------------ category bar with arrows ------------ */}
           <div className="works-cat-wrapper">
             <button
               className={`works-cat-arrow left${canLeft ? "" : " disabled"}`}
               onClick={() => canLeft && scrollByStep(-1)}
               aria-label="Scroll categories left"
             >&#8249;</button>
   
             <div ref={barRef} className="works-categories">
               {categories.map(cat => (
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
                       <p className="works-card-desc">{p.shortDescription || "View project"}</p>
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
   