
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, Clock, X, Check, Crown } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatWithAdvisor } from '../services/geminiService';
import { ThemeContext } from '../App';

interface AIAdvisorProps {
  initialMessage?: string;
  onClearInitialMessage?: () => void;
}

const DAILY_LIMIT = 10;
const COOLDOWN_SECONDS = 10;

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ initialMessage, onClearInitialMessage }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hello! I am ELIXIR-AI, your expert Cambodian insurance consultant. I can compare plans (Forte vs AIA), explain Smart Contracts, or help with claims.\n\n**How can I protect you today?**' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Logic from React Native App
  const [remaining, setRemaining] = useState(DAILY_LIMIT);
  const [cooldown, setCooldown] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const processedInitialRef = useRef(false);

  // Load usage from localStorage on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const storedDate = localStorage.getItem("usage_date");
    const used = localStorage.getItem("usage_count");

    if (storedDate !== today) {
      localStorage.setItem("usage_date", today);
      localStorage.setItem("usage_count", "0");
      setRemaining(DAILY_LIMIT);
    } else {
      const count = Number(used) || 0;
      setRemaining(Math.max(0, DAILY_LIMIT - count));
      if (count >= DAILY_LIMIT) setIsLimitReached(true);
    }
  }, []);

  // Cooldown Timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Initial Message
  useEffect(() => {
    if (initialMessage && !processedInitialRef.current) {
      processedInitialRef.current = true;
      handleSend(initialMessage);
      if (onClearInitialMessage) onClearInitialMessage();
    }
  }, [initialMessage]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    // Check Limits
    if (remaining <= 0) {
      setIsLimitReached(true);
      setShowUpgradeModal(true);
      return;
    }
    if (cooldown > 0) {
      return; 
    }

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Mock Context
    const contextData = `
      Smart Contracts Active: 1,245
      Recent Claim: Flood Damage $450 (Auto-Paid)
      User Location: Phnom Penh
    `;

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await chatWithAdvisor(history, userMsg.text, contextData);

    const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);

    // Update Usage
    const today = new Date().toISOString().split("T")[0];
    const currentUsed = Number(localStorage.getItem("usage_count")) || 0;
    const newUsed = currentUsed + 1;
    localStorage.setItem("usage_date", today);
    localStorage.setItem("usage_count", String(newUsed));
    
    setRemaining(Math.max(0, DAILY_LIMIT - newUsed));
    if (newUsed >= DAILY_LIMIT) setIsLimitReached(true);
    setCooldown(COOLDOWN_SECONDS);
  };

  // --- Robust Markdown Parser ---

  // Helper to parse inline bold: **text**
  const parseInline = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className={`font-bold ${isDark ? 'text-indigo-400' : 'text-indigo-900'}`}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();
      
      // 1. Headers (Standard ## Title)
      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={i} className={`text-base font-bold mt-4 mb-2 ${isDark ? 'text-indigo-400' : 'text-indigo-900'}`}>
            {trimmed.replace(/^##\s*/, '')}
          </h3>
        );
      }

      // 2. Headers (Legacy **Title** standalone)
      if (/^\*\*.+\*\*$/.test(trimmed) && trimmed.length < 60) {
         return (
           <h3 key={i} className={`text-sm font-bold mt-3 mb-1 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
             {trimmed.replace(/\*\*/g, '')}
           </h3>
         );
      }

      // 3. Lists (* Item or - Item)
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        return (
          <div key={i} className="flex items-start gap-2 ml-2 mb-1">
             <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
             <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
               {parseInline(trimmed.substring(2))}
             </p>
          </div>
        );
      }

      // 4. Spacer for empty lines
      if (!trimmed) return <div key={i} className="h-2"></div>;

      // 5. Default Paragraph
      return (
        <p key={i} className={`text-sm leading-relaxed mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {parseInline(line)}
        </p>
      );
    });
  };

  return (
    <div className={`flex flex-col rounded-tl-none md:rounded-tl-3xl shadow-xl overflow-hidden h-full relative transition-colors ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      
      {/* Header */}
      <div className={`p-4 md:p-6 border-b flex justify-between items-center z-10 shadow-sm flex-shrink-0 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'}`}>
        <div>
           <div className={`flex items-center space-x-2 mb-1 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">ELIXIR-AI Model 2.5</span>
           </div>
           <h2 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Expert Advisor</h2>
        </div>
        {!isLimitReached && (
          <div className="flex flex-col items-end">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${remaining <= 3 ? 'bg-rose-900/30 text-rose-400' : (isDark ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-600')}`}>
              {remaining} free questions left
            </span>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-6 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] md:max-w-2xl ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? (isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200') : 'bg-indigo-600 text-white'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? (isDark ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-white text-slate-800 border-slate-100') + ' rounded-tr-none border' 
                  : (isDark ? 'bg-indigo-900/30 text-slate-200 border-indigo-500/30' : 'bg-indigo-50 text-slate-800 border-indigo-100') + ' rounded-tl-none border'
              }`}>
                {renderMessageContent(msg.text)}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
             <div className={`flex items-center space-x-2 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                <span className={`text-xs ml-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Thinking...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t safe-area-bottom flex-shrink-0 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'}`}>
        {isLimitReached ? (
           <div className={`border rounded-xl p-4 flex justify-between items-center ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                 <div className="bg-rose-500/20 p-2 rounded-full text-rose-500">
                    <AlertCircle size={20} />
                 </div>
                 <div>
                    <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>Daily Limit Reached</p>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Upgrade to Pro for unlimited chats.</p>
                 </div>
              </div>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700"
              >
                Upgrade
              </button>
           </div>
        ) : (
          <>
            <div className={`flex items-center space-x-2 p-2 rounded-xl border focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={cooldown > 0 ? `Please wait ${cooldown}s...` : "Ask about insurance plans..."}
                disabled={isLoading || cooldown > 0}
                className={`flex-1 bg-transparent px-4 py-2 outline-none disabled:opacity-50 ${isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-700 placeholder:text-slate-400'}`}
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim() || cooldown > 0}
                className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors relative"
              >
                {cooldown > 0 ? (
                  <span className="text-xs font-mono w-4 h-4 flex items-center justify-center">{cooldown}</span>
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
            <p className={`text-center text-[10px] mt-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              ELIXIR-AI can make mistakes. Check important info.
            </p>
          </>
        )}
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
           <div className={`rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white text-center relative">
                 <button 
                   onClick={() => setShowUpgradeModal(false)}
                   className="absolute top-4 right-4 text-white/70 hover:text-white"
                 >
                    <X size={20} />
                 </button>
                 <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                    <Crown size={32} className="text-yellow-300" />
                 </div>
                 <h2 className="text-2xl font-bold mb-1">Upgrade to Premium</h2>
                 <p className="text-indigo-100 text-sm">Unlock unlimited AI advice & faster claims.</p>
              </div>
              
              <div className="p-6 space-y-4">
                 <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                    <Check className="text-emerald-500" size={20} />
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Unlimited AI Questions</span>
                 </div>
                 <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                    <Check className="text-emerald-500" size={20} />
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Priority Claim Processing</span>
                 </div>
                 <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                    <Check className="text-emerald-500" size={20} />
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Exclusive Rewards Access</span>
                 </div>
                 
                 <button 
                   onClick={() => {
                     // Mock Upgrade
                     setRemaining(100);
                     setIsLimitReached(false);
                     setShowUpgradeModal(false);
                   }}
                   className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 mt-4"
                 >
                    Get Premium - $4.99/mo
                 </button>
                 <button 
                    onClick={() => setShowUpgradeModal(false)}
                    className={`w-full py-2 text-sm hover:text-slate-600 ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400'}`}
                 >
                    Maybe later
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};
