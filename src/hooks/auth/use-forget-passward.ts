import { forgetAction } from "@/lib/actions/forget-passward.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useForget() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: { email: string }) => {
      const payload = await forgetAction(fields);

      if ("error" in payload) throw new Error(payload.error as string);

      return payload;
    },
    onSuccess: () => {
      toast.success(t("send-otp"));
    },
  });

  return { isPending, error, forget: mutate };
}
