import ProductSection from '@/components/products/ProductSection';
import { products } from '@/lib/products';

export default function WomenPage() {
  const womenProducts = products.filter(p => p.category === 'Women');

  return (
    <div className="space-y-12">
      <ProductSection products={womenProducts} />
    </div>
  );
}
