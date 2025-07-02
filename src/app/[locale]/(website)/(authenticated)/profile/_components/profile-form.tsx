"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaArrowRight } from "react-icons/fa6";
import { useEditProfile } from "@/components/features/auth/use-edit-profile";

export default function ProfileForm({ initialData }: { initialData?: User }) {
  // Translation
  const t = useTranslations();

  // Mutation
  const { editProfile, isPending, error } = useEditProfile();

  // Form & Validation
  const Schema = z.object({
    firstName: z
      .string({ required_error: t("firstname-required") })
      .min(2, t("first-name-must-be-at-least-2-characters")),
    lastName: z
      .string({ required_error: t("lastname-required") })
      .min(2, t("last-name-must-be-at-least-2-characters")),
    phone: z
      .string({ required_error: t("phone-number-required") })
      .regex(
        /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        t("invalid-phone-number-format-must-start-with-a-country-code"),
      ),
    email: z.string().email(t("invalid-email-format")).optional(),
    gender: z.enum([t("male"), t("female")]).optional(),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      firstName: initialData?.firstName,
      lastName: initialData?.lastName,
      phone: initialData?.phone,
    },
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    const updatedFields: Partial<Inputs> = {};

    if (values.firstName !== initialData?.firstName) {
      updatedFields.firstName = values.firstName;
    }
    if (values.lastName !== initialData?.lastName) {
      updatedFields.lastName = values.lastName;
    }
    if (values.phone !== initialData?.phone) {
      updatedFields.phone = values.phone;
    }

    editProfile(updatedFields);
  };

  return (
    <div className="w-[874px] ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            {/* First name */}
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  {/* Label */}
                  <FormLabel className="text-base font-medium text-[#160E4B] font-roboto">
                    {t("first-name")}
                  </FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="First Name"
                      {...field}
                      className="w-[413px] h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)]"
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last name */}
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="text-base font-medium text-[#160E4B] font-roboto">
                    {t("last-name")}
                  </FormLabel>

                  <FormControl>
                    {/* Input */}
                    <Input
                      placeholder="Last Name"
                      type="text"
                      {...field}
                      className="w-[413px] h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)]"
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone number */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="text-base font-medium text-[#160E4B] font-roboto">
                    {t("phone-number")}
                  </FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      type="text"
                      {...field}
                      className="w-[413px] h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)]"
                    />
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormItem>
              {/* Label */}
              <FormLabel className="text-base font-medium text-[#160E4B] font-roboto">
                {t("email")}
              </FormLabel>

              {/* Input */}
              <FormControl>
                <Input
                  placeholder="Email"
                  type="email"
                  value={initialData?.email || ""}
                  readOnly
                  className="w-[413px] h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)]"
                />
              </FormControl>

              {/* Message */}
              <FormMessage />
            </FormItem>

            {/* Gender */}
            <FormItem>
              {/* Label */}
              <FormLabel className="text-base font-medium text-[#160E4B] font-roboto">
                {t("gender")}
              </FormLabel>

              {/* Input */}
              <FormControl>
                <Input
                  placeholder="Gender"
                  type="text"
                  value={initialData?.gender || ""}
                  readOnly
                  className="w-[413px] h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)]"
                />
              </FormControl>

              {/* Message */}
              <FormMessage />
            </FormItem>
          </div>
          {error && <p className="text-red-600">{error.message}</p>}
          {/* Submit button */}
          <div className="flex justify-end mt-4 w-full">
            <Button
              type="submit"
              disabled={isPending}
              className="
            bg-custom-rose-900 h-[49px] rounded-[10px] px-5 py-[10px] font-medium text-base text-center shadow-[0px_0px_40px_5px_rgba(0, 0, 0, 0.05)] hover:bg-custom-rose-800"
            >
              {t("update-profile")}
              <FaArrowRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
