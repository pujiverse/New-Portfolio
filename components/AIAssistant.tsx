
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PortfolioData } from '../types';
import { MessageSquare, Send, X, Bot } from 'lucide-react';

interface AIAssistantProps {
  data: PortfolioData;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: `Hi! I'm ${data.profile.name}'s virtual assistant. Ask me anything about their experience, specific responsibilities, academic achievements, or skills!` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemPrompt = `
        You are an AI assistant for ${data.profile.name}'s professional portfolio.
        Current Portfolio Data:
        - Role: ${data.profile.role}
        - Bio: ${data.profile.bio}
        - Skills: ${data.skills.map(s => `${s.name} (${s.category})`).join(', ')}
        - Experience: ${data.experience.map(e => `
          Role: ${e.role} at ${e.company} (${e.period}). 
          Responsibilities: ${e.responsibilities || 'N/A'}. 
          Environment: ${e.environment || 'N/A'}.`).join('\n')}
        - Education: ${data.education.map(e => `
          Degree: ${e.degree} from ${e.school} (${e.year}). 
          GPA: ${e.gpa || 'N/A'}. 
          Activities: ${e.activities || 'N/A'}. 
          Achievements: ${e.achievements || 'N/A'}`).join('\n')}

        Answer concisely and professionally. If you don't know something based on the data, suggest they reach out via email: ${data.profile.email}.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: systemPrompt
        }
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Sorry, I couldn't process that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="w-[350px] sm:w-[400px] h-[500px] glass rounded-3xl flex flex-col shadow-2xl border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-blue-400" />
              <span className="font-semibold text-sm">Portfolio AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white/10 text-neutral-200 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none animate-pulse">
                  <div className="h-4 w-12 bg-white/20 rounded"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about my experience..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500/50"
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
