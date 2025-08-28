'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera } from 'lucide-react';
import Image from 'next/image';

export function VirtualTryOnModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="flex-1">
          <Camera className="mr-2 h-5 w-5" />
          Virtual Try-On
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Virtual Try-On</DialogTitle>
          <DialogDescription>
            See how these glasses look on you! This feature is coming soon.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          <div className="relative w-64 h-64">
            <Image
              src="https://picsum.photos/400/400"
              alt="Person's face"
              className="rounded-full object-cover"
              fill
              data-ai-hint="person face"
              sizes="256px"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* This would be where the glasses overlay goes */}
              <p className="text-white bg-black/50 p-2 rounded-md">Glasses Preview Here</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Our upcoming AR feature will use your camera to let you try on glasses in real time.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
