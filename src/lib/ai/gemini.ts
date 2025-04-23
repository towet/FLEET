// Import directly instead of dynamically to ensure it's properly bundled
import { GoogleGenerativeAI } from "@google/generative-ai";
import { searchKnowledgeBase } from "./knowledgeBase";

// Initialize with your API key from Google AI Studio
// Get a key at: https://makersuite.google.com/app/apikey 
// Replace this with your actual API key
const GEMINI_API_KEY = "AIzaSyDuWyN3Cz490QF5Zp1f10kUOy8yLB8UqjU"; // This is a placeholder, you'll need to use your own key

// Create a Gemini instance with error handling
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function getGeminiResponse(prompt: string, prevMessages: string[] = []) {
  try {
    // Search knowledge base for relevant information
    const relevantEntries = searchKnowledgeBase(prompt);
    
    // Construct context from relevant knowledge base entries
    const knowledgeContext = relevantEntries.map(entry => 
      `${entry.topic}:\n${entry.content}`
    ).join('\n\n');

    // Create conversation history context
    const conversationContext = prevMessages.length > 0 
      ? `Recent conversation history:\n${prevMessages.join('\n')}\n\n`
      : '';

    // Create the prompt with context and specific instructions
    const fullPrompt = `You are Meron, a friendly fleet management consultant at Deezay Ecofuel in Ethiopia. You're chatting with a potential customer on WhatsApp.

Your personality:
- Friendly and warm, but not overly enthusiastic
- Knowledgeable but not technical - explain things simply
- Occasionally use casual phrases like "by the way", "actually", "you know"
- Sometimes ask follow-up questions to better understand the customer's needs
- Occasionally use emoji like 👍 or 😊 (but use them sparingly, max 1 per message)
- Break longer responses into 2-3 sentence chunks with "||" to indicate a message split

Communication style:
- Write casually like a WhatsApp message - short sentences, simple words
- Avoid formal language or business jargon
- Don't repeatedly mention contact information (they're already talking to you)
- Feel free to ask clarifying questions
- Show genuine interest in their needs
- Respond directly to what they're asking about, don't suddenly change topics
- Don't use your name to sign off messages

Important facts about your company:
- Based in Addis Ababa, Ethiopia
- You offer fuel tracking, fleet management, GPS tracking, speeding alarms
- You provide on-site installation at customer locations
- You currently track 20+ fleet vehicles
- Your working hours are Monday-Friday 8AM-6PM

${conversationContext}Knowledge Base Information:
${knowledgeContext}

Customer Message: ${prompt}

Respond conversationally as Meron. If your response is long, split it with "||" between each 2-3 sentence chunk.`;

    // GenAI is already initialized at the top of the file
    // so we can use it directly here
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Hey, sorry about that! I'm having some connection issues right now. Mind trying again in a bit? Or if you prefer, you can reach us directly at Info@deezayecofuel.co.et.";
  }
}
