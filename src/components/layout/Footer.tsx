import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Eye className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline">OptiVision</span>
            </Link>
            <p className="text-muted-foreground">Your vision, our focus. The best place to buy eyeglasses and lenses online.</p>
          </div>

          <div>
            <h3 className="font-semibold font-headline mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/men" className="text-muted-foreground hover:text-primary">Men's Glasses</Link></li>
              <li><Link href="/women" className="text-muted-foreground hover:text-primary">Women's Glasses</Link></li>
              <li><Link href="/lenses" className="text-muted-foreground hover:text-primary">Contact Lenses</Link></li>
              <li><Link href="/sunglasses" className="text-muted-foreground hover:text-primary">Sunglasses</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold font-headline mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/order-tracking" className="text-muted-foreground hover:text-primary">Order Tracking</Link></li>
              <li><Link href="/returns" className="text-muted-foreground hover:text-primary">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold font-headline mb-4">Stay Connected</h3>
            <p className="text-muted-foreground mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-background" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} OptiVision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
