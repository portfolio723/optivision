'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Wand2, Loader2 } from 'lucide-react';
import { products } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { getStyleRecommendation, StyleAdvisorInput } from '@/ai/flows/style-advisor-flow';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { id: 1, key: 'faceShape' as const, title: 'What is your face shape?', options: ['Oval', 'Round', 'Square', 'Heart'] },
  { id: 2, key: 'stylePreference' as const, title: 'What is your style preference?', options: ['Modern', 'Classic', 'Vintage', 'Sporty'] },
  { id: 3, key: 'useCase' as const, title: 'What will you use them for?', options: ['Daily Wear', 'Reading', 'Computer', 'Driving'] },
];

export default function AIStyleAdvisor() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<StyleAdvisorInput>>({});
  const [recommendation, setRecommendation] = useState<{product: Product, reasoning: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);
      try {
        const result = await getStyleRecommendation(answers as StyleAdvisorInput);
        const recommendedProduct = products.find(p => p.id === result.productId);
        if (recommendedProduct) {
          setRecommendation({ product: recommendedProduct, reasoning: result.reasoning });
        } else {
          // Fallback if product not found
          throw new Error('Product not found');
        }
      } catch (error) {
        console.error("AI Style Advisor Error: ", error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not get a recommendation. Please try again.',
        });
        // Fallback to a random product on error
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        setRecommendation({
            product: randomProduct,
            reasoning: "We couldn't quite decide, but we think you'll love this popular style!"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleValueChange = (value: string) => {
    const currentKey = steps[currentStep].key;
    setAnswers({ ...answers, [currentKey]: value });
  };
  
  const resetAdvisor = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendation(null);
    setIsLoading(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    if(!isOpen) {
      resetAdvisor();
    }
    setOpen(isOpen);
  }

  const progressValue = recommendation ? 100 : (currentStep / steps.length) * 100;

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
          {!recommendation && !isLoading && <DialogDescription>Let&apos;s find the perfect glasses for you. Complete the steps below.</DialogDescription>}
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="font-semibold">Finding your perfect pair...</p>
            <p className="text-sm text-muted-foreground">Our AI is analyzing your style.</p>
          </div>
        ) : !recommendation ? (
          <>
            <Progress value={progressValue} className="w-full my-4" />
            <div className="py-4">
              <h3 className="font-semibold mb-4">{steps[currentStep].title}</h3>
              <RadioGroup onValueChange={handleValueChange} value={answers[steps[currentStep].key] || ''}>
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
              <Button onClick={handleNext} disabled={!answers[steps[currentStep].key]}>
                {currentStep === steps.length - 1 ? 'Get Recommendation' : 'Next'}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="text-center py-4">
            <h3 className="font-semibold text-lg mb-2">Our Recommendation for You!</h3>
            <div className="p-4 border rounded-lg">
                <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                    <Image src={recommendation.product.imageUrl} alt={recommendation.product.name} fill style={{objectFit: 'cover'}} sizes="300px"/>
                </div>
                <h4 className="font-bold">{recommendation.product.name}</h4>
                <p className="text-muted-foreground mb-3">₹{recommendation.product.price.toFixed(2)}</p>
                <p className="text-sm bg-accent/50 text-accent-foreground p-2 rounded-md">"{recommendation.reasoning}"</p>
                <Button asChild className="mt-4 w-full" onClick={() => handleOpenChange(false)}>
                    <Link href={`/product/${recommendation.product.id}`}>View Product</Link>
                </Button>
            </div>
            <Button variant="link" onClick={resetAdvisor} className="mt-2">Start Over</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}