"use server";

import { JSON_HEADER } from "../constants/api.constant";

export async function registerAction(fields: RegisterFields) {
  const response = await fetch(`${process.env.API}/auth/signup`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
    },
    body: JSON.stringify(fields),
  });

  const payload: APIResponse<SignUpResponse> = await response.json();

  return payload;
}
