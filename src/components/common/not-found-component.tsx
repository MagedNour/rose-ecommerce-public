import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFoundComponent() {
  const t = useTranslations();

  return (
    <div className="text-center mt-10 h-full">
      {/* Header */}
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>

      {/* Message */}
      <p className="text-2xl text-gray-600 mb-6">
        {t("oops-the-page-youre-looking-for-doesnt-exist")}
      </p>

      {/* Navigation Link */}
      <Link href="/" className="text-blue-500 hover:text-blue-700 text-lg">
        {t("go-back-to-home")}
      </Link>
    </div>
  );
}
