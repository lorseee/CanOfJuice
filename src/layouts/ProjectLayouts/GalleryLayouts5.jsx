import React from "react";

const GalleryLayouts12 = ({ images = [], handleImageError }) => {
  // Corresponding aspect ratios (width / height)
  const aspectRatios = [
    1, 1, 780 / 446,        // gallery-1 to gallery-3
    3 / 4, 1, 1,            // gallery-4 to gallery-6
    1, 1, 1599 / 1200,      // gallery-7 to gallery-9
    1599 / 1200, 1280 / 963 // gallery-10 to gallery-12
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((src, i) => {
        const ratio = aspectRatios[i];
        const paddingTop = `${100 / ratio}%`; // Enforce aspect ratio with padding

        return (
          <div key={i} className="relative w-full" style={{ paddingTop }}>
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              onError={handleImageError}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

export default GalleryLayouts12;
