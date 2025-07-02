import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import CarouselComponent from "../best-seller-carousel";
import { getPopularProducts } from "@/lib/api/get-products.api";
import { getTranslations } from "next-intl/server";

export default async function BestSellerPage() {
  // Translation
  const t = await getTranslations();
  // Top 10 products
  const response = await getPopularProducts("/products?sort=-sold&limit=10");
  const bestProducts = response?.products || [];

  return (
    <section>
      <div className="main container mx-auto items-center pt-10 md:pt-20 flex flex-col md:flex-row gap-4 md:gap-x-6 px-4 md:px-0">
        {/* Text section */}
        <div className="best-info w-full md:w-1/4">
          {/* Heading of the best seller section */}
          <h2 className="text-custom-rose-900 text-sm md:text-[17px] tracking-[2px] md:tracking-[4px] uppercase font-bold pb-4 md:pb-7">
            {t("premium-gifts")}
          </h2>
          <h3 className="font-bold text-xl md:text-3xl text-custom-blue-900 leading-7 md:leading-10">
            {t.rich("best-selling-header", {
              span: (v) => <span className="text-custom-rose-900">{v}</span>,
            })}
          </h3>

          {/* Description */}
          <p className="font-normal text-base font-roboto leading-7 text-custom-muted pt-4 pb-7 ">
            {t("recusandae-tempora-aut-la")}
          </p>

          {/* Explore more button */}
          <div>
            <Button className=" bg-custom-rose-900 text-sm  hover:bg-custom-rose-800 rounded-[10px] px-2 py-2w-[109px] h-[45px] md:text-base md:px-4 md:py-2 flex items-center justify-center gap-1">
              {t("explore-more-0")}
              <FaArrowRight className="rtl:scale-x-[-1] ml-2" />
            </Button>
          </div>
        </div>

        {/* Carousel component */}
        <div className="carousel w-full md:w-3/4">
          <CarouselComponent bestProducts={bestProducts} />
        </div>
      </div>
    </section>
  );
}
