import React from "react";

const GalleryLayout = ({ images, handleImageError }) => (
  <div
    className="
      /* Container with consistent padding on all screen sizes */
      px-4 mx-auto w-full max-w-screen-2xl
      
      /* Grid layout with consistent gaps */
      grid-cols-1 gap-6
      
      /* Small screens and up: original grid layout */
      sm:grid-cols-8 lg:grid-cols-12
      sm:auto-rows-[10vw] lg:auto-rows-[8vw]
      sm:gap-4
    "
  >
    {/* 1 │ HERO – full-width banner */}
    <div className="

      /* Small screens and up: original layout */
      sm:aspect-auto sm:col-span-8 lg:col-span-12 sm:row-span-4
    ">
      <img
        src={images[0]}
        alt="Gallery 1"
        onError={handleImageError}
        className="w-full h-full object-contain object-center"
      />
    </div>

    <div className="

      /* Small screens and up: original layout */
      sm:aspect-auto sm:col-span-8 lg:col-span-12 sm:row-span-4
    ">
      <img
        src={images[1]}
        alt="Gallery 1"
        onError={handleImageError}
        className="w-full h-full object-contain object-center"
      />
    </div>

    {/* 3 │ PORTRAIT RIGHT */}
    <div className="

      /* Small screens and up: original layout */
      sm:aspect-auto sm:col-span-8 lg:col-span-12 sm:row-span-4
    ">
      <img
        src={images[2]}
        alt="Gallery 1"
        onError={handleImageError}
        className="w-full h-full object-contain object-center"
      />
    </div>

    {/* 4 │ ULTRA-WIDE */}
    <div className="

      /* Small screens and up: original layout */
      sm:aspect-auto sm:col-span-8 lg:col-span-12 sm:row-span-4
    ">
      <img
        src={images[3]}
        alt="Gallery 1"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 5 │ LANDSCAPE */}
    <div className="
      /* Small screens and up: original layout */
      sm:aspect-auto sm:col-span-4 lg:col-span-6 sm:row-span-4
    ">
      <img
        src={images[4]}
        alt="Gallery 5"
        onError={handleImageError}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* 6 │ FOOTER STRIP */}
    <div className="
      /* Mobile: square aspect ratio */
      aspect-square w-full
      
      /* Small screens and up: original layout */
      sm:aspect-auto sm:col-span-4 lg:col-span-6 sm:row-span-4
    ">
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