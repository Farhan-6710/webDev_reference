import React, { useState } from "react";

// Carousel.tsx
interface CarouselProps {
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

const Carousel: React.FC<CarouselProps> = ({ breakpoints }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  const getSlidesToShow = () => {
    const width = window.innerWidth;
    if (width >= 1024) return breakpoints.desktop;
    if (width >= 768) return breakpoints.tablet;
    return breakpoints.mobile;
  };

  const slidesToShow = getSlidesToShow();
  const maxIndex = slides.length - slidesToShow;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex -1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-300"
        style={{
          transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
        }}
      >
        {slides.map((color, index) => (
          <div
            key={index}
            className={`w-full h-40 ${color} flex-shrink-0`}
            style={{ width: `${100 / slidesToShow}%` }}
          />
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -translate-y-1/2 left-0 h-14 w-14 rounded-full cursor-pointer bg-slate-950 text-white z-20"
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 -translate-y-1/2 right-0 h-14 w-14 rounded-full cursor-pointer bg-slate-950 text-white z-200"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;



// CarouselSection.tsx
import React from "react"
import Carousel from "./Carousel";
const CarouselSection: React.FC = () => {
    return (
      <section className="container mx-auto p-4">
        <h2 className="text-2xl mb-4">Carousel Section</h2>
        <Carousel breakpoints={{ mobile: 1, tablet: 2, desktop: 4 }} />
      </section>
    );
  };
  
  export default CarouselSection;
