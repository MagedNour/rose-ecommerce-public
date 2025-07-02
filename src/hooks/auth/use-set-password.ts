"use client";

import setPasswordAction from "@/lib/actions/set-password.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner"

export default function useSetPassword() {
    // Translations
    const t = useTranslations();

    // Mutations
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (fields: SetPasswordFeilds) => {
            const payload = await setPasswordAction(fields)
            if ("error" in payload) throw new Error(payload.error);
            return payload
        },
        onSuccess: () => {
            toast.success(t('set-password-successfully'))
            setTimeout(() => {
                setTimeout(() => {

                    // Redirect the user to the Login form. This task is deferred until the login form is completed, as it depends on the login form and state management.

                })
            }, 2000);
        }
    })

    return { isPending, error, setPassword: mutate }
}