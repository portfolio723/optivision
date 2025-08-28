import type { Product } from '@/types';
import ProductDisplay from './ProductDisplay';

interface ProductSectionProps {
  allProducts: Product[];
  categoryProducts?: Product[];
}

export default function ProductSection({ allProducts, categoryProducts }: ProductSectionProps) {
  const productsToDisplay = categoryProducts || allProducts;
  return <ProductDisplay products={productsToDisplay} />;
}
