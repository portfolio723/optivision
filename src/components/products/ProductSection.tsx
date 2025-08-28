'use client';
import type { Product } from '@/types';
import { useMemo, useState } from 'react';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';

interface ProductSectionProps {
  products: Product[];
  searchQuery?: string;
}

export default function ProductSection({ products, searchQuery = '' }: ProductSectionProps) {
  const [filters, setFilters] = useState({
    brands: [],
    frameStyles: [],
    faceShapes: [],
    priceRange: [0, 25000] as [number, number],
  });

  const filteredProducts = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    return products.filter(product => {
      // Search filter
      if (searchQuery) {
        const inName = product.name.toLowerCase().includes(lowercasedQuery);
        const inBrand = product.brand.toLowerCase().includes(lowercasedQuery);
        if (!inName && !inBrand) {
          return false;
        }
      }
      
      // Sidebar filters
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
  }, [products, filters, searchQuery]);

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
