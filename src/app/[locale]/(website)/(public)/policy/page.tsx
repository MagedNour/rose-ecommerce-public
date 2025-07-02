import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export default function Policy() {
  // Translation
  const t = useTranslations();

  return (
    <main className="container mx-auto min-h-[70vh] py-8">
      <Accordion type="single" collapsible>
        {/* Privacy Policy */}
        <AccordionItem value="item-1">
          <AccordionTrigger className=" text-custom-rose-900">
            {t("privacy-policy")}
          </AccordionTrigger>
          <AccordionContent className=" text-gray-500">
            {t("privacy-policy-content")}
          </AccordionContent>
        </AccordionItem>
        {/* Payment Policy */}
        <AccordionItem value="item-2">
          <AccordionTrigger className=" text-custom-rose-900">
            {t("payment-policy")}
          </AccordionTrigger>
          <AccordionContent className=" text-gray-500">
            {t("payment-policy-content")}
          </AccordionContent>
        </AccordionItem>
        {/* Shipping & Delivery Policy */}
        <AccordionItem value="item-3">
          <AccordionTrigger className=" text-custom-rose-900">
            {t("shipping-and-delivery-policy")}
          </AccordionTrigger>
          <AccordionContent className=" text-gray-500" asChild>
            <ul className="list-inside list-disc">
              <li>{t("shipping-and-delivery-policy-content-1")}</li>
              <li>{t("shipping-and-delivery-policy-content-2")}</li>
              <li>{t("shipping-and-delivery-policy-content-3")}</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        {/* Order Cancellation Policy */}
        <AccordionItem value="item-4">
          <AccordionTrigger className=" text-custom-rose-900">
            {t("order-cancellation-policy")}
          </AccordionTrigger>
          <AccordionContent className=" text-gray-500">
            {t("order-cancellation-policy-content")}
          </AccordionContent>
        </AccordionItem>
        {/* Return & Exchange Policy */}
        <AccordionItem value="item-5">
          <AccordionTrigger className=" text-custom-rose-900">
            {t("return-and-exchange-policy")}
          </AccordionTrigger>
          <AccordionContent className=" text-gray-500">
            {t("return-and-exchange-policy-content-1")}
            <ul className="list-inside list-disc my-2">
              <li>{t("return-and-exchange-policy-content-2")}</li>
              <li>{t("return-and-exchange-policy-content-3")}</li>
            </ul>
            {t("return-and-exchange-policy-content-4")}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
