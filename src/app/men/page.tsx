import ProductSection from '@/components/products/ProductSection';
import { products } from '@/lib/products';

export default function MenPage() {
  const menProducts = products.filter(p => p.category === 'Men');

  return (
    <div className="space-y-12">
      <ProductSection products={menProducts} />
    </div>
  );
}
