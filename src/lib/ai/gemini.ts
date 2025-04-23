import { GoogleGenerativeAI } from "@google/generative-ai";
import { searchKnowledgeBase } from "./knowledgeBase";

// WARNING: Avoid hardcoding API keys. Use environment variables.
const GEMINI_API_KEY = "AIzaSyDqPkozpfOi-MR_C87yOZZZuG3LuHxet7k";

// Create a Gemini instance with error handling
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function getGeminiResponse(prompt: string, prevMessages: string[] = []) {
  try {
    // Search knowledge base for relevant information
    const relevantEntries = searchKnowledgeBase(prompt);
    
    // Construct context from relevant knowledge base entries with proper formatting
    const knowledgeContext = relevantEntries.map(entry => 
      `### ${entry.topic}:\n${entry.content}`
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

## IMPORTANT: ALWAYS USE THE FOLLOWING KNOWLEDGE BASE INFORMATION AS YOUR PRIMARY SOURCE OF FACTS
${knowledgeContext}

You MUST:
- Use ONLY facts from the knowledge base when answering questions
- Never make up information that isn't contained in the knowledge base
- If you don't know something, say you'll check with the team and get back to them
- Use the knowledge base context for accurate information about locations, services, and contact details
- For complex questions, stick to what you know from the knowledge base

${conversationContext}

Customer Message: ${prompt}

Respond conversationally as Meron. If your response is long, split it with "||" between each 2-3 sentence chunk.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // Attempt to get basic information from knowledge base as a fallback
    try {
      const basicInfo = searchKnowledgeBase("company information contact location");
      let contactInfo = '';
      if (basicInfo.length > 0) {
        // Extract contact details from knowledge base
        for (const entry of basicInfo) {
          if (entry.topic.toLowerCase().includes('contact')) {
            contactInfo = entry.content;
            break;
          }
        }
      }
      
      return `Hey, sorry about that! I'm having some connection issues right now. Mind trying again in a bit? ${contactInfo ? `Or if you prefer, you can reach us directly at ${contactInfo}.` : 'Or if you prefer, you can reach us directly at Info@deezayecofuel.co.et.'}`;
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError);
      return "Hey, sorry about that! I'm having some connection issues right now. Mind trying again in a bit? Or if you prefer, you can reach us directly at Info@deezayecofuel.co.et.";
    }
  }
}
