import ProductSection from '@/components/products/ProductSection';
import { products } from '@/lib/products';

export default function MenPage() {
  const menProducts = products.filter(p => p.category === 'Men');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Men's Eyewear</h1>
        <p className="text-lg text-muted-foreground mt-2 font-accent">
          Discover our collection of stylish and durable glasses for men.
        </p>
      </div>
      <ProductSection allProducts={products} categoryProducts={menProducts} />
    </div>
  );
}
