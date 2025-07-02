// Define possible authentication form states
declare type AuthDialogForms =
  | "login"
  | "register"
  | "forgot-password"
  | "verify-otp"
  | "set-password";

// Type for authentication forms props
declare type AuthFormProps = {
  setAuthState: React.Dispatch<React.SetStateAction<AuthDialogForms>>;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
};
