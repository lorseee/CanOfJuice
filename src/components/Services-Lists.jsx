// ServicesLists.jsx – scroll-stable accordion
// -------------------------------------------
import React, { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- data ------------------------------------------------------- */
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

/* ---------- tiny helpers ---------------------------------------------- */
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

/* ---------- main component -------------------------------------------- */
const ServicesLists = () => {
  const [openId, setOpenId]       = useState(null);
  const itemRefs                  = useRef({});       // { id → DOMElement }
  const prevTopRef                = useRef(null);     // stores Y-position before update
  const prevIdRef                 = useRef(null);     // which element’s top we stored?

  /* ----- toggle helper (captures position BEFORE layout changes) ------ */
  const toggle = (id) => {
    const el = itemRefs.current[id];
    if (el) {
      prevTopRef.current = el.getBoundingClientRect().top;
      prevIdRef.current  = id;
    }
    setOpenId((prev) => (prev === id ? null : id));
  };

  /* ----- after React commits the new layout, correct the scroll ------- */
  useLayoutEffect(() => {
    const storedTop = prevTopRef.current;
    if (storedTop == null) return;           // nothing to correct

    const idToMeasure = prevIdRef.current;
    const el          = itemRefs.current[idToMeasure];
    if (el) {
      const newTop = el.getBoundingClientRect().top;
      const diff   = newTop - storedTop;
      // Shift the page by the delta so the element stays put
      window.scrollBy(0, diff);
    }
    // reset refs
    prevTopRef.current = null;
    prevIdRef.current  = null;
  }, [openId]);

  /* ----- render ------------------------------------------------------- */
  return (
    <section className="services-section">
      {SECTIONS.map(({ id, title, bullets, img }) => {
        const active = openId === id;
        return (
          <motion.div
            key={id}
            ref={(el) => (itemRefs.current[id] = el)}
            layout
            onClick={() => toggle(id)}
            onHoverStart={() => toggle(id)}
            onHoverEnd={() => toggle(null)}
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
                      transition={{ duration: 0.5 }}
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
                    transition={{ duration: 0.5 }}
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
