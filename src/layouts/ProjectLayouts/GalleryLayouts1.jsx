import React from "react";

const GalleryLayouts1 = ({ images = [], handleImageError }) => (
  <div
    className="
      grid grid-cols-6 gap-4
      auto-rows-[12vw] sm:auto-rows-[10vw] lg:auto-rows-[9vw]
    "
  >
    {/* Row 1 */}
    <div className="col-span-3 row-span-3">
      <img
        src={images[0]}
        alt="Gallery 1"
        onError={handleImageError}
        className="w-full h-full object-contain"
      />
    </div>
    <div className="col-span-3 row-span-3">
      <img
        src={images[1]}
        alt="Gallery 3"
        onError={handleImageError}
        className="w-full h-full object-contain"
      />
    </div>

    {/* Row 2 */}
    <div className="col-span-3 row-span-2">
      <img
        src={images[3]}
        alt="Gallery 4"
        onError={handleImageError}
        className="w-full h-full object-contain"
      />
    </div>
    <div className="col-span-3 row-span-2">
      <img
        src={images[5]}
        alt="Gallery 5"
        onError={handleImageError}
        className="w-full h-full object-contain"
      />
    </div>

    {/* Optional Row 3 */}
    <div className="col-span-full row-span-3">
      <img
        src={images[4]}
        alt="Gallery 6"
        onError={handleImageError}
        className="w-full h-full object-contain"
      />
    </div>
  </div>
);

export default GalleryLayouts1;
