import { PaymentMethod } from "@/lib/constants/cart.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cashCheckoutAction, creditCheckoutAction } from "../_actions/checkout.action";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useBillingSchema } from "@/lib/schemes/cart.schema";

export default function useCheckout() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Queries
  const queryClient = useQueryClient();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({
      method,
      billingInfo,
    }: {
      method: PaymentMethod;
      billingInfo: z.infer<ReturnType<typeof useBillingSchema>>;
    }) => {
      console.log(billingInfo);
      const payload =
        method === PaymentMethod.CASH
          ? await cashCheckoutAction(billingInfo)
          : await creditCheckoutAction(billingInfo, window.location.origin);

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: (data, variables) => {
      if (variables.method === PaymentMethod.CASH) {
        // Success notification
        toast.success(t("order-successful"));

        // Clear router cache to invalidate order page client side cache (since it's not cached on server side anyway)
        router.refresh();

        // Clear react query cache
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });

        // Navigate to orders page directly after cash checkout
        router.push("/orders");
      } else {
        const payload = data as CreditCheckoutResponse;

        // Navigate to checkout page on stripe
        window.location.href = payload.session.url;
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, error, checkout: mutate };
}
