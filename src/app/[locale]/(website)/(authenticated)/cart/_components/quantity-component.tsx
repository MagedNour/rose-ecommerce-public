"use client";

import useUpdateQuantity from "@/hooks/cart/use-update-quantity";
import { Minus, Plus } from "lucide-react";

export default function QuantityComponent({
  quantity,
  productId,
}: {
  quantity: number;
  productId: string;
}) {
  // Hooks
  const { isPending: isPendingQuantity, updateQuantity } = useUpdateQuantity();

  return (
    <div className="text-custom-rose-900  space-x-4 ">
      <button
        onClick={() => updateQuantity({ productId, quantity: quantity - 1 })}
        className=" p-2 rounded-full hover:scale-105  bg-custom-rose-25  "
        disabled={isPendingQuantity || quantity <= 1}
      >
        {" "}
        <Minus size={15} />
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => updateQuantity({ productId, quantity: quantity + 1 })}
        className=" p-2 rounded-full hover:scale-105 bg-custom-rose-25 "
        disabled={isPendingQuantity}
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
