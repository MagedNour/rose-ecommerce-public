import { getCart } from "@/lib/apis/get-cart";
import CartSummary from "../cart/_components/cart-summary";
import AccordionComponent from "./_components/accordion-component";

export default async function CheckoutPage() {
  // Get cart
  const payload = await getCart();

  if ("error" in payload) throw new Error(payload.error);

  return (
    <main className="container flex gap-24 min-h-[70vh]">
      <AccordionComponent />

      <CartSummary cart={payload.cart} />
    </main>
  );
}
