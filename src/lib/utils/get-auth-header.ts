import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getAuthHeader() {
  const tokenCookie = cookies().get("next-auth.session-token")?.value;
  let accessToken: string = "";

  try {
    const JWT = await decode({
      token: tokenCookie || "",
      secret: process.env.NEXTAUTH_SECRET!,
    });

    accessToken = JWT?.token || "";
  } catch (error) {
    void error;
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}
