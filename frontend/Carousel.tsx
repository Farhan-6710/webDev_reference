import React, { useState } from "react";

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
    "green-500",
    "red-500",
    "blue-500",
    "yellow-500",
    "purple-500",
  ];

  const getSlidesToShow = () => {
    const width = window.innerWidth;
    if (width >= 1024) return breakpoints.desktop;
    if (width >= 768) return breakpoints.tablet;
    return breakpoints.mobile;
  };

  const slidesToShow = getSlidesToShow();

  const maxLength = slides.length - slidesToShow;

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < maxLength) setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex w-full transition-transform duration-300"
        style={{
          transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
        }}
      >
        {slides.map((color, index) => (
          <div
            key={index}
            className={`h-40 bg-${color} font-bold font-serif text-4xl flex justify-center items-center flex-shrink-0`}
            style={{ width: `${100 / slidesToShow}% ` }}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="bg-gray-300 p-4 rounded-full h-12 w-12 flex justify-center items-center"
          onClick={handlePrev}
        >
          -
        </button>
        <button
          className="bg-gray-300 p-4 rounded-full h-12 w-12 flex justify-center items-center"
          onClick={handleNext}
        >
          +
        </button>
      </div>
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
