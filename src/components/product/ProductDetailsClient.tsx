'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartProvider";
import type { Product } from "@/types";
import { Check, ShieldCheck, Star, Truck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { VirtualTryOnModal } from "./VirtualTryOnModal";

export default function ProductDetailsClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast({
      title: "Added to cart!",
      description: `${product.name} is now in your shopping cart.`,
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="grid gap-4">
        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            data-ai-hint="eyeglasses product"
          />
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-lg text-muted-foreground font-accent">{product.brand}</p>
          <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-transparent stroke-current'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-accent">({product.reviews} reviews)</span>
          </div>
          <p className="text-3xl font-bold font-headline mt-4">₹{product.price.toFixed(2)}</p>
        </div>
        <p className="text-muted-foreground font-body">{product.description}</p>
        <Separator />
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="flex-1" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <VirtualTryOnModal />
        </div>
        <Separator />
        <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Frame Style: <strong>{product.frameStyle}</strong></span>
            </div>
             <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Lens Type: <strong>{product.lensType}</strong></span>
            </div>
            <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping & returns</span>
            </div>
            <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>1-year warranty included</span>
            </div>
        </div>
      </div>
    </div>
  );
}
