declare type Product = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  discount: number;
  sold: number;
  occasion: string;
  __v: number;
  rateAvg: number;
  rateCount: number;
} & DatabaseFields;

declare interface FetchProductsResponse {
  products: Product[];
  metadata: MetaData;
}

declare type ProductResponse = {
  products: Product[];
  metadata: MetaData;
};
