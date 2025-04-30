import React from "react";

const GalleryLayouts11 = ({ images = [], handleImageError }) => (
  /* 1 : 1 wrapper — no padding-top hack */
  <div
    className="
      relative w-full aspect-square     /* Tailwind ≥ v3.2 */
      overflow-hidden
    "
    /* ↓  If you don’t have the aspect-ratio plugin, uncomment:
    style={{ aspectRatio: '1 / 1' }}
    */
  >
    {/* 2 × 2 grid that completely fills the square */}
    <div
      className="
        absolute inset-0 grid
        grid-cols-2 grid-rows-2 gap-1 sm:gap-2
      "
    >
      {images.slice(0, 4).map((src, i) => (
        <div key={i} className="w-full h-full overflow-hidden">
          <img
            src={src}
            alt=""
            onError={handleImageError}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
    </div>
  </div>
);

export default GalleryLayouts11;
