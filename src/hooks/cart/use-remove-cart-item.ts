"use client";

import { removeCartItem } from "@/lib/actions/cart.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useRemoveCartItem() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ productId }: { productId: string }) => {
      const response = await removeCartItem({ productId });

      return response;
    },
    onSuccess: () => {
      toast.success(t("delete-successfully"));
    },
    onError: () => {
      toast.error(t("delete-failed"));
    },
  });

  return { isPending, error, removeCartItem: mutate };
}
