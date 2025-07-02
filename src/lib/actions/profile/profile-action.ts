"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function profileAction(fields: ProfileFields) {
  // Get token
  const getToken = cookies().get("next-auth.session-token")?.value;
  const token = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: getToken,
  });
  const response = await fetch(`${process.env.API}/auth/editProfile`, {
    method: "PUT",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify(fields),
  });
  const payload: APIResponse<Profile> = await response.json();

  return payload;
}
