/* eslint-disable @next/next/no-img-element */

"use client";

import { useState, useEffect } from "react";
import { AiFillMessage } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";

// interface
interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  message: string;
}

// Variables
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmed Mohamed",
    role: "Customer",
    avatar: "/assets/images/customer/customer-1.jpg",
    message:
      "Ab vel consequatur repellat eos omnis accusamus porro sunt dolorem. Totam voluptas ullam ut. Neque accusantium voluptas rerum. Dolorem veritatis quo omnis nihil nulla harum eum. Dignissimos laborum necessitatibus vero nihil.",
  },
  {
    id: 2,
    name: "Ahmed Mohamed",
    role: "Customer",
    avatar: "/assets/images/customer/customer-2.jpg",
    message:
      "Ab vel consequatur repellat eos omnis accusamus porro sunt dolorem. Totam voluptas ullam ut. Neque accusantium voluptas rerum. Dolorem veritatis quo omnis nihil nulla harum eum. Dignissimos laborum necessitatibus vero nihil.",
  },
  {
    id: 3,
    name: "Ahmed Mohamed",
    role: "Customer",
    avatar: "/assets/images/customer/customer-3.jpg",
    message:
      "Ab vel consequatur repellat eos omnis accusamus porro sunt dolorem. Totam voluptas ullam ut. Neque accusantium voluptas rerum. Dolorem veritatis quo omnis nihil nulla harum eum. Dignissimos laborum necessitatibus vero nihil.",
  },
  {
    id: 4,
    name: "Ahmed Mohamed",
    role: "Customer",
    avatar: "/assets/images/customer/customer-4.jpg",
    message:
      "Ab vel consequatur repellat eos omnis accusamus porro sunt dolorem. Totam voluptas ullam ut. Neque accusantium voluptas rerum. Dolorem veritatis quo omnis nihil nulla harum eum. Dignissimos laborum necessitatibus vero nihil.",
  },
];

export default function TestimonialsCarousel() {
  // Translation
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [totalSlides, setTotalSlides] = useState(testimonials.length);

  // Responsive card count based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Desktop: 4 cards
        setVisibleCards(4);
      } else if (window.innerWidth >= 768) {
        // Tablet: 2 cards
        setVisibleCards(2);
      } else {
        // Mobile: 1 card
        setVisibleCards(1);
      }
    };

    // Set initial value
    handleResize();

    // Update on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update total slides when visible cards change
  useEffect(() => {
    setTotalSlides(Math.ceil(testimonials.length / visibleCards));
    // Reset current index if it would be out of bounds
    if (currentIndex >= Math.ceil(testimonials.length / visibleCards)) {
      setCurrentIndex(0);
    }
  }, [visibleCards, currentIndex]);

  // functions
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1));
  };

  return (
    // customer section
    <main className="bg-pink-100 mx-auto px-4 py-8 bg-[url('/assets/images/customer/background.png')] bg-cover bg-center">
      <section className="container mx-auto flex flex-col items-center gap-6">
        {/* Wrapper for the entire testimonials carousel */}
        <div className="w-full relative">
          {/* Container for the carousel content with navigation buttons */}

          {/* Left navigation button */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-pink-600 rounded-full shadow-md"
            onClick={handlePrev}
          >
            {/* Chevron left icon for the button */}
            <FaChevronLeft className="h-6 w-6 text-white" />
          </button>

          {/* Container for testimonials */}
          <div className="overflow-hidden">
            <div
              className="flex transition-all duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 px-2 transition-all duration-300 mb-2"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="flex flex-col items-start p-4 md:p-6 lg:p-8 my-3 bg-white rounded-[60px] rounded-tl-xl h-full">
                    {/* Testimonial header: avatar and details */}
                    <div className="flex justify-center items-center gap-2">
                      {/* Avatar section */}
                      <div>
                        <img
                          src={testimonial.avatar}
                          alt={t("customer-name", { name: testimonial.name })}
                          className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-4 border-pink-500"
                        />
                      </div>

                      {/* Name and role */}
                      <div>
                        <h3 className="text-base md:text-lg font-bold">
                          {t("customer-name", { name: testimonial.name })}
                        </h3>
                        <p className="text-sm md:text-lg font-bold text-pink-600">
                          {t("customer-role", { role: testimonial.role })}
                        </p>
                      </div>
                    </div>

                    {/* Divider line */}
                    <div className="border-[1px] border-[#757F95] w-full my-2"></div>

                    {/* Testimonial message */}
                    <p className="mt-2 text-xs md:text-sm text-gray-600">
                      {t("customer-message", { message: testimonial.message })}
                    </p>

                    {/* Rating section */}
                    <div className="flex mt-2 gap-1 justify-between w-full">
                      <div className="flex gap-1">
                        <span className="text-pink-600">★</span>
                        <span className="text-pink-600">★</span>
                        <span className="text-pink-600">★</span>
                        <span className="text-pink-600">★</span>
                      </div>
                      <div className="flex relative">
                        <AiFillMessage className="text-pink-200 text-[30px] md:text-[40px] lg:text-[50px]" />
                        <Image
                          className="w-[28px] md:w-[36px] lg:w-[46px] absolute left-[14px] md:left-[18px] lg:left-[23px] -top-[7px] md:-top-[9px] lg:-top-[12px]"
                          src="/assets/images/customer/Vector (1).png"
                          alt=""
                          width={100}
                          height={0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right navigation button */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-pink-600 rounded-full shadow-md"
            onClick={handleNext}
          >
            {/* Chevron right icon for the button */}
            <FaChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Dots navigation for the carousel */}
        <div className="flex justify-center m-auto gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-pink-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
