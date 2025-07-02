"use client";

import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface PopularProductsNavProps {
  categories: Category[];
}

export default function PopularProductsNav({ categories }: PopularProductsNavProps) {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Variables
  const selectedCategory = searchParams.get("category");

  // Functions
  function handleClick(categoryId: string) {
    const searchQuery = new URLSearchParams(searchParams);

    searchQuery.set("category", categoryId);

    router.replace(`${pathname}?${searchQuery.toString()}`, { scroll: false });
  }

  return (
    <div className="container mx-auto mb-10 pt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl capitalize text-center after:absolute after:left-1/2 after:-translate-x-1/2 after:w-[53px] after:h-[2px] after:bg-custom-rose-900 after:top-full before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:w-[136px] before:h-[17px] before:bg-[#FEEDF7] before:z-[-1] before:rounded-e-lg font-bold text-cutom-blue relative rtl:after:right-1/2 rtl:after:translate-x-1/2 rtl:before:right-1/2 rtl:before:translate-x-1/2">
        {t("propular-items")}
      </h2>

      {/* List of the first four categories */}
      <div className="w-full md:w-auto overflow-x-auto pb-2">
        <ul className="flex gap-4 md:gap-6">
          {categories?.map((cat: Category, index: number) => (
            <li
              className="hover:text-custom-rose-900 duration-300 text-custom-blue-900 font-normal text-lg font-inter whitespace-nowrap"
              key={cat._id}
            >
              {/* Button for the category */}
              <button
                className={`${
                  selectedCategory === cat._id || (!selectedCategory && index === 0)
                    ? "border-b-custom-rose-900 border-b-2"
                    : ""
                }`}
                onClick={() => handleClick(cat._id)}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
