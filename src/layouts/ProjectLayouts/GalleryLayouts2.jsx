// GalleryLayouts2.jsx  – “gift-box” window display layout
import React from "react";

const GalleryLayouts2 = ({ images = [], handleImageError }) => (
  <div
    className="
      grid grid-flow-dense gap-4
      grid-cols-6 sm:grid-cols-8 lg:grid-cols-12
      auto-rows-[12vw] sm:auto-rows-[10vw] lg:auto-rows-[11vw]
    "
  >
    {/* 0 │ HERO – square intro panel */}
    <div className="col-span-full row-span-4">
      <img
        src={images[0]}           /* main.jpg */
        alt="Gallery hero"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 1 │ WIDE LANDSCAPE + 1 PORTRAIT, shared row */}
    <div className="col-span-4 sm:col-span-6 lg:col-span-8 row-span-3">
      <img
        src={images[1]}           /* gallery-2.jpeg */
        alt="Gallery 1"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    <div className="col-span-2 sm:col-span-2 lg:col-span-4 row-span-3">
      <img
        src={images[3]}           /* gallery-4.jpg  portrait */
        alt="Gallery 2"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 2 │ second LANDSCAPE + second PORTRAIT */}
    <div className="col-span-4 sm:col-span-6 lg:col-span-8 row-span-3">
      <img
        src={images[2]}           /* gallery-3.jpeg */
        alt="Gallery 3"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    <div className="col-span-2 sm:col-span-2 lg:col-span-4 row-span-3">
      <img
        src={images[4]}           /* gallery-5.jpg  portrait */
        alt="Gallery 4"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 3 │ SQUARE + WIDER FOOTER STRIP */}
    <div className="col-span-2 sm:col-span-2 lg:col-span-4 row-span-3">
      <img
        src={images[0]}           /* gallery-1.jpeg  square */
        alt="Gallery 5"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    <div className="col-span-4 sm:col-span-6 lg:col-span-8 row-span-3">
      <img
        src={images[5]}           /* gallery-6.jpg  wide-but-not-ultra */
        alt="Gallery 6"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>
  </div>
);

export default GalleryLayouts2;
