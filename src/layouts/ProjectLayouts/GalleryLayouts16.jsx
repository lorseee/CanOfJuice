// TorpedoesArenaGallery.jsx
import React from "react";

const GalleryLayouts16 = ({ images = [] }) => {
  const onError = (e) => console.error("Couldn’t load:", e.target.src);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="
          grid gap-4
          grid-cols-1 sm:grid-cols-4 lg:grid-cols-12
          auto-rows-auto
        "
      >
        {/* 1 │ HERO court – full-width banner */}
        <div className="col-span-full">
          <img
            src={images[0]}
            onError={onError}
            alt=""
            className="w-full h-auto rounded-lg shadow"
          />
        </div>

        {/* 2 │ Wide angle from opposite side */}
        <div className="col-span-full">
          <img
            src={images[6] ?? images[1]}
            onError={onError}
            alt=""
            className="w-full h-auto rounded-lg shadow"
          />
        </div>

        {/* Grouped smaller images in a 3-column grid (desktop) */}
        {[images[1], images[2], images[3]].map((src, i) => (
          <div key={i} className="sm:col-span-2 lg:col-span-4">
            <img
              src={src}
              onError={onError}
              alt=""
              className="w-full h-auto rounded-lg shadow"
            />
          </div>
        ))}

        {/* Bottom row – two wide images side by side */}
        {[images[4], images[5]].map((src, i) => (
          <div key={i} className="sm:col-span-2 lg:col-span-6">
            <img
              src={src}
              onError={onError}
              alt=""
              className="w-full h-auto rounded-lg shadow"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryLayouts16;
