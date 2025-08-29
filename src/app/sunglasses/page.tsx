import ProductSection from '@/components/products/ProductSection';
import { products } from '@/lib/products';
import { Suspense } from 'react';

function SunglassesPageContent() {
  const sunglassesProducts = products.filter(p => p.category === 'Sunglasses');
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Sunglasses Collection</h1>
        <p className="text-lg text-muted-foreground mt-2 font-accent">
          Protect your eyes in style with our trendy and durable sunglasses.
        </p>
      </div>
      <ProductSection allProducts={products} categoryProducts={sunglassesProducts} />
    </div>
  );
}

export default function SunglassesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SunglassesPageContent />
    </Suspense>
  );
}
