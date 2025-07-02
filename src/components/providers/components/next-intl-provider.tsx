import { getFormats } from "@/i18n/request";
import { Locale } from "@/i18n/routing";
import { NextIntlClientProvider, useLocale, useMessages, useNow, useTimeZone } from "next-intl";
import React from "react";

export default function NextIntlProvider({ children }: { children: React.ReactNode }) {
  // Translation
  const messages = useMessages();
  const now = useNow();
  const timezone = useTimeZone();
  const locale = useLocale() as Locale;

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      now={now}
      timeZone={timezone}
      formats={getFormats(locale)}
    >
      {children}
    </NextIntlClientProvider>
  );
}
