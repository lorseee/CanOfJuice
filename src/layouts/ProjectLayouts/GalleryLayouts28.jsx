import React from "react";

const GalleryLayout = ({ images = [], handleImageError }) => {
  // Ensure we have at least 6 images, using duplicates if needed
  const safeImages = [...images];
  while (safeImages.length < 6) {
    safeImages.push(safeImages[safeImages.length % images.length]);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {/* Hero image - full width */}
      <div className="col-span-1 md:col-span-3 lg:col-span-4 aspect-[3/2]">
        <img
          src={safeImages[0]}
          alt="Hero exterior view"
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Row 2 - Three equal columns */}
      <div className="col-span-1 aspect-square">
        <img
          src={safeImages[5]}
          alt="Detail shot"
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-span-1 md:col-span-1 aspect-square">
        <img
          src={safeImages[1]}
          alt="Interior space"
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="hidden md:block md:col-span-1 lg:col-span-2 aspect-[2/1]">
        <img
          src={safeImages[6] || safeImages[2]}
          alt="Additional view"
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Row 3 - Two columns */}
      <div className="col-span-1 md:col-span-2 aspect-[2/1]">
        <img
          src={safeImages[2]}
          alt="Reception area"
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-2 aspect-square">
        <img
          src={safeImages[3]}
          alt="Cafe detail"
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Last row - full width */}
      <div className="col-span-1 md:col-span-3 lg:col-span-4 aspect-[3/1]">
        <img
          src={safeImages[4]}
          alt="Entrance doorway"
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default GalleryLayout;