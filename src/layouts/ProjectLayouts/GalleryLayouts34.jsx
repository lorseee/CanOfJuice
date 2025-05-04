// GalleryLayout.jsx  –  original layout restored, width-safe
import React from "react";
const GalleryLayout = ({ images, handleImageError }) => (
  <div
    className="
      grid grid-flow-dense
      grid-cols-6  sm:grid-cols-8  lg:grid-cols-12
      auto-rows-[12vw] sm:auto-rows-[10vw] lg:auto-rows-[8vw]
      gap-4
    "
  >
    {/* 1 │ HERO – full-width banner */}
    <div className="col-span-6 sm:col-span-8 lg:col-span-12 row-span-4">
      <img
        src={images[0]}
        alt="Gallery 1"
        onError={handleImageError}
        className="w-full h-full object-cover object-center" 
      />
    </div>

    {/* 2 │ WIDE LEFT – now uses object-contain (no crop) */}
    <div className="col-span-3 sm:col-span-4 lg:col-span-6 row-span-4">
      <img
        src={images[1]}
        alt="Gallery 2"
        onError={handleImageError}
        className="w-full h-full object-cover object-center "
      />
    </div>

    {/* 3 │ PORTRAIT RIGHT – unchanged */}
    <div className="col-span-3 sm:col-span-4 lg:col-span-6 row-span-4">
      <img
        src={images[2]}
        alt="Gallery 3"
        onError={handleImageError}
        className="w-full h-full object-cover object-center "
      />
    </div>

    {/* 4 │ ULTRA-WIDE – also object-contain */}
    <div className="col-span-6 sm:col-span-8 lg:col-span-12 row-span-4">
      <img
        src={images[3]}
        alt="Gallery 4"
        onError={handleImageError}
        className="w-full h-full object-contain object-center "
      />
    </div>

    {/* 5 │ LANDSCAPE – unchanged */}
    <div className="col-span-6 sm:col-span-8 lg:col-span-12 row-span-4">
      <img
        src={images[4]}
        alt="Gallery 5"
        onError={handleImageError}
        className="w-full h-full object-cover object-center "
      />
    </div>

    {/* 6 │ FOOTER STRIP – unchanged */}
    <div className="col-span-6 sm:col-span-8 lg:col-span-12 row-span-4">
      <img
        src={images[5]}
        alt="Gallery 6"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>
  </div>
);

export default GalleryLayout;
