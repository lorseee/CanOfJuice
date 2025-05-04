import React from "react";

const GalleryLayoutCoffee = ({ images = [], handleImageError }) => (
  <div
    className="
      grid grid-flow-dense gap-4
      grid-cols-6 sm:grid-cols-8 lg:grid-cols-12
      auto-rows-[12vw] sm:auto-rows-[10vw] lg:auto-rows-[9vw]
    "
  >
    {/* Wide hero image */}
    <div className="col-span-full row-span-3">
      <img
        src={images[0]}
        alt=""
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* Next 2 landscape shots side by side */}
    <div className="col-span-6 sm:col-span-4 row-span-2">
      <img
        src={images[1]}
        alt=""
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>
    <div className="col-span-6 sm:col-span-4 row-span-2">
      <img
        src={images[2]}
        alt=""
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* Smaller images in a row */}
    <div className="col-span-3 sm:col-span-2 row-span-1">
      <img
        src={images[3]}
        alt=""
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>
    <div className="col-span-3 sm:col-span-2 row-span-1">
      <img
        src={images[4]}
        alt=""
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>
    <div className="col-span-6 sm:col-span-4 row-span-1">
      <img
        src={images[5]}
        alt=""
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>
  </div>
);

export default GalleryLayoutCoffee;
