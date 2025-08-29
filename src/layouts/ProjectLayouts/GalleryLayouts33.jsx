import React from "react";

const GalleryLayout = ({ images, handleImageError }) => (
  <div
    className="
      px-4 mx-auto w-full max-w-screen-2xl
      grid grid-cols-1 gap-4

      /* Tablet and up */
      sm:grid-cols-8 sm:auto-rows-[10vw] sm:gap-1
      lg:grid-cols-12 lg:auto-rows-[8vw]
    "
  >
    {/* Full-width banner */}
    <div className="w-full sm:col-span-9 lg:col-span-13 sm:row-span-4">
      <img
        src={images[2]}
        alt="Gallery 3"
        onError={handleImageError}
        className="w-full h-auto sm:h-full object-contain object-center cursor-pointer hover:opacity-70 transition-opacity duration-300"
      />
    </div>

    <div className="w-full sm:col-span-9 lg:col-span-13 sm:row-span-4">
      <img
        src={images[7]}
        alt="Gallery 8"
        onError={handleImageError}
        className="w-full h-auto sm:h-full object-contain object-center cursor-pointer hover:opacity-70 transition-opacity duration-300"
      />
    </div>

    {/* Portrait */}
    <div className="w-full sm:col-span-4 lg:col-span-6 sm:row-span-5">
      <img
        src={images[4]}
        alt="Gallery 5"
        onError={handleImageError}
        className="w-full h-auto sm:h-full object-contain sm:object-cover object-center cursor-pointer hover:opacity-70 transition-opacity duration-300"
      />
    </div>

    <div className="w-full sm:col-span-4 lg:col-span-6 sm:row-span-5">
      <img
        src={images[5]}
        alt="Gallery 6"
        onError={handleImageError}
        className="w-full h-auto sm:h-full object-contain sm:object-cover object-center cursor-pointer hover:opacity-70 transition-opacity duration-300"
      />
    </div>

    {/* Landscape */}
    <div className="w-full sm:col-span-8 lg:col-span-12 sm:row-span-3">
      <img
        src={images[6]}
        alt="Gallery 7"
        onError={handleImageError}
        className="w-full h-auto sm:h-full object-contain sm:object-cover object-center cursor-pointer hover:opacity-70 transition-opacity duration-300"
      />
    </div>

    <div className="w-full sm:col-span-8 lg:col-span-12 sm:row-span-4">
      <img
        src={images[3]}
        alt="Gallery 4"
        onError={handleImageError}
        className="w-full h-auto sm:h-full object-contain sm:object-cover object-center cursor-pointer hover:opacity-70 transition-opacity duration-300"
      />
    </div>

    <div className="w-full sm:col-span-3 lg:col-span-6 sm:row-span-7">
      <img
        src={images[0]}
        alt="Gallery 1"
        onError={handleImageError}
        className="w-full h-auto sm:h-full object-contain sm:object-cover object-center cursor-pointer hover:opacity-70 transition-opacity duration-300"
      />
    </div>

    <div className="w-full sm:col-span-2 lg:col-span-5 sm:row-span-7">
      <img
        src={images[1]}
        alt="Gallery 2"
        onError={handleImageError}
        className="w-full h-auto sm:h-full object-contain sm:object-cover object-center cursor-pointer hover:opacity-70 transition-opacity duration-300"
      />
    </div>
  </div>
);

export default GalleryLayout;
