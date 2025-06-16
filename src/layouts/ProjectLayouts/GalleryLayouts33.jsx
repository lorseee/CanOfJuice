import React from "react";

const GalleryLayout = ({ images, handleImageError }) => (
  <div
    className="
      /* Container with consistent padding on all screen sizes */
      px-4 mx-auto w-full max-w-screen-2xl flex justify-center
      
      /* Grid layout with consistent gaps */
      grid-cols-3 gap-6
      
      /* Small screens and up: original grid layout */
      sm:grid-cols-8 lg:grid-cols-12
      sm:auto-rows-[10vw] lg:auto-rows-[8vw]
      sm:gap-1
    "
  >


    {/* 2 │ WIDE LEFT */}
    <div className="
      /* Mobile: square aspect ratio */
      aspect-square w-full
      
      /* Small screens and up: original layout */
      sm:aspect-auto sm:col-span-3 lg:col-span-6 sm:gap-0 sm:row-span-7
    ">
      <img
        src={images[0]}
        alt="Gallery 1"
        onError={handleImageError}
        className="w-full h-full object-contain object-center"
      />
    </div>

    {/* 3 │ PORTRAIT RIGHT */}
    <div className="
      /* Mobile: square aspect ratio */
      aspect-square w-full
      
      /* Small screens and up: original layout */
      sm:aspect-auto sm:col-span-2 lg:col-span-5 sm:gap-0 sm:row-span-7
    ">
      <img
        src={images[1]}
        alt="Gallery 2"
        onError={handleImageError}
        className="w-full h-full object-contain object-center"
      />
    </div>

    {/* 3 │ full-width banner */}
    <div className="

      /* Small screens and up: original layout */
      sm:aspect-auto sm:col-span-8 lg:col-span-12 sm:row-span-3
    ">
      <img
        src={images[2]}
        alt="Gallery 3"
        onError={handleImageError}
        className="w-full h-full object-contain object-center"
      />
    </div>

    

    {/* 4 │ ULTRA-WIDE */}
    <div className="
      /* Mobile: square aspect ratio */
      aspect-square w-full
      
      /* Small screens and up: original layout */
      sm:aspect-auto sm:col-span-8 lg:col-span-12 sm:row-span-4
    ">
      <img
        src={images[3]}
        alt="Gallery 4"
        onError={handleImageError}
        className="w-full h-full object-contain object-center"
      />
    </div>

    {/* 5 │ LANDSCAPE */}
    <div className="
      /* Small screens and up: original layout */
      sm:aspect-auto sm:col-span-8 lg:col-span-12 sm:row-span-3
    ">
      <img
        src={images[6]}
        alt="Gallery 7"
        onError={handleImageError}
        className="w-full h-full object-contain object-center"
      />
    </div>
     {/* 2 │ WIDE LEFT */}
     <div className="
      /* Mobile: square aspect ratio */
      aspect-square w-full
      
      /* Small screens and up: original layout */
      sm:aspect-auto sm:col-span-4 lg:col-span-6 sm:row-span-5
      flex items-stretch
    ">
      <img
        src={images[4]}
        alt="Gallery 5"
        onError={handleImageError}
        className="w-full h-full object-contain object-center"
      />
    </div>
     {/* 3 │ PORTRAIT RIGHT */}
    <div className="
      /* Mobile: square aspect ratio */
      aspect-square w-full
      
      /* Small screens and up: original layout */
      sm:aspect-auto sm:col-span-4 lg:col-span-6 sm:row-span-5
      flex items-stretch
    ">
      <img
        src={images[5]}
        alt="Gallery 6"
        onError={handleImageError}
        className="w-full h-full object-contain object-center"
      />
    </div>
   
    
  </div>
);

export default GalleryLayout;