import ProductCard from "@/components/features/product/product-card";
import { getPopularProducts } from "@/lib/api/get-products.api";
import { SearchParams } from "@/lib/types/route-props";
import { getTranslations } from "next-intl/server";

type PopularProductsContentProps = {
  searchParams: SearchParams;
};

export default async function PopularProductsContent({
  searchParams,
}: PopularProductsContentProps) {
  // Translation
  const t = await getTranslations();

  // Variables
  const query = `/products?sort=-sold${searchParams.category ? `&category=${searchParams.category}` : ""}`;
  const products = await getPopularProducts(query);

  return (
    <div className="flex flex-wrap -mx-2">
      {/* No products */}
      {products?.products.length === 0 && (
        <div className="w-full text-center min-h-56 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-custom-blue-900">{t("no-products-founds")}</h2>
        </div>
      )}

      {/* Products list */}
      {products?.products.map((product: Product) => (
        <div key={product?._id} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-6">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
