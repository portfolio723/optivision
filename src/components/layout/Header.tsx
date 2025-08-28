'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Eye, Menu, Search, User } from 'lucide-react';
import { CartSheet } from '../cart/CartSheet';

const navLinks = [
  { href: '#', label: 'Men' },
  { href: '#', label: 'Women' },
  { href: '#', label: 'Lenses' },
  { href: '#', label: 'Sunglasses' },
  { href: '#', label: 'Virtual Try-On' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  {navLinks.map((link) => (
                    <Link key={link.label} href={link.href} className="text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <Eye className="h-7 w-7 text-primary" />
              <span className="text-2xl font-bold font-headline hidden sm:inline-block">OptiVision</span>
            </Link>
          </div>

          <nav className="hidden lg:flex lg:gap-6">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="pl-8 sm:w-[200px] lg:w-[300px] bg-background" />
            </div>

            <Link href="/login" aria-label="Account">
               <Button variant="ghost" size="icon">
                <User />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
            
            <CartSheet />
          </div>
        </div>
      </div>
    </header>
  );
}
