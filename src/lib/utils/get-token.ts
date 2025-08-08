import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const AUTH_COOKIE = (() => {
  // Get the base URL from the environment variable or default to localhost
  const secureCookie = process.env.NEXTAUTH_URL?.startsWith("https://");

  /*
    Check if the protocol is HTTPS or HTTP and set the cookie name accordingly
    The cookie name is prefixed with __Secure- if the protocol is HTTPS for security reasons (NextAuth is responsible)
  */
  if (secureCookie) {
    return "__Secure-next-auth.session-token";
  } else {
    return "next-auth.session-token";
  }
})();

export default async function getToken() {
  // Get token
  try {
    const tokenCookies = cookies().get(AUTH_COOKIE)?.value;
    const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

    return token?.token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}
