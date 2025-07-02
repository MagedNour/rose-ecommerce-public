import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CategoryCard({ category }: { category: Category }) {
  // Translation
  const t = useTranslations();

  return (
    <Link
      href={`/categories/${category._id}`}
      className="bg-custom-rose-25 flex rounded-2xl p-3 sm:p-4 gap-2 sm:gap-4 h-full items-center cursor-grab">
    
      {/* Image */}
      <div className="bg-custom-rose-900 p-3 sm:p-4 rounded-full flex items-center justify-center shrink-0">
        <Image
          width={40}
          height={40}
          src={category.image}
          className="brightness-[9] w-7 h-7 sm:w-10 sm:h-10"
          alt={category.name}
        />
      </div>

      {/* Card info */}
      <div>
        {/* Name */}
        <p className="text-custom-blue-900 capitalize font-bold text-sm sm:text-base">{category.name}</p>

        {/* Count */}
        <p className="text-custom-blue-500  text-xs sm:text-sm">
          {category.productsCount} {t("items")}
        </p>
      </div>
    </Link>
  );
}
