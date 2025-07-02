/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /* The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends Pick<DatabaseFields, "_id"> {
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phone: string;
    photo: string | null;
    role: string;
    wishlist: string[];
    addresses: string[];
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Session extends Omit<User, "token"> {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT extends User {}
}
