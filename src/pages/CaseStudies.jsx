import React, { useLayoutEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const fallback = (w, h) => `https://placehold.co/${w}x${h}/1E1E1E/FFFFFF?text=%20`;

export const CASE_STUDIES = [
  {
    id: 2,
    title: "Wework – Pan-India Branded Environments",
    client: "Wework India",
    serviceAreas: "Environmental Graphics, Signages, Installations",
    scope: "26 locations across India",
    heroImg: "/images/projects/3/main.jpg",
    metaImgs: ["/images/projects/3/gallery-5.jpg", "/images/projects/3/gallery-6.jpg"],
    challenge:
      "Wework wanted to bring their global brand experience to India while localizing it for regional audiences. The brief was to make each location vibrant, functional, and aligned with Wework's collaborative ethos.",
    approach:
       "We worked with Wework to create a scalable system of signage, wall graphics, LED installs and large-format art customised to each building. We also created a brand book and a set of brand guidelines to ensure consistency across all locations.",
    execution: [
      "Art installations and 3D brand moments",
      "Building facade signages with high visibility",
      "Motivational and quirky quote walls",
      "City-specific design themes for select locations",
    ],
    execImgs: [
      "/images/projects/3/gallery-7.jpg",
      "/images/projects/3/gallery-2.jpg",
      "/images/projects/3/gallery-3.jpg",
      "/images/projects/3/gallery-4.jpg",
    ],
    impact: [
      "Created immersive brand experiences across 26 cities",
      "Strengthened employee engagement through spatial storytelling",
      "Contributed to consistent brand presence despite regional diversity",
    ],
    marquee: [
      "/images/projects/3/gallery-1.jpg",
      "/images/projects/3/gallery-2.jpg",
      "/images/projects/3/gallery-3.jpg",
      "/images/projects/3/gallery-4.jpg",
      "/images/projects/3/gallery-5.jpg",
      "/images/projects/3/gallery-6.jpg",
    ],
  },

  {
    id: 10,
    title: "Farm Stories – Organic Brand from the Ground Up",
    client: "Farm Stories",
    serviceAreas: "Naming, Branding, Packaging, Social Media",
    heroImg: "/images/projects/23/main.jpg",
    metaImgs: ["/images/projects/23/gallery-1.jpg", "/images/projects/23/gallery-2.png"],
    challenge:
      "Farm Stories needed a brand identity that captured its authenticity, freshness, and small-batch organic roots — without falling into generic 'green-washed' clichés.",
    approach:
      "We started with a naming exercise, then built a visual identity inspired by nature, farmer’s markets, and clean food philosophy. The packaging design was earthy yet modern, with clear product info and friendly storytelling..",
    execution: [
      "Hand-drawn elements to reflect handmade care",
      "Labels optimized for both retail shelves and Instagram shots",
      "Extended brand visuals to social media and delivery collaterals",
    ],
    execImgs: [
      "/images/projects/23/gallery-3.jpg",
      "/images/projects/23/gallery-4.jpg",
      "/images/projects/23/gallery-5.jpg",
      "/images/projects/23/main.jpg",
    ],
    impact: [
      "Increased visibility and trust in crowded organic space",
      "Seamless transition from local to D2C distribution",
      "Unified presence across packaging, digital, and physical touchpoints",
    ],
    marquee: [
      "/images/projects/23/marquee1.jpg",
      "/images/projects/23/marquee2.jpg",
      "/images/projects/23/marquee3.jpg",
      "/images/projects/23/marquee4.jpg",
      "/images/projects/23/marquee5.jpg",
      "/images/projects/23/marquee6.jpg",
    ],
  },

  {
    id: 29,
    title: "1131 – From Concept to Cocktails",
    client: "1131 Restobar",
    serviceAreas: "Naming, Logo, Identity, Environment Branding",
    heroImg: "/images/projects/29/gallery-4.jpg",
    metaImgs: ["/images/projects/29/gallery-1.png", "/images/projects/29/gallery-2.png"],
    challenge:
      "1131 was a new restobar concept looking to make a memorable first impression in Bangalore’s competitive dining scene. They needed an identity that felt premium, young, and rooted in the local vibe.",
    approach:
      "We developed the name “1131” as a mysterious, almost code-like brand. The design system included a typographic logo, playful menu design, and branding across all guest touchpoints — glassware, napkins, signage, and more.",
    execution: [
      "Black-and-white palette with gold accents",
      "Glass printing & surface branding in-bar",
      "Wall murals and ambient signage for Instagram moments",
    ],
    execImgs: [
      "/images/projects/29/main.png",
      "/images/projects/29/gallery-3.jpg",
      "/images/projects/29/gallery-4.jpg",,
    ],
    impact: [
      "Elevated guest perception and recall",
      "Design consistency → seamless dining experience",
      "Positioned venue as 'not just another bar'",
    ],
    marquee: [
      "/images/projects/29/marquee1.jpg",
      "/images/projects/29/marquee2.jpg",
      "/images/projects/29/marquee3.jpg",
      "/images/projects/29/marquee4.jpg",
      "/images/projects/29/marquee5.jpg",
      "/images/projects/29/marquee6.jpg",
    ],
  },

  {
    id: 17,
    title: "Banana Sports – From the Ground Up",
    client: "Banana Sports",
    serviceAreas: "Brand Identity, Signage, Graphics, Merchandise",
    heroImg: "/images/projects/17/gallery-2.jpeg",
    metaImgs: ["/images/projects/17/gallery-10.jpg", "/images/projects/17/gallery-11.jpg"],
    challenge:
      " Banana Sports, a multi-sport facility in Bangalore, needed a fresh and energetic brand that appealed to a new generation of players and fans. The brief was to build a brand from scratch that could unify their diverse offerings — pickleball, football, and cricket — under one strong identity.",
    approach:
      "We created the name and visual identity to reflect energy and movement. This extended into space graphics, wayfinding signages, and sport-specific branding moments across the facility. Merchandise and collaterals were also designed to make the brand visible off the court.",
    execution: [
      "Youthful sporty logo system",
      "Bold typography across facility signage",
      "Motivational quotes & sport cues on-ground",
      "Merch including tees, caps, water bottles",
    ],
    execImgs: [
      "/images/projects/17/gallery-1.jpeg",
      "/images/projects/17/gallery-3.jpeg",
      "/images/projects/17/gallery-5.jpg",
      "/images/projects/17/gallery-4.jpg",
    ],
    impact: [
      "Strong brand recall among players & visitors",
      "Established Banana Sports as a distinctive destination",
      "Seamless physical & visual flow throughout the facility",
    ],
    marquee: [
      "/images/projects/17/main.jpg",
      "/images/projects/17/gallery-2.jpeg",
      "/images/projects/17/gallery-3.jpeg",
      "/images/projects/17/gallery-4.jpg",
      "/images/projects/17/gallery-5.jpg",
      "/images/projects/17/gallery-6.jpg",
    ],
  },
];


const CaseStudies = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const study = CASE_STUDIES.find(c => c.id === Number(id)) || CASE_STUDIES[0];
  const pageRef = useRef();
  
  useLayoutEffect(() => window.scrollTo(0, 0), []);

  return (
    <div ref={pageRef} className="bg-white text-gray-900">
      {/* Hero */}
      <section className="relative h-screen">
        <img
          src={study.heroImg}
          alt={study.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => (e.currentTarget.src = ph(1920, 1080))}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <p className="bg-white/10 text-white px-4 py-2 rounded text-sm uppercase">
            {study.serviceAreas}
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold my-4">
            {study.title}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="mt-8 bg-black/10 text-white py-2 px-6 rounded hover:bg-opacity-20 transition"
          >
            ← Back to Projects
          </button>
        </div>
      </section>

      {/* Details & Overview */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 py-16 px-6">
        {/* Left: Project Description */}
        <div className="md:col-span-2 space-y-8">
          <h2 className="text-xl font-semibold">Challenge</h2>
          <p className="leading-relaxed">{study.challenge}</p>

          <h2 className="text-xl font-semibold">Approach & Process</h2>
          <p className="leading-relaxed">{study.approach}</p>

          {study.execution?.length > 0 && (
            <>
              <h2 className="text-xl font-semibold">ExecutionHighlights</h2>
              <ul className="list-disc list-inside space-y-2">
                {study.execution.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Right: Project Fact Box */}
        <div className="space-y-4 text-gray-700 bg-gray-50 p-6 rounded-md">
          <div>
            <h3 className="text-sm uppercase font-medium">Client</h3>
            <p>{study.client}</p>
          </div>
  
          <div>
            <h3 className="text-sm uppercase font-medium">Services</h3>
            <p>{study.serviceAreas}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase font-medium">Scope</h3>
            <p>{study.scope }</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {study.metaImgs.concat(study.execImgs).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-full h-64 object-cover rounded-lg shadow-md"
              onError={e => (e.currentTarget.src = ph(600, 400))}
            />
          ))}
        </div>
      </section>

      {/* Impact */}
      {study.impact?.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Impact</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {study.impact.map((imp, i) => (
              <li key={i}>{imp}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Contact / CTA */}
      <section className=" text-black py-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-semibold">Want to work together?</h2>
          <p>Drop me a message or say hello! 📩</p>
          <a
            href="mailto:hello@yourdomain.com"
            className="inline-block bg-black text-black-600 px-6 py-2 rounded font-medium"
          >
            Send an Email
          </a>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
