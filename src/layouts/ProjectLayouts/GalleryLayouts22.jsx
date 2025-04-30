import React, { useState, useEffect } from "react";

const GalleryLayout = ({ images = [], handleImageError }) => {
  // State to store aspect ratios of loaded images
  const [imageRatios, setImageRatios] = useState([]);
  
  // Pre-load images to get their aspect ratios
  useEffect(() => {
    const loadImages = async () => {
      const ratios = await Promise.all(
        images.map(
          (src) =>
            new Promise((resolve) => {
              if (!src) {
                resolve(1); // Default aspect ratio if image is missing
                return;
              }
              
              const img = new Image();
              img.onload = () => {
                const ratio = img.width / img.height;
                resolve(ratio);
              };
              img.onerror = () => {
                resolve(1); // Default aspect ratio on error
              };
              img.src = src;
            })
        )
      );
      setImageRatios(ratios);
    };
    
    if (images.length > 0) {
      loadImages();
    }
  }, [images]);

  // Helper function to determine optimal row span
  const getRowSpan = (index) => {
    // If ratios aren't loaded yet, use sensible defaults
    if (!imageRatios[index]) return 3;
    
    const ratio = imageRatios[index];
    
    // Portrait images (taller than wide)
    if (ratio < 0.8) return 4;
    // Square-ish images
    if (ratio >= 0.8 && ratio <= 1.2) return 3;
    // Landscape images (wider than tall)
    if (ratio > 1.2 && ratio < 2) return 2;
    // Very wide landscape images
    return 1;
  };

  // Optional placeholder for missing images
  const getImageSrc = (index) => {
    return images[index] || "/api/placeholder/800/600";
  };

  return (
    <div
      className="
        grid grid-flow-dense gap-4
        grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12
        auto-rows-[25vh] sm:auto-rows-[20vh] lg:auto-rows-[16vh]
      "
    >
      {/* Hero image - always full width */}
      <div className="col-span-full row-span-3 md:row-span-4">
        <img
          src={getImageSrc(0)}
          alt="Tip Top brand display"
          onError={handleImageError}
          className="w-full h-full object-contain bg-slate-50"
        />
      </div>
      
      {/* Building sign with logo */}
      <div className="col-span-full sm:col-span-1 md:col-span-6 lg:col-span-6 row-span-3">
        <img
          src={getImageSrc(1)}
          alt="Tip Top exterior signage"
          onError={handleImageError}
          className="w-full h-full object-contain bg-slate-50"
        />
      </div>
      
      {/* Shopping bags and mug */}
      <div className="col-span-full sm:col-span-1 md:col-span-6 lg:col-span-6 row-span-3">
        <img
          src={getImageSrc(2)}
          alt="Tip Top branded merchandise"
          onError={handleImageError}
          className="w-full h-full object-contain bg-slate-50"
        />
      </div>
      
      {/* Typography sample */}
      <div className="col-span-full sm:col-span-1 md:col-span-4 lg:col-span-4 row-span-2">
        <img
          src={getImageSrc(3)}
          alt="Tip Top typography guide"
          onError={handleImageError}
          className="w-full h-full object-contain bg-slate-50"
        />
      </div>
      
      {/* Logo variations */}
      <div className="col-span-full sm:col-span-1 md:col-span-8 lg:col-span-8 row-span-2">
        <img
          src={getImageSrc(4)}
          alt="Tip Top logo variations"
          onError={handleImageError}
          className="w-full h-full object-contain bg-slate-50"
        />
      </div>
      
      {/* Color palette */}
      <div className="col-span-full row-span-2">
        <img
          src={getImageSrc(5)}
          alt="Tip Top color palette"
          onError={handleImageError}
          className="w-full h-full object-contain bg-slate-50"
        />
      </div>

    </div>
  );
};

export default GalleryLayout;