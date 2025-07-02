"use client";

import { updateQuantity } from "@/lib/actions/cart.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useUpdateQuantity() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const response = await updateQuantity({ productId, quantity });

      return response;
    },
    onSuccess: () => {
      toast.success(t("successful-update-quantity"));
    },
    onError: () => {
      toast.error(t("failed-update-quantity"));
    },
  });

  return { isPending, error, updateQuantity: mutate };
}
