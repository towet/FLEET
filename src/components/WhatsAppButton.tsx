import { motion } from 'framer-motion';
import { FaWhatsapp, FaPaperPlane, FaSmile, FaPaperclip, FaMicrophone } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { IoMdCheckmarkCircle, IoMdClose } from 'react-icons/io';
import { FiMoreVertical, FiChevronLeft, FiVideo, FiPhone } from 'react-icons/fi';
import { getGeminiResponse } from '../lib/ai/gemini';
import { extractWebsiteContent, extractStaticContent } from '../lib/ai/websiteExtractor';

interface WhatsAppButtonProps {
  // No props needed
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'business';
  time: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hi there! How can I help you with our fleet management solutions today?',
      sender: 'business',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    }
  ]);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contentExtracted, setContentExtracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Initialize website content extraction once
  useEffect(() => {
    const initializeKnowledgeBase = async () => {
      if (!contentExtracted) {
        try {
          // First add static content
          await extractStaticContent();
          
          // Then extract dynamic content from the DOM
          // This will run after the component is mounted and DOM is available
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              extractWebsiteContent()
                .then(() => {
                  console.log('Website content successfully extracted into knowledge base');
                  setContentExtracted(true);
                })
                .catch(err => {
                  console.error('Error extracting website content:', err);
                });
            }, 2000); // Wait for 2 seconds to ensure DOM is fully loaded
          }
        } catch (error) {
          console.error('Error initializing knowledge base:', error);
        }
      }
    };
    
    initializeKnowledgeBase();
  }, [contentExtracted]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Focus input when chat opens
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };
  
  // Get conversation history as string array for context
  const getConversationHistory = () => {
    // Return last 6 messages as context (or all if less than 6)
    const contextMessages = messages.slice(-6);
    return contextMessages.map(msg => `${msg.sender === 'user' ? 'Customer' : 'Meron'}: ${msg.text}`);
  };
  
  // Function to calculate a human-like typing delay
  const getTypingDelay = (text: string) => {
    // Average human types 40-60 WPM, so about 1 character every 200-300ms
    // We'll use 30-60ms per character to make it reasonably fast but still human-like
    const baseDelay = 500; // minimum thinking time
    const charDelay = Math.floor(Math.random() * 30) + 30; // 30-60ms per character
    return baseDelay + (text.length * charDelay);
  };
  
  // Add a little randomness to typing patterns
  const randomTypingPause = () => {
    // Occasionally pause while typing to simulate thinking
    return Math.random() > 0.7 ? Math.floor(Math.random() * 800) + 400 : 0;
  };
  
  const handleSendMessage = async () => {
    if (userMessage.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: userMessage,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setUserMessage('');
    
    // Simulate business typing
    setTyping(true);
    setError(null);
    
    try {
      // Get conversation history for context
      const conversationHistory = getConversationHistory();
      
      // Get AI response from Gemini
      const aiResponse = await getGeminiResponse(newUserMessage.text, conversationHistory);
      
      // Check if the response should be split into multiple messages
      const splitResponses = aiResponse.split('||').map((text: string) => text.trim()).filter((text: string) => text.length > 0);
      
      // Add each split response as a separate message with a delay between them
      for (let i = 0; i < splitResponses.length; i++) {
        const responseText = splitResponses[i];
        
        // Calculate typing delay based on message length
        const typingDelay = getTypingDelay(responseText);
        const additionalPause = randomTypingPause();
        
        // If this is the first message, add a delay before it appears
        if (i === 0) {
          await new Promise(resolve => setTimeout(resolve, typingDelay + additionalPause));
          setTyping(false);
        } else {
          // For subsequent messages, pause between messages and show typing indicator again
          await new Promise(resolve => setTimeout(resolve, 1000)); // Pause between messages
          setTyping(true);
          await new Promise(resolve => setTimeout(resolve, typingDelay + additionalPause));
          setTyping(false);
        }
        
        // Add this part of the response as a new message
        const newBusinessMessage = {
          id: messages.length + 2 + i,
          text: responseText,
          sender: 'business' as const,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        };
        
        setMessages(prev => [...prev, newBusinessMessage]);
      }
      
      // If there were no split responses, just add the whole thing as one message
      if (splitResponses.length === 0) {
        const typingDelay = getTypingDelay(aiResponse);
        await new Promise(resolve => setTimeout(resolve, typingDelay));
        setTyping(false);
        
        const newBusinessMessage = {
          id: messages.length + 2,
          text: aiResponse,
          sender: 'business' as const,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        };
        
        setMessages(prev => [...prev, newBusinessMessage]);
      }
    } catch (err) {
      console.error('Error getting AI response:', err);
      setTyping(false);
      setError('Sorry, there was an issue generating a response. Please try again.');
      
      // Fallback response
      const fallbackMessage = {
        id: messages.length + 2,
        text: "Hey, sorry about that! I'm having some connection issues right now. Mind trying again in a bit?",
        sender: 'business' as const,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={toggleChat}
          className="group flex items-center gap-2 bg-white rounded-full pl-4 pr-5 py-3 shadow-lg 
                  hover:shadow-2xl transition-all duration-300 ease-in-out
                  border border-green-100 hover:border-green-200"
        >
          {/* Online Status Indicator */}
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <div className="relative bg-[#25D366] p-2 rounded-full 
                        shadow-[0_0_20px_rgba(37,211,102,0.5)]
                        group-hover:shadow-[0_0_25px_rgba(37,211,102,0.7)]
                        transition-all duration-300">
              <FaWhatsapp className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Talk to Us</span>
            <span className="text-xs text-green-600">Online Now</span>
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-green-500/20 
                        blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>
        </button>
      </motion.div>
      
      {/* WhatsApp Chat Panel */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col"
        >
          {/* Chat Header */}
          <div className="bg-[#075E54] text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="p-1 rounded-full hover:bg-white/10">
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <div className="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://ui-avatars.com/api/?name=Deezay+Ecofuel&background=25D366&color=fff" 
                  alt="Deezay Ecofuel" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Deezay Ecofuel</span>
                <span className="text-xs opacity-80">{typing ? 'typing...' : 'Online'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-1 rounded-full hover:bg-white/10">
                <FiVideo className="w-5 h-5" />
              </button>
              <button className="p-1 rounded-full hover:bg-white/10">
                <FiPhone className="w-5 h-5" />
              </button>
              <button className="p-1 rounded-full hover:bg-white/10">
                <FiMoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Chat Body */}
          <div 
            className="flex-1 p-3 overflow-y-auto space-y-3"
            style={{ 
              background: "#e5ddd5 url('https://cloud.githubusercontent.com/assets/398893/15136779/4e765036-1639-11e6-9201-67e728e86f39.jpg') repeat",
              boxShadow: "inset 0 10px 10px -10px #00000020"
            }}
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-2 px-3 relative ${msg.sender === 'user' 
                    ? 'bg-[#e1ffc7] rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-lg' 
                    : 'bg-white rounded-tl-none rounded-tr-lg rounded-bl-lg rounded-br-lg'}`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-gray-500">{msg.time}</span>
                    {msg.sender === 'user' && (
                      <div className="flex">
                        <IoMdCheckmarkCircle className="text-[#4FC3F7] w-3 h-3" />
                      </div>
                    )}
                  </div>
                  {/* Message triangle */}
                  <div 
                    className={`absolute top-0 w-0 h-0 border-solid ${
                      msg.sender === 'user' 
                        ? '-right-[10px] border-[10px] border-transparent border-l-[#e1ffc7] border-t-[#e1ffc7]' 
                        : '-left-[10px] border-[10px] border-transparent border-r-white border-t-white'
                    }`}
                    style={{
                      borderWidth: msg.sender === 'user' ? '0 0 10px 10px' : '0px 10px 10px 0'
                    }}
                  ></div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg max-w-[80%] flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg max-w-[80%] text-red-500">
                  {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Footer */}
          <div className="bg-[#f0f0f0] p-2 flex items-center gap-1 border-t border-gray-200">
            <button className="p-2 text-[#919191] rounded-full hover:bg-gray-200 transition-colors">
              <FaSmile className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#919191] rounded-full hover:bg-gray-200 transition-colors">
              <FaPaperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 bg-white rounded-full overflow-hidden flex items-center px-2">
              <input
                type="text"
                ref={inputRef}
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
                className="flex-1 py-2 px-2 border-none outline-none text-sm"
              />
            </div>
            <button 
              onClick={handleSendMessage}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00a884] text-white hover:bg-[#008a7c] transition-colors"
            >
              {userMessage.trim() ? <FaPaperPlane className="w-4 h-4" /> : <FaMicrophone className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Close Button */}
          <button 
            onClick={toggleChat}
            className="absolute top-2 right-2 rounded-full p-1 bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <IoMdClose className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </>
  );
};

export default WhatsAppButton;
