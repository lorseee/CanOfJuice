import React from "react";

const GalleryLayout = ({ images, handleImageError, open }) => (
  <div
    className="
      grid grid-flow-dense
      grid-cols-6  sm:grid-cols-8  lg:grid-cols-12
      auto-rows-[12vw] sm:auto-rows-[10vw] lg:auto-rows-[8vw]
      gap-4
    "
  >
    {images.map((src, i) => (
      <div
        key={i}
        onClick={() => open(i)}
        className="relative group w-full h-full col-span-6 sm:col-span-8 lg:col-span-12 row-span-4 cursor-pointer"
      >
        <img
          src={src}
          alt={`Gallery ${i + 1}`}
          onError={handleImageError}
          className="w-full h-full object-cover object-center z-10 relative"
        />
        {/* ✅ Overlay added here */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    ))}
  </div>
);

export default GalleryLayout;
