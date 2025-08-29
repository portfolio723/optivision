import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Camera } from 'lucide-react';

export default function VirtualTryOn() {
  return (
    <div className="rounded-lg bg-card border shadow-sm p-8 md:p-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold font-headline">See it, Wear it, Love it.</h2>
          <p className="text-muted-foreground text-lg">
            Not sure how a frame will look on you? Use our virtual try-on feature to see for yourself. Just pick a pair and activate your camera.
          </p>
          <Button size="lg" asChild>
            <Link href="/men">
              <Camera className="mr-2 h-5 w-5" />
              Try it Now
            </Link>
          </Button>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden">
           <Image
            src="https://picsum.photos/id/102/800/600"
            alt="Person using virtual try-on"
            fill
            className="object-cover"
            data-ai-hint="person face"
          />
        </div>
      </div>
    </div>
  );
}
