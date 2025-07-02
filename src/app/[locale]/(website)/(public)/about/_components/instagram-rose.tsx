import { Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import instagram1 from "public/assets/images/about/instagram1.png";
import instagram2 from "public/assets/images/about/instagram2.png";
import instagram3 from "public/assets/images/about/instagram3.png";
import instagram4 from "public/assets/images/about/instagram4.png";
import instagram5 from "public/assets/images/about/instagram5.png";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function InstagramRose() {
  // Translations
  const t = useTranslations();

  // Variables
  const images = [
    {
      id: "1",
      image: instagram1,
    },
    {
      id: "2",
      image: instagram2,
    },
    {
      id: "3",
      image: instagram3,
    },
    {
      id: "4",
      image: instagram4,
    },
    {
      id: "5",
      image: instagram5,
    },
  ];

  return (
    <section className="mx-20 mt-20">
      <div className="flex justify-center mb-6 md:mb-10">
        {/* Heading */}
        <h1
          className="relative text-2xl md:text-3xl font-bold capitalize
     before:absolute before:bottom-0 before:left-0
    before:w-[110px] md:before:w-[161px] before:h-[25px] md:before:h-[30px] before:bg-custom-rose-25 before:z-[-1] before:rounded-e-lg 
    after:content-[''] after:absolute after:top-full after:left-0
    after:w-[110px] md:after:w-[161px] after:h-[2px] after:bg-custom-rose-900"
        >
          {t("instagram")}
          <span className="text-custom-rose-900 font-normal align-middle font-alex-brush text-[30px] md:text-[40px] ml-1 !mt-20">
            @Rose
          </span>
        </h1>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 justify-items-center">
        {images.map((image) => (
          <div
            key={image.id}
            className="aspect-square rounded-[20px] relative group overflow-hidden w-full max-w-[300px]"
          >
            <Image
              src={image.image}
              alt="Instagram image"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />

            {/* Instagram Icon */}
            <div className="absolute inset-0 bg-transparent group-hover:bg-[#0000004D] flex items-center justify-center transition-opacity duration-300">
              <Link
                href="#"
                className="bg-pink-500 rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <Instagram
                  className="text-white"
                  width={20}
                  height={20}
                  sm-width={24}
                  sm-height={24}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
