import { getOccasions } from "@/lib/apis/get-occasions.api";
import AllProducts from "./_components/product-item";
import ProductSidebar from "./_components/product-sidebar";
import { getCategories } from "@/lib/apis/category.api";
import { getProducts } from "@/lib/api/get-products.api";

type ProductsProps = {
  searchParams: Record<string, string>;
};

export default async function Products({ searchParams }: ProductsProps) {
  // Variables
  const [productsData, categoriesData, occasions] = await Promise.all([
    getProducts(searchParams),
    getCategories(),
    getOccasions(),
  ]);

  const { products, metadata } = productsData;
  const payload = categoriesData;
  const occasionsPayload = occasions;

  // Error handling
  if ("error" in payload) {
    throw new Error(payload?.error);
  }
  if ("error" in occasionsPayload) {
    throw new Error(occasionsPayload?.error);
  }
  const categories = payload?.categories.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar section*/}
        <div className="md:w-1/4 w-full flex-shrink-0">
          <ProductSidebar categories={categories} occasions={occasionsPayload.occasions} />
        </div>

        {/* Main product section*/}
        <div className="w-3/4 flex-1 mx-auto">
          <AllProducts products={products} metadata={metadata} />
        </div>
      </div>
    </div>
  );
}
