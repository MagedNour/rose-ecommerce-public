import { getCategories } from "@/lib/apis/category.api";
import SpecialOffer from "./_components/special-offer/special-offer";
import Information from "./_components/information/information";
import Categories from "./_components/categories/categories";
import { RouteProps } from "@/lib/types/route-props";
import AboutUsHeaderPage from "./_components/about-us/about-us";
import BestSellerPage from "./_components/best-seller/page";
import PopularProducts from "./_components/popular-products";
import Testimonails from "./_components/testimonials/testimonials";
import Gallery from "./_components/gallery/gallery";
import Companies from "./_components/trusted-companies/companies";

export default async function Page({ searchParams }: RouteProps) {
  // Variables
  const payload = await getCategories();

  // Error handling
  if ("error" in payload) {
    throw new Error(payload?.error);
  }

  const categories = payload?.categories.slice(0, 4);

  return (
    <main className="container">
      {/* Category section */}
      <Categories payload={payload} />

      {/* Special offer section */}
      <SpecialOffer />

      {/* Information section */}
      <Information />

      {/* Best seller section */}
      <BestSellerPage />

      {/* Popular products section */}
      <PopularProducts categories={categories} searchParams={searchParams} />

      {/* About us section */}
      <AboutUsHeaderPage />

      {/* Gallery section */}
      <Gallery />

      {/* Testimonails section */}
      <Testimonails />

      {/*Trusted companies  */}
      <Companies />
    </main>
  );
}
