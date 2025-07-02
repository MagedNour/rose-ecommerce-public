"use client";

import ErrorComponent from "@/components/common/error-component";
import { Locale } from "@/i18n/routing";
import { ErrorProps } from "@/lib/types/route-props";
import { useLocale } from "next-intl";

export default function Error({ error, reset }: ErrorProps) {
  // Translation
  const locale = useLocale() as Locale;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <main className="h-screen">
          <ErrorComponent error={error} reset={reset} />
        </main>
      </body>
    </html>
  );
}
