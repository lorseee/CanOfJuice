// ───────────────────────────────────────────────────────────────
//  GalleryLayouts5.jsx   –   Project 5
//  8 pictures  → 5 rows  → rectangle on phone / tablet / desktop
// ───────────────────────────────────────────────────────────────
import React from "react";

const GalleryLayouts7 = ({ images = [], handleImageError }) => (
  <div
    className="
      grid grid-flow-dense gap-4
      grid-cols-6  sm:grid-cols-8  lg:grid-cols-12
      auto-rows-[12vw]  sm:auto-rows-[10vw]  lg:auto-rows-[11vw]
    "
  >
    {/* ───── ROW 1 • HERO – “PRE QUATE” moss letters ───────── */}
    <div className="col-span-full row-span-4">
      <img
        src={images[0]}                      /* main.jpg */
        alt="PRE QUATE moss logo"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* ───── ROW 2 • 12-wide panorama (sound-wave) ─────────── */}
    <div className="col-span-full row-span-3">
      <img
        src={images[4]}                      /* gallery-6.jpg */
        alt="Sound-wave artwork"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* ───── ROW 4 • portrait 4-col  +  8-col wide boardroom */}
    <div className="col-span-2 sm:col-span-3 lg:col-span-4 row-span-3">
      <img
        src={images[3]}                      /* gallery-4.jpg (sofa) */
        alt="Breakout lounge"
        onError={handleImageError}
        className="w-full h-full object-cover object-center bg-neutral-900"
      />
    </div>

    <div className="col-span-4 sm:col-span-5 lg:col-span-8 row-span-3">
      <img
        src={images[5]}                      /* gallery-5.jpg */
        alt="Boardroom view"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* ───── ROW 5 • 12-wide landscape (Pursuit sign) ──────── */}
    <div className="col-span-full row-span-3">
      <img
        src={images[1]}                      /* gallery-1.jpg */
        alt="Pursuit of Perfection sign"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>
        {/* ───── ROW 5 • 12-wide landscape (Pursuit sign) ──────── */}
        <div className="col-span-full row-span-3">
      <img
        src={images[2]}                      /* gallery-1.jpg */
        alt="Pursuit of Perfection sign"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>
  </div>
);

export default GalleryLayouts7;
