import React, { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ---------- data ------------------------------------------------------- */
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
<div style="width: 50vw; background-color: black; color: white; padding: 1rem;">
  <p style="font-size: 20px;">
    Need a hand. We are happy to help.
  </p>
</div>
/* ---------- components ------------------------------------------------- */
const Heading = ({ text }) => (
  <motion.h2
    layout="position"
    className="services-heading group relative inline-block cursor-pointer"
  >
    {text}
    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
  </motion.h2>
);

const BulletList = ({ bullets }) => {
  const navigate = useNavigate();

  const handleClick = (bullet, e) => {
    e.stopPropagation(); // Prevent parent div's click event from firing
    if (bullet === "Retail Display") {
      navigate('/gallery-1');
    }
  };

  return (
    <ul className="services-bullets">
      {bullets.map((b, i) => (
        <li 
          key={i} 
          onClick={(e) => handleClick(b, e)}
          className={`cursor-pointer hover:text-amber-400 transition-colors`}
          data-clickable={b === "Retail Display"}
        >
          {b}
        </li>
      ))}
    </ul>
  );
};

/* ---------- main component --------------------------------------------- */
const ServicesLists = () => {
  const [openId, setOpenId] = useState(null);
  const itemRefs = useRef({});
  const prevTopRef = useRef(null);
  const prevIdRef = useRef(null);

  // toggle item (click-only)
  const toggle = (id) => {
    const el = itemRefs.current[id];
    if (el) {
      prevTopRef.current = el.getBoundingClientRect().top;
      prevIdRef.current = id;
    }
    setOpenId((prev) => (prev === id ? null : id));
  };

  // preserve scroll position when layout shifts
  useLayoutEffect(() => {
    const storedTop = prevTopRef.current;
    if (storedTop == null) return;

    const idToMeasure = prevIdRef.current;
    const el = itemRefs.current[idToMeasure];
    if (el) {
      const newTop = el.getBoundingClientRect().top;
      const diff = newTop - storedTop;
      window.scrollBy(0, diff);
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
            layout
            onClick={() => toggle(id)}
            className={`services-item cursor-pointer${active ? " active" : ""}`}
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
                      transition={{ duration: 0.3 }}
                    >
                      <BulletList bullets={bullets} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* image */}
              <AnimatePresence initial={false}>
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
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}

      {/* Help text */}
      <div className="bg-black p-6 mt-8 text-white text-center">
        <p className="text-4xl" style={{ fontFamily: "'Khand', sans-serif" }}>Need a hand? We are happy to help.</p>
      </div>
    </section>
  );
};

export default ServicesLists;
