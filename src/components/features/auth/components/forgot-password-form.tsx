"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useForget from "@/hooks/auth/use-forget-passward";

export default function ForgetPasswordForm({ setEmail, setAuthState }: AuthFormProps) {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, forget } = useForget();

  // Form & Validation
  const Schema = z.object({
    email: z
      .string({ required_error: t("email-required") })
      .min(1, t("email-required"))
      .email(t("email-valid")),
  });
  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
    },
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = (values) => {
    forget(values, {
      onSuccess: () => {
        // If successful, change parent state to verify OTP & set email
        setAuthState("verify-otp");
        setEmail?.(values.email);
      },
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="rounded-[20px] w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Hidden Label for Accessibility */}
                  <Label htmlFor="email" className="sr-only">
                    {t("email")}
                  </Label>

                  {/* Input */}
                  <FormControl>
                    <Input
                      id="email"
                      placeholder={t("email-holder")}
                      type="email"
                      {...field}
                      className="w-full h-[52px] p-2 mb-3 rounded-[20px] shadow-md"
                    />
                  </FormControl>

                  {/* Validation Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              className="w-full h-[52px] bg-custom-rose-900 text-white rounded-[20px]"
              disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
            >
              {isPending ? "loading..." : t("recover-password")}
            </Button>
            {error && <p className="text-red-500 mt-2">{error.message}</p>}
          </form>
        </Form>
      </div>
    </div>
  );
}
