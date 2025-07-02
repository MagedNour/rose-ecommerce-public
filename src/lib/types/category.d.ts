interface Category extends DatabaseFields {
  name: string;
  slug: string;
  image: string;
  productsCount: number;
}

interface CategoriesResponse {
  categories: Category[];
  metadata: Metadata;
}
