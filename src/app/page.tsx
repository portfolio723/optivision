import Hero from '@/components/Hero';
import ProductSection from '@/components/products/ProductSection';
import { products } from '@/lib/products';
import VirtualTryOn from '@/components/VirtualTryOn';
import { Suspense } from 'react';

function HomePageContent() {
  return (
    <div className="space-y-12">
      <Hero />
      <ProductSection allProducts={products} />
      <VirtualTryOn />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
