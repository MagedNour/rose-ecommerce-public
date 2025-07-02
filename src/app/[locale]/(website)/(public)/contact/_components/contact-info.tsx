import { IoMail } from "react-icons/io5";
import { PiPhoneCallFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { getTranslations } from "next-intl/server";

export default async function ContactInfo() {
  // Translations
  const t = await getTranslations();

  return (
    <div className="h-96 p-6 flex flex-col justify-around rounded-2xl shadow-[0_1px_30px_0_rgba(248,43,169,0.1)]">
      {/* Info number */}
      <div className="flex items-center gap-3">
        {/* Call icon */}
        <div
          className="size-16 aspect-square border border-custom-rose-900 rounded-lg flex
        justify-center items-center"
        >
          <PiPhoneCallFill size={30} className="text-custom-rose-900 rotate-45" />
        </div>

        {/* Call numbers */}
        <div className="flex-1">
          <h3 className="font-inter font-bold text-custom-rose-900 text-xl">
            {t("contact-call-anytime")}
          </h3>

          {/* Number */}
          <p className="font-medium font-inter text-base ">241-373-2123</p>
        </div>
      </div>

      {/* Info mail */}
      <div className="flex items-center gap-3">
        {/* Mail icon */}
        <div
          className="size-16 aspect-square border border-custom-rose-900 rounded-lg flex
        justify-center items-center"
        >
          <IoMail className="text-custom-rose-900" size={30} />
        </div>

        {/* Info mail */}
        <div className="flex-1">
          <h3 className="font-inter font-bold text-custom-rose-900 text-xl">
            {t("contact-send-email")}
          </h3>
          <p className="font-medium font-inter text-base">Dwight63@gmail.com</p>
        </div>
      </div>

      {/* Contact addrees */}
      <div className="flex items-center gap-3">
        {/* Address icon */}
        <div
          className="size-16 aspect-square border border-custom-rose-900 rounded-lg flex
        justify-center items-center"
        >
          <FaLocationDot className="text-custom-rose-900" size={30} />
        </div>

        {/* Info address */}
        <div className="flex-1">
          <h3 className="font-inter font-bold text-custom-rose-900 text-xl">
            {t("contact-visit-us")}
          </h3>
          <p className="font-medium font-inter text-base text-wrap break-words">
            20 Island Park Road, New Jearsy, New York, USA
          </p>
        </div>
      </div>
    </div>
  );
}
