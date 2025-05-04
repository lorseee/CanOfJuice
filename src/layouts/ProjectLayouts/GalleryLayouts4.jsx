// GalleryLayouts4.jsx  – “DASTA Infinite” layout
//------------------------------------------------
import React from "react";

const GalleryLayouts4 = ({ images = [], handleImageError }) => (
  <div
    className="
      grid grid-flow-dense gap-4
      grid-cols-6  sm:grid-cols-8  lg:grid-cols-12
      auto-rows-[12vw] sm:auto-rows-[10vw] lg:auto-rows-[11vw]
    "
  >
    {/* 1 │ Mural corridor – wide landscape */}
    <div className="col-span-full row-span-3">
      <img
        src={images[1]}              /* gallery-2.jpeg */
        alt="Colour-block mural"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 2 │ Office corridor – narrow portraitish wide → 8 cols */}
    <div className="col-span-4 sm:col-span-6 lg:col-span-8 row-span-3">
      <img
        src={images[2]}              /* gallery-3.jpeg */
        alt="Glass corridor"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 3 │ Building façade – portrait, balances previous row */}
    <div className="col-span-2 sm:col-span-2 lg:col-span-4 row-span-3">
      <img
        src={images[5]}              /* gallery-4.jpg */
        alt="Building facade"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 4 │ Floor-directory graphic – square */}
    <div className="col-span-3 sm:col-span-4 lg:col-span-6 row-span-3">
      <img
        src={images[4]}              /* gallery-5.jpg */
        alt="Directory sign"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 5 │ Letterform detail & stair graphic – square */}
    <div className="col-span-3 sm:col-span-4 lg:col-span-6 row-span-3">
      <img
        src={images[3]} /* main.jpg (letter G) */
        alt="Letterform G"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>
  </div>
);

export default GalleryLayouts4;
