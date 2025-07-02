type AddToCartProps = {
    productId: string;
    stock: number;
    initialCartQuantity: number;
}

type RelatedProductsProps = {
    productId: string;
    categoryId: string;
    columns?: number;
    showHeader?: boolean;
};
