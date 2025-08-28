export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  brand: string;
  frameStyle: 'Rectangle' | 'Round' | 'Cat-Eye' | 'Aviator';
  lensType: 'Single Vision' | 'Bifocal' | 'Progressive';
  faceShape: 'Oval' | 'Round' | 'Square' | 'Heart';
  description: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}
