"use client";

import useAddToCart from "@/hooks/cart/use-add-to-cart";
import { useTranslations } from "next-intl";
import { BsHandbag } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function HandBagIcon({ productId, stock, initialCartQuantity }: AddToCartProps) {
  // Translations
  const t = useTranslations();

  // Get the addToCart hook
  const { addToCart, isPending: isAddingToCart } = useAddToCart();

  const handleAddToCart = () => {
    // Add product to cart only if product is available in stock
    if (stock > 0 && initialCartQuantity < stock) {
      addToCart({ product: productId, quantity: initialCartQuantity + 1 });
    } else {
      toast.error(t("product-is-out-of-stock"));
    }
  };

  return (
    <button type="button" onClick={handleAddToCart} disabled={isAddingToCart || stock <= 0}>
      {/* If The Product Is Adding To Cart Show The Loader, Else Show The Cart Icon */}
      {isAddingToCart ? (
        <Loader2 className="animate-spin text-white" />
      ) : (
        <BsHandbag className="text-lg text-white font-black" />
      )}
    </button>
  );
}
