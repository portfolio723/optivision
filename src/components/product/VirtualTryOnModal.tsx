'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Camera, CameraOff } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function VirtualTryOnModal() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Only request permission when the dialog is opened
    if (isDialogOpen) {
      const getCameraPermission = async () => {
        // Prevent asking for permission if we already know the status
        if (hasCameraPermission !== null) return;

        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this feature.',
          });
        }
      };

      getCameraPermission();
    } else {
      // Cleanup: stop camera stream when dialog is closed
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [isDialogOpen, hasCameraPermission, toast]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            See how these glasses look on you in real-time.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            
            {hasCameraPermission === false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/50 p-4">
                    <CameraOff className="h-12 w-12 text-destructive mb-2" />
                    <p className="text-white font-semibold">Camera Access Denied</p>
                    <p className="text-sm text-white/80">Please enable camera permissions.</p>
                </div>
            )}

            {hasCameraPermission === null && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/50 p-4">
                    <p className="text-white font-semibold">Waiting for camera...</p>
                </div>
            )}
            
            {/* Simple placeholder for glasses overlay */}
            {hasCameraPermission === true && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-white bg-black/50 p-2 rounded-md text-sm">Glasses Preview Here</p>
                </div>
            )}
          </div>
          {hasCameraPermission === false && (
            <Alert variant="destructive">
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access in your browser settings to use this feature.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}