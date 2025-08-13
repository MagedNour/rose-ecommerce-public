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
    <div className="relative group inline-block">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isAddingToCart || stock <= 0}
        className={`${stock <= 0 ? "cursor-not-allowed" : ""}`}
      >
        {isAddingToCart ? (
          <Loader2 className="animate-spin text-white" />
        ) : (
          <BsHandbag className="text-lg text-white font-black" />
        )}
      </button>

      {stock <= 0 && (
        <div
          className="absolute w-10 left-1/2 -translate-x-1/2 top-full mt-2
                 rounded bg-black text-white text-xs px-2 py-1
                 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap min-w-[100px] text-center"
        >
          Out of stock
        </div>
      )}
    </div>
  );
}
