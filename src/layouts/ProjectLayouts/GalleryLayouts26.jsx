import React from "react";

const VelvestoGallery = ({ images = [], handleImageError }) => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-md">
            <img
              src={src}
              alt={`Velvesto item ${index + 1}`}
              onError={handleImageError}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VelvestoGallery;
