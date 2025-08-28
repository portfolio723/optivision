import Hero from '@/components/Hero';
import ProductSection from '@/components/products/ProductSection';
import { products } from '@/lib/products';

export default function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = typeof searchParams?.q === 'string' ? searchParams.q : '';

  return (
    <div className="space-y-12">
      <Hero />
      <ProductSection products={products} searchQuery={searchQuery} />
    </div>
  );
}
