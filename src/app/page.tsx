import Hero from '@/components/Hero';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import ProductSectionClient from '@/components/ProductSectionClient';

const VirtualTryOn = dynamic(() => import('@/components/VirtualTryOn'));

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductSectionClient />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <VirtualTryOn />
      </Suspense>
    </div>
  );
}
