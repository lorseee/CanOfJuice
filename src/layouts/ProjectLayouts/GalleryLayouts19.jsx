import React from "react";

const GalleryLayout = ({ images = [], handleImageError }) => {
  // Ensure we have at least 6 images to work with, use placeholders if needed
  const safeImages = [...images];
  while (safeImages.length < 6) {
    safeImages.push("/api/placeholder/800/600");
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* First row - hero image */}
        <div className="md:col-span-3 lg:col-span-4 aspect-[16/9]">
          <img
            src={safeImages[0]}
            alt="Vesoma Fitness Center Interior"
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Second row - 3 images */}
        <div className="aspect-[3/4]">
          <img
            src={safeImages[1]}
            alt="Motivational Wall Art"
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="aspect-[3/4]">
          <img
            src={safeImages[2]}
            alt="Vesoma Reception Area"
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="md:col-span-1 lg:col-span-2 aspect-[16/9]">
          <img
            src={safeImages[3]}
            alt="Cardio Equipment Area"
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Third row - 2 images */}
        <div className="md:col-span-2 lg:col-span-2 aspect-[16/9]">
          <img
            src={safeImages[4]}
            alt="Jump Height Measurement Wall"
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="md:col-span-1 lg:col-span-2 aspect-[3/4] md:aspect-[16/9]">
          <img
            src={safeImages[5]}
            alt="Fitness Program Board"
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryLayout;