import { useTranslations } from "next-intl";
import Image from "next/image";

export default function EmptyCart() {
  // Translation
  const t = useTranslations();

  return (
    <div className="container flex flex-col justify-center items-center h-[50vh]  ">
      <Image src="/assets/images/empty-cart.png" alt="empty-cart" width={180} height={0} />
      <h2 className="text-3xl font-bold text-custom-blue-900">{t("your-cart-is-empty")}</h2>
    </div>
  );
}
