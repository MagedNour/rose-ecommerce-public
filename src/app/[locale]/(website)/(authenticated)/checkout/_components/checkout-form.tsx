"use client";

import { useTranslations } from "next-intl";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Arrow from "@/components/common/arrow";
import { PaymentStep } from "@/lib/constants/cart.constant";
import { useBillingSchema } from "@/lib/schemes/cart.schema";

type CheckoutFormProps = {
  setActiveAccordion: React.Dispatch<React.SetStateAction<PaymentStep>>;
  form: UseFormReturn<z.infer<ReturnType<typeof useBillingSchema>>>;
};

export default function CheckoutForm({ setActiveAccordion, form }: CheckoutFormProps) {
  // Translations
  const t = useTranslations();

  // Functions
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("lat", position.coords.latitude.toString());
          form.setValue("long", position.coords.longitude.toString());
        },
        (err) => {
          toast.error(t("unable-to-retrieve-location") + err.message);
        },
      );
    } else {
      toast.error(t("the-browser-does-not-support-geolocation"));
    }
  };

  const onSubmit: SubmitHandler<z.infer<ReturnType<typeof useBillingSchema>>> = () => {
    setActiveAccordion(PaymentStep.PAYMENT_INFO);
  };

  return (
    <>
      {/* checkout Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 flex-1">
            {/* Street */}
            <FormField
              name="street"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  {/* Label For Better Accessibility */}
                  <Label className="text-custom-blue-900 font-medium">{t("street-label")}</Label>
                  {/* Input */}
                  <Input
                    {...field}
                    placeholder={t("street-placeholder")}
                    className="input-custom font-normal shadow-custom-input"
                  />

                  {/* Feedback Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  {/* Label For Better Accessibility */}
                  <Label className="text-custom-blue-900 font-medium">{t("phone-label")}</Label>

                  {/* Input */}
                  <Input
                    {...field}
                    placeholder={t("phone-placeholder")}
                    className="input-custom font-normal shadow-custom-input "
                  />

                  {/* Feedback Message */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* City */}
          <FormField
            name="city"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label For Better Accessibility */}
                <Label className="text-custom-blue-900 font-medium">{t("city-label")}</Label>

                {/* Input */}
                <Input
                  {...field}
                  placeholder={t("city-placeholder")}
                  className="input-custom font-normal shadow-custom-input"
                />

                {/* Feedback Message */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center gap-5 ">
            {/* Get Location Button */}
            <Button
              type="button"
              onClick={getLocation}
              className="button-submit flex items-center justify-center w-full text-base h-[52px] font-medium mb-8 mt-10"
            >
              {t("get-location")}
            </Button>

            {/* Submit Button */}
            <Button
              disabled={!form.formState.isValid}
              type="submit"
              className="button-submit flex items-center justify-center w-full text-base h-[52px] font-medium mb-8 mt-10"
            >
              {t("next-step")} <Arrow />
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
