import ProductCard from "@/components/features/product/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CarouselComponentProps = {
  bestProducts: Product[];
};

export default function CarouselComponent({ bestProducts }: CarouselComponentProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      {/* Content */}
      <CarouselContent key={Math.random()} className="realative ">
        {bestProducts?.map((product: Product) => (
          <CarouselItem
            key={product._id}
            className=" rounded-tl-[50px] rounded-tr-[100px] rounded-bl-[100px] rounded-br-[100px] bg-white rounded-3xl md:basis-1/2 lg:basis-1/3"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Prev item button */}
      <CarouselPrevious className="bg-transparent border-0 text-custom-rose-900" />

      {/* Next item button */}
      <CarouselNext className="border-0 text-custom-rose-900 bg-transparent" />
    </Carousel>
  );
}
