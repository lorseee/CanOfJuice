// src/layouts/GalleryLayouts.jsx
import React from 'react';
const GalleryLayouts = {

  1:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  2:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  3:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  4:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  5:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-5">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  6:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-6">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-6">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-6">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  7:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-6">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-6">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  8:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-5">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-5">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-6">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  9:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  10:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  11:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  12:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  13:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-6">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-5">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  14:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  15:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  16:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  17:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  18:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  19:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  20:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  21:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  22:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  23:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  24:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  25:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  26:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  27:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),
  28:({ images, handleImageError }) => (
    <div className="grid grid-cols-6 auto-rows-[200px] gap-4">
      {/* First row - full width image */}
      <div className="col-span-6 row-span-4">
        <img 
          src={images[0]} 
          alt="Gallery image 1" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Second row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[1]} 
          alt="Gallery image 2" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      <div className="col-span-6 row-span-3">
        <img 
          src={images[2]} 
          alt="Gallery image 3" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Third row - One image below the wide column image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[3]} 
          alt="Gallery image 4" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fourth row - full width image */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[4]} 
          alt="Gallery image 5" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
  
      {/* Fifth row - one narrow column + one wide column */}
      <div className="col-span-6 row-span-3">
        <img 
          src={images[5]} 
          alt="Gallery image 6" 
          className="w-full h-full object-cover" 
          onError={handleImageError} 
        />
      </div>
    </div>
  ),


  // Default layout for projects without specific layouts
  default: ({ images, handleImageError }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 aspect-[1/1]">
        <div className="detail-gallery-item-wrapper">
          <img 
            src={images[0] || ''} 
            alt="Gallery image 1"
            className="w-full h-full object-contain"
            onError={handleImageError}
          />
        </div>
      </div>
      <div className="md:col-span-2 aspect-[960/443]">
        <div className="detail-gallery-item-wrapper">
          <img 
            src={images[1] || ''} 
            alt="Gallery image 2"
            className="w-full h-full object-contain"
            onError={handleImageError}
          />
        </div>
      </div>
      <div className="md:col-span-1 aspect-[3/4]">
        <div className="detail-gallery-item-wrapper">
          <img 
            src={images[2] || ''} 
            alt="Gallery image 3"
            className="w-full h-full object-contain"
            onError={handleImageError}
          />
        </div>
      </div>
      <div className="md:col-span-2 aspect-[1040/492]">
        <div className="detail-gallery-item-wrapper">
          <img 
            src={images[3] || ''} 
            alt="Gallery image 4"
            className="w-full h-full object-contain"
            onError={handleImageError}
          />
        </div>
      </div>
      <div className="md:col-span-3 aspect-[1040/492]">
        <div className="detail-gallery-item-wrapper">
          <img 
            src={images[4] || ''} 
            alt="Gallery image 5"
            className="w-full h-full object-contain"
            onError={handleImageError}
          />
        </div>
      </div>
    </div>
  )
};

// Component to render a gallery layout based on project ID
export const GalleryLayout = ({ projectId, images, handleImageError }) => {
  // Get the layout function for the project ID, or use default if not found
  const LayoutComponent = GalleryLayouts[projectId] || GalleryLayouts.default;
  
  return <LayoutComponent images={images} handleImageError={handleImageError} />;
};

export default GalleryLayout;