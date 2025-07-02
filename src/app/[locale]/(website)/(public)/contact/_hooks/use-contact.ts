import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useContact() {
  // Translations
  const t = useTranslations();

  // Mutation
  const { isPending, mutate, error } = useMutation({
    mutationFn: async (fields: { name: string; email: string; message: string; phone: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(fields);
      return fields;
    },
    onSuccess: () => {
      toast.success(t("contact-message-success"));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, contact: mutate, error };
}
