"use client";

import AuthDialog from "@/components/features/auth/auth-dialog";
import { useSession } from "next-auth/react";
import AddToCartAndCounter from "./add-to-cart-and-counter";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AddToCartWrapper({
  productId,
  stock,
  initialCartQuantity,
}: AddToCartProps) {
  // Translation
  const t = useTranslations();

  // Session
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  if (!isAuthenticated) {
    return (
      // Auth Dialog
      <AuthDialog>
        <span className=" flex items-center gap-2">
          <ShoppingBag width={24} height={24} />
          {t("add-to-cart")}
        </span>
      </AuthDialog>
    );
  }

  return (
    // Add To Cart And Counter
    <AddToCartAndCounter
      productId={productId}
      stock={stock}
      initialCartQuantity={initialCartQuantity}
    />
  );
}
