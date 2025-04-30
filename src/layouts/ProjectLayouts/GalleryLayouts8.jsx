/* ──────────────────────────────────────────────────────────────
   GalleryLayouts7.jsx • “Zoya” calculated grid
   • desktop  : 12 × 12   • tablet : 8 × 18   • phone : 6-col dense
   • zero gaps (outer border is a rectangle on every breakpoint)
──────────────────────────────────────────────────────────────── */
import React from "react";

const cell = {
  /* helper that returns the needed Tailwind classes */
  position: (cSpan, rSpan) =>
    `col-span-${cSpan} row-span-${rSpan} ` +
    `md:col-span-${Math.round((cSpan * 8) / 12)} md:row-span-${rSpan * 1.5} ` +
    `sm:col-span-6 sm:auto-rows-[20vw]`
};

const GalleryLayouts8 = ({ images = [], handleImageError }) => (
  <div
    className="
      grid gap-4 grid-flow-dense
      grid-cols-6  sm:grid-cols-6  md:grid-cols-8  lg:grid-cols-12
      auto-rows-[20vw] sm:auto-rows-[20vw] md:auto-rows-[12vw] lg:auto-rows-[8vw]
    "
  >
    {/* 0 ─ main.jpg  (portrait)  -> 4×4 */}
    <div className={cell.position(4, 4)}>
      <img src={images[0]} alt="" onError={handleImageError}
           className="w-full h-full object-cover object-center" />
    </div>

    {/* 1 ─ gallery-1.jpeg (portrait) -> 4×4 */}
    <div className={cell.position(4, 4)}>
      <img src={images[1]} alt="" onError={handleImageError}
           className="w-full h-full object-cover object-center" />
    </div>

    {/* 2 ─ gallery-2.jpeg (1600×900 panorama) -> 8×4 */}
    <div className={cell.position(8, 4)}>
      <img src={images[2]} alt="" onError={handleImageError}
           className="w-full h-full object-cover object-center" />
    </div>

    {/* 3 ─ gallery-3.jpeg (portrait) -> 4×4 */}
    <div className={cell.position(4, 4)}>
      <img src={images[3]} alt="" onError={handleImageError}
           className="w-full h-full object-cover object-center" />
    </div>

    {/* 4 ─ gallery-4.jpg (portrait) -> 4×4 */}
    <div className={cell.position(4, 4)}>
      <img src={images[4]} alt="" onError={handleImageError}
           className="w-full h-full object-cover object-center" />
    </div>

    {/* 5 ─ gallery-5.jpg (square) -> 4×4 */}
    <div className={cell.position(4, 4)}>
      <img src={images[5]} alt="" onError={handleImageError}
           className="w-full h-full object-cover object-center" />
    </div>


  </div>
);

export default GalleryLayouts8;
