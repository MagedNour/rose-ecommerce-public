import { Flower } from "lucide-react";
import Image from "next/image";
import NavigationSidebar from "./navigation-sidebar";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import InformationCard from "./information-card";

export default async function Sidebar() {
  // Translations
  const t = await getTranslations();

  return (
    <aside className="w-[303px] bg-[#fbfbfd] h-screen flex flex-col justify-between items-center px-4 ">
      <section className="flex flex-col items-center gap-4 py-6">
        {/* Logo */}
        <Image src="/assets/images/Logo.png" alt="Logo" width={86} height={0} />

        {/* navigate to website */}
        <Link href="/">
          <button className="bg-custom-rose-900 flex items-center justify-center gap-2 text-white rounded-lg py-2 w-[237px] ">
            {" "}
            <Flower color="white" /> {t("preview-website")}
          </button>
        </Link>

        {/* Navigation */}
        <NavigationSidebar />
      </section>

      {/* Information Card */}
      <InformationCard />
    </aside>
  );
}
