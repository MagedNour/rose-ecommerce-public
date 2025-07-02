"use client";

import verifyOtpAction from "@/lib/actions/verify-otp.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useVerifyOtp() {
  // Translations
  const t = useTranslations();

  // Mutations
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: VerifyOTPFiled) => {
      const payload = await verifyOtpAction(fields);
      if ("error" in payload) throw new Error(payload.error);
      return payload;
    },
    onSuccess: () => {
      // Show success message
      toast.success(t("otp-verified-successfully"));

      // TODo: Redirect the user to set password page
      // setAuthState("set-password");
    },
  });
  return { isPending, error, verifyOtp: mutate };
}
