import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-8 text-center">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold font-headline">Get in Touch</h2>
          <p className="text-muted-foreground">
            Have questions about our products, your order, or just want to say hello? Fill out the form and our team will get back to you shortly.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <a href="mailto:support@optivision.com" className="hover:underline">support@optivision.com</a>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-6 w-6 text-primary" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." required />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
