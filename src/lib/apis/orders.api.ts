import { JSON_HEADER } from "../constants/api.constant";
import getAuthHeader from "../utils/get-auth-header";

export async function getOrders() {
  try {
    const response = await fetch(`${process.env.API}/orders?sort=-createdAt`, {
      method: "GET",
      headers: {
        ...JSON_HEADER,
        ...(await getAuthHeader()),
      },
    });

    const payload: APIResponse<OrdersResponse> = await response.json();

    return payload;
  } catch (error) {
    throw new Error((error as ErrorResponse).error);
  }
}

export async function getOrder(id: string) {
  const response = await fetch(`${process.env.API}/orders?_id=${id}`, {
    cache: "no-cache",
    headers: {
      ...JSON_HEADER,
      ...(await getAuthHeader()),
    },
  });

  if (!response.ok) {
    throw new Error(`Fetch failed with status: ${response.status}`);
  }

  const payload: APIResponse<OrdersResponse> = await response.json();

  if ("error" in payload) {
    throw new Error(`Fetch failed with error: ${payload.error}`);
  }

  return payload;
}
