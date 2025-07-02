import NotFoundComponent from "@/components/common/not-found-component";
import { useLocale } from "next-intl";
import React from "react";

export default function NotFound() {
  // Translation
  const locale = useLocale();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <main className="h-screen">
          <NotFoundComponent />
        </main>
      </body>
    </html>
  );
}
