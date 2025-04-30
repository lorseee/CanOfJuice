// GalleryLayouts3.jsx – Wework colour-block series (Project 3)
import React from "react";

const GalleryLayouts3 = ({ images = [], handleImageError }) => (
  <div
    className="
      grid grid-flow-dense gap-4
      grid-cols-6  sm:grid-cols-8  lg:grid-cols-12
      auto-rows-[12vw] sm:auto-rows-[10vw] lg:auto-rows-[11vw]
    "
  >
    {/* 0 │ HERO – evening exterior */}
    <div className="col-span-full row-span-4">
      <img
        src={images[0]}                 /* main.jpg */
        alt="Hero"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 2 │ Mixed row: portrait | landscape | portrait */}
    <div className="col-span-2 sm:col-span-2 lg:col-span-2 row-span-3">
      <img
        src={images[5]}                 /* gallery-5.jpg (pineapple cans) */
        alt="Gallery 2"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    <div className="col-span-4 sm:col-span-4 lg:col-span-8 row-span-3">
      <img
        src={images[1]}                 /* gallery-2.jpeg */
        alt="Gallery 3"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    <div className="col-span-2 sm:col-span-2 lg:col-span-2 row-span-3">
      <img
        src={images[6] ? images[5] : images[5]} /* fallback guard */
        alt="Gallery 4"
        onError={handleImageError}
        className="w-full h-full object-cover object-center invisible lg:visible"
      />
    </div>

    {/* 3 │ Reception slogan – full width landscape */}
    <div className="col-span-full row-span-3">
      <img
        src={images[2]}                 /* gallery-3.jpeg */
        alt="Gallery 5"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 4 │ Nice-Tea triptych – full width landscape */}
    <div className="col-span-full row-span-3">
      <img
        src={images[3]}                 /* gallery-4.jpg */
        alt="Gallery 6"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 5 │ HEY café doorway – full width portraitish */}
    <div className="col-span-full row-span-3">
      <img
        src={images[4]}                 /* gallery-6.jpg */
        alt="Gallery 7"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>
  </div>
);

export default GalleryLayouts3;
