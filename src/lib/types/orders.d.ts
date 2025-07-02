declare type Order = {
  user: string;
  orderItems: OrderItem[];
  totalPrice: number;
  paymentType: string;
  isPaid: boolean;
  isDelivered: boolean;
  state: string;
  orderNumber: string;
  __v: string;
} & DatabaseFields;

declare type OrderItem = {
  product: Product;
  price: string;
  quantity: number;
  _id: string;
};

declare type OrdersResponse = {
  metadata: MetaData;
  orders: Order[];
};
