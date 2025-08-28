import Hero from '@/components/Hero';
import ProductSection from '@/components/products/ProductSection';
import { products } from '@/lib/products';

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <ProductSection allProducts={products} />
    </div>
  );
}
