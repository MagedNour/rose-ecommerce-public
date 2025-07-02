"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { EmblaCarouselType } from "embla-carousel";

// Props
type GalleryCarouselDialogProps = {
  images: string[];
  imgCover?: string;
};

export default function GalleryCarouselDialog({ images, imgCover }: GalleryCarouselDialogProps) {
  // Translation
  const t = useTranslations();

  // States
  const [api, setApi] = useState<EmblaCarouselType | null>(null);
  const [current, setCurrent] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Variables
  const coverImage = imgCover || (images.length > 0 ? images[0] : ""); // Ensuring the cover image appears first without duplication
  const allImages = coverImage
    ? [coverImage, ...images.filter((img) => img !== coverImage)]
    : images;

  // Functions
  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  // UseEffect
  useEffect(() => {
    if (!api) return;

    // Handler to update current slide index
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    handleSelect();
    api.on("select", handleSelect);

    // Clean up
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <Dialog>
      {/* Dialog Trigger */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center 
        justify-center text-sm gap-1 text-blue-700 w-[184px] h-12 rounded-xl border border-slate-300 pt-2 px-2 hover:bg-slate-50 hover:text-blue-700"
        >
          <ImageIcon width={18} height={18} />
          {t("view-category-image")}
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="w-full max-w-[900px] h-auto max-h-[90vh] rounded-2xl p-6 border mx-8 bg-white">
        {/* Dialog Header & Title For Better Accessibility */}
        <DialogHeader>
          <DialogTitle className="sr-only">{t("view-category-image")}</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-full mt-10">
          <div className="flex flex-col items-center">
            {/* Main Carousel */}
            <Carousel
              setApi={(api) => setApi(api ?? null)}
              opts={{ align: "center", loop: false }}
              className="w-full"
            >
              {/* Carousel Content & Items */}
              <CarouselContent>
                {allImages.map((image, index) => (
                  <CarouselItem key={index} className="flex items-center justify-center">
                    <div className="relative rounded-lg w-full max-w-[780px] mx-auto">
                      {/* Image */}
                      <Image
                        width={780}
                        height={480}
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-auto rounded-lg object-contain border border-gray-200 max-h-[60vh]"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Pagination Buttons If There Are More Than 1 Image */}
            {allImages.length > 1 && (
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center gap-2 mx-10">
                  {/* Pagination Dots */}
                  <div className="flex justify-center gap-2 mb-3">
                    {allImages.map((_, index) => (
                      <Button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={cn(
                          "w-3 h-3 p-0 rounded-full transition-all",
                          current === index
                            ? "bg-custom-rose-900 hover:bg-gray-300"
                            : "bg-gray-300 hover:bg-custom-rose-900",
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={current === index ? "true" : "false"}
                      />
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-center gap-4 my-4">
                    {/* Left Pagination Button */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => api?.scrollPrev()}
                      disabled={!canScrollPrev}
                      aria-label="Previous image"
                      className="rounded-full w-8 h-8 p-0 border border-pink-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-pink-500">
                        <ChevronLeft className="w-4 h-4 scale-110" />
                      </span>
                    </Button>

                    {/* Right Pagination Button */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => api?.scrollNext()}
                      disabled={!canScrollNext}
                      aria-label="Next image"
                      className="rounded-full w-8 h-8 p-0 border border-pink-500 bg-white hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span aria-hidden className="text-pink-500">
                        <ChevronRight className="w-4 h-4 scale-110" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
