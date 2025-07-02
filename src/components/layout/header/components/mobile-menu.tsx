"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col p-4">
      <div className="flex justify-between items-center border-b pb-4">
        <Image src="/assets/images/Logo.png" alt="Logo" width={86} height={0} />
        <button onClick={onClose} aria-label="Close menu">
          <X className="text-gray-500" />
        </button>
      </div>

      <nav className="flex flex-col gap-4 mt-6">
        <Link
          href="/"
          className="text-custom-rose-900 py-2 border-b border-gray-100"
          onClick={onClose}
        >
          {t("home")}
        </Link>
        <Link
          href="/"
          className="text-custom-blue-900 py-2 border-b border-gray-100"
          onClick={onClose}
        >
          {t("all-category")}
        </Link>
        <Link
          href="/"
          className="text-custom-blue-900 py-2 border-b border-gray-100"
          onClick={onClose}
        >
          {t("about")}
        </Link>
        <Link
          href="/"
          className="text-custom-blue-900 py-2 border-b border-gray-100"
          onClick={onClose}
        >
          {t("contact")}
        </Link>
      </nav>

      <div className="mt-6">
        <button className="text-custom-rose-900 font-medium">{t("login")}</button>
      </div>
    </div>
  );
}
