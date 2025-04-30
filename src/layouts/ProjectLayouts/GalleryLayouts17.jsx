// GalleryLayouts3.jsx
import React, { useState, useEffect } from "react";

const GalleryLayouts17 = ({ images = [], handleImageError }) => {
  const [meta, setMeta] = useState([]);

  useEffect(() => {
    let mounted = true;
    Promise.all(
      images.map((src) =>
        new Promise((res) => {
          const img = new Image();
          img.src = src;
          img.onload = () =>
            res({
              src,
              w: img.naturalWidth,
              h: img.naturalHeight,
              orientation:
                img.naturalWidth > img.naturalHeight
                  ? "landscape"
                  : "portrait",
            });
          img.onerror = () =>
            res({ src, w: 1, h: 1, orientation: "landscape" });
        })
      )
    ).then((arr) => mounted && setMeta(arr));

    return () => {
      mounted = false;
    };
  }, [images]);

  if (meta.length === 0) return null;

  return (
    <div
      className="
        grid grid-flow-row-dense gap-4
        grid-cols-6 sm:grid-cols-8 lg:grid-cols-12
        auto-rows-[12vw] sm:auto-rows-[10vw] lg:auto-rows-[11vw]
      "
    >
      {/* HERO full-width */}
      <div className="col-span-full row-span-5">
        <img
          src={meta[0].src}
          alt="Hero"
          onError={handleImageError}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Left sidebar: portrait */}
      <div className="col-span-2 sm:col-span-2 lg:col-span-3 row-span-3">
        <img
          src={meta[5]?.src}
          alt="Sidebar Left"
          onError={handleImageError}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Main block: landscape big */}
      <div className="col-span-4 sm:col-span-4 lg:col-span-6 row-span-3">
        <img
          src={meta[1].src}
          alt="Main"
          onError={handleImageError}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Right sidebar: portrait */}
      <div className="col-span-2 sm:col-span-2 lg:col-span-3 row-span-3">
        <img
          src={meta[6]?.src}
          alt="Sidebar Right"
          onError={handleImageError}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 2nd full-width: reception slogan */}
      <div className="col-span-full row-span-3">
        <img
          src={meta[2].src}
          alt="Reception"
          onError={handleImageError}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 3rd full-width: tea triptych */}
      <div className="col-span-full row-span-3">
        <img
          src={meta[3].src}
          alt="Triptych"
          onError={handleImageError}
          className="w-full h-full object-cover object-center"
        />
      </div>

    </div>
  );
};

export default GalleryLayouts17;
