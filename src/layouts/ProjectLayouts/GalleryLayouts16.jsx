// TorpedoesArenaGallery.jsx
import React from "react";

const GalleryLayouts16 = ({ images = [] }) => {
  const onError = (e) => console.error("Couldn’t load:", e.target.src);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="
          grid gap-4
          /* phones  */ grid-cols-1  auto-rows-[55vw]
          /* tablets */ sm:grid-cols-4 sm:auto-rows-[32vw]
          /* desktop */ lg:grid-cols-12 lg:auto-rows-[10vw]
        "
      >
        {/* 1 │ HERO court – full-width banner */}
        <div className="col-span-1 sm:col-span-4 lg:col-span-12 row-span-4">
          <img
            src={images[0]}          // usually gallery-1.jpeg
            onError={onError}
            alt=""
            className="w-full h-full object-cover rounded-lg shadow"
          />
        </div>

        {/* 2 │ Wide angle from opposite side */}
        <div className="col-span-1 sm:col-span-4 lg:col-span-12 row-span-3">
          <img src={images[6] ?? images[1]} onError={onError} alt=""
               className="w-full h-full object-cover rounded-lg shadow" />
        </div>

        {/* 3 │ Class-of-2024 banner (portrait-ish) */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 row-span-2">
          <img src={images[1]} onError={onError} alt=""
               className="w-full h-full object-cover rounded-lg shadow" />
        </div>

        {/* 4 │ “Be Inspired” action shot  */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 row-span-2">
          <img src={images[2]} onError={onError} alt=""
               className="w-full h-full object-cover rounded-lg shadow" />
        </div>

        {/* 5 │ Limitless mural */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 row-span-2">
          <img src={images[3]} onError={onError} alt=""
               className="w-full h-full object-cover rounded-lg shadow" />
        </div>

        {/* 6 │ Detail – “Home of the Torpedoes” (angled) */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-6 row-span-3">
          <img src={images[4]} onError={onError} alt=""
               className="w-full h-full object-cover rounded-lg shadow" />
        </div>

        {/* 7 │ Detail – crest banners (angled) */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-6 row-span-3">
          <img src={images[5]} onError={onError} alt=""
               className="w-full h-full object-cover rounded-lg shadow" />
        </div>
      </div>
    </div>
  );
};

export default GalleryLayouts16;
