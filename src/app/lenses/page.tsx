import ProductSection from '@/components/products/ProductSection';
import { products } from '@/lib/products';

export default function LensesPage() {
    const lensesProducts = products.filter(p => p.category === 'Lenses');
  return (
    <div className="space-y-12">
      <ProductSection products={lensesProducts} />
    </div>
  );
}
