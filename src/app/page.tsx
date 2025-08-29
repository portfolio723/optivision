import Hero from '@/components/Hero';
import { products } from '@/lib/products';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import ProductSection from '@/components/products/ProductSection';

const VirtualTryOn = dynamic(() => import('@/components/VirtualTryOn'));

function HomePageContent() {
  return (
    <div className="space-y-12">
      <Hero />
      <ProductSection allProducts={products} />
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
