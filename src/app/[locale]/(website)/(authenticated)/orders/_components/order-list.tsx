"use client";

import { useState } from "react";
import OrderCard from "./order-card";
import { useTranslations } from "next-intl";

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  const t = useTranslations();

  // States
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Function
  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // No orders case
  if (orders?.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">{t("you-don-have-order")}</h3>
        <p className="text-muted-foreground mt-2">{t("start-shopping-to-place-yor-order")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rendered items */}
      {orders?.map((order) => (
        <OrderCard
          key={order?._id}
          order={order}
          isExpanded={expandedOrderId === order?._id}
          onToggleExpand={() => toggleOrderExpansion(order._id)}
        />
      ))}
    </div>
  );
}
