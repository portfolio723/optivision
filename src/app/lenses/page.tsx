import ProductSection from '@/components/products/ProductSection';
import { products } from '@/lib/products';

export default function LensesPage() {
    const lensesProducts = products.filter(p => p.category === 'Lenses');
  return (
    <div className="space-y-8">
       <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Contact Lenses</h1>
        <p className="text-lg text-muted-foreground mt-2 font-accent">
          Find comfortable and high-quality contact lenses for your vision needs.
        </p>
      </div>
      <ProductSection allProducts={products} categoryProducts={lensesProducts} />
    </div>
  );
}
