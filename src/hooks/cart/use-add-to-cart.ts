"use client";

import { addToCartAction } from "@/lib/actions/cart.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useAddToCart() {

    //Translations
    const t = useTranslations()

    // Mutation
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (fields: CartFields) => {
            const payload = await addToCartAction(fields)

            // Throw error if the response contains an error
            if ("error" in payload) throw new Error(payload.error);
            return payload
        },

        // Success message toast
        onSuccess: () => {
            // Show toast success message
            toast.success(t('product-added-to-cart-successfully'));
        },

        // Error message toast
        onError: (err: Error) => {
            toast.error(
                err.message === t('please-login-first')
                    ? t('please-login-first')
                    : err.message
            );
        },
    })

    return { isPending, error, addToCart: mutate }
}