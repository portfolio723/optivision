export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  brand: string;
  category: 'Men' | 'Women' | 'Lenses' | 'Sunglasses';
  frameStyle: 'Rectangle' | 'Round' | 'Cat-Eye' | 'Aviator' | 'Rimless' | 'Sport';
  lensType: 'Single Vision' | 'Bifocal' | 'Progressive' | 'Daily' | 'Monthly';
  faceShape: 'Oval' | 'Round' | 'Square' | 'Heart';
  style: 'Casual' | 'Luxury' | 'Professional' | 'Sport';
  description: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}
