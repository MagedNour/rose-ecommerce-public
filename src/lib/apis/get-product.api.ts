export async function getProductById(id: string) {
  try {
    const response = await fetch(`${process.env.API}/products/${id}`);
    const payload: APIResponse<{ product: Product }> = await response.json();
    return payload;
  } catch (error) {
    throw new Error((error as ErrorResponse).error);
  }
}
