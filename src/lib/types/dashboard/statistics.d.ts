declare type Overall = {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
};

declare type Products = {
  title: string;
  price: number;
  imgCover: string;
  quantity: number;
  sold: number;
};

declare type ProductByCategory = {
  _id: string;
  count: number;
  category: string;
  products: Products[];
};

declare type TopSellingProducts = {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  sold: number;
  id: string;
};

declare type LowStockProducts = {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  quantity: number;
  id: string;
};

declare type OrdersByStatus = {
  _id: string;
  count: number;
};

declare type DailyRevenue = {
  _id: string;
  revenue: number;
  count: number;
};

declare type MonthlyRevenue = {
  _id: string;
  revenue: number;
  count: number;
};

declare type Categories = {
  _id: string;
  name: string;
  totalProducts: number;
  totalRevenue: number;
};

declare type Statistics = {
  statistics: {
    overall: Overall;
    products: {
      productsByCategory: ProductByCategory[];
      topSellingProducts: TopSellingProducts[];
      lowStockProducts: LowStockProducts[];
    };
    orders: {
      ordersByStatus: OrdersByStatus[];
      dailyRevenue: DailyRevenue[];
      monthlyRevenue: MonthlyRevenue[];
    };
    categories: Categories[];
  };
};
