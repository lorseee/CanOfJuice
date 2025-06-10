/* =====================================================================
   CaseStudiesPage.jsx  –  fullscreen hero + R→L narrative
   rev-K • 11 May 2025  (IDs 3/17/23/29 + scroll-to-top)
   ===================================================================== */

import React, { useLayoutEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

/* fast placeholder helper (dark bg) */
const ph = (w, h) =>
  `https://placehold.co/${w}x${h}/1E1E1E/FFFFFF?text=%20`;

/* ------------------------------------------------------------------ */
/*  CASE STUDIES (ids = 3,17,23,29)                                    */
export const CASE_STUDIES = [
  {
    id: 3, // Wework button sends 3
    title: "Wework – Pan-India Branded Environments",
    client: "Wework India",
    serviceAreas: "Environmental Graphics, Signages, Installations",
    heroImg: "/images/projects/3/main.png",
    metaImgs: [ph(1920, 1080), ph(1920, 1080)],
    challenge:
      "Bring Wework's global brand experience to India while localising for 26 vibrant, functional locations.",
    approach:
      "Built a scalable system of signage, wall graphics, LED installs and large-format art customised to each building.",
    execution: [
      "3D brand moments & art installations",
      "High-visibility façade signs",
      "Motivational quote walls",
      "City-specific themes for select hubs",
    ],
    execImgs: [ph(1920, 1080), ph(1920, 1080), ph(1920, 1080), ph(1920, 1080)],
    impact: [
      "Immersive brand presence across 26 cities",
      "Higher employee engagement via spatial storytelling",
      "Consistent identity despite regional diversity",
    ],
    marquee: Array.from({ length: 6 }, () => ph(400, 250)),
  },

  {
    id: 23, // Farm Stories button sends 23
    title: "Farm Stories – Organic Brand from the Ground Up",
    client: "Farm Stories",
    serviceAreas: "Naming, Branding, Packaging, Social Media",
    heroImg: ph(1920, 1080),
    metaImgs: [ph(1920, 1080), ph(1920, 1080)],
    challenge:
      "Craft an authentic small-batch organic identity without green-wash clichés.",
    approach:
      "Name + earthy modern visuals inspired by farmer's markets; packaging optimised for shelf & social.",
    execution: [
      "Hand-drawn illustrations",
      "Instagram-friendly labels",
      "Delivery collaterals & social templates",
    ],
    execImgs: [ph(1920, 1080), ph(1920, 1080), ph(1920, 1080)],
    impact: [
      "Higher trust in crowded organic sector",
      "Smooth shift from local retail to D2C",
      "Unified look across pack, digital & physical",
    ],
    marquee: Array.from({ length: 6 }, () => ph(400, 250)),
  },

  {
    id: 29, // 1131 button sends 29
    title: "1131 – From Concept to Cocktails",
    client: "1131 Restobar",
    serviceAreas: "Naming, Logo, Identity, Environment Branding",
    heroImg: ph(1920, 1080),
    metaImgs: [ph(1920, 1080), ph(1920, 1080)],
    challenge:
      "Make a memorable first impression in Bangalore's competitive dining scene with a premium yet local vibe.",
    approach:
      'Coined the cryptic name "1131", designed typographic logo, playful menus and branding across every guest touch-point.',
    execution: [
      "Black-and-white palette with gold accents",
      "Glass printing & surface branding in-bar",
      "Wall murals and ambient signage for Instagram moments",
    ],
    execImgs: [ph(1920, 1080), ph(1920, 1080), ph(1920, 1080)],
    impact: [
      "Elevated guest perception and recall",
      "Design consistency → seamless dining experience",
      "Positioned venue as 'not just another bar'",
    ],
    marquee: Array.from({ length: 6 }, () => ph(400, 250)),
  },

  {
    id: 17, // Banana Sports button sends 17
    title: "Banana Sports – From the Ground Up",
    client: "Banana Sports",
    serviceAreas: "Brand Identity, Signage, Graphics, Merchandise",
    heroImg: ph(1920, 1080),
    metaImgs: [ph(1920, 1080), ph(1920, 1080)],
    challenge:
      "Build an energetic brand for a new Bangalore multi-sport facility unifying pickleball, football, and cricket.",
    approach:
      "Created a dynamic identity, extended into space graphics, way-finding and merchandise for on- and off-court visibility.",
    execution: [
      "Youthful sporty logo system",
      "Bold typography across facility signage",
      "Motivational quotes & sport cues on-ground",
      "Merch incl. tees, caps, water bottles",
    ],
    execImgs: [ph(1920, 1080), ph(1920, 1080), ph(1920, 1080), ph(1920, 1080)],
    impact: [
      "Strong brand recall among players & visitors",
      "Established Banana Sports as a distinctive destination",
      "Seamless physical & visual flow throughout the facility",
    ],
    marquee: Array.from({ length: 6 }, () => ph(400, 250)),
  },
];

/* ------------------------------------------------------------------ */
/* helpers (unchanged)                                                */
const FullImage = ({ src, alt = "", className = "" }) => (
  <div className={`w-full h-screen overflow-hidden ${className}`}>
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover object-center"
      loading="lazy"
      onError={(e) => (e.currentTarget.src = ph(1920, 1080))}
    />
  </div>
);

const BulletList = ({ items }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item === "Retail Display") {
      navigate('/gallery-1');
    }
  };

  return (
    <ul className="space-y-2 pl-6 max-w-4xl mx-auto">
      {items.map((li, i) => (
        <li 
          key={i} 
          className="relative text-base leading-relaxed cursor-pointer hover:text-amber-400 transition-colors"
          onClick={() => handleClick(li)}
        >
          <span className="absolute -left-4 top-2 w-1 h-1 bg-amber-400 rounded-full" />
          {li}
        </li>
      ))}
    </ul>
  );
};

