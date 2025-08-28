'use client';
import type { Product } from '@/types';
import { useMemo, useState } from 'react';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';

interface ProductSectionProps {
  products: Product[];
}

export default function ProductSection({ products }: ProductSectionProps) {
  const [filters, setFilters] = useState({
    brands: [],
    frameStyles: [],
    faceShapes: [],
    priceRange: [0, 500] as [number, number],
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const { brands, frameStyles, faceShapes, priceRange } = filters;
      const [minPrice, maxPrice] = priceRange;

      if (brands.length > 0 && !brands.includes(product.brand)) {
        return false;
      }
      if (frameStyles.length > 0 && !frameStyles.includes(product.frameStyle)) {
        return false;
      }
      if (faceShapes.length > 0 && !faceShapes.includes(product.faceShape)) {
        return false;
      }
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
      return true;
    });
  }, [products, filters]);

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </aside>
      <main className="lg:col-span-3">
        <div className="mb-4">
            <h2 className="text-2xl font-bold font-headline">Our Collection</h2>
            <p className="text-muted-foreground">{filteredProducts.length} results found</p>
        </div>
        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
}
