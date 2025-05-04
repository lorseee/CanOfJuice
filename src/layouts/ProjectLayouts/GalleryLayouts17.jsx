import React from "react";

const GalleryLayout = ({ images = [], handleImageError }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-full pt-[100%] overflow-hidden rounded-lg shadow"
          >
            <img
              src={src}
              alt={`Gallery ${index + 1}`}
              onError={handleImageError}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryLayout;
