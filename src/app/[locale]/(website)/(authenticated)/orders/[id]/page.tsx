import ArrowLeft from "@/components/common/arrow-left";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";
import { getOrder } from "@/lib/apis/orders.api";
import { RouteProps } from "@/lib/types/route-props";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

// Status badge
const StatusBadge = ({
  status,
  type,
}: {
  status: boolean | OrderState | string;
  type: "payment" | "delivery" | "state";
}) => {
  // ٍStatus styles
  const stateStyles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    processing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    shipped: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    delivered: "bg-green-100 text-green-800 hover:bg-green-100",
    completed: "bg-green-100 text-green-800 hover:bg-green-100",
    cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  const booleanStyles: Record<string, string> = {
    true: "bg-green-100 text-green-800 hover:bg-green-100",
    false: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  // Handle different types of status
  if (type === "payment") {
    const statusStr = String(status);
    return (
      <Badge className={booleanStyles[statusStr] || "bg-gray-100 text-gray-800"} variant="outline">
        {status ? "Paid" : "Unpaid"}
      </Badge>
    );
  } else if (type === "delivery") {
    const statusStr = String(status);
    return (
      <Badge className={booleanStyles[statusStr] || "bg-gray-100 text-gray-800"} variant="outline">
        {status ? "Delivered" : "Not Delivered"}
      </Badge>
    );
  } else {
    const statusStr = status as string;
    return (
      <Badge
        className={stateStyles[statusStr?.toLowerCase()] || "bg-gray-100 text-gray-800"}
        variant="outline"
      >
        {statusStr ? statusStr.charAt(0).toUpperCase() + statusStr.slice(1) : "Unknown"}
      </Badge>
    );
  }
};

export default async function Page({ params: { id } }: RouteProps & { params: { id: string } }) {
  // Translation
  const t = await getTranslations();
  const format = await getFormatter();

  // Variables
  const payload = await getOrder(id);
  const order = payload.orders[0];

  if (!order) {
    return notFound();
  }

  return (
    <main className="container pt-14 pb-40 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Title and back button */}
        <div className="flex items-center gap-2">
          {/* Back button */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/orders">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">{t("orders")}</span>
            </Link>
          </Button>

          {/* Title */}
          <h1 className="text-2xl font-bold">
            {t("order")} {order.orderNumber}
          </h1>
        </div>

        {/* Continue shopping and view cart buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Continue shopping */}
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/products">
              <ShoppingBag className="size-4" />
              <span>{t("continue-shopping")}</span>
            </Link>
          </Button>

          {/* View cart */}
          <Button
            className="gap-2 bg-custom-rose-900 hover:brightness-95 hover:bg-custom-rose-900"
            asChild
          >
            <Link href="/cart">
              <ShoppingCart className="size-4" />
              <span>{t("view-cart")}</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Order details */}
      <Card className=" border-x-custom-rose-100">
        <CardHeader className="bg-custom-rose-100/30 pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-custom-rose-900">
                {t("order")} {order.orderNumber}
              </CardTitle>
              <CardDescription>{new Date(order.createdAt).toLocaleDateString()}</CardDescription>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusBadge status={order.isPaid} type="payment" />
              <StatusBadge status={order.isDelivered} type="delivery" />
              <StatusBadge status={order.state} type="state" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">{t("payment-method")}</p>
              <p className="font-medium">{order.paymentType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("total-amount")}</p>
              <p className="font-medium text-custom-rose-900">
                {format.number(order.totalPrice, "currency-base")}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <Separator />
            <h4 className="font-medium">{t("order-items")}</h4>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-gray-50"
                >
                  {/* Order Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={item.product.imgCover || "/placeholder.svg"}
                      alt={item.product.title}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </div>

                  {/* Order Title */}
                  <div className="flex-grow">
                    {/* Title */}
                    <Link
                      href={`/products/${item.product._id}`}
                      className="font-medium hover:text-custom-rose-900 hover:cursor-pointer flex items-center gap-1"
                    >
                      {item.product.title}
                    </Link>

                    {/* Quantity */}
                    <p className="text-sm text-muted-foreground">
                      {/* Quantity */}
                      {t("quantity-number", {
                        quantity: item.quantity,
                      })}
                      {/* Price */}× {format.number(Number(item.price), "currency-base")}
                    </p>
                  </div>

                  {/* Order quantity */}
                  <div className="sm:text-right">
                    <p className="text-sm text-muted-foreground">{t("item-total")}</p>
                    <p className="font-medium">
                      {format.number(Number(item.price) * item.quantity, "currency-base")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="py-2 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 bg-gray-50 border-t">
          <p className="text-sm text-muted-foreground">{t("need-help-with-this-order")}</p>
          <Link href="/contact" className="text-custom-rose-900 hover:underline">
            {t("contact-support")}
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
