"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface OrderItemProps {
  item: OrderItem;
}

export default function OrderItem({ item }: OrderItemProps) {
  const t = useTranslations();
  return (
    <div className="flex items-center gap-4 p-3 rounded-md border bg-background">
      <div className="flex-shrink-0">
        <Link href={`/orders/${item?.product?._id}`}>
          <Image
            src={item?.product?.imgCover || "/assets/images/Logo.png"}
            alt={item?.product?.title || "Product Image"}
            width={80}
            height={80}
            className="rounded-md object-cover"
          />
        </Link>
      </div>

      <div className="flex-grow min-w-0">
        <Link
          href={`/products/${item?.product?._id}`}
          className="font-medium hover:underline line-clamp-1"
        >
          {item?.product?.title}
        </Link>
        <div className="text-sm text-muted-foreground mt-1">
          {t("qty")}: {item?.quantity} ×{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "EGP",
          }).format(item?.product?.price)}
        </div>
      </div>

      <div className="flex-shrink-0 font-medium">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EGP",
        }).format(item?.product?.price * item?.quantity)}
      </div>
    </div>
  );
}
