import { getRequestConfig } from "next-intl/server";
import { Locale, routing } from "./routing";
import { Formats } from "next-intl";

export const getFormats = (locale: Locale): Formats => {
  return {
    number: {
      digit: {
        numberingSystem: locale === "en" ? "latn" : "arab",
      },
      "currency-base": {
        numberingSystem: locale === "en" ? "latn" : "arab",
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      },
    },
  };
};

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = (await requestLocale) as Locale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    formats: getFormats(locale),
  };
});
