import ProfileAction from "@/lib/actions/profile/profile-action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useProfile() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, isError, mutate } = useMutation({
    mutationFn: async (fields: Profile) => {
      const payload = await ProfileAction(fields);

      if ("error" in payload) throw new Error(payload.error || t("profile-update-failed"));

      return payload;
    },
    onSuccess: () => {
      toast.success(t("profile-updated-successfully"));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isError, isPending, updateProfile: mutate };
}