// ResponsiveGalleryLayout.jsx – Alternative implementation with aspect ratio preservation
import React from "react";

const ResponsiveGalleryLayout = ({ images = [], handleImageError }) => {
  return (
    <div className="container mx-auto px-4">
      {/* Main grid container with consistent gap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
        
        {/* Hero image - full width on all screen sizes */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-12 relative pb-[56.25%]">
          <img
            src={images[0] || ""}
            alt="Hero image"
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        
        
        <div className="lg:col-span-6 sm:col-span-1 col-span-1 relative pb-[56.25%]">
          <img
            src={images[1] || ""}
            alt="Interior view"
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        
        
        {/* Full width landscape images */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-12 relative pb-[40%]">
          <img
            src={images[2] || ""}
            alt="Reception area"
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        
        <div className="col-span-1 sm:col-span-2 lg:col-span-12 relative pb-[40%]">
          <img
            src={images[3] || ""}
            alt="Triptych display"
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        
        {/* Final image - could be full width or part width depending on design */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-12 relative pb-[56.25%]">
          <img
            src={images[4] || ""}
            alt="Café entrance"
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ResponsiveGalleryLayout;