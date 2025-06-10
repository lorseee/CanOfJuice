import React, { useState } from "react";

// Keep this here:
const bulletData = {
  "Retail Display": {
    link: "/src/layouts/ProjectLayouts/GalleryLayouts1",
    img: "/public/images/1/main.jpg",
  },
  "Exhibition Design": {
    link: "https://example.com/exhibition",
    img: "/images/exhibition.jpg",
  },
  "Branded Environments": {
    link: "https://example.com/branding",
    img: "/images/branding.jpg",
  },
  "Environmental Graphics": {
    link: "https://example.com/graphics",
    img: "/images/graphics.jpg",
  },
  "Wayfinding and Signages": {
    link: "https://example.com/signage",
    img: "/images/signage.jpg",
  },
};

function SpaceDesignSection({ section }) {
  const [hoveredImage, setHoveredImage] = useState(section.img);

  const handleMouseEnter = (text) => {
    setHoveredImage(bulletData[text]?.img || section.img);
  };

  const handleMouseLeave = () => {
    setHoveredImage(section.img);
  };

  return (
    <div id={section.id}>
      <h2>{section.title}</h2>
      <ul>
        {section.bullets.map((text, index) => (
          <li
            key={index}
            onMouseEnter={() => handleMouseEnter(text)}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href={bulletData[text]?.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </a>
          </li>
        ))}
      </ul>

      <img
        src={hoveredImage}
        alt="Preview"
        style={{ width: "300px", marginTop: "20px" }}
      />
    </div>
  );
}

export default SpaceDesignSection;