const Marquee = ({ imgs }) => {
  const band = imgs.slice(0, 6);
  return (
    <div className="overflow-hidden py-10 bg-black">
      <div className="flex gap-8 whitespace-nowrap">
        {band.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-32 w-auto flex-none object-cover rounded-lg shadow-lg"
            loading="lazy"
            onError={(e) => (e.currentTarget.src = ph(400, 250))}
          />
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
const CaseStudies = () => {
  const pageRef  = useRef(null);
  const { id }   = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const study =
    CASE_STUDIES.find(
      (cs) => cs.id === Number(id) || cs.id === state?.caseId
    ) ?? CASE_STUDIES[0];

  /* force start at top BEFORE first paint */
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!study) return null;

  /* ---------------- render ---------------- */
  return (
    <div ref={pageRef} className="bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-screen w-full">
        <img
          src={study.heroImg || ph(1920, 1080)}
          alt={study.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => {
            e.currentTarget.src = ph(1920, 1080);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70" />
      </section>

      {/* META & CHALLENGE */}
      <section className="py-14 md:py-20 px-6 md:px-12 text-center space-y-6">
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

      {/* Meta images */}
      {study.metaImgs.map((src, i) => (
        <FullImage key={i} src={src} />
      ))}

      {/* Approach */}
      {study.approach && (
        <section className="py-14 md:py-20 px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-light mb-2">Approach</h2>
            <p className="text-gray-300 leading-relaxed">{study.approach}</p>
          </div>
        </section>
      )}

      {/* Execution */}
      {study.execution?.length > 0 && (
        <h2 className="text-center text-lg font-light py-8 md:py-12">
          Execution Highlights
        </h2>
      )}
      {study.execution.map((txt, i) => (
        <React.Fragment key={i}>
          {study.execImgs?.[i] && (
            <FullImage src={study.execImgs[i]} />
          )}
          <section className="py-10 md:py-16 px-6 md:px-12 text-center">
            <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed">
              {txt}
            </p>
          </section>
        </React.Fragment>
      ))}

      {/* Impact */}
      {study.impact && (
        <section className="py-14 md:py-20 px-6 md:px-12 text-center space-y-6">
          <h2 className="text-lg font-light">Impact</h2>
          <BulletList items={study.impact} />
        </section>
      )}

      {/* Marquee */}
      <Marquee imgs={study.marquee} />

      {/* Back */}
      <div className="py-16 text-center">
        <button
          className="px-6 py-3 border border-amber-400 text-amber-400 rounded hover:bg-amber-400/10 transition"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default CaseStudies;
