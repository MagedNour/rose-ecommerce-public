"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/auth/use-login";

export default function LoginForm({ setAuthState }: AuthFormProps) {
  // Translations
  const t = useTranslations();

  //Hooks
  const { login } = useLogin();
  // Form & Validation
  const Schema = z.object({
    email: z
      .string({ required_error: t("email-required") })
      .email(t("email-valid"))
      .min(1, t("email-required")),
    password: z.string({ required_error: t("password-required") }).min(1, t("password-required")),
  });
  type Inputs = z.infer<typeof Schema>;
  const form = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(Schema),
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = (values) => {
    login(values);
  };

  return (
    <>
      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Email */}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label For Better Accessibility */}
                <Label className="sr-only">{t("email-label")}</Label>

                {/* Input */}
                <Input
                  {...field}
                  placeholder={t("email-placeholder")}
                  className="input-custom font-normal shadow-custom-input"
                />

                {/* Feedback Message */}
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          {/* Password */}
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label For Better Accessibility */}
                <Label className="sr-only">{t("password-label")}</Label>

                {/* Input */}
                <Input
                  {...field}
                  type="password"
                  placeholder={t("password-placeholder")}
                  className="input-custom shadow-custom-input !mt-6"
                />

                {/* Feedback Message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Forgot Password & Create Account */}
          <div className="flex justify-between items-center mt-6">
            {/* Create Account Text */}
            <span className="text-sm font-normal">
              {t("no-account")}

              {/* Create Account Button */}
              <button
                onClick={() => setAuthState("register")}
                type="button"
                className="text-custom-rose-900 text-sm font-semibold underline ms-1"
              >
                {t("create-account")}
              </button>
            </span>

            {/* Forgot Password Button */}
            <button
              type="button"
              onClick={() => setAuthState("forgot-password")}
              className="text-custom-rose-900 text-sm font-semibold underline ms-1"
            >
              {t("forget-password")}
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="button-submit flex items-center justify-center w-full text-base h-[52px] font-medium mb-8 mt-6"
          >
            {t("login")}
          </Button>
        </form>
      </Form>
    </>
  );
}
