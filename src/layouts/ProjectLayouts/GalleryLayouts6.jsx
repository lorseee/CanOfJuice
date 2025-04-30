import React from "react";

const GalleryLayouts6 = ({ images = [], handleImageError }) => {
  // Function to get appropriate alt text for each image
  const getAltText = (index) => {
    const altTexts = [
      "Namma Nook reception area with red sofa and colorful signage",
      "Glass door with 'LET'S CREATE' typography and geometric patterns",
      "Yellow doors with geometric design elements and 'Authorised Personnel Only' sign",
      "Wayfinding design showing 'After-School Classes' and program information",
      "Exterior building signage for Namma Nook and Little Gym",
      "Interior waiting area with cork board, sticky notes and chairs",
      "View through glass doors to Namma Nook reception with red sofa"
    ];
    return altTexts[index] || `Namma Nook image ${index + 1}`;
  };

  return (
    <div className="grid grid-cols-12 gap-4 auto-rows-[20vw] md:auto-rows-[15vw] lg:auto-rows-[12vw]">
      {/* Image 0: Reception area - Feature as hero (portrait orientation) */}
      <div className="col-span-full md:col-span-6 lg:col-span-6 row-span-3 md:row-span-4 lg:row-span-4">
        <img
          src={images[0]}
          alt={getAltText(0)}
          onError={handleImageError}
          className="w-full h-full object-cover object-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        />
      </div>

      {/* Image 1: LET'S CREATE glass door - Prominent, nearly square */}
      <div className="col-span-full md:col-span-6 lg:col-span-6 row-span-3 md:row-span-4 lg:row-span-4">
        <img
          src={images[1]}
          alt={getAltText(1)}
          onError={handleImageError}
          className="w-full h-full object-cover object-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        />
      </div>

      {/* Image 2: Yellow doors - Horizontal rectangle */}
      <div className="col-span-6 md:col-span-6 lg:col-span-4 row-span-2 md:row-span-2 lg:row-span-2">
        <img
          src={images[2]}
          alt={getAltText(2)}
          onError={handleImageError}
          className="w-full h-full object-cover object-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        />
      </div>

      {/* Image 3: Wayfinding design - Vertical orientation */}
      <div className="col-span-6 md:col-span-6 lg:col-span-4 row-span-2 md:row-span-2 lg:row-span-2">
        <img
          src={images[3]}
          alt={getAltText(3)}
          onError={handleImageError}
          className="w-full h-full object-cover object-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        />
      </div>

      {/* Image 4: Exterior signage - Vertical rectangle */}
      <div className="col-span-6 md:col-span-6 lg:col-span-4 row-span-2 md:row-span-2 lg:row-span-2">
        <img
          src={images[4]}
          alt={getAltText(4)}
          onError={handleImageError}
          className="w-full h-full object-cover object-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        />
      </div>

      {/* Image 5: Interior waiting area - Standard landscape */}
      <div className="col-span-full row-span-2 md:row-span-2 lg:row-span-2">
        <img
          src={images[5]}
          alt={getAltText(5)}
          onError={handleImageError}
          className="w-full h-full object-cover object-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        />
      </div>
    </div>
  );
};

export default GalleryLayouts6;