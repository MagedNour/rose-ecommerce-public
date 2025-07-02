declare type Profile = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  phone: string;
  photo?: string | null;
};

declare type ProfileForm = {
  user: Profile | undefined;
};