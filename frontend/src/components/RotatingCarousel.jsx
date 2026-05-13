import React, { useState, useEffect } from 'react';

const RotatingCarousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ""}/api/carousel`)
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(err => console.error(err));
  }, []);

  const numberOfItems = images.length || 1; // Prevent division by zero
  // Calculate angle between each item based on the total number of items
  const angle = 360 / numberOfItems;
  // Distance from center. Adjust this to make the circle wider or narrower.
  const translateZ = images.length > 2 ? 210 : 100; // Adjust radius if too few images

  return (
    <div className="carousel-container">
      <div className="carousel-spinner">
        {images.map((src, index) => {
          const rotateY = index * angle;
          return (
            <div
              key={index}
              className="carousel-item"
              style={{
                transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)`
              }}
            >
              {src.match(/\.(mp4|webm|ogg)$/i) ? (
                <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover rounded-lg" />
              ) : (
                <img src={src} alt={`Tech IT ${index + 1}`} loading="lazy" />
              )}
              {/* Optional overlay for styling */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RotatingCarousel;

