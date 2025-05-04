import React from "react";

const GalleryGrid = ({ images = [], handleImageError }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div
        className="grid gap-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gridAutoRows: "300px",
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="border rounded overflow-hidden bg-white shadow"
            style={{ width: "100%", height: "100%" }}
          >
            <img
              src={src}
              alt={`Gallery ${index + 1}`}
              onError={handleImageError}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;
