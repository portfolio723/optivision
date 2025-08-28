import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-20rem)]">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">Thank You For Your Order!</CardTitle>
          <CardDescription>Your order has been placed successfully. A confirmation email has been sent to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">You can track your order status in your account page.</p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/account">Go to My Account</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
