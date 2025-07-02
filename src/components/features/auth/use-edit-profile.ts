import profileAction from "@/lib/actions/profile/profile-action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useEditProfile() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (fields: ProfileFields) => {
      const payload = await profileAction(fields);

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(t("data-updated-successfully"));
    },
  });

  return { editProfile: mutate, isPending, error };
}
