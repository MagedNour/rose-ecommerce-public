"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CheckoutForm from "./checkout-form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PaymentStep } from "@/lib/constants/cart.constant";
import PaymentInfo from "./payment-info";
import { useBillingSchema } from "@/lib/schemes/cart.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AccordionComponent() {
  // Translations
  const t = useTranslations();

  // State
  const [activeAccordion, setActiveAccordion] = useState<PaymentStep>(PaymentStep.BILLING_INFO);

  // Form & Validation
  const Schema = useBillingSchema();
  const form = useForm({
    defaultValues: {
      street: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(Schema),
  });

  return (
    <main className="grow">
      <Accordion
        type="single"
        value={activeAccordion}
        onValueChange={(value: PaymentStep) => setActiveAccordion(value)}
        collapsible
      >
        <AccordionItem value={PaymentStep.BILLING_INFO}>
          <AccordionTrigger className=" text-custom-rose-900 border px-2 w-full mb-4">
            {t("your-billing-address")}
          </AccordionTrigger>

          <AccordionContent className=" text-gray-500 px-4">
            <CheckoutForm setActiveAccordion={setActiveAccordion} form={form} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value={PaymentStep.PAYMENT_INFO}>
          <AccordionTrigger className=" text-custom-rose-900 border px-2 w-full mb-4">
            {t("payment-information")}
          </AccordionTrigger>

          <AccordionContent className=" text-gray-500 px-4">
            <PaymentInfo setActiveAccordion={setActiveAccordion} form={form} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
