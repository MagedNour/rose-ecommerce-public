import { JSON_HEADER } from "../constants/api.constant";
import getToken from "../utils/get-token";

export async function getCart() {
  // Get token
  const token = await getToken();

  const response = await fetch(`${process.env.API}/cart`, {
    method: "GET",
    headers: { ...JSON_HEADER, Authorization: "Bearer " + token },
    next: { tags: ["cart"] },
  });

  const payload: APIResponse<CartResponse> = await response.json();

  return payload;
}
