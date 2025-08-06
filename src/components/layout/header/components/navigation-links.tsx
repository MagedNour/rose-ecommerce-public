"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";

type NavItem = { href: string; label: string };

const navItems: NavItem[] = [
  { href: "/", label: "home" },
  { href: "/products", label: "products" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

export default function NavigationLinks() {
  const pathname = usePathname();   // e.g. "/en" or "/en/products"
  const locale   = useLocale();     // e.g. "en"
  const t        = useTranslations();

  const isActive = (href: string) => {
    if (href === "/") {
      // Home: only active when you're *exactly* on "/en" (or "/ar", etc.)
      return pathname === `/${locale}`;
    }

    // For all other links:
    //   fullHref = "/en/products", "/en/about", etc.
    const fullHref = `/${locale}${href}`;
    return (
      pathname === fullHref ||                 // exact match
      pathname.startsWith(fullHref + "/")      // sub‑routes, e.g. "/en/products/shoes"
    );
  };

  return (
    <div className="hidden mx-auto md:flex gap-5 text-custom-blue-900 font-medium rtl:font-semibold text-base">
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "transition-colors hover:text-custom-rose-900",
            { "text-custom-rose-900 font-semibold": isActive(href) }
          )}
        >
          {t(label)}
        </Link>
      ))}
    </div>
  );
}
