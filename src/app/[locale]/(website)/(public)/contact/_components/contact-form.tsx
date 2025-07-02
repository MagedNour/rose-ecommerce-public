"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import ArrowRight from "@/components/common/arrow-right";
import useContact from "../_hooks/use-contact";
import parsePhoneNumberFromString from "libphonenumber-js";

export default function ContactForm() {
  // Translations
  const t = useTranslations();

  // Hooks
  const { contact, isPending } = useContact();

  // Schemas
  const Schema = z.object({
    name: z
      .string({ required_error: t("contact-name-required") })
      .min(1, t("contact-name-required"))
      .min(2, t("contact-name-min")),
    email: z
      .string({ required_error: t("email-is-required") })
      .min(1, t("email-is-required"))
      .email(t("contact-email-invalid")),
    phone: z
      .string({ required_error: t("phone-is-required") })
      .refine(
        (value) => parsePhoneNumberFromString(value, { defaultCountry: "EG" })?.isValid(),
        t("phone-validation"),
      ),
    message: z
      .string({ required_error: t("contact-message-required") })
      .min(1, t("contact-message-required"))
      .min(10, t("contact-message-min"))
      .max(500, t("contact-message-max")),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    resolver: zodResolver(Schema),
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = (values) => {
    contact(values);
  };

  return (
    <Form {...form}>
      <form className="w-full h-96 p-6 flex flex-col justify-between rounded-2xl shadow-[0_1px_30px_0_rgba(248,43,169,0.1)]">
        {/* Contact name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              {/* Placeholder */}
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("contact-name-placeholder")}
                  className="text-custom-rose-900 placeholder:text-custom-rose-900 border-custom-rose-900 focus:border-custom-rose-900 focus:ring-custom-rose-900 focus:outline-none focus:ring-1"
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* Placeholder */}
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("contact-email-placeholder")}
                  className="text-custom-rose-900 placeholder:text-custom-rose-900 border-custom-rose-900 focus:border-custom-rose-900 focus:ring-custom-rose-900 focus:outline-none focus:ring-1"
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="text-custom-rose-900">
              {/* Placeholder */}
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("contact-phone-placeholder")}
                  className="text-custom-rose-900 placeholder:text-custom-rose-900 border-custom-rose-900 focus:border-custom-rose-900 focus:ring-custom-rose-900 focus:outline-none focus:ring-1"
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact textarea */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              {/* Placeholder */}
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t("contact-message-placeholder")}
                  className="text-custom-rose-900 placeholder:text-custom-rose-900
                   border-custom-rose-900 focus:border-custom-rose-900
                    focus:ring-custom-rose-900 focus:outline-none focus:ring-1"
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>

      {/* Submit button */}
      <div className="mt-3 flex justify-end">
        <Button
          className="bg-custom-rose-900 rounded-3xl self-end hover:bg-custom-rose-700"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
        >
          {t("contact-button-send")}
          <ArrowRight />
        </Button>
      </div>
    </Form>
  );
}
