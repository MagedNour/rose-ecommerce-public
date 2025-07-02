import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import CardItemComponent from "./_components/card-item-component";
import CartSummary from "./_components/cart-summary";
import EmptyCart from "./_components/empty-cart";
import { Link } from "@/i18n/routing";
import { getCart } from "@/lib/apis/get-cart";

export default async function Cart() {
  // Translation
  const t = await getTranslations();

  // Get cart
  const payload = await getCart();

  if ("error" in payload) throw new Error(payload.error);

  if (!payload.numOfCartItems) return <EmptyCart />;

  return (
    <section className="container flex justify-between gap-3 my-10  ">
      <div className="flex flex-col flex-1 overflow-x-auto gap-3 ">
        {/* Table */}
        <table className=" text-center ">
          {/* Header */}
          <thead>
            <tr className="  uppercase   font-semibold space-x-2 ">
              <th>
                <p className=" text-sm border-b-2 pb-2 mx-2 border-gray-300">{t("image")}</p>
              </th>
              <th>
                <p className=" text-sm border-b-2 pb-2 mx-2 border-gray-300">{t("name")}</p>
              </th>
              <th>
                <p className=" text-sm border-b-2 pb-2 mx-2 border-gray-300">{t("price")}</p>
              </th>
              <th>
                <p className=" text-sm border-b-2 pb-2 mx-2 border-gray-300"> {t("quantity")}</p>
              </th>
              <th>
                <p className=" text-sm border-b-2 pb-2 mx-2 border-gray-300"> {t("total-0")}</p>
              </th>
              <th>
                <p className=" text-sm border-b-2 pb-2 mx-2 border-gray-300"> {t("remove")}</p>
              </th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {payload.cart.cartItems.map(
              (item: { product: Product; price: number; quantity: number; _id: string }) => (
                <CardItemComponent key={item.product._id} item={item} />
              ),
            )}
          </tbody>
        </table>

        {/* Button */}
        <div className=" flex justify-center">
          <Link
            href="/products"
            className="w-[200px] h-[50px] text-white text-base rounded-lg font-medium bg-custom-rose-900 text-center flex justify-center items-center gap-1 "
          >
            <ArrowLeft size={20} className="rtl:-scale-x-100" />
            {t("continue-shopping")}
          </Link>
        </div>
      </div>
      <CartSummary cart={payload.cart} />
    </section>
  );
}
