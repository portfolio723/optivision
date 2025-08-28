import { products } from '@/lib/products';
import ProductDetailsClient from '@/components/product/ProductDetailsClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id.toString() === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
