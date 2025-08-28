import { products } from '@/lib/products';
import ProductDetailsClient from '@/components/product/ProductDetailsClient';
import { notFound } from 'next/navigation';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id.toString() === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
