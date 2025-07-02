import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export default function FAQ() {
  // Translation
  const t = useTranslations();

  return (
    <main className="container mx-auto min-h-[70vh] py-8">
      <Accordion type="single" collapsible>
        {/* How can I place an order on Rose? */}
        <AccordionItem value="item-1">
          <AccordionTrigger className=" text-custom-rose-900">
            {t("how-can-i-place-an-order-on-rose")}
          </AccordionTrigger>
          <AccordionContent className=" text-gray-500">
            {t(
              "simply-browse-our-collection-add-your-favorite-items-to-the-cart-then-proceed-to-checkout-and-follow-the-payment-and-shipping-steps",
            )}
          </AccordionContent>
        </AccordionItem>

        {/* What payment methods do you accept?	 */}
        <AccordionItem value="item-2">
          <AccordionTrigger className=" text-custom-rose-900">
            {t("what-payment-methods-do-you-accept")}
          </AccordionTrigger>
          <AccordionContent className=" text-gray-500">
            {t("we-accept-all-major-and-secure-payment-options-including")}
            <ul className="list-inside list-disc">
              <li>{t("credit-debit-cards-visa-mastercard")}</li>
              <li>{t("apple-pay")}</li>
              <li>{t("bank-transfer")}</li>
              <li>{t("other-secure-online-methods")}</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* How long does delivery take?	 */}
        <AccordionItem value="item-3">
          <AccordionTrigger className=" text-custom-rose-900">
            {t("how-long-does-delivery-take")}
          </AccordionTrigger>
          <AccordionContent className=" text-gray-500" asChild>
            {t(
              "orders-are-prepared-within-24-hours-and-delivered-within-1-business-day-delivery-time-may-vary-slightly-depending-on-your-location-and-courier-conditions",
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Can I cancel or modify my order after placing it? */}
        <AccordionItem value="item-4">
          <AccordionTrigger className=" text-custom-rose-900">
            {t("can-i-cancel-or-modify-my-order-after-placing-it")}
          </AccordionTrigger>
          <AccordionContent className=" text-gray-500">
            {t(
              "yes-orders-can-be-canceled-within-1-hour-of-placement-after-that-cancellation-is-not-possible-as-we-begin-processing-immediately",
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Do you accept returns or exchanges? */}
        <AccordionItem value="item-5">
          <AccordionTrigger className=" text-custom-rose-900">
            {t("do-you-accept-returns-or-exchanges")}
          </AccordionTrigger>
          <AccordionContent className=" text-gray-500">
            {t(
              "due-to-the-nature-of-our-products-flowers-and-gifts-we-only-accept-returns-or-exchanges-in-the-following-cases",
            )}
            <ul className="list-inside list-disc my-2">
              <li>{t("the-item-arrives-damaged")}</li>
              <li>{t("the-item-is-completely-different-from-what-was-ordered")}</li>
            </ul>
            {t(
              "please-contact-us-within-24-hours-of-receiving-your-order-and-include-a-photo-of-the-issue",
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
