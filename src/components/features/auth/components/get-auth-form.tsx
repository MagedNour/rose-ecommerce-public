import React from "react";
import dynamic from "next/dynamic";
import FormSkeleton from "@/components/skeletons/form/form.skeleton";
import { useTranslations } from "next-intl";

// Lazy load all forms dynamically (loaded only when needed) & display form skeleton
const LoginForm = dynamic(() => import("./login-form"), {
  ssr: false,
  loading: () => <FormSkeleton />,
});
const RegisterForm = dynamic(() => import("./register-form"), {
  ssr: false,
  loading: () => <FormSkeleton />,
});
const SetPasswordForm = dynamic(() => import("./set-password-form"), {
  ssr: false,
  loading: () => <FormSkeleton />,
});
const ForgotPasswordForm = dynamic(() => import("./forgot-password-form"), {
  ssr: false,
  loading: () => <FormSkeleton />,
});
const VerifyOtpForm = dynamic(() => import("./verify-otp-form"), {
  ssr: false,
  loading: () => <FormSkeleton />,
});

// Interface extending the AuthFormProps for GetAuthForm
interface GetAuthFormProps extends AuthFormProps {
  authState: AuthDialogForms;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}
// Function to render the corresponding form based on authState
export function GetAuthForm({ authState, setAuthState, email, setEmail }: GetAuthFormProps) {
  // Translations
  const t = useTranslations();

  // Switch case to render the corresponding form
  switch (authState) {
    case "login":
      return <LoginForm setAuthState={setAuthState} />;
    case "register":
      return <RegisterForm setAuthState={setAuthState} />;
    case "forgot-password":
      return <ForgotPasswordForm setAuthState={setAuthState} setEmail={setEmail} />;
    case "verify-otp":
      return <VerifyOtpForm email={email} setAuthState={setAuthState} />;
    case "set-password":
      return <SetPasswordForm email={email} setAuthState={setAuthState} />;
    default:
      return <div className="text-red-500 text-lg text-center">{t("form-not-found")}</div>;
  }
}
