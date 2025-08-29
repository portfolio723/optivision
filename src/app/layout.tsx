import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartProvider';
import { Inter, Playfair_Display, Lato } from 'next/font/google';

export const metadata: Metadata = {
  title: 'OptiVision: Eyeglasses & Lenses',
  description: 'Your vision, our focus. The best place to buy eyeglasses and lenses online.',
};

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`light ${playfairDisplay.variable} ${inter.variable} ${lato.variable}`}>
      <head>
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      </head>
      <body>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
