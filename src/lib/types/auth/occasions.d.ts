interface Occasion extends DatabaseFields {
  name: string;
  slug: string;
  image: string;
  productsCount: number;
}

interface OccasionResponse {
  occasions: Occasion[];
  metadata: Metadata;
}
