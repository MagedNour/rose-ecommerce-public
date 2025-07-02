import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Arrow from "@/components/common/arrow";

export default function Footer() {
  const t = useTranslations();

  return (
    <div className="relative py-12 md:py-20">
      {/* Background Image */}
      <Image
        fill
        src="/assets/images/Footerbg.png"
        alt="Footer background"
        className="opacity-30 object-cover"
        priority
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12 xl:gap-20 mb-10">
          {["about-us", "store-location", "contact", "delivery"].map((link) => (
            <Link
              key={link}
              href="/"
              className="text-sm md:text-base font-medium text-custom-blue-900 hover:text-custom-rose-900 transition-colors"
            >
              {t(link)}
            </Link>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-2xl md:text-3xl font-bold text-custom-blue-900 mb-3">
            {t.rich("footer-discount", {
              span: (value) => <span className="text-custom-rose-900">{value}</span>,
            })}
          </h2>

          {/* Description */}
          <p className="text-custom-blue-500 mb-6 md:mb-8">{t("by-subscribe-our-newsletter")}</p>

          {/* Email Input Group */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t("enter-your-email")}
              className="w-full md:w-72 h-12 px-6 rounded-full border-0 shadow-sm focus:ring-2 focus:ring-custom-rose-900"
            />

            <button className="w-full md:w-auto px-8 h-12 bg-custom-rose-900 hover:bg-custom-rose-800 text-white rounded-full font-medium flex items-center justify-center gap-2 transition-colors">
              {t("subscribe")}
              <span className="w-4 h-4">
                <Arrow />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
