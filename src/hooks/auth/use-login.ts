"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useLogin() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await signIn("credentials", { email, password, redirect: false });

      if (!response?.ok) {
        throw new Error(response?.error || t("login-failed"));
      }

      return response;
    },
    onSuccess: (data) => {
      toast.success(t("login-successful"));
      setTimeout(() => {
        window.location.href = data?.url || "/";
      }, 2000);
    },
  });

  return { isPending, error, login: mutate };
}