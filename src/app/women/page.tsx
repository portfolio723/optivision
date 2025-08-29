import ProductSection from '@/components/products/ProductSection';
import { products } from '@/lib/products';

export default function WomenPage() {
  const womenProducts = products.filter(p => p.category === 'Women');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Women&apos;s Eyewear</h1>
        <p className="text-lg text-muted-foreground mt-2 font-accent">
          Explore elegant and fashionable frames designed for women.
        </p>
      </div>
      <ProductSection allProducts={products} categoryProducts={womenProducts} />
    </div>
  );
}
