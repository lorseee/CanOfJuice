/* =====================================================================
   CaseStudiesPage.jsx  –  Single-study view chosen via router state
   rev-E  (7 May 2025)
   ---------------------------------------------------------------------
   • TailwindCSS + GSAP (ScrollTrigger) required.
   • ProjectDetailPage must navigate with
       navigate("/case-studies", { state: { caseId: <id> } })
   =====================================================================*/

   import React, { useEffect, useRef } from "react";
   import { useLocation, useNavigate } from "react-router-dom";
   import gsap from "gsap";
   import { ScrollTrigger } from "gsap/ScrollTrigger";
   
   gsap.registerPlugin(ScrollTrigger);
   
   /* ------------------------------------------------------------------ */
   /* 1 ▸ DATA – swap placeholder paths with real images                 */
   const CASE_STUDIES = [
     /* … (same objects as before, truncated here for brevity) … */
   ];
   
   /* ------------------------------------------------------------------ */
   /* 2 ▸ REUSABLE PRESENTATION COMPONENTS                               */
   const BulletList = ({ items }) => (
     <ul className="space-y-2 pl-4">
       {items.map((li, i) => (
         <li key={i} className="flex gap-2 text-sm md:text-base">
           <span className="block w-1 h-1 mt-2 rounded-full bg-amber-400" />
           <span>{li}</span>
         </li>
       ))}
     </ul>
   );
   
   const ImageStrip = ({ srcArray = [] }) => (
     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
       {srcArray.map((src, i) => (
         <div key={i} className="w-full aspect-video overflow-hidden rounded-xl shadow-lg">
           <img
             src={src}
             alt=""
             className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
           />
         </div>
       ))}
     </div>
   );
   
   /* ------------------------------------------------------------------ */
   /* 3 ▸ PAGE                                                           */
   const CaseStudiesPage = () => {
     const pageRef = useRef(null);
     const { state } = useLocation();          // ← get caseId
     const navigate  = useNavigate();
   
     /* Pick the requested study (fallback to first) */
     const study =
       CASE_STUDIES.find(cs => cs.id === state?.caseId) ?? CASE_STUDIES[0];
   
     /* GSAP entrance */
     useEffect(() => {
       const ctx = gsap.context(() => {
         const sec = document.querySelector(".case-section");
         gsap.fromTo(
           sec,
           { y: 120, opacity: 0 },
           { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
         );
         gsap.fromTo(
           sec.querySelector(".cs-hero-img"),
           { scale: 1.1, filter: "brightness(0.75)" },
           { scale: 1,   filter: "brightness(1)", duration: 1.4, ease: "power3.out" },
         );
       }, pageRef);
       return () => ctx.revert();
     }, []);
   
     return (
       <div ref={pageRef} className="case-studies-page bg-black text-white">
         {/* PAGE HERO */}
         <section className="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-fuchsia-700/5 animate-pulseSlow" />
           <h1 className="text-5xl md:text-7xl font-light tracking-wider z-10">
             Case Study
           </h1>
         </section>
   
         {/* SINGLE CASE SECTION */}
         <article className="case-section relative overflow-hidden py-16 md:py-24 px-6 md:px-12">
           {/* HERO IMAGE */}
           <div className="relative w-full mb-14">
             <img
               src={study.heroImg}
               alt={study.title}
               className="cs-hero-img w-full h-[60vh] object-cover rounded-2xl shadow-2xl"
             />
             <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-black/60" />
           </div>
   
           {/* BODY */}
           <div className="max-w-5xl mx-auto space-y-10 md:space-y-14">
             {/* Top meta */}
             <header className="space-y-4">
               <h2 className="text-3xl md:text-4xl font-light">{study.title}</h2>
               <p className="text-sm uppercase tracking-widest text-amber-400">
                 Client: {study.client} <span className="mx-2">•</span> {study.scope}
               </p>
               <p className="text-sm italic text-gray-400">
                 Service Areas: {study.serviceAreas}
               </p>
             </header>
   
             {/* Challenge */}
             <section className="space-y-4">
               <h3 className="text-lg font-light">Challenge</h3>
               <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
             </section>
   
             {/* Approach */}
             <section className="space-y-4">
               <h3 className="text-lg font-light">Approach</h3>
               <p className="text-gray-300 leading-relaxed">{study.approach}</p>
             </section>
   
             {/* Execution */}
             <section className="space-y-4">
               <h3 className="text-lg font-light">Execution Highlights</h3>
               <BulletList items={study.execution} />
             </section>
   
             {/* Gallery */}
             {study.gallery?.length > 0 && <ImageStrip srcArray={study.gallery} />}
   
             {/* Impact */}
             <section className="space-y-4 mt-8">
               <h3 className="text-lg font-light">Impact</h3>
               <BulletList items={study.impact} />
             </section>
           </div>
   
           {/* Back button */}
           <div className="mt-16 text-center">
             <button
               className="px-6 py-3 border border-amber-400 text-amber-400 rounded-md hover:bg-amber-400/10 transition"
               onClick={() => navigate(-1)}
             >
               ← Back
             </button>
           </div>
         </article>
       </div>
     );
   };
   
   export default CaseStudiesPage;
   