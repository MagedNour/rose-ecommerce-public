"use client";

import ArrowLeft from "@/components/common/arrow-left";
import { Button } from "@/components/ui/button";
import { PaymentMethod, PaymentStep } from "@/lib/constants/cart.constant";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { RiVisaLine } from "react-icons/ri";
import useCheckout from "../_hooks/use-checkout";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import ArrowRight from "@/components/common/arrow-right";
import { Spinner } from "@/components/common/spinner";
import { useBillingSchema } from "@/lib/schemes/cart.schema";

type PaymentInfoProps = {
  form: UseFormReturn<z.infer<ReturnType<typeof useBillingSchema>>>;
  setActiveAccordion: (value: PaymentStep) => void;
};

export default function PaymentInfo({ setActiveAccordion, form }: PaymentInfoProps) {
  // Translation
  const t = useTranslations();

  // State
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(PaymentMethod.CASH);

  // Mutation
  const { isPending, checkout } = useCheckout();

  // Variables
  const methods = [
    {
      title: t("cash-on-delivery"),
      value: PaymentMethod.CASH,
      icon: <BsCashCoin size={40} />,
    },
    {
      title: t("credit-card"),
      value: PaymentMethod.CREDIT_CARD,
      icon: <RiVisaLine size={50} />,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Methods */}
      <ul className="flex gap-4">
        {methods.map((method) => (
          <li key={method.value}>
            <button
              onClick={() => setSelectedMethod(method.value)}
              className={cn(
                "border transition-colors size-40 rounded-2xl flex flex-col gap-2 justify-center text-slate-950 items-center p-4",
                selectedMethod === method.value && "border-custom-rose-900 text-custom-rose-900",
              )}
            >
              {/* Icon */}
              <span className="size-14 flex items-center justify-center">{method.icon}</span>

              {/* Title */}
              <p>{method.title}</p>
            </button>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex justify-between gap-4">
        {/* Prev */}
        <Button variant="primary" onClick={() => setActiveAccordion(PaymentStep.BILLING_INFO)}>
          <ArrowLeft /> {t("previous")}
        </Button>

        {/* Pay */}
        <Button
          variant="primary"
          disabled={isPending || !form.formState.isValid}
          onClick={() => checkout({ method: selectedMethod, billingInfo: form.getValues() })}
        >
          {t("pay-now")} {isPending ? <Spinner className="text-white size-5" /> : <ArrowRight />}
        </Button>
      </div>
    </div>
  );
}
