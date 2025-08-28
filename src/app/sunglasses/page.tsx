import ProductSection from '@/components/products/ProductSection';
import { products } from '@/lib/products';

export default function SunglassesPage() {
    const sunglassesProducts = products.filter(p => p.category === 'Sunglasses');
  return (
    <div className="space-y-12">
      <ProductSection products={sunglassesProducts} />
    </div>
  );
}
