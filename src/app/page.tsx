import Hero from '@/components/Hero';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ProductSection = dynamic(() => import('@/components/products/ProductSection'), {
  ssr: false,
  loading: () => <div>Loading products...</div>
});
const VirtualTryOn = dynamic(() => import('@/components/VirtualTryOn'));

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductSection allProducts={[]} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <VirtualTryOn />
      </Suspense>
    </div>
  );
}
