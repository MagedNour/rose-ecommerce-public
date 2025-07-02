import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPagination,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function SpecialOffer() {
  const t = useTranslations();

  return (
    <section className="mb-[25px] space-y-8 md:space-y-12 mt-3">
      <div className="container mx-auto w-full grid md:grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Special Offer Card - Responsive Adjustments */}
        <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[440px] w-full">
          <Image
            src="/assets/images/Red-christmas.png"
            alt="Special Gifts"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 100vw"
            className="object-cover"
          />
          <div className="absolute top-[120px] md:top-[258px] left-[16px] rtl:left-auto rtl:right-[16px]">
            <h5 className="text-custom-rose-900 lg:font-bold font-semibold text-sm md:text-[16.77px] mb-2 md:mb-[11.8px] tracking-[3px] md:tracking-[4.66px]">
              {t("start-10-99-0")}
            </h5>
            <p className="font-[600] text-xl md:text-[26.9px] text-custom-blue-900 mb-2 md:mb-[11.8px] leading-[1.2] md:leading-[31.31px]">
              {t("special-gifts-box-for-your-love")}
            </p>
            <Button className="bg-custom-rose-900 text-white px-4 py-2 md:px-6 md:py-4 hover:bg-custom-rose-800 text-xs md:text-base">
              {t("shop-now")}
            </Button>
          </div>
        </div>

        {/* Carousel Section - Responsive Adjustments */}
        <div className="lg:col-span-3 col-span-1 rounded-2xl overflow-hidden relative">
          <Carousel>
            <CarouselContent>
              {/* Carousel Items (Keep existing content) */}
              <CarouselItem>
                <div className="w-full h-[300px] md:h-[440px] relative overflow-hidden">
                  <Image
                    src="/assets/images/background-2.jpg"
                    alt="Background"
                    fill
                    sizes="90vw"
                    className="object-cover"
                  />
                  <div className="absolute top-8 md:top-[60px] left-4 md:left-[56px] rtl:left-auto rtl:right-4 md:rtl:right-[56px] w-[90%] md:w-[381px]">
                    <h5 className="text-custom-rose-900 font-bold text-sm md:text-xl mb-3 md:mb-6 tracking-wide md:tracking-wider">
                      {t("best-gift-shop")}
                    </h5>
                    <h3 className="font-bold text-2xl md:text-4xl mb-2 md:mb-4 leading-[1.2] md:leading-tight">
                      {t("choose-perfect")} <br />
                      <span className="text-custom-rose-900">{t("gifts")}</span> {t("from-us")}
                    </h3>
                    <p className="text-custom-blue-900 text-xs md:text-base mb-3 md:mb-6 leading-5 md:leading-relaxed">
                      {t("carousel-description")}
                    </p>
                    <Button className="bg-custom-rose-900 text-white px-4 py-2 md:px-8 md:py-4 hover:bg-custom-rose-800 text-sm md:text-lg">
                      {t("shop-now")}
                    </Button>
                  </div>
                </div>
              </CarouselItem>

              {/* Other Carousel Items (Keep existing structure) */}
            </CarouselContent>

            {/* Carousel Controls - Responsive Adjustments */}
            <div className="absolute bottom-4 right-4 flex items-center gap-4 z-10 rtl:flex-row-reverse">
              <div className="flex gap-2">
                <CarouselPrevious className="bg-white w-6 h-6 md:w-8 md:h-8 rounded-full shadow-lg hover:bg-gray-100 border" />
                <CarouselNext className="bg-white w-6 h-6 md:w-8 md:h-8 rounded-full shadow-lg hover:bg-gray-100 border" />
              </div>
            </div>

            {/* Mobile Pagination */}
            <CarouselPagination className="md:hidden mt-2 justify-center" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
