/* =====================================================================
   CaseStudiesPage.jsx  –  full-screen hero + R→L scroll narrative
   rev-G-placeholder • 10 May 2025
   ===================================================================== */

import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* 1 ▸ DATA (placeholder images)                                       */
const ph = (w, h) => `https://via.placeholder.com/${w}x${h}.jpg?text=+`;  // helper

export const CASE_STUDIES = [
  {
    id: 1,
    title: "Wework – Pan-India Branded Environments",
    client: "Wework India",
    serviceAreas: "Environmental Graphics, Signages, Installations",
    heroImg: ph(1920, 1080),
    metaImgs: [ph(1920, 1080), ph(1920, 1080)],
    challenge:
      "Wework wanted to bring their global brand experience to India while localising it for regional audiences. The brief was to make each location vibrant, functional, and aligned with Wework’s collaborative ethos.",
    approach:
      "We developed a scalable system of signage, wall graphics, LED installations, and large-format art for offices, common areas, and facades.",
    execution: [
      "Art installations and 3D brand moments",
      "Building façade signages with high visibility",
      "Motivational and quirky quote walls",
      "City-specific design themes for select locations",
    ],
    execImgs: [ph(1920, 1080), ph(1920, 1080), ph(1920, 1080), ph(1920, 1080)],
    impact: [
      "Created immersive brand experiences across 26 cities",
      "Strengthened employee engagement through spatial storytelling",
      "Contributed to consistent brand presence despite regional diversity",
    ],
    marquee: Array.from({ length: 6 }, () => ph(400, 250)),
  },

  {
    id: 2,
    title: "Farm Stories – Organic Brand from the Ground Up",
    client: "Farm Stories",
    serviceAreas: "Naming, Branding, Packaging, Social Media",
    heroImg: ph(1920, 1080),
    metaImgs: [ph(1920, 1080), ph(1920, 1080)],
    challenge:
      "Farm Stories needed a brand identity that captured its authenticity, freshness, and small-batch organic roots — without falling into generic ‘green-washed’ clichés.",
    approach:
      "We built a visual identity inspired by nature, farmer’s markets, and clean-food philosophy. Packaging design was earthy yet modern.",
    execution: [
      "Hand-drawn elements to reflect handmade care",
      "Labels optimised for both retail shelves and Instagram shots",
      "Extended brand visuals to social media and delivery collaterals",
    ],
    execImgs: [ph(1920, 1080), ph(1920, 1080), ph(1920, 1080)],
    impact: [
      "Increased visibility and trust in crowded organic space",
      "Seamless transition from local to D2C distribution",
      "Unified presence across packaging, digital, and physical touchpoints",
    ],
    marquee: Array.from({ length: 6 }, () => ph(400, 250)),
  },

  {
    id: 3,
    title: "1131 – From Concept to Cocktails",
    client: "1131 Restobar",
    serviceAreas: "Naming, Logo, Identity, Environment Branding",
    heroImg: ph(1920, 1080),
    metaImgs: [ph(1920, 1080), ph(1920, 1080)],
    challenge:
      "1131 was a new restobar concept looking to make a memorable first impression in Bangalore’s competitive dining scene.",
    approach:
      "We developed the name “1131”, a typographic logo, playful menu design, and branding across all guest touch-points.",
    execution: [
      "Black-and-white identity with accent golds for a premium feel",
      "Glass printing and surface branding for in-bar experiences",
      "Wall murals and ambient signage designed to spark Instagram shares",
    ],
    execImgs: [ph(1920, 1080), ph(1920, 1080), ph(1920, 1080)],
    impact: [
      "Elevated guest perception and brand recall",
      "Design consistency contributed to a seamless dining experience",
      "Helped position the brand as ‘not just another bar’",
    ],
    marquee: Array.from({ length: 6 }, () => ph(400, 250)),
  },

  {
    id: 4,
    title: "Banana Sports – From the Ground Up",
    client: "Banana Sports",
    serviceAreas: "Brand Identity, Signage, Graphics, Merchandise",
    heroImg: ph(1920, 1080),
    metaImgs: [ph(1920, 1080), ph(1920, 1080)],
    challenge:
      "Banana Sports needed a fresh and energetic brand that appealed to a new generation of players and fans.",
    approach:
      "We created a dynamic visual identity that extends into space graphics, way-finding and sport-specific brand moments.",
    execution: [
      "Youthful and sporty logo system",
      "Bold typography across facility signage",
      "On-ground branding with motivational quotes and sport cues",
      "Merchandise including t-shirts, caps, and water bottles",
    ],
    execImgs: [ph(1920, 1080), ph(1920, 1080), ph(1920, 1080), ph(1920, 1080)],
    impact: [
      "Strong brand presence and recognition",
      "Established Banana Sports as a distinctive multi-sport destination",
      "Seamless physical and visual flow throughout the facility",
    ],
    marquee: Array.from({ length: 6 }, () => ph(400, 250)),
  },
];

