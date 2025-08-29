import Hero from '@/components/Hero';
import { products } from '@/lib/products';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ProductSection = dynamic(() => import('@/components/products/ProductSection'));
const VirtualTryOn = dynamic(() => import('@/components/VirtualTryOn'));

function HomePageContent() {
  return (
    <div className="space-y-12">
      <Hero />
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductSection allProducts={products} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <VirtualTryOn />
      </Suspense>
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
