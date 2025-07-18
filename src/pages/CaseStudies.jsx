import React, { useLayoutEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    heroImg: "/images/projects/23/gallery-1.jpg",
    metaImgs: ["/images/projects/23/main.jpg", "/images/projects/23/gallery-2.png"],
    challenge:
      "Farm Stories needed a brand identity that captured its authenticity, freshness, and small-batch organic roots — without falling into generic 'green-washed' clichés.",
    approach:
      "We started with a naming exercise, then built a visual identity inspired by nature, farmer's markets, and clean food philosophy. The packaging design was earthy yet modern, with clear product info and friendly storytelling..",
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
   
  },

  {
    id: 29,
    title: "1131 – From Concept to Cocktails",
    client: "1131 Restobar",
    serviceAreas: "Naming, Logo, Identity, Environment Branding",
    heroImg: "/images/projects/29/main.png",
    metaImgs: ["/images/projects/29/gallery-1.png", "/images/projects/29/gallery-2.png"],
    challenge:
      "1131 was a new restobar concept looking to make a memorable first impression in Bangalore's competitive dining scene. They needed an identity that felt premium, young, and rooted in the local vibe.",
    approach:
      'We developed the name "1131" as a mysterious, almost code-like brand. The design system included a typographic logo, playful menu design, and branding across all guest touchpoints — glassware, napkins, signage, and more.',
    execution: [
      "Black-and-white palette with gold accents",
      "Glass printing & surface branding in-bar",
      "Wall murals and ambient signage for Instagram moments",
    ],
    execImgs: [
      "/images/projects/29/main.png",
      "/images/projects/29/gallery-3.jpg",
      "/images/projects/29/gallery-4.jpg"
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
    metaImgs: ["/images/projects/17/gallery-1.jpeg", "/images/projects/17/gallery-11.jpg"],
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
      "/images/projects/17/main.jpg",
      "/images/projects/17/gallery-3.jpeg",
      "/images/projects/17/gallery-4.jpg",
      "/images/projects/17/gallery-9.jpg",
      "/images/projects/17/gallery-8.jpg",
      "/images/projects/17/gallery-10.jpg",
      "/images/projects/17/gallery-7.jpg",
    ],
    impact: [
      "Strong brand recall among players & visitors",
      "Established Banana Sports as a distinctive destination",
      "Seamless physical & visual flow throughout the facility",
    ],
    
  },
];


