"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Locale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type OccasionFillterProp = {
  occasions: Category[] | null;
};
export function OccasionFillter({ occasions }: OccasionFillterProp) {
  // Translation
  const t = useTranslations();
  const locale = useLocale() as Locale;

  //   Navigation
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  //   Variables
  const selecetedOccasion = params.get("occasion");

  // Functions
  const handlClick = (occasionId: string) => {
    const searchQuery = new URLSearchParams(params);

    // If the categoryId is "all", remove the category from the search query
    if (occasionId == "all") {
      searchQuery.delete("occasion");
    }
    // Otherwise, set the categoryId in the search query
    else {
      searchQuery.set("occasion", occasionId);
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
          checked={!selecetedOccasion}
        />

        {/* The all categories label */}
        <Label
          className="text-custom-muted tracking-[0] leading-5 text-[14px] cursor-pointer font-inter"
          htmlFor="r1"
        >
          {t("all-occasions")}
        </Label>
      </div>

      {/* Occasions List */}
      {occasions?.map((occasion) => (
        <div
          key={occasion._id}
          className="flex items-center space-x-2 hover:bg-slate-100 cursor-pointer"
          onClick={() => handlClick(occasion._id)}
        >
          {/* Occasions input */}
          <RadioGroupItem
            className="rtl:me-1 text-custom-rose-900 border-custom-rose-900"
            value={occasion._id}
            id={occasion._id}
            checked={occasion._id === selecetedOccasion}
          />
          {/* Occasion Label */}
          <Label
            className="text-custom-muted tracking-[0] leading-5 text-[14px] cursor-pointer font-inter"
            htmlFor={occasion._id}
          >
            {occasion.name}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
