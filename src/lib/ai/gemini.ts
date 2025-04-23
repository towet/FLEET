// Import directly instead of dynamically to ensure it's properly bundled
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { searchKnowledgeBase } from "./knowledgeBase";

// Initialize with your API key from Google AI Studio
// Get a key at: https://makersuite.google.com/app/apikey 
// Replace this with your actual API key
const GEMINI_API_KEY = "AIzaSyDuWyN3Cz490QF5Zp1f10kUOy8yLB8UqjU"; // This is a placeholder, you'll need to use your own key

// Flag to track if we're using a fallback
let usingFallback = false;

// Create a Gemini instance with error handling - we'll initialize this later
let genAI: any = null;

// Try to load the Google Generative AI library
async function loadGeminiAPI() {
  try {
    // Add the Google Generative AI SDK script to the document
    if (typeof window !== 'undefined') {
      // Check if we need to add the script
      if (!document.querySelector('script[src*="generative-ai"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@google/generative-ai@latest';
        script.async = true;
        
        // Wait for the script to load
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      
      // Now the global variable should be available
      if ((window as any).GoogleGenerativeAI) {
        genAI = new (window as any).GoogleGenerativeAI(GEMINI_API_KEY);
        console.log("Successfully loaded Google Generative AI from CDN");
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Failed to load Google Generative AI:", error);
    return false;
  }
}

// Attempt to initialize the API when this module is imported
loadGeminiAPI().catch(err => {
  console.error("Initial loading of Gemini API failed:", err);
  usingFallback = true;
});

// Generate responses based on knowledge base without AI
function generateFallbackResponse(query: string, conversationHistory: string[]): string {
  // Search the knowledge base
  const relevantEntries = searchKnowledgeBase(query);
  
  if (relevantEntries.length === 0) {
    return "I don't have specific information about that, but I'd be happy to help with questions about our fuel tracking and fleet management solutions. Is there something specific about our services you'd like to know?";
  }
  
  // Get the most relevant entry
  const topEntry = relevantEntries[0];
  
  // Use conversation history to make responses more contextual if available
  const isFollowUp = conversationHistory.length > 0;
  
  // Create a simple human-like response
  const responses = isFollowUp 
    ? [
        `About ${topEntry.topic}, ${topEntry.content.split('\n')[0]}`,
        `To answer your question, ${topEntry.content.split('\n')[0]}`,
        `${topEntry.content.split('\n')[0]}`
      ]
    : [
        `Based on what I know about ${topEntry.topic}, ${topEntry.content.split('\n')[0]}`,
        `Let me tell you about that! ${topEntry.content.split('\n')[0]}`,
        `Great question! ${topEntry.content.split('\n')[0]}`
      ];
  
  // Pick a random response style
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  // See if we should ask a follow-up question
  const followUps = [
    " Is there anything specific about this you'd like to know?",
    " What aspect of this are you most interested in?",
    " Does this information help with what you're looking for?",
    ""
  ];
  
  // 50% chance to add a follow-up question
  const followUp = Math.random() > 0.5 ? followUps[Math.floor(Math.random() * followUps.length)] : "";
  
  return randomResponse + followUp;
}

export async function getGeminiResponse(prompt: string, prevMessages: string[] = []) {
  try {
    // First make sure the API is loaded
    if (!genAI) {
      const loaded = await loadGeminiAPI();
      if (!loaded) {
        usingFallback = true;
        console.log("Using fallback response system");
      }
    }
    
    // If we couldn't load the API, use fallback
    if (usingFallback) {
      return generateFallbackResponse(prompt, prevMessages);
    }
    
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
    usingFallback = true;
    return generateFallbackResponse(prompt, prevMessages);
  }
}
