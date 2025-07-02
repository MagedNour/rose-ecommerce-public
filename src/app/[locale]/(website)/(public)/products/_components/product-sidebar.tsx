"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import StarRating from "./StarRating";
import { OccasionFillter } from "@/components/features/side-bar-fillters/occasions-filter";
import { CategoriesFillter } from "@/components/features/side-bar-fillters/category-fitter";
import PriceFillterSlider from "@/components/features/side-bar-fillters/price-fillter-slider";

export default function ProductSidebar({
  categories,
  occasions,
}: {
  categories: Category[] | null;
  occasions: Occasion[] | null;
}) {
  // Translation
  const t = useTranslations();

  //Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };

  // Functions
  const handleFilterChange = (filterType: string, value: string) => {
    const newQueryString = createQueryString(filterType, value);
    router.push(`${pathname}?${newQueryString}`);
  };

  const currentRating = searchParams.get("rating") || "";
  const currentSale = searchParams.get("sale") || "";

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      {/* Categories fillter */}
      <div className="mb-8">
        <h3 className="text-custom-blue-900 font-semibold text-lg mb-4">{t("all-categories")}</h3>
        <CategoriesFillter categories={categories} />
      </div>

      {/* Occasions fillter */}
      <div className="mb-8">
        <h3 className="text-custom-blue-900 font-semibold text-lg mb-4">{t("all-occasions-0")}</h3>
        <OccasionFillter occasions={occasions} />
      </div>

      {/* Price fillter */}
      <div className="mb-10">
        <h3 className="text-custom-blue-900 font-semibold text-lg mb-4">{t("price-0")}</h3>
        <PriceFillterSlider />
      </div>

      {/* Ratings Section */}
      <div className="mb-8">
        <h3 className="text-custom-blue-900 font-semibold text-lg mb-4">{t("ratings")}</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={`rating-${rating}`} className="flex items-center">
              <input
                type="radio"
                id={`rating-${rating}`}
                name="rating"
                value={rating.toString()}
                checked={currentRating === rating.toString()}
                onChange={() => handleFilterChange("rating", rating.toString())}
                className="mr-2 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`rating-${rating}`} className="cursor-pointer">
                <StarRating rating={rating} />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/*status Section */}
      <div className="mb-6">
        <h3 className="text-custom-blue-900 font-semibold text-lg mb-4">{t("status")}</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="all"
              name="sale"
              value=""
              checked={currentSale === ""}
              onChange={() => handleFilterChange("sale", "")}
              className="mr-2 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="all" className="cursor-pointer">
              {t("all")}
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="on-sale"
              name="sale"
              value="true"
              checked={currentSale === "true"}
              onChange={() => handleFilterChange("sale", "true")}
              className="mr-2 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="on-sale" className="cursor-pointer">
              {t("on-sale")}
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="in-stock"
              name="sale"
              value="in_stock"
              checked={currentSale === "in_stock"}
              onChange={() => handleFilterChange("sale", "in_stock")}
              className="mr-2 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="in-stock" className="cursor-pointer">
              {t("in-stock")}
            </label>
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(currentRating || currentSale) && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => router.push(pathname)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
