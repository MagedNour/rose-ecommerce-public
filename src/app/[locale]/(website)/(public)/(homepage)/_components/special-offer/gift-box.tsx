"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function GiftBox() {
  // Translation
  const t = useTranslations();

  return (
    <section className="mb-20 container">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
        {/* Gifts box */}
        <div className="relative rounded-2xl overflow-hidden h-[272px]">
          {/* Building image */}
          <Image
            src="/assets/images/Confetti.png"
            alt="Gift2 Picture"
            fill
            sizes="30vw"
            className="object-cover"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4 md:top-[72.5px] md:left-[207px] md:translate-x-0 md:translate-y-0 md:text-end md:px-0 rtl:md:text-start rtl:md:pr-4  ltr:md:pr-4">
            {/* Gifts box */}
            <h5 className="text-custom-rose-900 font-[400] text-[16px] mb-[14px]">
              {"t('gifts-box-0')"}
            </h5>

            {/* Description gifts box */}
            <p
              className="font-[600] text-[20px]  text-custom-blue-900 mb-[14px] leading-[24.2px]              >
"
            >
              {t("gifts-box-items")}
            </p>

            {/* Button gifts box */}
            <Link href={`/products`}>
              <button className="bg-custom-rose-900 text-white p-[8px] rounded-[20px] text-[14px] font-[400]">
                {t("shop-now")}
              </button>
            </Link>
          </div>
        </div>

        {/* Occasion gifts */}
        <div className="relative rounded-2xl overflow-hidden h-[272px]">
          {/* Building image */}
          <Image
            src="/assets/images/Top-view-hand.png"
            alt="Gift2 Picture"
            fill
            sizes="30vw"
            className="object-cover"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4 md:top-[72.5px] md:left-[207px] md:translate-x-0 md:translate-y-0 md:text-end md:px-0 rtl:md:text-start rtl:md:pr-4 ltr:md:pr-4">
            {/* Occasion gifts */}
            <h5 className="text-custom-rose-900 font-[400] text-[16px] mb-[14px]">
              {t("occasion-gifts")}
            </h5>

            {/* Description occasion gifts */}
            <p className="font-[600] text-[20px] leading-[24.2px]   text-custom-blue-900 mb-[47px]">
              {t("best-occasion")}
            </p>

            {/* Button occasion gifts */}
            <button className="bg-custom-rose-900 text-white p-[8px] rounded-[20px] text-[14px] font-[400]">
              {t("discover-now")}
            </button>
          </div>
        </div>

        {/* Combo gifts */}
        <div className="relative rounded-2xl overflow-hidden h-[272px]">
          {/* Building image */}
          <Image
            src="/assets/images/Christmas-cart.png"
            alt="Gift2 Picture"
            fill
            sizes="30vw"
            className="object-cover"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4 md:top-[72.5px] md:left-[207px] md:translate-x-0 md:translate-y-0 md:text-end md:px-0 rtl:md:text-start rtl:md:pr-4 ltr:md:pr-4">
            {/* Combo gifts */}
            <h5 className="text-white font-[400] text-[16px] mb-[14px]">{t("occasion-gifts")}</h5>

            {/* Description combo gifts */}
            <p className="font-[600] text-[20px] text-custom-blue-900 leading-[24.2px]  mb-[47px]">
              {t("combo-gifts")}
            </p>

            {/* Button combo gifts */}
            <Link href={`/products`}>
              <button className="bg-custom-rose-900 text-white p-[8px] rounded-[20px] text-[14px] font-[400]">
                {t("discover-now")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
