import OrdersList from "./_components/order-list";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import { getOrders } from "@/lib/apis/orders.api";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations();

  //  Variables
  const orders = await getOrders();

  // Error handling
  if ("error" in orders) {
    throw new Error(orders?.error);
  }

  return (
    <div className="container w-full lg:max-w-5xl py-8 space-y-8">
      {/* Title and description */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-custom-rose-900 tracking-tight">
          {/* Orders Title */}
          {t("orders-list")}
        </h2>
        {/* Orders decriptions */}
        <p className="text-custom-muted rtl:text-xl p-1">{t("orders-description-message")}</p>
      </div>

      {/* Filter and action buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Orders fillter has been disable until filter functionality upplayed */}

        <div className="flex  gap-3">
          {/* View cart button */}
          <Button variant="outline" size="sm" asChild>
            <Link href="/cart">
              <ShoppingCart className="mr-2 h-4 w-4" />
              {t("view-cart")}
            </Link>
          </Button>

          {/* View cart button */}
          <Button
            className="bg-custom-rose-900 hover:bg-custom-rose-700 transition-colors duration-300 ease-in-out"
            size="sm"
            asChild
          >
            <Link href="/products">
              <ShoppingBag className="mr-2  h-4 w-4" />
              {t("continue-shopping")}
            </Link>
          </Button>
        </div>
      </div>

      {/* Ordrs List  */}
      <OrdersList orders={orders?.orders} />
    </div>
  );
}
