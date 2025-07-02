import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
    error: "/",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Add logic here to look up the user from the credentials supplied
        const baseUrl = process.env.API + "/auth/signin";

        // Make the API call to sign in the user
        const response = await fetch(baseUrl, {
          method: "POST",
          body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
          headers: {
            ...JSON_HEADER,
          },
        });

        // Parse the response
        const payload: APIResponse<LoginResponse> = await response.json();

        // If the response contains an error, throw it
        if ("message" in payload) {
          return {
            id: payload.user._id,
            ...payload.user,
            token: payload.token,
          };
        }

        throw new Error(payload.error);
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.token;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
      }

      return token;
    },

    session: ({ session, token }) => {
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      session.email = token.email || "";
      session.phone = token.phone;
      session.role = token.role;

      return session;
    },
  },
};
