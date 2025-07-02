import { useTranslations } from "next-intl";
import Image from "next/image";
interface ImagesInterface {
  id: string;
  photo: string;
}
export default function Companies() {
  //   Translations
  const t = useTranslations();

  //   Variables
  //   Trusted companies images
  const images: ImagesInterface[] = [
    { id: "1", photo: "/assets/images/companies/1.png" },
    { id: "2", photo: "/assets/images/companies/2.png" },
    { id: "3", photo: "/assets/images/companies/3.png" },
    { id: "4", photo: "/assets/images/companies/4.png" },
    { id: "5", photo: "/assets/images/companies/5.png" },
    { id: "6", photo: "/assets/images/companies/6.png" },
  ];

  return (
    <section className="p-6 container  bg-custom-rose-25 my-20">
      {/* Header */}
      <div className="flex justify-center py-10 ">
        <h2 className="before:absolute before:w-40 before:h-[2px] before:bg-custom-rose-900 before:bottom-0 relative font-inter font-bold text-[30px] leading-9 tracking-[0] text-custom-blue-900 ">
          {t.rich("trusted-by-over-less-than", {
            span: (v) => <span className="text-custom-rose-900">{v}</span>,
          })}
        </h2>
      </div>

      {/* Trusted companies images */}
      <div className=" flex justify-between pb-10">
        {images.map((image) => (
          <div key={image.id}>
            <Image
              src={image.photo}
              alt="company logo"
              width={151}
              height={0}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
