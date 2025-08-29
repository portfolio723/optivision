import Hero from '@/components/Hero';
import { Suspense } from 'react';
import ProductSectionClient from '@/components/ProductSectionClient';
import VirtualTryOnClient from '@/components/VirtualTryOnClient';

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductSectionClient />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <VirtualTryOnClient />
      </Suspense>
    </div>
  );
}
