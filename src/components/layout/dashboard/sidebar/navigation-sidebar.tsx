"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";
import { CalendarHeart, ClipboardList, LucideLayoutDashboard, Package } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NavigationSidebar() {
  // Translations
  const t = useTranslations();

  // Hooks
  const pathname = usePathname();

  // Variables navigation
  const navigation = [
    {
      name: t("categories"),
      icon: <ClipboardList />,
      link: "/dashboard/categories",
    },
    {
      name: t("occasions"),
      icon: <CalendarHeart />,
      link: "/dashboard/occasions",
    },
    {
      name: t("products-0"),
      icon: <Package />,
      link: "/dashboard/products",
    },
  ];

  return (
    <nav>
      <ul className="flex flex-col gap-2 mt-4">
        {/* overview */}
        <Link
          href={"/dashboard"}
          className={cn(
            "font-semibold flex gap-2 w-[237px] p-2 rounded-lg ",
            pathname === "/dashboard" && "bg-custom-rose-25 text-custom-rose-900 ",
          )}
        >
          <LucideLayoutDashboard /> {t("overview")}
        </Link>
        {/* Navigation */}
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className={cn(
              "font-semibold flex gap-2 w-[237px] p-2 rounded-lg ",
              pathname.startsWith(item.link) && "bg-custom-rose-25 text-custom-rose-900 ",
            )}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
