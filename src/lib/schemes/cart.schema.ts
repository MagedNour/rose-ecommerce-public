import { z } from "zod";
import { useTranslations } from "next-intl";
import parsePhoneNumber from "libphonenumber-js";

export function useBillingSchema() {
  const t = useTranslations();

  const Schema = z.object({
    street: z
      .string({ required_error: t("street-is-required") })
      .min(10, { message: t("street-is-required-and-must") })
      .max(100, { message: t("street-must-be-at-most-100") }),

    city: z
      .string({ required_error: t("city-is-required") })
      .min(4, { message: t("city-is-required-and-must-be-at-least-4") })
      .max(50, { message: t("city-must-be-at-most-50-characters-long") }),
    phone: z
      .string({ required_error: t("phone-is-required") })
      .refine((value) => parsePhoneNumber(value, "EG")?.isValid(), t("phone-validation")),
    lat: z.string().optional(),
    long: z.string().optional(),
  });

  return Schema;
}
