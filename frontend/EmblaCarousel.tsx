"use client";

import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialIconSVG from "./TestimonialIconSVG";
import Image from "next/image";

type Testimonial = {
  id: number;
  title: string;
  comment: string;
  imgPath: string;
  personName: string;
  personPost: string;
};

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    loop: true,
  });

  // Fetch testimonials data
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials-data");
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  // Navigation handlers
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="py-12">
      <div className="container mx-auto relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex w-full">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="px-4 min-w-[100%] sm:min-w-[50%]"
              >
                <div className="bg-[#122542] shadow-md rounded-2xl p-6 text-white grid gap-4">
                  <div className="flex items-center gap-2">
                    <TestimonialIconSVG />
                    <h3 className="text-lg font-semibold text-mainBrown">
                      {testimonial.title}
                    </h3>
                  </div>
                  <p className="text-sm italic text-gray-300">
                    {testimonial.comment}
                  </p>
                  <div className="border-b border-gray-600 my-2"></div>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.imgPath}
                      width={200}
                      height={200}
                      alt={testimonial.personName}
                      className="w-12 h-12 rounded-full border-2 border-mainBrown"
                    />
                    <div>
                      <p className="font-semibold text-white">
                        {testimonial.personName}
                      </p>
                      <span className="text-xs text-gray-400">
                        {testimonial.personPost}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={scrollPrev}
          className="absolute cursor-pointer left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-2 rounded-full"
        >
          <ChevronLeft size={20} className="text-mainBrown" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-2 rounded-full"
        >
          <ChevronRight size={20} className="text-mainBrown" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
