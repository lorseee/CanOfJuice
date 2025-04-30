// StaircaseMuralsGallery.jsx
import React from "react";

const GalleryLayouts13 = ({ images = [] }) => {
  const handleError = (e) => console.error("Image failed :", e.target.src);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="
          grid gap-4
          /* phones */   grid-cols-1   auto-rows-[55vw]
          /* tablets */  sm:grid-cols-4 sm:auto-rows-[32vw]
          /* desktop */  lg:grid-cols-12 lg:auto-rows-[10vw]
        "
      >
        {/* 1 │ HERO  – full-width banner (night façade) */}
        <div className="col-span-1 sm:col-span-4 lg:col-span-12 row-span-3">
          <img
            src={images[7]}
            alt=""
            onError={handleError}
            className="w-full h-full object-cover object-center rounded-lg shadow"
          />
        </div>

        {/* 2 │ WIDE  – restaurant interior palm mural */}
        <div className="col-span-1 sm:col-span-4 lg:col-span-12 row-span-3">
          <img
            src={images[2]}
            alt=""
            onError={handleError}
            className="w-full h-full object-cover object-center rounded-lg shadow"
          />
        </div>

        {/* 3 │ PORTRAIT  – teal palm staircase corner */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 row-span-3">
          <img
            src={images[3]}
            alt=""
            onError={handleError}
            className="w-full h-full object-cover object-center rounded-lg shadow"
          />
        </div>

        {/* 4 │ PORTRAIT  – coral lotus repeat */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 row-span-3">
          <img
            src={images[0]}
            alt=""
            onError={handleError}
            className="w-full h-full object-cover object-center rounded-lg shadow"
          />
        </div>

        {/* 5 │ SQUARE  – red tree graphic */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 row-span-3">
          <img
            src={images[1]}
            alt=""
            onError={handleError}
            className="w-full h-full object-cover object-center rounded-lg shadow"
          />
        </div>

        {/* 6 │ SQUARE  – Cambodia map & boats */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 row-span-3">
          <img
            src={images[9]}
            alt=""
            onError={handleError}
            className="w-full h-full object-cover object-center rounded-lg shadow"
          />
        </div>

        {/* 8 │ SQUARE  – neon dragon */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 row-span-3">
          <img
            src={images[4]}
            alt=""
            onError={handleError}
            className="w-full h-full object-cover object-center rounded-lg shadow"
          />
        </div>

        {/* 9 │ SQUARE  – neon Web Chutney sign */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 row-span-3">
          <img
            src={images[6]}
            alt=""
            onError={handleError}
            className="w-full h-full object-cover object-center rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryLayouts13;
