import React from "react";

const GalleryLayouts12 = ({ images = [] }) => {
  const handleImageError = (e) => {
    console.error("Image failed to load:", e.target.src);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ───────────────────── responsive grid ───────────────────── */}
      <div
        className="
          grid gap-4
          /* phones  ─────────── */
          grid-cols-1 auto-rows-[45vw]             /* ≈ square */

          /* tablets  ≥640 px ── */
          sm:grid-cols-4 sm:auto-rows-[25vw]

          /* laptops ≥1024 px ── */
          lg:grid-cols-12 lg:auto-rows-[12vw]
        "
      >
        {/* 1 │ hero / infographic */}
        <div className="
            col-span-1 sm:col-span-4 lg:col-span-12
            sm:row-span-2
          ">
          <img
            src={images[0]}
            alt="Third Wave Coffee process infographic"
            onError={handleImageError}
            className="w-full h-full object-cover object-center rounded-lg shadow-md"
          />
        </div>

        {/* 2 │ equipment */}
        <div className="
            col-span-1 sm:col-span-3 lg:col-span-8
            sm:row-span-2
          ">
          <img
            src={images[1]}
            alt="Coffee equipment and espresso machine"
            onError={handleImageError}
            className="w-full h-full object-cover object-center rounded-lg shadow-md"
          />
        </div>

        {/* 3 │ storefront */}
        <div className="
            col-span-1 sm:col-span-1 lg:col-span-4
            sm:row-span-2
          ">
          <img
            src={images[2]}
            alt="Coffee shop storefront with 'You're not lost' sign"
            onError={handleImageError}
            className="w-full h-full object-cover object-center rounded-lg shadow-md"
          />
        </div>

        {/* 4 │ secondary images */}
        {[3, 4, 6].map((idx, i) => (
          <div
            /* stacks 1-col on phones, 2-cols on tablets, 4-cols on desktop */
            key={idx}
            className="
              col-span-1 sm:col-span-2 lg:col-span-4
              sm:row-span-1
            "
          >
            <img
              src={images[idx] || images[i + 3]}
              alt=""
              onError={handleImageError}
              className="w-full h-full object-cover object-center rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryLayouts12;
