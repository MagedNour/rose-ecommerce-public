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
    <main className="mt-20 mx-[80px]">
      <div className="flex flex-row gap-10 items-center">
        <div className="flex flex-col">
          {/* Product Image & Carousel */}
          <ProductCarousel images={images} imgCover={imgCover} />
        </div>

        <div className="flex-1">
          {/* Product Title */}
          <h1 className="font-semibold text-2xl mb-[26px]">{title}</h1>

          {/* Product Price */}
          <div className="font-roboto mb-[26px]">
            {/* If Product Has Discount, Display The Price & PriceAfterDiscount  */}
            {discount > 0 ? (
              <>
                <span className="line-through text-custom-muted text-[18px] font-medium mr-1 leading-6">
                  ${price}
                </span>
                <span className="text-custom-rose-900 text-2xl font-medium mr-3">
                  ${priceAfterDiscount}
                </span>
                <span className="text-custom-red text-[15px] font-medium">
                  {discount}% {t("off")}
                </span>
              </>
            ) : (
              <span className="text-custom-rose-900 text-2xl font-medium">${price}</span>
            )}
          </div>

          {/* Product Description */}
          <div className="my-[26px]">
            <p className="font-roboto leading-7 text-base font-normal w-[518px] break-words text-custom-blue-500">
              {description}
            </p>
          </div>

          {/* Product Details */}
          <div className="mb-[26px]">
            <ul className="list-disc text-custom-muted font-roboto leading-7 pl-5 -ml-4">
              <li className="font-medium text-base mb-[10px]">
                {t("stock")}
                <span
                  className={`font-normal text-base mb-[9px] ml-2 ${isInStock ? "text-custom-blue-500" : "text-red-600"}`}
                >
                  {/* If Product In Stock Display InStock, Other Wise Display Out Of Stock */}
                  {isInStock ? t("in-stock") : t("out-of-stock-0")}
                </span>
              </li>
            </ul>
          </div>

          {/* If Quantity greater Than 0, Display The Component, Other Wise Don't Display It */}
          {quantity > 0 && (
            <div className="mt-[13px]">
              {/* Add To Cart And Counter Component */}
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
