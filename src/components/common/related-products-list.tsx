import ProductCard from "@/components/features/product/product-card";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function RelatedProductsList({
  productId,
  categoryId,
  columns,
  showHeader,
}: RelatedProductsProps) {
  // Translations
  const t = await getTranslations();

  // Fetch related products
  const response = await fetch(`${process.env.API}/products?category=${categoryId}&limit=4`, {
    method: "GET",
  });

  const payload: APIResponse<ProductResponse> = await response.json();
  if (!("message" in payload && payload.message === "success")) {
    return notFound();
  }

  const relatedProducts = payload.products.filter((product) => product._id !== productId); // Filter out the current product

  if (relatedProducts.length === 0) return null; // If no related products, return null

  return (
    <>
      {/* Header If ShowHeader Props Is True */}
      {showHeader && (
        <section className="flex justify-between items-center mb-8">
          <h2 className="capitalize after:absolute after:w-[33px] after:h-[3px] after:bg-custom-violet-900 rtl:after:right-0 after:left-0 after:top-full before:content-[''] before:absolute before:bottom-0 rtl:before:right-0 before:left-0 before:w-[133px] before:h-[30px] before:bg-custom-rose-25 before:z-[-1] before:rounded-e-lg font-bold text-3xl relative">
            {t("related-items")}
          </h2>

          {/* View More Link */}
          <Link
            href={`/products?category=${categoryId}`}
            className="font-medium flex items-center gap-1 font-roboto text-base text-custom-blue-500 hover:text-custom-blue-300"
          >
            {t("view-more")}
            <ArrowRight width={14} height={16} />
          </Link>
        </section>
      )}

      {/* Display Related Products */}
      <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns}`}>
        {relatedProducts?.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
