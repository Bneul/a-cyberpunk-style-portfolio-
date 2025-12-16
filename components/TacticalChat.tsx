import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { MessageSquare, Send, X, Terminal, Cpu } from 'lucide-react';
import { ChatMessage } from '../types';
import { SYSTEM_PROMPT } from '../constants';

const TacticalChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: 'SYSTEM ONLINE. NEXUS AI initialized. Awaiting queries regarding Director Clearance Level 5.',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize Chat Ref
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    // Scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Initialize if not already done
      if (!chatSessionRef.current) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_PROMPT,
          },
        });
      }

      const streamResult = await chatSessionRef.current.sendMessageStream({ message: userMsg.text });
      
      let fullResponseText = '';
      const botMsgId = (Date.now() + 1).toString();
      
      // Add placeholder for streaming response
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: 'model',
        text: '',
        timestamp: new Date(),
        isStreaming: true
      }]);

      for await (const chunk of streamResult) {
        // Correct way to access text per updated guidance
        const chunkText = chunk.text;
        if (chunkText) {
            fullResponseText += chunkText;
            setMessages(prev => prev.map(msg => 
                msg.id === botMsgId 
                    ? { ...msg, text: fullResponseText }
                    : msg
            ));
        }
      }
      
      // Finalize message state
      setMessages(prev => prev.map(msg => 
        msg.id === botMsgId 
            ? { ...msg, isStreaming: false }
            : msg
      ));

    } catch (error) {
      console.error('Connection interrupted:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: 'ERROR: UPLINK FAILED. SECURE CONNECTION REQUIRED. (Check API Key)',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={toggleChat}
        className={`fixed bottom-8 right-8 z-50 p-4 border-2 transition-all duration-300 group
          ${isOpen ? 'border-cyber-primary bg-cyber-primary/20 rotate-90 scale-0' : 'border-cyber-secondary bg-cyber-panel/90 scale-100 hover:scale-110'}
          backdrop-blur-md rounded-none skew-x-[-10deg] shadow-[0_0_15px_rgba(189,0,255,0.5)]`}
      >
        <div className="skew-x-[10deg]">
             {!isOpen && <MessageSquare className="w-6 h-6 text-cyber-secondary group-hover:text-white" />}
        </div>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-8 right-8 z-50 w-full max-w-sm sm:max-w-md transition-all duration-500 origin-bottom-right
        ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        <div className="bg-cyber-panel/95 border border-cyber-primary/50 backdrop-blur-xl shadow-[0_0_30px_rgba(0,243,255,0.2)] overflow-hidden flex flex-col h-[500px]">
          
          {/* Header */}
          <div className="bg-cyber-dark/80 p-3 border-b border-cyber-primary/30 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-cyber-primary">
              <Cpu className="w-5 h-5 animate-pulse" />
              <span className="font-display font-bold tracking-widest text-sm">NEXUS AI // V2.5</span>
            </div>
            <button onClick={toggleChat} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-cyber-primary/30 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 border ${
                  msg.role === 'user' 
                    ? 'border-cyber-secondary/50 bg-cyber-secondary/10 text-gray-100 rounded-tl-xl rounded-bl-xl rounded-br-xl' 
                    : 'border-cyber-primary/50 bg-cyber-primary/10 text-cyan-50 rounded-tr-xl rounded-bl-xl rounded-br-xl'
                }`}>
                  <div className="flex items-center space-x-2 mb-1 opacity-50 text-xs">
                    {msg.role === 'model' && <Terminal className="w-3 h-3" />}
                    <span>{msg.role === 'user' ? 'OPERATOR' : 'NEXUS'}</span>
                    <span>{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                    {msg.isStreaming && <span className="inline-block w-2 h-4 ml-1 bg-cyber-primary animate-pulse align-middle"/>}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-cyber-dark/90 border-t border-cyber-primary/30">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter command..."
                className="flex-1 bg-cyber-black/50 border border-gray-700 focus:border-cyber-primary text-white p-2 font-mono text-sm outline-none transition-colors placeholder-gray-600"
                disabled={isTyping}
              />
              <button 
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="p-2 bg-cyber-primary/20 border border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-primary"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-primary"></div>
        </div>
      </div>
    </>
  );
};

export default TacticalChat;
