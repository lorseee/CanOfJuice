import React, { useLayoutEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const fallback = (w, h) => `https://placehold.co/${w}x${h}/1E1E1E/FFFFFF?text=%20`;

export const CASE_STUDIES = [
  {
    id: 3,
    title: "Wework – Pan-India Branded Environments",
    client: "Wework India",
    serviceAreas: "Environmental Graphics, Signages, Installations",
    scope: "26 locations across India",
    heroImg: "/images/projects/3/main.jpg",
    metaImgs: ["/images/projects/3/gallery-5.jpg", "/images/projects/3/gallery-6.jpg"],
    challenge:
      "Wework wanted to bring their global brand experience to India while localizing it for regional audiences. The brief was to make each location vibrant, functional, and aligned with Wework’s collaborative ethos.",
    approach:
       "We worked with Wework to create a scalable system of signage, wall graphics, LED installs and large-format art customised to each building. We also created a brand book and a set of brand guidelines to ensure consistency across all locations.",
    execution: [
      "• Art installations and 3D brand moments",
      "• Building facade signages with high visibility",
      "• Motivational and quirky quote walls",
      "• City-specific design themes for select locations",
    ],
    execImgs: [
      "/images/projects/3/gallery-1.jpg",
      "/images/projects/3/gallery-2.jpg",
      "/images/projects/3/gallery-3.jpg",
      "/images/projects/3/gallery-4.jpg",
    ],
    impact: [
      "• Created immersive brand experiences across 26 cities",
      "• Strengthened employee engagement through spatial storytelling",
      "• Contributed to consistent brand presence despite regional diversity",
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
    id: 23,
    title: "Farm Stories – Organic Brand from the Ground Up",
    client: "Farm Stories",
    serviceAreas: "Naming, Branding, Packaging, Social Media",
    heroImg: "/images/projects/23/main.png",
    metaImgs: ["/images/projects/23/meta1.jpg", "/images/projects/23/meta2.jpg"],
    challenge:
      "Craft an authentic small-batch organic identity without green-wash clichés.",
    approach:
      "Name + earthy modern visuals inspired by farmer's markets; packaging optimised for shelf & social.",
    execution: [
      "Hand-drawn illustrations",
      "Instagram-friendly labels",
      "Delivery collaterals & social templates",
    ],
    execImgs: [
      "/images/projects/23/exec1.jpg",
      "/images/projects/23/exec2.jpg",
      "/images/projects/23/exec3.jpg",
    ],
    impact: [
      "Higher trust in crowded organic sector",
      "Smooth shift from local retail to D2C",
      "Unified look across pack, digital & physical",
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
    heroImg: "/images/projects/29/main.png",
    metaImgs: ["/images/projects/29/meta1.jpg", "/images/projects/29/meta2.jpg"],
    challenge:
      "Make a memorable first impression in Bangalore's competitive dining scene with a premium yet local vibe.",
    approach:
      'Coined the cryptic name "1131", designed typographic logo, playful menus and branding across every guest touch-point.',
    execution: [
      "Black-and-white palette with gold accents",
      "Glass printing & surface branding in-bar",
      "Wall murals and ambient signage for Instagram moments",
    ],
    execImgs: [
      "/images/projects/29/exec1.jpg",
      "/images/projects/29/exec2.jpg",
      "/images/projects/29/exec3.jpg",
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
    heroImg: "/images/projects/17/main.png",
    metaImgs: ["/images/projects/17/meta1.jpg", "/images/projects/17/meta2.jpg"],
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
    execImgs: [
      "/images/projects/17/exec1.jpg",
      "/images/projects/17/exec2.jpg",
      "/images/projects/17/exec3.jpg",
      "/images/projects/17/exec4.jpg",
    ],
    impact: [
      "Strong brand recall among players & visitors",
      "Established Banana Sports as a distinctive destination",
      "Seamless physical & visual flow throughout the facility",
    ],
    marquee: [
      "/images/projects/17/marquee1.jpg",
      "/images/projects/17/marquee2.jpg",
      "/images/projects/17/marquee3.jpg",
      "/images/projects/17/marquee4.jpg",
      "/images/projects/17/marquee5.jpg",
      "/images/projects/17/marquee6.jpg",
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
          <p className="bg-blue-600 text-white px-4 py-2 rounded text-sm uppercase">
            {study.serviceAreas}
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold my-4">
            {study.title}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="mt-8 bg-white/10 text-white py-2 px-6 rounded hover:bg-opacity-20 transition"
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
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-semibold">Want to work together?</h2>
          <p>Drop me a message or say hello! 📩</p>
          <a
            href="mailto:hello@yourdomain.com"
            className="inline-block bg-white text-blue-600 px-6 py-2 rounded font-medium"
          >
            Send an Email
          </a>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
