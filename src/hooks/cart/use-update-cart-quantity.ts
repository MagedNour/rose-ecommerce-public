"use client";

import { updateCartQuantityAction } from "@/lib/actions/cart.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateCartQuantity() {
    //Translations

    // Mutation
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (fields: CartFields) => {
            const payload = await updateCartQuantityAction(fields)

            // Throw error if the response contains an error
            if ("error" in payload) throw new Error(payload.error);
            return payload
        },

        // Error message toast
        onError: (err: Error) => {
            // Show toast error message
            toast.error(err.message);
        }
    })

    return { isPending, error, updateCartQuantity: mutate }
}