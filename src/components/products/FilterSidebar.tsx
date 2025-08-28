'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Dispatch, SetStateAction } from 'react';

type Filters = {
  brands: string[];
  frameStyles: string[];
  faceShapes: string[];
  priceRange: [number, number];
};

interface FilterSidebarProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

const allBrands = ['Ray-Ban', 'Oakley', 'Warby Parker', 'Prada'];
const allFrameStyles = ['Rectangle', 'Round', 'Cat-Eye', 'Aviator'];
const allFaceShapes = ['Oval', 'Round', 'Square', 'Heart'];

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const handleCheckedChange = (category: keyof Omit<Filters, 'priceRange'>, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked ? [...prev[category], value] : prev[category].filter(v => v !== value),
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-headline">Filters</h2>
      <Accordion type="multiple" defaultValue={['price', 'brands', 'frameStyles', 'faceShapes']} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="text-lg font-semibold">Price Range</AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 25000]}
                max={25000}
                step={500}
                onValueChange={(value: [number, number]) => setFilters(prev => ({...prev, priceRange: value}))}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹{filters.priceRange[0]}</span>
                <span>₹{filters.priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger className="text-lg font-semibold">Brands</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {allBrands.map(brand => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox id={`brand-${brand}`} onCheckedChange={(checked) => handleCheckedChange('brands', brand, !!checked)} checked={filters.brands.includes(brand)} />
                <Label htmlFor={`brand-${brand}`}>{brand}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="frameStyles">
          <AccordionTrigger className="text-lg font-semibold">Frame Style</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
             {allFrameStyles.map(style => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox id={`style-${style}`} onCheckedChange={(checked) => handleCheckedChange('frameStyles', style, !!checked)} checked={filters.frameStyles.includes(style)} />
                <Label htmlFor={`style-${style}`}>{style}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faceShapes">
          <AccordionTrigger className="text-lg font-semibold">Face Shape</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {allFaceShapes.map(shape => (
              <div key={shape} className="flex items-center space-x-2">
                <Checkbox id={`shape-${shape}`} onCheckedChange={(checked) => handleCheckedChange('faceShapes', shape, !!checked)} checked={filters.faceShapes.includes(shape)} />
                <Label htmlFor={`shape-${shape}`}>{shape}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
