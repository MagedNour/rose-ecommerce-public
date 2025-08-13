import { getTranslations } from "next-intl/server";
import ProductCarousel from "@/components/features/product/product-carousel";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import RelatedProductsSkeleton from "@/components/skeletons/related-products/related-products";
import AddToCartWrapper from "@/components/common/add-to-cart-wrapper";
import RelatedProductsList from "@/components/common/related-products-list";

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  // Translation
  const t = await getTranslations();

  // Fetch product details from API using ID
  const response = await fetch(`${process.env.API}/products/${params.id}`, {
    method: "GET",
  });

  const payload: APIResponse<{ product: Product }> = await response.json();
  if (!("message" in payload && payload.message === "success")) {
    return notFound();
  }

  // Destructuring
  const {
    imgCover,
    images,
    title,
    description,
    price,
    priceAfterDiscount,
    discount,
    quantity,
    category,
  } = payload.product;

  // Variables
  const isInStock = quantity > 0;

  return (
    <main className="mt-20 px-4 sm:px-8 md:px-[80px]">
      <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
        {/* Left: Images */}
        <div className="flex flex-col w-full md:w-1/2">
          <ProductCarousel images={images} imgCover={imgCover} />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col w-full md:w-1/2">
          {/* Product Title */}
          <h1 className="font-semibold text-xl sm:text-2xl mb-6">{title}</h1>

          {/* Product Price */}
          <div className="font-roboto mb-6">
            {discount > 0 ? (
              <>
                <span className="line-through text-custom-muted text-base sm:text-lg font-medium mr-1 leading-6">
                  ${price}
                </span>
                <span className="text-custom-rose-900 text-xl sm:text-2xl font-medium mr-3">
                  ${priceAfterDiscount}
                </span>
                <span className="text-custom-red text-sm sm:text-base font-medium">
                  {discount}% {t("off")}
                </span>
              </>
            ) : (
              <span className="text-custom-rose-900 text-xl sm:text-2xl font-medium">${price}</span>
            )}
          </div>

          {/* Product Description */}
          <div className="my-6">
            <p className="font-roboto leading-7 text-base font-normal max-w-full sm:max-w-lg break-words text-custom-blue-500">
              {description}
            </p>
          </div>

          {/* Product Details */}
          <div className="mb-6">
            <ul className="list-disc text-custom-muted font-roboto leading-7 pl-5 -ml-4">
              <li className="font-medium text-base mb-2">
                {t("stock")}
                <span
                  className={`font-normal text-base ml-2 ${isInStock ? "text-custom-blue-500" : "text-red-600"}`}
                >
                  {isInStock ? t("in-stock") : t("out-of-stock-0")}
                </span>
              </li>
            </ul>
          </div>

          {/* Add to Cart */}
          {quantity > 0 && (
            <div className="mt-3">
              <AddToCartWrapper productId={params.id} stock={quantity} initialCartQuantity={0} />
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProductsList productId={params.id} categoryId={category} showHeader columns={4} />
        </Suspense>
      </div>
    </main>
  );
}
