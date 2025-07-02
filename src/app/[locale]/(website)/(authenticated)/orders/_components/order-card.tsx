"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import OrderItem from "./order-item";
import { useFormatter, useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { Link } from "@/i18n/routing";

interface OrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function OrderCard({ order, isExpanded, onToggleExpand }: OrderCardProps) {
  //  Translation
  const t = useTranslations();
  const format = useFormatter();

  // Functions
  const getStatusBadgeStyles = (status: string | null) => {
    switch (status) {
      case "completed":
        return "bg-green-600 text-white hover:bg-green-700 border-green-700";
      case "shipped":
        return "bg-blue-600 text-white hover:bg-blue-700 border-blue-700";
      case "inProgress":
        return "bg-custom-rose-900 text-white hover:bg-custom-rose-700 border-custom-rose-900";
      case "canceled":
        return "bg-red-600 text-white hover:bg-red-700 border-red-700";
      default:
        return "bg-gray-600 text-white hover:bg-gray-700 border-gray-700";
    }
  };
  const paymentAndDeliveryBadgeStyles = (value: boolean | null) => {
    if (value === true) {
      return "bg-green-600 text-white hover:bg-green-700 border-green-700";
    } else {
      return "bg-red-600 text-white hover:bg-red-700 border-red-700";
    }
  };
  const getOrderStateLabel = (state: string) => {
    switch (state) {
      case "completed":
        return t("completed");
      case "inProgress":
        return t("in-porgress");
      case "processing":
        return t("processing");
      case "cancelled":
        return t("cancelled");
      case "pending":
        return t("pending");
      default:
        return state.charAt(0).toUpperCase() + state.slice(1);
    }
  };
  const getDeliveryStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "failed":
        return "Failed";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  const formatOrderNumber = (orderNumber: string | number | null): string => {
    if (orderNumber == null) return "N/A";
    // Wrap with LRE (U+202A) and PDF (U+202C) to enforce LTR
    return `\u202A${String(orderNumber)}\u202C`;
  };

  return (
    <Card className="overflow-hidden ">
      <CardHeader className="bg-muted/40 pb-4">
        <div className="flex  flex-col sm:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              {/* Order number */}
              <Link
                href={`/orders/${order._id}`}
                className={`text-lg font-semibold ltr:direction-reverse rtl:direction-normal`}
              >
                {t.rich("order-value-number", {
                  value: formatOrderNumber(order?.orderNumber),
                  span: (v) => <span dir="ltr">{v}</span>,
                })}
              </Link>

              {/* Status badge */}
              <Badge
                className={cn(
                  "ml-2 px-4 py-2 rtl:text-sm  transition-colors duration-300 ease-in-out",
                  getStatusBadgeStyles(order?.state),
                )}
              >
                {t("value", {
                  value: getOrderStateLabel(order?.state),
                })}
              </Badge>
            </div>

            {/* Order date */}
            <p className="text-sm mt-2 text-muted-foreground">
              {t("ordered-on")} {format.dateTime(new Date(order.createdAt), { dateStyle: "full" })}
            </p>
          </div>

          {/* Order toatal Price and payment method */}
          <div className="flex flex-col items-start sm:items-end gap-1">
            {/* Order total Price */}
            <div className="text-lg font-semibold">
              {t("total-price")}:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "EGP",
              }).format(order?.totalPrice)}
            </div>

            {/* payment method */}
            <div className="text-base text-custom-muted">{order?.paymentType}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className={`pt-4 ${isExpanded ? "" : "hidden"}`}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Payment status */}
            <div>
              {/* Header */}
              <h4 className="text-sm px-1 font-medium mb-1">{t("payment-status")}</h4>
              {/* Badge */}
              <Badge
                className={cn(
                  "ml-2 px-3 rtl:tracking-wider py-2 transition-colors duration-300 ease-in-out [unicode-bidi:isolate]",
                  paymentAndDeliveryBadgeStyles(order?.isPaid),
                )}
              >
                {/* Text */}
                {order?.isPaid ? t("paid") : t("not-paid")}
              </Badge>
            </div>

            {/* Deleviry status */}
            <div>
              {/* Header */}
              <h4 className="text-sm font-medium mb-1 px-3">{t("delivery-status")}</h4>

              {/* Badge */}
              <Badge
                className={cn(
                  "ml-2 px-3 rtl:tracking-wider py-2 transition-colors duration-300 ease-in-out [unicode-bidi:isolate]",
                  paymentAndDeliveryBadgeStyles(order?.isDelivered),
                )}
              >
                {/* Text */}
                {getDeliveryStatusLabel(order?.isDelivered ? t("deliverd") : t("not-deleiverd"))}
              </Badge>
            </div>
          </div>

          {/* Order Iems */}
          <div>
            {/* Header */}
            <h4 className="text-sm font-medium mb-2">{t("order-items")}</h4>

            {/* Orders Items content */}
            <div className="space-y-3">
              {order.orderItems.map((item) => (
                <OrderItem key={item._id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between py-3 bg-muted/20">
        <Button variant="ghost" size="sm" onClick={onToggleExpand} className="text-sm">
          {isExpanded ? (
            <>
              {/* Hider details label */}
              <ChevronUp className="h-4 w-4 mr-1" />
              {t("hide-details")}
            </>
          ) : (
            <>
              {/* Show details label */}
              <ChevronDown className="h-4 w-4 mr-1" />
              {t("view-details")}
            </>
          )}
        </Button>

        <div className="flex gap-2">
          {order.state === "inProgress" && (
            // Trak order button
            <Button size="sm" variant="outline">
              {t("track-order")}
            </Button>
          )}

          {/* Reorder button */}
          <Button size="sm" variant="secondary">
            {t("reorder")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
