"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/routing";
import { User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function DropdownProfile() {
  //Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Variables
  const dropdownItems = [
    {
      href: "/profile",
      label: t("profile"),
      action: () => router.push("/profile"),
    },
    {
      href: "/orders",
      label: t("orders"),
      action: () => router.push("/orders"),
    },
    {
      href: "/sign-out",
      label: t("sign-out"),
      action: () => signOut(),
    },
  ];

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger>
        <User className="h-6 w-6 text-custom-rose-900" />
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent>
        {dropdownItems.map((item) => (
          <DropdownMenuItem className="cursor-pointer" key={item.label} onClick={item.action}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
