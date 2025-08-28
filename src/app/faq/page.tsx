import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all our glasses. If you're not satisfied with your purchase, you can return it for a full refund or exchange, no questions asked. The product must be in its original condition."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping within India usually takes 5-7 business days. We also offer express shipping which takes 2-3 business days. You'll receive a tracking number as soon as your order is shipped."
  },
  {
    question: "Do you offer prescription lenses?",
    answer: "Yes, we offer a wide range of prescription lenses, including single vision, bifocal, and progressive lenses. You can provide your prescription details during the checkout process."
  },
  {
    question: "How do I use the Virtual Try-On feature?",
    answer: "Simply go to any product page and click the 'Virtual Try-On' button. You'll need to grant access to your camera. The feature will then overlay the glasses on your face in real-time."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards, UPI, and popular digital wallets like PayPal. All transactions are secure and encrypted."
  }
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-8 text-center">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
