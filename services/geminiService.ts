
import { GoogleGenAI } from "@google/genai";

export async function getCoffeeRecommendation(mood: string, preferences: string, language: string = 'en', currencyCode: string = 'USD') {
  const langNames: Record<string, string> = {
    'en': 'English',
    'mn': 'Mongolian',
    'kk': 'Kazakh',
    'ru': 'Russian'
  };

  // Initialize Gemini inside the function right before making the API call to ensure it uses the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User mood: ${mood}. User preferences: ${preferences}. Active currency: ${currencyCode}. Recommend a coffee drink from 57 Coffee House. Respond in ${langNames[language] || 'English'}. Be creative, poetic, and concise.`,
      config: {
        systemInstruction: `You are an elite barista and coffee sommelier at '57 Coffee House'. Your job is to suggest the perfect drink. Menu: Signature 57 Latte, Nitro Cold Brew, Ceremonial Matcha, V60 Pour Over, Flat White. Respond in a stylish tone in ${langNames[language]}. Mention that we are currently supporting ${currencyCode} prices with live daily updates.`,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I recommend our classic V60 Pour Over – a sophisticated choice.";
  }
}
