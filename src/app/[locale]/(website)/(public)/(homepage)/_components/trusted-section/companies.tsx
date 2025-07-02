'use client';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function Companies() {
  return (
    <div className="w-full overflow-x-hidden px-4">
      <Carousel
        opts={{ 
          loop: true,
          align: "start",
          containScroll: "trimSnaps",
          dragFree: true
        }}
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full py-4"
      >
        <CarouselContent className="ml-0">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <CarouselItem 
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-4"
            >
              <div className="relative w-full h-12 sm:h-14 md:h-16 aspect-video">
                <Image
                  fill
                  src={`/assets/images/trusted/image${index}.png`}
                  alt={`Company ${index}`}
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}