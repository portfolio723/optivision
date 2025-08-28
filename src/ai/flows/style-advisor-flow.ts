'use server';
/**
 * @fileOverview An AI style advisor for eyeglasses.
 *
 * - getStyleRecommendation - A function that handles the style recommendation process.
 * - StyleAdvisorInput - The input type for the getStyleRecommendation function.
 * - StyleAdvisorOutput - The return type for the getStyleRecommendation function.
 */

import { ai } from '@/ai/genkit';
import { products } from '@/lib/products';
import { Product } from '@/types';
import { z } from 'zod';

const StyleAdvisorInputSchema = z.object({
  faceShape: z.string().describe('The user\'s face shape (e.g., Oval, Round, Square, Heart).'),
  stylePreference: z.string().describe('The user\'s preferred style (e.g., Modern, Classic, Vintage, Sporty).'),
  useCase: z.string().describe('The primary use for the glasses (e.g., Daily Wear, Reading, Computer, Driving).'),
});
export type StyleAdvisorInput = z.infer<typeof StyleAdvisorInputSchema>;

const StyleAdvisorOutputSchema = z.object({
  productId: z.number().describe('The ID of the recommended product.'),
  reasoning: z.string().describe('A brief explanation for why this product is a good fit.'),
});
export type StyleAdvisorOutput = z.infer<typeof StyleAdvisorOutputSchema>;

// Convert products to a string format that can be embedded in the prompt
const productCatalog = products.map(p => 
  `ID: ${p.id}, Name: ${p.name}, Brand: ${p.brand}, Frame Style: ${p.frameStyle}, Face Shape: ${p.faceShape}, Style: ${p.style}`
).join('\n');


export async function getStyleRecommendation(input: StyleAdvisorInput): Promise<StyleAdvisorOutput> {
  const recommendation = await styleAdvisorFlow(input);
  
  // Basic validation to ensure the returned ID is valid
  const recommendedProduct = products.find(p => p.id === recommendation.productId);
  if (!recommendedProduct) {
    // Fallback to a random product if the AI returns an invalid ID
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    return {
        productId: randomProduct.id,
        reasoning: "Our AI is deliberating, but we think you'll love this popular style!"
    }
  }

  return recommendation;
}

const prompt = ai.definePrompt({
  name: 'styleAdvisorPrompt',
  input: { schema: StyleAdvisorInputSchema },
  output: { schema: StyleAdvisorOutputSchema },
  prompt: `You are an expert fashion stylist specializing in eyewear. Your task is to recommend the single best pair of glasses for a user based on their preferences.

Analyze the user's face shape, style preference, and intended use case.

USER PREFERENCES:
- Face Shape: {{{faceShape}}}
- Style Preference: {{{stylePreference}}}
- Primary Use Case: {{{useCase}}}

AVAILABLE PRODUCTS:
---
{{productCatalog}}
---

Based on the user's preferences and the available products, choose the single product ID that is the best match. Provide a short, friendly reasoning for your choice. For example, if the user has a round face, recommend a square or rectangle frame to create contrast.`,
});

const styleAdvisorFlow = ai.defineFlow(
  {
    name: 'styleAdvisorFlow',
    inputSchema: StyleAdvisorInputSchema,
    outputSchema: StyleAdvisorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
        ...input,
        productCatalog // Pass the product catalog to the prompt
    });
    return output!;
  }
);