import React from "react";

const GalleryLayout = ({ images = [], handleImageError }) => {
  // Fallback image handling for empty slots
  const getImage = (index) => {
    if (index < images.length) {
      return images[index];
    }
    // Return the first image or null if no images are available
    return images.length > 0 ? images[0] : null;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Hero - Full width on all screen sizes */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 aspect-[3/2]">
          <img
            src={getImage(0)}
            alt="TABANA brand hero"
            onError={handleImageError}
            className="w-full h-full object-contain bg-gray-100 rounded"
          />
        </div>

        {/* First row - 3 columns on large screens, 2 on medium */}
        <div className="aspect-square">
          <img
            src={getImage(1)}
            alt="TABANA shopping bags"
            onError={handleImageError}
            className="w-full h-full object-contain bg-gray-100 rounded"
          />
        </div>
        <div className="aspect-square">
          <img
            src={getImage(2)}
            alt="TABANA store sign"
            onError={handleImageError}
            className="w-full h-full object-contain bg-gray-100 rounded"
          />
        </div>
        <div className="aspect-square">
          <img
            src={getImage(3)}
            alt="TABANA product tags"
            onError={handleImageError}
            className="w-full h-full object-contain bg-gray-100 rounded"
          />
        </div>

        {/* Second row - Wider items */}
        <div className="col-span-1 md:col-span-2 aspect-[2/1]">
          <img
            src={getImage(4)}
            alt="TABANA brand meaning"
            onError={handleImageError}
            className="w-full h-full object-contain bg-gray-100 rounded"
          />
        </div>
        <div className="aspect-square">
          <img
            src={getImage(5)}
            alt="TABANA color variations"
            onError={handleImageError}
            className="w-full h-full object-contain bg-gray-100 rounded"
          />
        </div>

        {/* Last row - full width */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 aspect-[3/1]">
          <img
            src={getImage(6)}
            alt="TABANA color palette banner"
            onError={handleImageError}
            className="w-full h-full object-contain bg-gray-100 rounded"
          />
        </div>
      </div>
    </div>
  );
};

const TabanaGallery = ({ images }) => {
  // Image error handler
  const handleImageError = (e) => {
    e.target.src = "/api/placeholder/400/400";
  };
  
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">TABANA Home Furnishings</h1>
        <p className="text-center mb-8 text-gray-600">Premium home furnishings with woven fabric inspiration</p>
        
        <GalleryLayout 
          images={images}
          handleImageError={handleImageError}
        />
      </div>
    </div>
  );
};

export default TabanaGallery;