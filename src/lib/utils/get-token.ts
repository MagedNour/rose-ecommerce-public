import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getToken() {
  // Get token
  try {
    const tokenCookies = cookies().get(process.env.AUTH_COOKIES as string)?.value;
    const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

    return token?.token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}
