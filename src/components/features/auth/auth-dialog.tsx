"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GetAuthForm } from "./components/get-auth-form";
import { useTranslations } from "next-intl";

export default function AuthDialog({ children }: { children?: React.ReactNode }) {
  // Translations
  const t = useTranslations();

  // States
  const [authState, setAuthState] = useState<AuthDialogForms>("login");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //  Function to get the form title based on current authState
  const getTittle = () => {
    switch (authState) {
      case "login":
        return t("login-title");
      case "register":
        return t("register-title");
      case "forgot-password":
        return t("forgot-password-title");
      case "verify-otp":
        return t("verify-otp-title");
      case "set-password":
        return t("set-password-title");
      default:
        return t("form-not-found");
    }
  };

  return (
    <Dialog
      defaultOpen={false}
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setAuthState("login"); // Reset state to login on close
      }}
    >
      {/* Login Trigger */}
      <DialogTrigger className="bg-custom-rose-900 min-w-[80px] h-[45px] py-3 px-5 rounded-[30px] font-500 text-white shadow-dialog-button hover:transition hover:ease-out hover:duration-300">
        {children || t("login")}
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="w-[608px] max-w-full bg-[#FFFFFF] px-10 !py-0 !rounded-[20px]">
        {/* Dialog Header For Better Accessibility */}
        <DialogHeader>
          {/* Dialog Title For Better Accessibility */}
          <DialogTitle className="font-normal  mb-2 mt-10 text-3xl">{getTittle()}</DialogTitle>

          {/* Dialog Description For Better Accessibility */}
          <DialogDescription className="sr-only">{getTittle()}</DialogDescription>
        </DialogHeader>

        {/* Load the required model only when needed*/}
        <GetAuthForm
          authState={authState}
          setAuthState={setAuthState}
          email={email}
          setEmail={setEmail}
        />
      </DialogContent>
    </Dialog>
  );
}
