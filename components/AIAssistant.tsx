
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/gemini';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Aakash.AI ready. Query system?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);
    const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const response = await geminiService.sendMessage(userMessage, history);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-90 transition-all"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[90vw] sm:w-[350px] h-[450px] bg-[#111] border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-up">
          <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase text-white/60">Aakash.AI_Persona</span>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-bold ${
                  m.role === 'user' ? 'bg-white text-black' : 'bg-white/10 text-white'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-white/20 text-[10px] font-mono animate-pulse">PROCESSING...</div>}
          </div>

          <div className="p-4 bg-white/5 border-t border-white/10">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query..."
                className="flex-grow bg-white/10 border-none rounded-xl px-4 py-2 text-xs font-bold text-white outline-none focus:bg-white/20 transition-all"
              />
              <button type="submit" disabled={!input.trim() || isTyping} className="text-white hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
