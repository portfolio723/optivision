'use client';

import dynamic from 'next/dynamic';
import { products } from '@/lib/products';

const ProductSection = dynamic(
  () => import('@/components/products/ProductSection'),
  {
    ssr: false,
    loading: () => <div>Loading products...</div>,
  }
);

export default function ProductSectionClient() {
  return <ProductSection allProducts={products} />;
}
