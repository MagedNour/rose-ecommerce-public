"use client";

import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Logout() {
  // Translation
  const t = useTranslations();

  return <button onClick={() => signOut()}>{t("sign-out")}</button>;
}
