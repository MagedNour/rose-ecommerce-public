import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const AUTH_COOKIE = (() => {
  const secureCookie = process.env.NEXTAUTH_URL?.startsWith("https://");
  if (secureCookie) {
    return "__Secure-next-auth.session-token";
  } else {
    return "next-auth.session-token";
  }
})();

export async function fetchUserData() {
  const tokenCookies = cookies().get(AUTH_COOKIE)?.value;

  // // If no cookie, user is not authenticated
  if (!tokenCookies) {
    throw new Error("Authentication cookie not found");
  }

  //Decode the JWT using the NextAuth secret
  const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

  // If decoding failed or token field missing → invalid session
  if (!token?.token) {
    throw new Error("Invalid authentication token");
  }

  // API endpoint
  const apiUrl = `${process.env.API}/auth/profile-data`;

  // 4️⃣ Fetch the user profile
  const response = await fetch(apiUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
    cache: "no-store",
  });
  const payload: APIResponse<ProfileResponse> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.user;
}
