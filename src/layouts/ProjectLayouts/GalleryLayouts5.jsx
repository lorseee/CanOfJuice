//------------------------------------------------------------------
//  GalleryLayouts5.jsx  –  Project 5
//  7 pictures  → 4 rows • no filler • nothing repeats
//------------------------------------------------------------------
import React from "react";

const GalleryLayouts5 = ({ images = [], handleImageError }) => (
  <div
    className="
      grid grid-flow-dense gap-4
      grid-cols-6  sm:grid-cols-8  lg:grid-cols-12
      auto-rows-[12vw] sm:auto-rows-[10vw] lg:auto-rows-[11vw]
    "
  >
    {/* ────────── ROW 1 • HERO (4 tall rows) ────────── */}
    <div className="col-span-full row-span-4">
      <img
        src={images[0]}                               /* main.jpg */
        alt="Pursuit of Perfection"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* ────────── ROW 2 • 8-wide + 4-square ────────── */}
    <div className="col-span-4 sm:col-span-5 lg:col-span-8 row-span-2">
      <img
        src={images[3]}                               /* gallery-3  (open office) */
        alt="Open-office view"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    <div className="col-span-2 sm:col-span-3 lg:col-span-4 row-span-2">
      <img
        src={images[2]}                               /* gallery-2  (idea bulb) */
        alt="Idea graphic"
        onError={handleImageError}
        className="w-full h-full object-cover object-center bg-neutral-900"
      />
    </div>

    {/* ────────── ROW 3 • 4-square band (4 × 3 = 12) ────────── */}
    {[images[1], images[5], images[4]].map((src, i) => (
      <div
        key={i}
        className="col-span-4 sm:col-span-5 lg:col-span-4 row-span-1"
      >
        <img
          src={src}
          alt={`Square ${i + 1}`}
          onError={handleImageError}
          className="w-full h-full object-cover object-center bg-neutral-900"
        />
      </div>
    ))}
  </div>
);

export default GalleryLayouts5;
