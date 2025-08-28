import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AIStyleAdvisor from './AIStyleAdvisor';

export default function Hero() {
  return (
    <div className="relative rounded-lg overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center">
      <Image
        src="https://picsum.photos/id/21/1440/500"
        alt="Stylish person wearing glasses"
        fill
        className="object-cover"
        data-ai-hint="stylish person"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg mb-4">
          Find Your Perfect Pair
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md mb-8 font-accent">
          Discover eyeglasses that perfectly match your style and vision needs. Try them on virtually from the comfort of your home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Shop Collection
          </Button>
          <AIStyleAdvisor />
        </div>
      </div>
    </div>
  );
}
