import React from "react";

const GalleryRectangleByDimensions = ({ images = [], handleImageError }) => {
  const row1 = [images[0], images[1], images[2]];
  const row2 = [images[3], images[4]];

  const renderRow = (rowImages) => (
    <div className="flex gap-4 items-stretch">
      {rowImages.map((src, i) => (
        <div key={i} className="flex-1 flex items-center justify-center h-[400px] overflow-hidden bg-black rounded-lg shadow">
          <img
            src={src}
            alt={`Image ${i}`}
            onError={handleImageError}
            className="max-h-full max-w-full object-scale-down"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {renderRow(row1)}
      {renderRow(row2)}
    </div>
  );
};

export default GalleryRectangleByDimensions;
