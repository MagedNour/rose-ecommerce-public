"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { HiCheckCircle } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";

export default function About() {
  //  Translations
  const t = useTranslations();

  return (
    <section className="container flex flex-col lg:flex-row items-center gap-8 md:gap-20 mb-20">
      {/* Images Section */}
      <div className="flex flex-col sm:flex-row gap-4 relative mt-4 items-center w-full lg:w-1/2">
        {/* Main Image Container */}
        <div className="relative w-full max-w-[260px] md:max-w-[302px] h-[300px] md:h-[344px]">
          <Image
            src={"/assets/images/about-us/1.png"}
            alt="gift photo"
            className="rounded-tl-[50px] rounded-tr-[120px] rounded-br-[120px] rounded-bl-[120px] 
                   rtl:rounded-tr-[50px] rtl:rounded-tl-[120px] rtl:rounded-bl-[120px] rtl:rounded-br-[120px] 
                   object-cover"
            fill
          />
          {/* Border */}
          <div
            className="absolute -top-3 -left-3 rtl:-right-3 rtl:left-auto w-[calc(100%+24px)] h-[calc(100%+24px)] border-4 
                      rounded-tr-[45%] rounded-tl-[20%] rounded-br-[120px] rounded-bl-[120px] 
                      rtl:rounded-tr-[20%] rtl:rounded-tl-[45%] rtl:rounded-br-[120px] rtl:rounded-bl-[120px]
                      border-custom-rose-900 rotate-1 -z-10 rtl:rotate-[-1deg]"
          />
        </div>

        {/* Secondary Images */}
        <div className="flex flex-col gap-2 w-full max-w-[193px]">
          <div className="relative w-full aspect-square">
            <Image
              src={"/assets/images/about-us/2.png"}
              alt="Small Image 1"
              className="rounded-full object-cover"
              fill
            />
          </div>
          <div className="relative w-full aspect-[193/144]">
            <Image
              src="/assets/images/about-us/3.png"
              alt="Small Image 2"
              className="rounded-tl-[50px] rounded-tr-[100px] rounded-bl-[50px] rounded-br-[100px] object-cover"
              fill
            />
          </div>
        </div>
      </div>

      {/* Text Content Section */}
      <div className="w-full lg:w-1/2 about-us-info">
        <h2 className="text-custom-rose-900 font-bold uppercase mb-4 text-center lg:text-left">
          {t("about-us")}
        </h2>

        <h3 className="font-bold text-2xl md:text-3xl leading-tight my-2 text-center lg:text-left">
          {t.rich("we-provide-best-and-quali-1", {
            span: (value) => <span className="text-custom-rose-900"> {value}</span>,
          })}
        </h3>

        <p className="text-custom-blue-500 mb-6 text-center lg:text-left">
          {t("recusandae-tempora-aut-la-0")}
        </p>

        <div className="flex justify-center lg:justify-start">
          <Button className="px-6 py-3 text-sm font-medium bg-custom-rose-900 text-white rounded-lg">
            {t("explore-more-0")}
            <FaArrowRight className="ms-2 rtl:me-2" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {[
            t("streamlined-shipping-expe"),
            t("competitive-price-and-eas"),
            t("affordable-modern-design"),
            t("we-made-awesome-products"),
          ].map((feature, index) => (
            <div key={index} className="flex items-center">
              <HiCheckCircle className="bg-custom-violet-900 w-10 h-10 text-white p-2 rounded-full mr-3 rtl:mr-0 rtl:ml-3" />
              <span className="text-sm md:text-base">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
