import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Logos = () => {
  const marqueeRef = useRef(null);
  const logos = [
    "/images/brands/brand1.png", "/images/brands/brand2.png", "/images/brands/brand3.png", "/images/brands/brand4.png", "/images/brands/brand5.png",
    "/images/brands/brand6.png", "/images/brands/brand7.png", "/images/brands/brand8.png", "/images/brands/brand9.png", "/images/brands/brand10.png",
    "/images/brands/brand11.png", "/images/brands/brand12.png", "/images/brands/brand13.png", "/images/brands/brand14.png", "/images/brands/brand15.png",
    "/images/brands/brand16.png", "/images/brands/brand17.png", "/images/brands/brand18.png", "/images/brands/brand19.png", "/images/brands/brand20.png",
    "/images/brands/brand21.png", "/images/brands/brand22.png", "/images/brands/brand23.png", "/images/brands/brand24.png", "/images/brands/brand25.png",
    "/images/brands/brand26.png", "/images/brands/brand27.png", "/images/brands/brand28.png", "/images/brands/brand29.png", "/images/brands/brand30.png",
  ];
  return (
    // No extra top padding; it will inherit the margin from the rotating text above
    <div className="w-full text-center">
      <h2 className="text-4xl font-bold mb-4">
        Our Trusted Partners
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        We collaborate with industry leaders to bring you the best experience.
      </p>

      <div
        ref={marqueeRef}
        className="w-full bg-white overflow-hidden"
        style={{ margin: 0, padding: 0 }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div key={`first-${index}`} className="mx-5 flex-shrink-0">
              <img
                src={logo}
                alt={`Partner ${index + 1}`}
                className="h-20 w-40 object-contain"
              />
            </div>
          ))}
          {/* Duplicate set for seamless looping */}
          {logos.map((logo, index) => (
            <div key={`second-${index}`} className="mx-5 flex-shrink-0">
              <img
                src={logo}
                alt={`Partner ${index + 1}`}
                className="h-20 w-40 object-contain"
              />
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
            /* The min-width ensures a full cycle before the logo row loops. */
            min-width: ${logos.length * 200 * 2}px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Logos;