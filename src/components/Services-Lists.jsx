import React, { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { projects } from "../constants";

// Maps each bullet point to a project ID
const bulletToProjectId = {
  "Retail Display": 2,
  "Exhibition Design": 3,
  "Branded Environments": 4,
  "Environmental Graphics": 5,
  "Wayfinding and Signages": 6,
  "Web Design": 7,
  "Logo Design": 8,
  "Brand Identity": 9,
  "Packaging Design": 10,
  "Communication Design": 11,
  "Wall Murals": 12,
  "Fine Art Printing": 13,
  "Custom Wallpapers": 14,
  "Store Window Display": 15,
  "Custom Art Installations": 16,
  "Signages & Name Boards": 17,
};

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
    img: "/images/spaces.jpg",
  },
  {
    id: "designs",
    title: "Visual Design",
    bullets: [
      "Web Design",
      "Logo Design",
      "Brand Identity",
      "Packaging Design",
      "Communication Design",
    ],
    img: "/images/designs.jpg",
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
    img: "/images/installations.jpg",
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

  const openProject = (id) => {
    navigate(`/project/${id}`);
  };

  const [openId, setOpenId] = useState(null);
  const itemRefs = useRef({});
  const prevTopRef = useRef(null);
  const prevIdRef = useRef(null);

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
          behavior: 'smooth'
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
        return (
          <motion.div
            key={id}
            ref={(el) => (itemRefs.current[id] = el)}
            layout="true"
            layoutTransition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
            transition={{
              layout: { duration: 0.3 },
              default: { ease: "easeInOut" }
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
                      transition={{ 
                        duration: 0.2,
                        ease: "easeOut"
                      }}
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
                                  className="text-white cursor-pointer hover:underline"
                                >
                                  {bullet}
                                </span>
                              ) : (
                                bullet
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {active && (
                <motion.div
                  key="img"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="services-image"
                >
                  <img
                    src={img}
                    alt={title}
                    onError={(e) => (e.currentTarget.style.opacity = 0)}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}

      <div className="bg-black p-6 mt-8 text-white text-center">
        <p className="text-4xl" style={{ fontFamily: "'Khand', sans-serif" }}>
          Need a hand? We are happy to help.
        </p>
      </div>
    </section>
  );
};

export default ServicesLists;
