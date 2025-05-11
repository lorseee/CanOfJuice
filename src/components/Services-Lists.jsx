//  ServicesLists.jsx  – uses external CSS only
//  --------------------------------------------------------------
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ----- data (headings, lists, images) -------------------------- */
const SECTIONS = [
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

/* ----- tiny helpers ------------------------------------------- */
const Heading = ({ text }) => (
  <motion.h2 layout="position" className="services-heading">
    {text}
  </motion.h2>
);
const BulletList = ({ bullets }) => (
  <ul className="services-bullets">
    {bullets.map((b, i) => (
      <li key={i}>{b}</li>
    ))}
  </ul>
);

/* ----- main component ----------------------------------------- */
const ServicesLists = () => {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((p) => (p === id ? null : id));

  return (
    <section className="services-section">
      {SECTIONS.map(({ id, title, bullets, img }) => {
        const active = openId === id;
        return (
          <motion.div
            key={id}
            layout
            onHoverStart={() => toggle(id)}
            onHoverEnd={() => toggle(null)}
            onClick={() => toggle(id)}
            className={`services-item${active ? " active" : ""}`}
          >
            <div className="services-item-inner">
              {/* text */}
              <div className="services-text">
                <Heading text={title} />
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      key="bullets"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.35 }}
                    >
                      <BulletList bullets={bullets} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* image (desktop only) */}
              <AnimatePresence initial={false}>
                {active && (
                  <motion.div
                    key="img"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="services-image"
                  >
                    <img
                      src={img}
                      alt={title}
                      onError={(e) => (e.currentTarget.style.opacity = 0)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default ServicesLists;
