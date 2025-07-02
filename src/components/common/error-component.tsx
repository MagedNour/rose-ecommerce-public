"use client";

import { ErrorProps } from "@/lib/types/route-props";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function ErrorComponent({ error, reset }: ErrorProps) {
  // Log the error to the console
  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  const t = useTranslations();

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100 text-center">
      {/* Headline */}
      <h1 className="text-3xl font-bold text-red-600">{t("something-went-wrong")}</h1>

      {/* Message */}
      <p className="text-lg text-gray-700 mt-4">{error.message}</p>

      {/* Try again */}
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => reset()}
      >
        {t("try-again")}
      </button>
    </div>
  );
}
