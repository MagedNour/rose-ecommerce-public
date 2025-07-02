"use client";

import useRemoveCartItem from "@/hooks/cart/use-remove-cart-item";
import { X } from "lucide-react";

export default function RemoveButton({ productId }: { productId: string }) {
  // Hooks
  const { isPending, removeCartItem } = useRemoveCartItem();

  return (
    <button
      onClick={() => removeCartItem({ productId })}
      className="col-span-1 border p-2 rounded-full hover:scale-105 "
      disabled={isPending}
    >
      {" "}
      <X size={20} />
    </button>
  );
}
