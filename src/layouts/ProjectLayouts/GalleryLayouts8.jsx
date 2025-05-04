import React from "react";

const GalleryLayoutsZoya = ({ images = [], handleImageError }) => (
  <div
    className="
      grid grid-flow-dense gap-4
      grid-cols-6 sm:grid-cols-8 lg:grid-cols-12
      auto-rows-[12vw] sm:auto-rows-[10vw] lg:auto-rows-[10vw]
    "
  >
    {/* Row 1: 2 landscape side by side */}
    <div className="col-span-6 sm:col-span-6 lg:col-span-6 row-span-2">
      <img src={images[0]} alt="Gallery 1" onError={handleImageError} className="w-full h-full object-cover object-center" />
    </div>
    <div className="col-span-6 sm:col-span-6 lg:col-span-6 row-span-2">
      <img src={images[4]} alt="Gallery 5" onError={handleImageError} className="w-full h-full object-cover object-center" />
    </div>

    {/* Row 2: 3 portraits */}
    <div className="col-span-4 sm:col-span-3 lg:col-span-4 row-span-3">
      <img src={images[1]} alt="Gallery 2" onError={handleImageError} className="w-full h-full object-cover object-center" />
    </div>
    <div className="col-span-4 sm:col-span-3 lg:col-span-4 row-span-3">
      <img src={images[2]} alt="Gallery 3" onError={handleImageError} className="w-full h-full object-cover object-center" />
    </div>
    <div className="col-span-4 sm:col-span-2 lg:col-span-4 row-span-3">
      <img src={images[3]} alt="Gallery 4" onError={handleImageError} className="w-full h-full object-cover object-center" />
    </div>

    {/* Footer row: full width portrait */}
    <div className="col-span-full row-span-3">
      <img src={images[5]} alt="Gallery 6" onError={handleImageError} className="w-full h-full object-cover object-center" />
    </div>
  </div>
);

export default GalleryLayoutsZoya;
