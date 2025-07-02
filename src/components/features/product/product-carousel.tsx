"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ProductCarousel({
  images,
  imgCover,
}: {
  images: string[];
  imgCover: string;
}) {
  // Translation
  const t = useTranslations();

  // States
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  // Ensure imgCover is the first image in the array
  const allImages = imgCover ? [imgCover, ...images] : images;

  // Update the selected slide index
  React.useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div className="flex flex-col items-center gap-4 w-full md:max-w-[526px]">
      {/* Main Carousel */}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {allImages.map((src, index) => (
            <CarouselItem key={index}>
              <Card className="border-0">
                <CardContent className="p-0">
                  <Image
                    src={src || imgCover}
                    alt={t("slide") + " " + (index + 1)}
                    width={626}
                    height={480.66}
                    className="rounded-lg object-cover object-center w-full aspect-[3/2]"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnails */}
      <div className="flex gap-[13.6px]  w-full">
        {allImages.map((src, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`relative w-20 h-20 md:w-[121px] md:h-[121px] rounded-md overflow-hidden transition-all ${
              current === index ? "ring-1 ring-custom-rose-900" : "opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={src || imgCover}
              alt={t("product-thumbnail") + " " + (index + 1)}
              fill
              className="object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
