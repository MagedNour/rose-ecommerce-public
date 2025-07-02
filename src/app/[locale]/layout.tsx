import Providers from "@/components/providers";
import { Locale, routing } from "@/i18n/routing";
import { LayoutProps } from "@/lib/types/route-props";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Roboto, Inter, Mulish } from "next/font/google";
import { cn } from "@/lib/utils/cn";
import { Toaster } from "@/components/ui/sonner";
import { Alex_Brush } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"], // Include specific weights
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"], // Include specific weights
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-alex-brush",
  weight: ["400"],
});
const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  weight: ["300", "400", "500", "600", "700"], // Include specific weights
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });
  return {
    title: t("metadata-title"),
    description: t("metadata-description"),
  };
}

// Generate static pages based on the locales to enable static rendering
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ params: { locale }, children }: LayoutProps) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={cn(
          inter.variable,
          roboto.variable,
          alexBrush.variable,
          mulish.variable,
          inter.className,
          "antialiased",
        )}
      >
        <Providers>
          {/* Main content */}

          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