/* ------------------------------------------------------------------ */
/* 2 ▸ PRESENTATIONAL HELPERS (unchanged from rev-G)                   */
const FullImage = ({ src, alt = "", className = "" }) => (
  <div className={`w-full h-screen overflow-hidden ${className}`}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover object-center"
      loading="lazy"
    />
  </div>
);

const BulletList = ({ items }) => (
  <ul className="space-y-2 pl-6 max-w-4xl mx-auto">
    {items.map((li, i) => (
      <li key={i} className="relative text-base leading-relaxed">
        <span className="absolute -left-4 top-2 w-1 h-1 bg-amber-400 rounded-full" />
        {li}
      </li>
    ))}
  </ul>
);

const Marquee = ({ imgs }) => {
  const band = imgs.slice(0, 6);
  const roll = band.concat(band);
  return (
    <div className="overflow-hidden py-10 bg-black relative">
      <div
        className="flex gap-8 animate-marquee whitespace-nowrap"
        style={{ animationDuration: `${band.length * 4}s` }}
      >
        {roll.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-32 w-auto flex-none object-cover rounded-lg shadow-lg"
            loading="lazy"
          />
        ))}
      </div>
      <style>{`
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marqueeScroll linear infinite; }
      `}</style>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 3 ▸ PAGE                                                            */
const CaseStudiesPage = () => {
  const pageRef = useRef(null);
  const { state } = useLocation();
  const navigate  = useNavigate();

  const study =
    CASE_STUDIES.find((cs) => cs.id === state?.caseId) ?? CASE_STUDIES[0];

  /* animations (same as rev-G) */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".sect").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: i % 2 ? "120%" : "100%", opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
      gsap.from(".cs-hero", { x: "100%", duration: 1.2, ease: "power3.out" });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  /* fallback */
  if (!study) return null;

  return (
    <div ref={pageRef} className="case-studies-page bg-black text-white">
      {/* HERO */}
      <FullImage src={study.heroImg} alt={study.title} className="cs-hero" />

      {/* META & CHALLENGE */}
      <section className="sect py-12 md:py-20 px-6 md:px-12 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-light">{study.title}</h1>
        <p className="uppercase tracking-widest text-amber-400 text-sm">
          Client: {study.client}
        </p>
        <p className="italic text-gray-400 text-sm">
          Service Areas: {study.serviceAreas}
        </p>
        {study.challenge && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-light mb-2">Challenge</h2>
            <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
          </div>
        )}
      </section>

      {/* TWO FULLSCREEN IMAGES */}
      {study.metaImgs.map((src, i) => (
        <FullImage key={i} src={src} className="sect" />
      ))}

      {/* APPROACH */}
      {study.approach && (
        <section className="sect py-12 md:py-20 px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-light mb-2">Approach</h2>
            <p className="text-gray-300 leading-relaxed">{study.approach}</p>
          </div>
        </section>
      )}

      {/* EXECUTION */}
      {study.execution?.length > 0 && (
        <h2 className="sect text-center text-lg font-light py-6 md:py-10">
          Execution Highlights
        </h2>
      )}
      {study.execution.map((txt, i) => (
        <React.Fragment key={i}>
          {study.execImgs?.[i] && (
            <FullImage src={study.execImgs[i]} className="sect" />
          )}
          <section className="sect py-8 md:py-14 px-6 md:px-12 text-center">
            <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed">
              {txt}
            </p>
          </section>
        </React.Fragment>
      ))}

      {/* IMPACT */}
      {study.impact && (
        <section className="sect py-12 md:py-20 px-6 md:px-12 text-center space-y-6">
          <h2 className="text-lg font-light">Impact</h2>
          <BulletList items={study.impact} />
        </section>
      )}

      {/* MARQUEE */}
      <Marquee imgs={study.marquee} />

      {/* BACK */}
      <div className="py-16 text-center sect">
        <button
          className="px-6 py-3 border border-amber-400 text-amber-400 rounded-md hover:bg-amber-400/10 transition"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default CaseStudiesPage;
