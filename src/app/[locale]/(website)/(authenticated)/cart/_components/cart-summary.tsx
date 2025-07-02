import Arrow from "@/components/common/arrow";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function CartSummary({ cart }: { cart: Cart }) {
  // Translation
  const t = useTranslations();

  return (
    <div className="justify-items-center h-fit">
      {/* Cart Summary */}
      <div className=" h-[415px] w-[300px] rounded-[20px] flex flex-col justify-between bg-custom-rose-25 p-10 text-custom-blue-900 ">
        <h3 className="text-xl font-semibold">{t("cart-summary")}</h3>
        <div className=" flex flex-col gap-2 mb-3 ">
          {/* Subtotal */}
          <div className="flex justify-between">
            <p className="font-bold text-custom-blue-900 ">{t("sub-total")}:</p>
            <p className=" text-gray-500 ">${cart?.totalPrice}</p>
          </div>
          {/* Discount */}
          <div className="flex justify-between ">
            <p className="font-bold text-custom-blue-900 ">{t("discount")}:</p>
            {cart?.discount ? (
              <p className="text-gray-500 ">%{cart?.discount}</p>
            ) : (
              <p className="text-gray-500 ">{t("no-discount")}</p>
            )}
          </div>
          {/* Shipping */}
          <div className="flex justify-between ">
            <p className="font-bold text-custom-blue-900 ">{t("shipping")}:</p>
            <p className="text-gray-500 ">{t("free")}</p>
          </div>
          {/* Taxes */}
          <div className="flex justify-between ">
            <p className="font-bold text-custom-blue-900 ">{t("taxes")}:</p>
            <p className="text-gray-500 ">0</p>
          </div>
        </div>
        {/* Total */}
        <div className="flex justify-between -mt-5">
          <p className="font-bold text-custom-blue-900 ">{t("total")}</p>
          <p className="font-bold text-custom-rose-900 ">${cart?.totalPriceAfterDiscount}</p>
        </div>
        {/* Checkout Button */}
        <div className=" flex justify-end">
          <Link
            href="/checkout"
            className="w-[165px] h-[50px] text-white text-base rounded-lg font-medium bg-custom-rose-900 text-center flex justify-center items-center gap-1 "
          >
            {t("checkout-now")}
            <Arrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
