import PopularProductsNav from "./components/popular-product-nav";
import { SearchParams } from "@/lib/types/route-props";
import PopularProductsContent from "./components/popular-products-content";
import { Suspense } from "react";

type PopularProductsProps = {
  searchParams: SearchParams;
  categories: Category[] | null;
};

export default async function PopularProducts({ searchParams, categories }: PopularProductsProps) {
  return (
    <section className="container">
      {/* Navigation */}
      {categories && (
        <>
          {/* Side bar */}
          <PopularProductsNav categories={categories} />
        </>
      )}

      {/* Content */}
      <Suspense fallback={<p>Loading....</p>}>
        <PopularProductsContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
