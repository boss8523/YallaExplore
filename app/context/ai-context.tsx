import React, { createContext, useContext, useState } from 'react';
import { askAI as askAIService } from '@/app/services/api';
interface AiContextValue {
  askAI: (q: string) => Promise<void>;
  loading: boolean;
  data: any | null;
  error: string | null;
  setData: (d: any) => void;
}

const AiContext = createContext<AiContextValue | undefined>(undefined);

export function AiProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

// 1. Create a state to hold your chat history
const [messages, setMessages] = useState([
  { id: 1, text: "Marhaba! Where would you like to go?", sender: 'ai' }
]);

// Inside AiProvider
const askAI = async (userInput: string) => {
  setLoading(true);
  try {
    // 1. Call your n8n webhook
    const response = await fetch('https://abdigetu.app.n8n.cloud/webhook/generate-itinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput }),
    });
    
    // 2. n8n returns the object: { isJson, textResponse, parsedData }
// 2. n8n returns: { isJson, textResponse, itineraryId, parsedData }
const result = await response.json();
const { isJson, textResponse, parsedData, itineraryId } = result;

if (!isJson) {
  const aiMsg = { id: Date.now(), text: textResponse, sender: 'ai' };
  setMessages(prev => [...prev, aiMsg]);
}

// Return itineraryId so HomeScreen can use it for router.push
return { isJson, textResponse, parsedData, itineraryId };
  } catch (err) {
    console.error("AI Fetch Error:", err);
    return { isJson: false, textResponse: "Connection lost. Try again?" };
  } finally {
    setLoading(false);
  }
};
// Inside your AiProvider component...

  return (
    <AiContext.Provider value={{ 
      askAI, 
      loading, 
      messages, // <-- Essential for your chat bubbles to show up
      data, 
      error, 
      setData 
    }}>
      {children}
    </AiContext.Provider>
  );
}


export function useAi() {
  const ctx = useContext(AiContext);
  if (!ctx) throw new Error('useAi must be used inside AiProvider');
  return ctx;
}