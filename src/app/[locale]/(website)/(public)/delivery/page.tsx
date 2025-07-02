import { useTranslations } from "next-intl";

export default function Delivery() {
  // Translation
  const t = useTranslations();

  return (
    <main className="container mx-auto min-h-[70vh] py-8">
      {/* Fast & Reliable Delivery with Rose	 */}
      <h3 className="text-xl text-blue-800 font-bold mb-4">
        {t("fast-and-reliable-delivery-with-rose")}
      </h3>
      <p className="text-lg text-gray-500 my-4">
        {t(
          "at-rose-we-understand-the-importance-of-timing-that-and-apos-s-why-we-offer-fast-and-secure-delivery-across-greater-cairo-to-ensure-your-gifts-arrive-fresh-and-on-time",
        )}
      </p>
      {/* Delivery Schedule	 */}
      <h3 className="text-xl text-blue-800 font-bold mb-4">{t("delivery-schedule")}</h3>
      <p className="text-lg text-gray-500  my-4">
        {t(
          "we-deliver-daily-from-9-am-to-10-pm-orders-confirmed-before-5-pm-are-eligible-for-same-day-delivery",
        )}
      </p>
      {/* 	Delivery Options	 */}
      <h3 className="text-xl text-blue-800 font-bold mb-4">{t("delivery-options")}</h3>
      <ul className="text-lg text-gray-500 list-inside list-disc my-4">
        <li>{t("standard-delivery-within-24-hours-of-order-confirmation")}</li>
        <li>{t("express-delivery-within-3-hours-cairo-areas-only")}</li>
        <li>{t("pick-up-option-you-can-collect-your-order-from-the-nearest-branch")}</li>
      </ul>
      {/* Payment Methods	 */}
      <h3 className="text-xl text-blue-800 font-bold mb-4">{t("payment-methods")}</h3>
      <p className="text-lg text-gray-500  my-4">
        {t("we-accept-online-payments-mobile-wallets-and-cash-on-delivery")}
      </p>
    </main>
  );
}
