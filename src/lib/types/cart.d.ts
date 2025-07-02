declare type CartItem = {
  _id: string;
  product: Product;
  price: number;
  quantity: number;
};

declare type Cart = {
  user: string;
  cartItems: CartItem[];
  discount: number;
  totalPrice: number;
  totalPriceAfterDiscount: number;
} & DatabaseFields;

declare type CartResponse = {
  numOfCartItems: number;
  cart: Cart;
};

declare type CartFields = {
  product: string;
  quantity: number;
};

declare type CashCheckoutResponse = {
  order: Order;
};

declare type CreditCheckoutResponse = {
  session: {
    id: string;
    object: string;
    amount_subtotal: number;
    amount_total: number;
    automatic_tax: {
      enabled: boolean;
      status: string | null;
    };
    cancel_url: string;
    client_reference_id: string | null;
    currency: string;
    customer: string | null;
    customer_email: string | null;
    expires_at: number;
    livemode: boolean;
    metadata: Record<string, string>;
    mode: string;
    payment_intent: string | null;
    payment_method_types: string[];
    status: string;
    success_url: string;
    total_details: {
      amount_discount: number;
      amount_shipping: number;
      amount_tax: number;
    };
    url: string;
  };
};

declare type OrderState =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled";
