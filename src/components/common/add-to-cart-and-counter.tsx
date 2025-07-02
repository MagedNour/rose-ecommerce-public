"use client";

import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import useAddToCart from "@/hooks/cart/use-add-to-cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import useUpdateCartQuantity from "@/hooks/cart/use-update-cart-quantity";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";

export default function AddToCartAndCounter({
  initialCartQuantity = 0,
  stock,
  productId,
}: AddToCartProps) {
  // Translation
  const t = useTranslations();

  // Form & Validation
  const Schema = z.object({
    quantity: z
      .number()
      .min(1, { message: t("minimum-quantity-is-1") })
      .max(stock, { message: `${t("max-quantity-is")} ${stock}` }),
  });

  type InputType = z.infer<typeof Schema>;

  const form = useForm<InputType>({
    resolver: zodResolver(Schema),
    defaultValues: {
      quantity: initialCartQuantity > 0 ? initialCartQuantity : 1,
    },
  });

  // Mutations
  const { addToCart, isPending: isAddingToCart } = useAddToCart();
  const { updateCartQuantity, isPending: isUpdatingCart } = useUpdateCartQuantity();

  // Variables
  const isLoading = isAddingToCart || isUpdatingCart;
  const isInCart = initialCartQuantity > 0;

  // Functions
  const onSubmit: SubmitHandler<InputType> = (values) => {
    if (isInCart) {
      // If Product is already in cart update the quantity
      updateCartQuantity({ product: productId, quantity: values.quantity });
    } else {
      // If Product is not in cart add it to cart
      addToCart({ product: productId, quantity: values.quantity });
    }
  };

  const handleInputChange = (value: string) => {
    // Convert the input value to a number
    const newVal = Number(value);

    // Check if the new value exceeds the available stock limit
    if (newVal > stock) {
      form.setError("quantity", {
        type: "manual",
        message: `${t("max-quantity-is")} ${stock}`,
      });
      return;
    }

    // Check if the new value is valid and update the form
    if (newVal >= 1) {
      form.setValue("quantity", newVal);
      form.clearErrors("quantity");
    }
  };

  // Handles changes in the input field for quantity
  const handleQuantityChange = (newValue: number) => {
    // Check if the new value exceeds the available stock limit
    if (newValue > stock) {
      form.setError("quantity", {
        type: "manual",
        message: `${t("max-quantity-is")} ${stock}`,
      });

      return;
    }

    // Check if the new value is valid and update the form
    if (newValue >= 1) {
      form.setValue("quantity", newValue);
      form.clearErrors("quantity");
    }
  };

  // UseEffect
  useEffect(() => {
    if (initialCartQuantity > 0) {
      form.setValue("quantity", initialCartQuantity);
    }
  }, [initialCartQuantity, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between items-start gap-5"
      >
        <div className="flex flex-col items-start">
          {/* Quantity Label */}
          <Label className="leading-5 text-custom-muted font-medium text-base mb-4">
            {t("quantity")}
          </Label>

          {/* Quantity Field */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center justify-center">
                  {/* Minus Button */}
                  <button
                    className="bg-custom-rose-25 rounded-full w-9 h-9 flex items-center justify-center mr-0"
                    type="button"
                    disabled={field.value <= 1 || isLoading}
                    onClick={() => handleQuantityChange(field.value - 1)}
                  >
                    <Minus width={20} height={20} className="text-custom-rose-900" />
                  </button>

                  {/* Quantity Input */}
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={stock}
                      value={field.value}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="counter-input"
                      disabled={stock <= 0 || isLoading}
                    />
                  </FormControl>

                  {/* Plus Button */}
                  <button
                    className="bg-custom-rose-25 rounded-full w-9 h-9 flex items-center justify-center -ml-3"
                    type="button"
                    disabled={field.value >= stock || stock <= 0 || isLoading}
                    onClick={() => handleQuantityChange(field.value + 1)}
                  >
                    <Plus width={20} height={20} className="text-custom-rose-900" />
                  </button>
                </div>

                {/* Error Message */}
                <FormMessage className="text-custom-rose-700 text-sm" />
              </FormItem>
            )}
          />
        </div>

        {/* Add to Cart Button */}
        <Button
          className="flex items-center mt-10 gap-2 bg-custom-rose-900 text-white font-medium text-base w-[144px] h-[45px] px-5 py-2 rounded-[10px] whitespace-nowrap transition-all duration-300 ease-in-out hover:bg-custom-rose-700 active:bg-custom-rose-700"
          disabled={isLoading || stock <= 0}
          type="submit"
        >
          {/* Add To Cart Icon */}
          <ShoppingBag width={30} height={30} />
          {t("add-to-cart")}
        </Button>
      </form>
    </Form>
  );
}
