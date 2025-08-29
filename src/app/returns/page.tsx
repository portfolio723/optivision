import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Receipt, Undo2 } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-8 text-center">Returns & Exchanges</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-headline">Our 30-Day Promise</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            At OptiVision, your satisfaction is our priority. If you're not 100% happy with your purchase, you can return or exchange it within 30 days of receipt. We aim to make the process as simple as possible.
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold font-headline mb-4">How to Initiate a Return</h2>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-2">
                <Undo2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-lg">1. Start a Request</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">Log in to your account, go to 'Order History', and select the order you wish to return. Click the 'Request Return' button.</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-2">
                <Package className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-lg">2. Pack Your Item</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">Securely pack the item in its original packaging. Make sure to include all accessories and documentation.</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-2">
                <Receipt className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-lg">3. Get Refunded</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">Once we receive and inspect the item, your refund will be processed to the original payment method within 5-7 business days.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="font-bold font-headline text-xl mb-2">Conditions for Return</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Items must be in their original, unworn condition.</li>
            <li>All original packaging, cases, and cloths must be included.</li>
            <li>Custom prescription lenses are subject to a partial refund.</li>
            <li>Items marked as <Badge variant="destructive">Final Sale</Badge> cannot be returned.</li>
        </ul>
      </div>

    </div>
  );
}
