import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";
import frame110 from "public/assets/images/about/Frame110.jpg";
import frame111 from "public/assets/images/about/Frame111.jpg";
import frame112 from "public/assets/images/about/Frame112.jpg";
import frame113 from "public/assets/images/about/Frame113.jpg";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function OurTeam() {
  // Translation
  const t = useTranslations();

  // Variables
  const ourTeamInformation = [
    {
      id: 1,
      name: "mohammed hamza",
      role: t("team-role-1"),
      image: frame110,
    },
    {
      id: 2,
      name: "anas ahmed",
      role: t("team-role-2"),
      image: frame111,
    },
    {
      id: 3,
      name: "salah khaleel",
      role: t("team-role-3"),
      image: frame112,
    },
    {
      id: 4,
      name: "yazan hegazy",
      role: t("team-role-4"),
      image: frame113,
    },
  ];

  return (
    <section className="mx-20 mt-20">
      {/* Our Team Title */}
      <span className="uppercase text-custom-rose-900 mb-2 font-roboto font-bold text-base leading-7 tracking-[4px] text-center block">
        {t("our-team")}
      </span>

      <div className="flex justify-center mb-10">
        {/* Heading */}
        <h1
          className="relative text-3xl font-bold capitalize
   before:absolute before:bottom-0 before:left-0
    before:w-[133px] before:h-[30px] before:bg-custom-rose-25 before:z-[-1] before:rounded-e-lg 
    after:content-[''] after:absolute after:top-full after:left-0
    after:w-[161px] after:h-[2px] after:bg-custom-rose-900"
        >
          {t.rich("meet-our-expert-team", {
            span: (v) => <span className="text-custom-rose-900">{v}</span>,
          })}
        </h1>
      </div>

      {/* Team Card */}
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-5 justify-center items-center">
        {ourTeamInformation.map((person) => (
          <Card
            key={person.id}
            className="p-6 rounded-[20px] shadow-[0px_1px_5px_0px_#00000033] w-full max-w-[302px] h-auto"
          >
            <CardContent className="!p-0">
              {/* Image Container */}
              <div className="w-full rounded-t-[20px] h-auto aspect-[254/272] relative mb-4 overflow-hidden">
                <Image
                  src={person.image}
                  alt={person.name}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Card Header & Title */}
              <CardHeader className="p-0 space-y-0 flex flex-col items-center justify-center">
                <CardTitle className="font-bold text-base capitalize">{person.name}</CardTitle>

                {/* Card Description */}
                <CardDescription className="font-bold text-base capitalize text-custom-rose-900 mt-0">
                  {person.role}
                </CardDescription>
              </CardHeader>

              {/* Card Footer */}
              <CardFooter className="flex flex-col items-center justify-center p-0  before:block before:w-full before:h-[1px] before:bg-custom-muted before:mt-4">
                <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-9 mt-4 w-full">
                  {/* Facebook Icon */}
                  <Link href="#" className="social-links">
                    <Facebook className="text-white" width={20} height={20} />
                  </Link>

                  {/* Twitter Icon */}
                  <Link href="#" className="social-links">
                    <Twitter className="text-white" width={20} height={20} />
                  </Link>

                  {/* Instagram Icon */}
                  <Link href="#" className="social-links">
                    <Instagram className="text-white" width={20} height={20} />
                  </Link>

                  {/* YouTube Icon */}
                  <Link href="#" className="social-links">
                    <Youtube className="text-white" width={20} height={20} />
                  </Link>
                </div>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
