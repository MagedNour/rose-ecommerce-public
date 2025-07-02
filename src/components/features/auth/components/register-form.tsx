"use client";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Locale } from "@/i18n/routing";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useRegister from "@/hooks/auth/use-register";

export default function RegisterForm({ setAuthState }: AuthFormProps) {
  //   Traslation
  const t = useTranslations();
  const locale = useLocale() as Locale;

  // States
  const [passwordVisibility, setPasswordVisibility] = useState<{ [key: string]: boolean }>({
    password: false,
    rePassword: false,
  });

  // Register from schema
  const registerFormSchema = z
    .object({
      //  First name validation
      firstName: z
        .string({ required_error: t("first-name-required") })
        .min(1, t("first-name-required"))
        .min(2, t("first-name-cant-be-less-than"))
        .max(12, t("first-name-cant-be-more-than")),

      //  Last name validation
      lastName: z
        .string({ required_error: t("last-name-required") })
        .min(1, t("last-name-required"))
        .min(2, t("last-name-cant-be-less-than"))
        .max(12, t("last-name-cant-be-more-than")),

      //  Email validation
      email: z
        .string({ required_error: t("email-required") })
        .min(1, t("email-required"))
        .email(t("invalid-email")),

      //  Password validation
      password: z
        .string({ required_error: t("password-required") })
        .min(1, t("password-required"))
        .regex(/[a-zA-Z]/, t("password-must-be-in-english"))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          t("password-pattern"),
        ),

      //  Password conformation validation
      rePassword: z
        .string({ required_error: t("password-conformation-required") })
        .min(1, t("password-conformation-required"))
        .regex(/[a-zA-Z]/, t("password-conformation-must-be-in-english-letters")),

      // Phone  validation
      phone: z
        .string({ required_error: t("phone-number-required") })
        .min(1, t("phone-number-required"))
        .regex(/^(\+20|0)1[0125][0-9]{8}$/, t("invalid-phone-number")),

      // Gender validation
      gender: z.enum(["male", "female"], {
        required_error: t("gender-required"),
      }),
    })

    // Passwords match validation
    .refine((data) => data.password === data.rePassword, {
      message: t("passwords-do-not-match"),
      path: ["rePassword"],
    });

  // Hooks
  const form = useForm<RegisterForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
      gender: undefined,
    },
    resolver: zodResolver(registerFormSchema),
  });

  type RegisterForm = z.infer<typeof registerFormSchema>;

  // Variables
  const genders: string[] = ["male", "female"] as const;

  // Mutation
  const { error, isPending, register } = useRegister();
  // Functions
  // Register submition function
  const onSubmit: SubmitHandler<RegisterForm> = (values) => {
    register(values, {
      onSuccess: () => {
        setAuthState("login");
      },
    });
  };

  // Show and hide password and rePassword
  const handleShowPassword = (inputName: string) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [inputName]: !prev[inputName],
    }));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-max-md:gap-y-2 gap-y-6"
      >
        {/* First Name */}
        <FormField
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <Label className="sr-only">{t("first-name-placeholder")}</Label>

              {/* Input */}
              <Input
                className="auth-input"
                {...field}
                placeholder={t("first-name-placeholder")}
                autoComplete="given-name"
              />
              {/* Feedback massage */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          name="lastName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <Label className="sr-only">{t("last-name-placeholder")}</Label>
              {/* Input */}
              <Input
                className="auth-input"
                {...field}
                placeholder={t("last-name-placeholder")}
                autoComplete="family-name"
              />{" "}
              {/* Feedback massage */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <Label className="sr-only">{t("phone-number-placeholder")}</Label>

              {/* Input */}
              <Input
                className="auth-input"
                {...field}
                placeholder={t("phone-number-placeholder")}
                autoComplete="tel-national"
              />
              {"  "}
              {/* Feedback massage */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <Label className="sr-only">{t("email-label")}</Label>

              {/* Input */}
              <Input
                type="email"
                className="auth-input"
                {...field}
                placeholder={t("email-placeholder")}
                autoComplete="email"
              />

              {"  "}
              {/* Feedback massage */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <Label className="sr-only">{t("password-label")}</Label>

              {/* Input */}
              <div className="flex items-center h-max-md:h-[35px] h-[50px] rounded-full shadow-auth-forms-input focus-within:ring-custom-rose-900 focus-within:ring-1 focus-within:ring-offset-0">
                <Input
                  type={passwordVisibility.password ? "text" : "password"}
                  className="h-full rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                  placeholder={t("password-placeholder")}
                  autoComplete="new-password"
                />
                {passwordVisibility.password ? (
                  <FaRegEye
                    role="button"
                    aria-label={
                      passwordVisibility.password ? t("hide-password") : t("show-password")
                    }
                    onClick={() => handleShowPassword("password")}
                    className="text-2xl mx-3 cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => handleShowPassword("password")}
                    className="text-2xl mx-3 cursor-pointer"
                  />
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm passowrd */}
        <FormField
          name="rePassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <Label className="sr-only">{t("confirm-password-label")}</Label>
              <div className="flex items-center h-max-md:h-[35px] h-[50px] rounded-full shadow-auth-forms-input focus-within:ring-custom-rose-900 focus-within:ring-1 focus-within:ring-offset-0">
                <Input
                  type={passwordVisibility.rePassword ? "text" : "password"}
                  className="h-full rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                  placeholder={t("confirm-password-placeholder")}
                  autoComplete="new-password"
                />
                {passwordVisibility.rePassword ? (
                  <FaRegEye
                    role="button"
                    aria-label={
                      passwordVisibility.repassword
                        ? t("hide-password-confirmation")
                        : t("show-password-conformation")
                    }
                    onClick={() => handleShowPassword("rePassword")}
                    className="text-2xl mx-3 cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => handleShowPassword("rePassword")}
                    className="text-2xl mx-3 cursor-pointer"
                  />
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <Label className="sr-only">{t("gender-label")}</Label>
              <Select
                dir={locale === "ar" ? "rtl" : "ltr"}
                onValueChange={field.onChange}
                value={field.value}
                autoComplete="sex"
              >
                <SelectTrigger className="p-4 w-1/4 h-max-md:h-[35px] h-[50px] rounded-full shadow-custom-box-shadow focus:ring-custom-rose-900 focus:ring-1 focus:ring-offset-0">
                  {/* Select header */}
                  <SelectValue placeholder={t("select-gender-placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {/* Select item */}
                  {genders.map((gender) => (
                    <SelectItem className="" key={gender} value={gender}>
                      {t(gender)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Switch to Login form */}
        <p className="text-center text-custom-black h-max-md:py-4 py-8 font-inter text-sm tracking-[0]">
          {t.rich("already-have-an-account", {
            button: (v) => (
              <button className="text-custom-rose-900" onClick={() => setAuthState("login")}>
                {v}
              </button>
            ),
          })}
        </p>

        {/* Submit */}
        {error && <p className="text-red-600">{error.message}</p>}
        <Button
          className="block w-full h-max-md:h-10 h-12 bg-custom-rose-900 text-white rounded-full hover:bg-custom-rose-800 font-inter h-max-md:mb-2 mb-4"
          type="submit"
          disabled={form.formState.isSubmitted && !form.formState.isValid && isPending}
        >
          {t("create-an-account")}
        </Button>
      </form>
    </Form>
  );
}
