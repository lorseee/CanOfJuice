// GalleryLayouts1.jsx – shorter rows for images 4-6
import React from "react";

const GalleryLayouts1 = ({ images = [], handleImageError }) => (
  <div
    className="
      grid grid-flow-dense gap-4
      grid-cols-6  sm:grid-cols-8  lg:grid-cols-12
      auto-rows-[12vw] sm:auto-rows-[10vw] lg:auto-rows-[11vw]
    "
  >
    {/* 1 │ HERO – keep tall (4 rows) */}
    <div className="col-span-full row-span-4">
      <img
        src={images[0]}
        alt="Gallery 1"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 2 │ WIDE LEFT – unchanged height (2 rows) */}
    <div className="col-span-4 sm:col-span-6 lg:col-span-8 row-span-2">
      <img
        src={images[4]}
        alt="Gallery 2"
        onError={handleImageError}
        className="w-full h-full object-cover object-top"
      />
    </div>

    {/* 3 │ PORTRAIT RIGHT – unchanged height (2 rows) */}
    <div className="col-span-2 sm:col-span-2 lg:col-span-4 row-span-2">
      <img
        src={images[2]}
        alt="Gallery 3"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 4 │ ULTRA-WIDE – now only 2 rows tall */}
    <div className="col-span-full row-span-3">
      <img
        src={images[3]}
        alt="Gallery 4"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 5 │ LANDSCAPE – now 2 rows tall */}
    <div className="col-span-full row-span-3">
      <img
        src={images[1]}
        alt="Gallery 5"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 6 │ FOOTER STRIP – now 2 rows tall */}
    <div className="col-span-full row-span-3">
      <img
        src={images[5]}
        alt="Gallery 6"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>
  </div>
);

export default GalleryLayouts1;
