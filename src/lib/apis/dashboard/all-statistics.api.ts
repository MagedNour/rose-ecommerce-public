import { JSON_HEADER } from "../../constants/api.constant";
import getToken from "../../utils/get-token";

export async function getAllStatistics() {
  // Get token
  const token = await getToken();

  const response = await fetch(`${process.env.API}/statistics`, {
    method: "GET",
    headers: { ...JSON_HEADER, Authorization: "Bearer " + token },
  });

  const payload: APIResponse<Statistics> = await response.json();

  return payload;
}
