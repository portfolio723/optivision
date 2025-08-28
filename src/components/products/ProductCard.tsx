'use client';

import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartProvider';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    toast({
        title: "Added to cart!",
        description: `${product.name} is now in your shopping cart.`,
    })
  };

  return (
    <Card className="overflow-hidden flex flex-col group shadow-md hover:shadow-xl transition-all duration-300 rounded-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`} className="block relative aspect-square">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              data-ai-hint="stylish eyeglasses"
            />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground font-accent">{product.brand}</p>
        <CardTitle className="text-lg font-semibold font-headline leading-tight mb-2">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex items-center text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-transparent stroke-current'}`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-accent">({product.reviews} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-bold font-body">₹{product.price.toFixed(2)}</p>
        <Button variant="outline" size="icon" onClick={handleAddToCart}>
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
