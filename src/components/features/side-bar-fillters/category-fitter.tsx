"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Locale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CategoriesFillterProp = {
  categories: Category[] | null;
};

export function CategoriesFillter({ categories }: CategoriesFillterProp) {
  // Translation
  const t = useTranslations();
  const locale = useLocale() as Locale;

  //   Navigation
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  //   Variables
  const selecetedCategory = params.get("category");

  // Functions
  const handlClick = (categoryId: string) => {
    const searchQuery = new URLSearchParams(params);

    // If the categoryId is "all", remove the category from the search query
    if (categoryId == "all") {
      searchQuery.delete("category");
    }
    // Otherwise, set the categoryId in the search query
    else {
      searchQuery.set("category", categoryId);
    }

    router.replace(`${pathname}?${searchQuery.toString()}`, { scroll: false });
  };

  return (
    <RadioGroup dir={locale === "ar" ? "rtl" : "ltr"} defaultValue="comfortable">
      <div
        className="flex items-center space-x-2 hover:bg-slate-100 cursor-pointer"
        onClick={() => handlClick("all")}
      >
        {/* The all categories input */}
        <RadioGroupItem
          className="rtl:me-1 text-custom-rose-900 border-custom-rose-900"
          value="default"
          id="r1"
          checked={!selecetedCategory}
        />

        {/* The all categories label */}
        <Label
          className="text-custom-muted tracking-[0] leading-5 text-[14px] cursor-pointer font-inter"
          htmlFor="r1"
        >
          {t("all-categories")}
        </Label>
      </div>

      {/* All categories  */}
      {categories?.map((category) => (
        <div
          key={category._id}
          className="flex items-center space-x-2 hover:bg-slate-100 cursor-pointer"
          onClick={() => handlClick(category._id)}
        >
          {/* Category input */}
          <RadioGroupItem
            className="rtl:me-1 text-custom-rose-900 border-custom-rose-900"
            value={category._id}
            id={category._id}
            checked={category._id === selecetedCategory}
          />

          {/* Category label */}
          <Label
            className="text-custom-muted tracking-[0] leading-5 text-[14px] cursor-pointer font-inter capitalize"
            htmlFor={category._id}
          >
            {category.name}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