const CaseStudies = () => {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const study       = CASE_STUDIES.find(c => c.id === Number(id)) || CASE_STUDIES[0];
  const project     = projects.items.find(p => p.id === Number(id)) || projects.items[0];
  const images = study.metaImgs.concat(study.execImgs);
  // Define related projects based on category
  const related = projects.items
    .filter(p => p.id !== Number(id))
    .filter(p => {
      const projectCategories = Array.isArray(p.category) ? p.category : [p.category];
      const currentCategories = Array.isArray(project.category) ? project.category : [project.category];
      return projectCategories.some(cat => currentCategories.includes(cat));
    })
    .slice(0, 3)
    .map(p => ({
      id: p.id,
      title: p.title,
      image: p.images?.main || "/images/projects/default/main.jpg",
      displayCategory: p.category || "Project"
    }));

  const pageRef = useRef();
  const descRef = useRef(null);
  const infoRef = useRef(null);
  const relWrap = useRef(null);
  const relItms = useRef([]);
  relItms.current = [];
  const pushRel = (el) =>
    el && !relItms.current.includes(el) && relItms.current.push(el);
  
  const errImg = (e) => {
    e.currentTarget.src = fallback(400, 300);
  };
  
  // Add state for modal management
  const [modalOpen, setModalOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };
  
  const next = () => {
   
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prev = () => {
    
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  useLayoutEffect(() => window.scrollTo(0, 0), []);

  return (
    <div ref={pageRef} className="bg-white text-gray-900">
      {/* Hero */}
      <section className="relative h-screen">
        <img
          src={study.heroImg}
          alt={study.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => (e.currentTarget.src = fallback(1920, 1080))}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <p className=" text-white px-4 py-2 rounded text-sm uppercase">
            {study.serviceAreas}
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold my-4">
            {study.title}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 font-bold font-family: 'Khand', system-ui, Helvetica, Arial, sans-serif text-white py:12 px-4  align-middle hover:opacity-20 transition"
          >
            CASE STUDY
          </button>
        </div>
      </section>

      {/* Challenge Section - Moved up */}
  

      <section className="detail-project-content w-full pb-0 mb-0  ">
      <div className="detail-content-inner pb-0 mb-0 max-h-[77vh] overflow-auto">
          {/* description + info */}
          <div ref={descRef} className="detail-project-description-grid flex flex-col pb-0 mb-0 ">
            <div className="detail-description-section">
              <h2>{project.title}</h2>
              <div className="detail-description-text">
                <p>
                  {project.longDescription ||
                   `For ${project.title}, we developed a comprehensive design strategy aligned with the client's brand vision.`}
                </p>
                {project.additionalDescription && <p>{project.additionalDescription}</p>}
              </div>
            </div>

            <div ref={infoRef} className="detail-info-section">
              <ul className="detail-info-list">
                <li>
                  <p className="detail-info-label">Year</p>
                  <p className="detail-info-value">
                    {project.year || new Date().getFullYear()}
                  </p>
                </li>
                <li>
                  <p className="detail-info-label">Services</p>
                  <p className="detail-info-value">
                    {(project.services || project.displayCategory)
                      .split(",")
                      .map((svc) => svc.trim())
                      .sort((a, b) => a.length - b.length)
                      .map((svc, idx) => (
                        <span key={idx} className="block">{svc}</span>
                      ))}
                  </p>
                </li>
                {project.label && (
                  <li>
                    <p className="detail-info-label">Label</p>
                    <p className="detail-info-value">{project.label}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section - Moved closer to description grid */}
      <section className="max-w-6xl mx-auto py-4 px-4">
        <div className="md:ml-16">
          <h2 className="text-4xl font-semibold mb-4">Challenge</h2>
          <p className="text-lg text-[#555] font-light leading-relaxed">{study.challenge}</p>
        </div>
      </section>

      {/* Details & Overview - Remaining sections */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-3 py-1 px-4">
        {/* Left: Project Description */}
        <div className="md:col-span-2 space-y-4 md:ml-16 -mt-2">
          <h2 className="text-3xl font-semibold">Approach & Process</h2>
          <p className="text-base text-[#555] font-light">{study.approach}</p>

          {study.execution?.length > 0 && (
            <>
              <h2 className="text-3xl font-semibold">Execution Highlights</h2>
              <ul className="list-disc list-inside space-y-1 text-base text-[#555]">
                {study.execution.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </>
          )}
          {/* Impact */}
      {study.impact?.length > 0 && (
        <>
          <h2 className="text-3xl font-semibold mb-6">Impact</h2>
          <ul className="list-disc list-inside space-y-1 text-base text-[#555]">
            {study.impact.map((imp, i) => (
              <li key={i}>{imp}</li>
            ))}
          </ul>
        </>
      )}
          
        </div>

        {/* Right: Project Fact Box */}
        
      </section>

      {/* Gallery */}
      <section className=" py-3 px-2">
        <div className="max-w-5xl mx-auto grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {study.metaImgs.concat(study.execImgs).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              onClick={() => openModal(i)}
              onError={e => (e.currentTarget.src = fallback(600, 400))}
              className="w-full h-full object-cover object-center cursor-pointer hover:opacity-85 transition-opacity duration-300"
            />
          ))}
        </div>
      </section>
      
      {/* Related Projects */}
      {related.length > 0 && (
  <div ref={relWrap} className="detail-related-projects-section py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-none lg:max-w-7xl xl:max-w-8xl 2xl:max-w-[1800px] mx-auto">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold mb-6 sm:mb-8 lg:mb-12 text-center">
      Related&nbsp;Projects
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
      {related.map((r) => (
        <article
          key={r.id}
          ref={pushRel}
          className="group cursor-pointer"
          onClick={() => {
            if (r.id === 2) {
              navigate("/case-studies/2"); // Wework
            } else if (r.id === 17) {
              navigate("/case-studies/17"); // Banana Sport
            } else if (r.id === 10) {
              navigate("/case-studies/10"); // Farm Stories
            } else {
              navigate(`/project/${r.id}`);
            }
          }}
        >
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] xl:aspect-[3/2] 2xl:aspect-[4/3]">
            <img
              src={r.image}
              alt={r.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={errImg}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            
            {/* Overlaid text content */}
            <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 lg:p-6">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-white font-medium uppercase tracking-wide drop-shadow-lg">
                  {r.displayCategory}
                </p>
                <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold text-white group-hover:text-blue-300 transition-colors leading-tight drop-shadow-lg">
                  {r.title}
                </h3>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
)}
   
      {modalOpen && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <button
            className="modal-close-btn"
            onClick={(e) => { e.stopPropagation(); closeModal(); }}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24"
                 fill="none" stroke="white" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            className="modal-edge-nav modal-prev-edge"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >&#10094;</button>

          <button
            className="modal-edge-nav modal-next-edge"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >&#10095;</button>

          <div className="image-modal-content">
            <img
              src={images[currentImageIndex] }
              alt=""
              className="modal-image"
              onError={e => (e.currentTarget.src = fallback(600, 400))}
            />
          </div>

          <div className="modal-thumb-strip" onClick={(e) => e.stopPropagation()}>
            {study.metaImgs.concat(study.execImgs).map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className={`modal-thumb ${i === currentImageIndex ? "active" : ""}`}
                onClick={() => openModal(i)}
                onError={e => (e.currentTarget.src = fallback(600, 400))}
              />
            ))}
          </div>
        </div>
      )}

      {/* Contact / CTA */}
      <section className=" text-black py-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-5xl font-semibold">Want to work together?</h2>
          <p>Drop us a message or say hello! 📩</p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=scoj@canofjuice.com"
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