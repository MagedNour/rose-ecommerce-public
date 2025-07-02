import ProductSkeleton from "../product/product.skeleton";

export default function RelatedProductsSkeleton() {
  return (
    // Related Products Skeleton
    <div className=" grid grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}
