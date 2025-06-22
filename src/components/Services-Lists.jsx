import React, { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { projects } from "../constants";
import { useEffect } from "react";

// Map bullet point to project ID
const bulletToProjectId = {
  "Retail Display": 23,
  "Exhibition Design": 25,
  "Branded Environments": 17,
  "Environmental Graphics": 12,
  "Wayfinding and Signages": 5,
  "Logo Design": 21,
  "Brand Identity": 10,
  "Packaging Design": 26,
  "Communication Design": 22,
  "Wall Murals": 527,
  "Fine Art Printing": 32,
  "Custom Wallpapers": 7,
  "Store Window Display": 17,
  "Custom Art Installations": 9,
  "Signages & Name Boards": 24,
};

// Map bullet point to image path
const bulletToImage = {
  "Retail Display": "/images/projects/2/main.jpg",
  "Exhibition Design": "/images/projects/25/main.jpg",
  "Branded Environments": "/images/projects/17/gallery-2.jpeg",
  "Environmental Graphics": "/images/projects/12/main.jpg",
  "Wayfinding and Signages": "/images/projects/4/main.jpg",
  "Logo Design": "/images/projects/21/main.png",
  "Brand Identity": "/images/projects/23/main.jpg",
  "Packaging Design": "/images/projects/26/main.png",
  "Communication Design": "/images/projects/22/main.png",
  "Wall Murals": "/images/projects/5/gallery-6.jpg",
  "Fine Art Printing": "/images/projects/32/gallery-7.jpg",
  "Custom Wallpapers": "/images/projects/13/gallery-1.jpg",
  "Store Window Display": "/images/projects/17/gallery-4.jpg",
  "Custom Art Installations": "/images/projects/11/gallery-2.jpeg",
  "Signages & Name Boards": "/images/projects/24/gallery-6.jpg",
};

// Sections with bullets and default images
const SECTIONS = [
  {
    id: "spaces",
    title: "Space Design",
    bullets: [
      "Retail Display",
      "Exhibition Design",
      "Branded Environments",
      "Environmental Graphics",
      "Wayfinding and Signages",
    ],
    
  },
  {
    id: "designs",
    title: "Visual Design",
    bullets: [
      "Logo Design",
      "Brand Identity",
      "Packaging Design",
      "Communication Design",
    ],
    
  },
  {
    id: "installations",
    title: "Art Installations",
    bullets: [
      "Wall Murals",
      "Fine Art Printing",
      "Custom Wallpapers",
      "Store Window Display",
      "Custom Art Installations",
      "Signages & Name Boards",
    ],
    
  },
];

const Heading = ({ text }) => (
  <motion.h2
    layout="position"
    className="services-heading group relative inline-block cursor-pointer"
  >
    {text}
    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
  </motion.h2>
);

const ServicesLists = () => {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const [hoveredBullet, setHoveredBullet] = useState(null);
  const itemRefs = useRef({});
  const prevTopRef = useRef(null);
  const prevIdRef = useRef(null);

  const openProject = (id) => {
    // Check if the project has a case study route
    if (id === 2) {
      navigate("/case-studies/2"); // Wework
    } else if (id === 17) {
      navigate("/case-studies/17"); // Banana Sport
    } else if (id === 10) {
      navigate("/case-studies/10"); // Farm Stories
    } else if (id === 29) {
      navigate("/case-studies/29"); // 1131
    } else {
      navigate(`/project/${id}`);
    }
  };

  const toggle = (id) => {
    const el = itemRefs.current[id];
    if (el) {
      prevTopRef.current = el.getBoundingClientRect().top;
      prevIdRef.current = id;
    }
    setOpenId((prev) => (prev === id ? null : id));
  };

  useLayoutEffect(() => {
    const storedTop = prevTopRef.current;
    if (storedTop == null) return;

    const idToMeasure = prevIdRef.current;
    const el = itemRefs.current[idToMeasure];
    if (el) {
      requestAnimationFrame(() => {
        const newTop = el.getBoundingClientRect().top;
        const diff = newTop - storedTop;
        window.scrollTo({
          top: window.pageYOffset + diff,
          behavior: "smooth",
        });
      });
    }

    prevTopRef.current = null;
    prevIdRef.current = null;
  }, [openId]);

  return (
    <section className="services-section">
      {SECTIONS.map(({ id, title, bullets, img }) => {
        const active = openId === id;
        const currentImage = bulletToImage[hoveredBullet] ;

        return (
          <motion.div
            key={id}
            ref={(el) => (itemRefs.current[id] = el)}
            layout="true"
            layoutTransition={{ duration: 0.3 }}
            transition={{
              layout: { duration: 0.3 },
              default: { ease: "easeInOut" },
            }}
            onClick={() => toggle(id)}
            className={`services-item cursor-pointer${active ? " active" : ""}`}
          >
            <div className="services-item-inner">
              <div className="services-text">
                <Heading text={title} />
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      key="bullets"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="list-disc pl-6">
                        {bullets.map((bullet, i) => {
                          const projectId = bulletToProjectId[bullet];
                          const isLink = typeof projectId !== "undefined";

                          return (
                            <li key={i} className="mb-2 mt-3.5">
                              {isLink ? (
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openProject(projectId);
                                  }}
                                  onMouseEnter={() => setHoveredBullet(bullet)}
                                  onMouseLeave={() => setHoveredBullet(null)}
                                  className="text-white cursor-pointer hover:underline"
                                >
                                  {bullet}
                                </span>
                              ) : (
                                <span>{bullet}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {active && currentImage && (
                <motion.div
                  key="img"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="services-image"
                >
                  <img
                    src={currentImage}
                    alt={hoveredBullet || title}
                    onError={(e) => (e.currentTarget.style.opacity = 0)}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}

      <div className="bg-black p-4 mt-16 text-white text-center flex justify-center items-center">
        <p className="text-4xl" style={{ marginLeft: "2rem", fontSize: "clamp(3.2rem, 4vw, 2rem)", fontFamily: "'Khand', sans-serif" }}>
          Need a hand? We are happy to help.
        </p>
      </div>
    </section>
  );
};

export default ServicesLists;