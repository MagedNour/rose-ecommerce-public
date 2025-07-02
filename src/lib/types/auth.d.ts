declare type User = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string | null;
  role: string;
  wishlist: string[];
  addresses: string[];
} & DatabaseFields;

declare type SignUpResponse = {
  token: string;
  user: User;
};

declare type RegisterFields = {
  firstName: string;
  lastName: string;
  email: string;
  gender: "male" | "female";
  password: string;
  rePassword: string;
  phone: string;
};

declare type LoginResponse = {
  token: string;
  user: User;
};

declare type SetPasswordFeilds = {
  email: string;
  newPassword: string;
};

declare type SetPasswordResponse = APIResponse<{ message: "success" }>;

declare type VerifyOTPFiled = {
  resetCode: string;
};

declare type VerifyOTPResponse = APIResponse<{ status: "Success" }>;

declare type ProfileFields = {
  firstName?: string;
  lastName?: string;
  phone?: string;
};

declare type ProfileResponse = {
  message: string;
  user: User;
};
