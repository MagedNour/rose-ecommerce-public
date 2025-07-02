import { useTranslations } from "next-intl";
import Image from "next/image";

// Interface for images
interface ImagesInterface {
  id: string;
  photo: string;
}

export default function Gallery() {
  //   Translations
  const t = useTranslations();

  //   Variables
  //   Gallery photos
  const images: ImagesInterface[] = [
    { id: "1", photo: "/assets/images/gallrey/1.png" },
    { id: "2", photo: "/assets/images/gallrey/2.png" },
    { id: "3", photo: "/assets/images/gallrey/3.png" },
    { id: "4", photo: "/assets/images/gallrey/4.png" },
    { id: "5", photo: "/assets/images/gallrey/5.png" },
  ];

  return (
    <section className="container mb-20">
      <div className="text-center mb-8">
        {/* Header */}
        <h2 className="w-full md:w-[438px] h-[31px] tracking-[0.3em] text-custom-rose-900 font-bold uppercase md:text-lg mx-auto">
          {t("our-gallery")}
        </h2>
        <h3
          className="w-10/12 md:w-9/12 max-w-[460px] capitalize font-bold text-lg md:text-3xl text-custom-blue-900 relative mx-auto text-center
          before:absolute before:-z-10 before:bottom-1 before:left-2 rtl:before:left-20 before:w-[74%] before:h-[17px] before:bg-[#feedf7] before:opacity-60 before:rounded-full
          after:absolute after:bottom-1 after:left-2 rtl:after:right-12 after:w-[35%] after:h-[2px] after:bg-custom-rose-900"
        >
          {t("lets-check-our-photo-gall")}
        </h3>
      </div>

      {/* Photos section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`relative px-6 h-[411px] w-full ${index === 3 ? "md:col-span-2" : ""}`}
          >
            <Image
              className="rounded-[40px] shadow hover:shadow-2xl transition-shadow duration-300 object-cover"
              alt="Gallery photo"
              src={image.photo}
              fill
            />
          </div>
        ))}
      </div>
    </section>
  );
}
