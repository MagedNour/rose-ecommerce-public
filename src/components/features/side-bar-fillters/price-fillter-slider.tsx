"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useFormatter } from "next-intl";
import * as Slider from "@radix-ui/react-slider";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "@/i18n/routing";

export default function PriceFillterSlider() {
  // Constants
  const MAX_PRICE = 10000;
  const DEBOUNCE_DELAY = 300;

  // Use Query
  const queryClient = useQueryClient();

  // Navigation
  const searchParams = useSearchParams();
  const router = useRouter();

  // Formating
  const format = useFormatter();

  // search params
  const initialMinPrice = Math.min(Number(searchParams.get("price[gte]")) || 0, MAX_PRICE);
  const initialMaxPrice = Math.min(Number(searchParams.get("price[lte]")) || MAX_PRICE, MAX_PRICE);
  const [priceRange, setPriceRange] = useState([initialMinPrice, initialMaxPrice]);

  // Debounced function
  const debouncedUpdate = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("price[gte]", priceRange[0].toString());
    params.set("price[lte]", priceRange[1].toString());
    router.push(`?${params.toString()}`, { scroll: false });
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }, DEBOUNCE_DELAY);

  // Handle slider
  const handleValueChange = (value: number[]) => {
    if (value[0] <= value[1] && value[0] >= 0 && value[1] <= MAX_PRICE) {
      setPriceRange(value);
      debouncedUpdate();
    }
  };

  // Formatted prices
  const formattedMinPrice = format.number(priceRange[0], { style: "currency", currency: "USD" });
  const formattedMaxPrice = format.number(priceRange[1], { style: "currency", currency: "USD" });

  return (
    <div className="mb-8">
      {/* Display price range */}
      <p className="text-base font-medium text-custom-rose-900">
        {formattedMinPrice} - {formattedMaxPrice}
      </p>

      {/* Slider */}
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-4"
        value={priceRange}
        max={MAX_PRICE}
        step={1}
        onValueChange={handleValueChange}
      >
        <Slider.Track className="bg-gray-400 relative grow rounded-full h-1">
          <Slider.Range className="absolute bg-custom-rose-900 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-4 h-4 bg-custom-rose-900 rounded-full focus:outline-none focus:ring-2 focus:ring-custom-rose-900 focus:ring-opacity-30"
          aria-label="Minimum price"
        />
        <Slider.Thumb
          className="block w-4 h-4 bg-custom-rose-900 rounded-full focus:outline-none focus:ring-2 focus:ring-custom-rose-900 focus:ring-opacity-30"
          aria-label="Maximum price"
        />
      </Slider.Root>
    </div>
  );
}
