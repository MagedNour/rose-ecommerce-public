import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import CategoryCard from "./category-card";

export default function Categories({ payload }: { payload: CategoriesResponse }) {
  return (
    <Carousel className="mt-8 container">
      <CarouselContent>
        {payload.categories.map((category) => (
          <CarouselItem
            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            key={category._id}
          >
            <CategoryCard category={category} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
