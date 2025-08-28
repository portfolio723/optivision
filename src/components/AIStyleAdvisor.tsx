'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Wand2 } from 'lucide-react';
import { products } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

const steps = [
  { id: 1, title: 'What is your face shape?', options: ['Oval', 'Round', 'Square', 'Heart'] },
  { id: 2, title: 'What is your style preference?', options: ['Modern', 'Classic', 'Vintage', 'Sporty'] },
  { id: 3, title: 'What will you use them for?', options: ['Daily Wear', 'Reading', 'Computer', 'Driving'] },
];

export default function AIStyleAdvisor() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [recommendation, setRecommendation] = useState<Product | null>(null);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // "AI" logic: find a product based on answers. Very simplified.
      const recommendedProduct = products[Math.floor(Math.random() * products.length)];
      setRecommendation(recommendedProduct);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleValueChange = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value });
  };
  
  const resetAdvisor = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendation(null);
  }

  const handleOpenChange = (isOpen: boolean) => {
    if(!isOpen) {
      resetAdvisor();
    }
    setOpen(isOpen);
  }

  const progress = ((currentStep + 1) / (steps.length + 1)) * 100;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="bg-white/20 text-white backdrop-blur-sm border-white/50 hover:bg-white/30 hover:text-white">
          <Wand2 className="mr-2 h-5 w-5" />
          AI Style Advisor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">AI Style Advisor</DialogTitle>
          <DialogDescription>Let&apos;s find the perfect glasses for you. Complete the steps below.</DialogDescription>
        </DialogHeader>
        <Progress value={progress} className="w-full my-4" />
        
        {!recommendation ? (
        <>
        <div className="py-4">
          <h3 className="font-semibold mb-4">{steps[currentStep].title}</h3>
          <RadioGroup onValueChange={handleValueChange} value={answers[currentStep] || ''}>
            {steps[currentStep].options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option.toLowerCase()} />
                <Label htmlFor={option.toLowerCase()}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <DialogFooter>
          {currentStep > 0 && <Button variant="outline" onClick={handleBack}>Back</Button>}
          <Button onClick={handleNext} disabled={!answers[currentStep]}>
            {currentStep === steps.length - 1 ? 'Get Recommendation' : 'Next'}
          </Button>
        </DialogFooter>
        </>
        ) : (
          <div className="text-center py-4">
            <h3 className="font-semibold text-lg mb-2">Our Recommendation for You!</h3>
            <div className="p-4 border rounded-lg">
                <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                    <Image src={recommendation.imageUrl} alt={recommendation.name} fill style={{objectFit: 'cover'}} sizes="300px"/>
                </div>
                <h4 className="font-bold">{recommendation.name}</h4>
                <p className="text-muted-foreground">${recommendation.price.toFixed(2)}</p>
                <Button asChild className="mt-4 w-full" onClick={() => handleOpenChange(false)}>
                    <Link href={`/product/${recommendation.id}`}>View Product</Link>
                </Button>
            </div>
            <Button variant="link" onClick={resetAdvisor} className="mt-2">Start Over</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
