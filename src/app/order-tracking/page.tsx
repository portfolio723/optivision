import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Truck } from 'lucide-react';

export default function OrderTrackingPage() {
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-2">
            <Truck className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline">Track Your Order</CardTitle>
          <CardDescription>Enter your order details below to see the status of your shipment.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="order-id">Order ID</Label>
              <Input id="order-id" placeholder="e.g., ORD001" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <Button type="submit" className="w-full">
              Track Order
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
