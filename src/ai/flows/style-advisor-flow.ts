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
  faceShape: z.string().describe("The user's face shape (e.g., Oval, Round, Square, Heart)."),
  stylePreference: z.string().describe("The user's preferred style (e.g., Modern, Classic, Vintage, Sporty)."),
  useCase: z.string().describe('The primary use for the glasses (e.g., Daily Wear, Reading, Computer, Driving).'),
});
export type StyleAdvisorInput = z.infer<typeof StyleAdvisorInputSchema>;

const StyleAdvisorOutputSchema = z.object({
  productId: z.number().describe('The ID of the recommended product.'),
  reasoning: z.string().describe('A brief explanation for why this product is a good fit.'),
});
export type StyleAdvisorOutput = z.infer<typeof StyleAdvisorOutputSchema>;

// Convert products to a JSON string format that can be embedded in the prompt
const productCatalog = JSON.stringify(
  products.map(p => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    frameStyle: p.frameStyle,
    faceShape: p.faceShape, // The ideal face shape for the glasses
    style: p.style,
    price: p.price
  }))
);


export async function getStyleRecommendation(input: StyleAdvisorInput): Promise<StyleAdvisorOutput> {
  const recommendation = await styleAdvisorFlow(input);
  
  // Basic validation to ensure the returned ID is valid
  const recommendedProduct = products.find(p => p.id === recommendation.productId);
  if (!recommendedProduct) {
    // Fallback to a random product if the AI returns an invalid ID
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    return {
        productId: randomProduct.id,
        reasoning: "Our AI is deliberating on the perfect match for you, but we're confident you'll adore this popular and versatile style!"
    }
  }

  return recommendation;
}

const prompt = ai.definePrompt({
  name: 'styleAdvisorPrompt',
  input: { schema: StyleAdvisorInputSchema },
  output: { schema: StyleAdvisorOutputSchema },
  prompt: `You are an expert virtual fashion stylist for OptiVision, a premium eyewear brand. Your task is to recommend the single best pair of glasses for a user based on their preferences.

Analyze the user's inputs and match them against the product catalog. Provide a compelling, friendly, and concise reason for your choice.

**Your Goal:** Find the perfect intersection of face shape flattery, personal style, and practical use.

**Guiding Principles for Recommendations:**
- **Contrast is Key:** For angular face shapes (Square), recommend softer, rounder frames. For rounder face shapes (Round), recommend angular frames (Rectangle, Square) to add definition.
- **Harmony:** Oval faces are versatile and suit most frame styles. Heart-shaped faces look great with frames that are wider at the bottom or have decorative details on the lower half.
- **Style Match:** Align the product's 'style' attribute (e.g., Luxury, Professional, Sport) with the user's 'stylePreference'.
- **Use Case:** Consider the durability and features needed for the user's primary 'useCase'. For example, 'Sport' styles are better for active use.

**User Preferences:**
- **Face Shape:** {{{faceShape}}}
- **Style Preference:** {{{stylePreference}}}
- **Primary Use Case:** {{{useCase}}}

**Available Products (JSON Format):**
---
{{{productCatalog}}}
---

Based on the user's preferences and our product catalog, choose the single product ID that is the absolute best match. In your reasoning, briefly explain *why* it's a great fit for their face shape and style preference.`,
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
        productCatalog
    });
    return output!;
  }
);
