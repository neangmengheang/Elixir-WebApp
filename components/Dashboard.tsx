
import React, { useState, useContext } from 'react';
import { Sparkles, Search, Car, Heart, Briefcase, Plane, ChevronRight, Shield, Info, X, MessageCircle } from 'lucide-react';
import { User } from '../types';
import { ThemeContext } from '../App';

interface DashboardProps {
  onAsk: (question: string) => void;
  currentUser?: User;
}

// Custom component to handle image loading errors
const PartnerLogo = ({ src, alt, fallbackText }: { src: string, alt: string, fallbackText: string }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg shadow-sm border border-slate-200">
        {fallbackText.substring(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setError(true)}
      className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-contain bg-white p-1 shadow-sm border border-slate-100" 
    />
  );
};

const PARTNERS = [
  { 
    id: 'forte', 
    name: 'Forte Insurance', 
    gradient: 'from-[#A78BFA] to-[#7C3AED]', 
    logo: 'https://logo.clearbit.com/forteinsurance.com',
    description: 'General & Auto Insurance',
    tag: 'Top Rated',
    questions: [
      "What are Forte's main auto insurance benefits?",
      "How do I file a claim with Forte?",
      "Does Forte cover flood damage?",
      "Tell me about Forte's personal accident plan."
    ]
  },
  { 
    id: 'aia', 
    name: 'AIA Cambodia', 
    gradient: 'from-[#34D399] to-[#10B981]', 
    logo: 'https://logo.clearbit.com/aia.com.kh',
    description: 'Life & Critical Illness',
    tag: 'Best Life',
    questions: [
      "What critical illnesses does AIA cover?",
      "How does AIA's life insurance payout work?",
      "Compare AIA vs Prudential policies.",
      "Does AIA offer health checkup benefits?"
    ]
  },
  { 
    id: 'prudential', 
    name: 'Prudential Cambodia', 
    gradient: 'from-[#FBBF24] to-[#F59E0B]', 
    logo: 'https://logo.clearbit.com/prudential.com.kh',
    description: 'Wealth & Savings',
    tag: 'Popular',
    questions: [
      "What savings plans does Prudential offer?",
      "How can I withdraw from my Prudential policy?",
      "Prudential education plans for children.",
      "Is there a loyalty bonus with Prudential?"
    ]
  },
  { 
    id: 'sovannaphum', 
    name: 'Sovannaphum Life', 
    gradient: 'from-[#A78BFA] to-[#8B5CF6]', 
    logo: 'https://logo.clearbit.com/sovannaphumlife.com',
    description: 'Life Assurance',
    tag: null,
    questions: [
      "What is micro-insurance from Sovannaphum?",
      "How affordable are Sovannaphum plans?",
      "Coverage details for small families.",
      "How to pay premiums via Smart Wallet?"
    ]
  },
  { 
    id: 'phillip', 
    name: 'Phillip General', 
    gradient: 'from-[#34D399] to-[#059669]', 
    logo: 'https://logo.clearbit.com/phillip.com.kh',
    description: 'Property & Casualty',
    tag: null,
    questions: [
      "Phillip General property insurance rates.",
      "Does Phillip cover fire damage for shops?",
      "How fast is Phillip's claim process?",
      "Contact support for Phillip General."
    ]
  },
  { 
    id: 'campu', 
    name: 'Campu Lonpac', 
    gradient: 'from-[#FBBF24] to-[#D97706]', 
    logo: 'https://logo.clearbit.com/campulonpac.com',
    description: 'General Insurance',
    tag: null,
    questions: [
      "What does Campu Lonpac specialize in?",
      "Do they offer liability insurance?",
      "Campu Lonpac office locations.",
      "Get a quote for business insurance."
    ]
  },
  { 
    id: 'newa', 
    name: 'Newa Insurance', 
    gradient: 'from-[#A78BFA] to-[#7C3AED]', 
    logo: 'https://logo.clearbit.com/newa-insurance.com',
    description: 'Fire & Marine',
    tag: null,
    questions: [
      "Does Newa offer marine cargo insurance?",
      "Fire insurance rates for warehouses.",
      "How to contact Newa Insurance?",
      "Newa Insurance claim procedure."
    ]
  },
  { 
    id: 'caminco', 
    name: 'Caminco Insurance', 
    gradient: 'from-[#34D399] to-[#059669]', 
    logo: 'https://logo.clearbit.com/caminco.com.kh',
    description: 'National Insurance',
    tag: 'Trusted',
    questions: [
      "What is the history of Caminco?",
      "Caminco vehicle insurance plans.",
      "Does Caminco cover government projects?",
      "Personal accident policies by Caminco."
    ]
  },
  { 
    id: 'manulife', 
    name: 'Manulife Insurance', 
    gradient: 'from-[#F59E0B] to-[#D97706]', 
    logo: 'https://logo.clearbit.com/manulife.com.kh',
    description: 'Life & Retirement',
    tag: 'Global',
    questions: [
      "Manulife retirement savings plans.",
      "Does Manulife cover overseas treatment?",
      "Investment link policies explained.",
      "Manulife vs AIA comparison."
    ]
  },
  { 
    id: 'people_partners', 
    name: 'People & Partners', 
    gradient: 'from-[#2DD4BF] to-[#0D9488]', 
    logo: 'https://logo.clearbit.com/peoplenpartners.com',
    description: 'Innovation in Insurance',
    tag: 'New',
    questions: [
      "What insurance products do People & Partners offer?",
      "How to register for People & Partners health plan?",
      "Where is People & Partners located?",
      "Customer service contact for People & Partners."
    ]
  }
];

// UPDATED: More conversational and dynamic prompts
const CATEGORIES = [
  { 
    label: 'Vehicle', 
    icon: <Car size={24} />, 
    prompt: 'I am buying a used car. What is the difference between Third-party and Comprehensive insurance, and which one is better value?' 
  },
  { 
    label: 'Health', 
    icon: <Heart size={24} />, 
    prompt: 'I want a health plan that covers critical illnesses like cancer or heart attack. Can you list the top 3 affordable options in Cambodia?' 
  },
  { 
    label: 'SME Business', 
    icon: <Briefcase size={24} />, 
    prompt: 'I own a small coffee shop. What specific insurance do I need to protect against fire, flood, and employee accidents?' 
  },
  { 
    label: 'Travel', 
    icon: <Plane size={24} />, 
    prompt: 'If my flight is delayed by 6 hours or my luggage is lost, does standard travel insurance actually pay me? How does the claim work?' 
  },
];

const TRENDING_QUESTIONS = [
  "How to file a claim instantly?",
  "Compare AIA vs Prudential",
  "Explain Smart Contracts",
  "How to lower my premium?"
];

export const Dashboard: React.FC<DashboardProps> = ({ onAsk, currentUser }) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<typeof PARTNERS[0] | null>(null);
  const { theme } = useContext(ThemeContext);

  const handleSearch = () => {
    if (searchInput.trim()) {
      onAsk(searchInput);
      setSearchInput('');
    }
  };

  return (
    <div className={`p-4 md:p-6 max-w-5xl mx-auto space-y-6 md:space-y-8 pb-24 md:pb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      
      {/* Hero / Greeting Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500 rounded-full blur-[80px] opacity-20 translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="relative z-10 p-6 md:p-10 text-center md:text-left">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                 <p className="text-indigo-300 font-semibold mb-2 flex items-center justify-center md:justify-start gap-2">
                    <Sparkles size={16} /> Welcome back
                 </p>
                 <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">
                    {currentUser ? `Hello, ${currentUser.name.split(' ')[0]}!` : 'Hello, Guest!'}
                 </h1>
                 <p className="text-slate-400 text-sm md:text-lg max-w-lg">
                    Find the perfect protection for your future today.
                 </p>
              </div>
              <div className="hidden md:block">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <Shield size={32} className="text-emerald-400" />
                 </div>
              </div>
           </div>

           {/* Smart Search Bar */}
           <div className="mt-6 md:mt-8 relative max-w-2xl mx-auto md:mx-0">
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ask ELIXIR-AI (e.g., 'Best family plan?')" 
                className="w-full pl-10 md:pl-12 pr-16 md:pr-20 py-3 md:py-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-lg text-sm md:text-base"
              />
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <button 
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 md:px-4 py-1.5 rounded-lg font-bold transition-colors text-xs md:text-sm"
              >
                Ask
              </button>
           </div>
        </div>
      </div>

      {/* Quick Categories */}
      <div>
         <h2 className={`text-xs md:text-sm font-bold uppercase tracking-wider mb-3 md:mb-4 px-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Quick Protection</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => onAsk(cat.prompt)}
                className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group active:scale-95 ${
                  theme === 'dark' 
                    ? 'bg-slate-800 border-slate-700 hover:border-indigo-500/50' 
                    : 'bg-white border-slate-100 hover:border-indigo-200'
                }`}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                  theme === 'dark' 
                    ? 'bg-slate-700 text-slate-300 group-hover:bg-indigo-900 group-hover:text-indigo-400' 
                    : 'bg-slate-50 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                }`}>
                   {cat.icon}
                </div>
                <span className={`font-bold text-sm md:text-base text-center group-hover:text-indigo-600 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{cat.label}</span>
              </button>
            ))}
         </div>
      </div>

      {/* Trending */}
      <div>
         <h2 className={`text-xs md:text-sm font-bold uppercase tracking-wider mb-3 md:mb-4 px-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Trending Questions</h2>
         <div className="flex flex-wrap gap-2 md:gap-3">
           {TRENDING_QUESTIONS.map((q, idx) => (
             <button
               key={idx}
               onClick={() => onAsk(q)}
               className={`px-3 py-2 rounded-full border text-xs md:text-sm font-medium transition-all ${
                 theme === 'dark'
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-indigo-400'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 active:bg-slate-50'
               }`}
             >
               {q}
             </button>
           ))}
         </div>
      </div>

      {/* Partner List */}
      <div>
         <div className="flex justify-between items-end mb-3 md:mb-4 px-2">
            <h2 className={`text-lg md:text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Verified Partners</h2>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {PARTNERS.map((partner) => (
              <div 
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className={`group relative rounded-2xl p-4 md:p-5 border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden active:scale-[0.98] ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
                }`}
              >
                 {/* Gradient Accent */}
                 <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${partner.gradient}`}></div>
                 
                 <div className="flex items-center gap-3 md:gap-4 pl-2">
                    <PartnerLogo src={partner.logo} alt={partner.name} fallbackText={partner.name} />
                    <div className="flex-1 min-w-0">
                       <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className={`font-bold text-base transition-colors truncate w-full sm:w-auto ${theme === 'dark' ? 'text-slate-100 group-hover:text-indigo-400' : 'text-slate-800 group-hover:text-indigo-700'}`}>{partner.name}</h3>
                          {partner.tag && (
                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap bg-gradient-to-r ${partner.gradient} text-white opacity-90`}>{partner.tag}</span>
                          )}
                       </div>
                       <p className={`text-xs truncate ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{partner.description}</p>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Footer Info */}
      <div className={`rounded-xl p-4 flex items-start gap-3 border ${theme === 'dark' ? 'bg-indigo-900/30 border-indigo-800' : 'bg-indigo-50 border-indigo-100'}`}>
         <Info className="text-indigo-600 flex-shrink-0 mt-0.5" size={18} />
         <p className={`text-xs md:text-sm leading-relaxed ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-900'}`}>
            <span className="font-bold">Did you know?</span> By using ELIXIR's Smart Contracts, claims for flood and flight delays are processed automatically without paperwork. Ask AI to learn more.
         </p>
      </div>

      {/* Partner Questions Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 z-[50] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4 animate-in fade-in duration-200">
           {/* Click overlay to close */}
           <div className="absolute inset-0" onClick={() => setSelectedPartner(null)}></div>
           
           <div className={`relative w-full md:max-w-lg rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300 max-h-[85vh] flex flex-col ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${selectedPartner.gradient} p-5 md:p-6 relative flex-shrink-0`}>
                 <button 
                   onClick={() => setSelectedPartner(null)}
                   className="absolute top-4 right-4 bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                 >
                    <X size={20} />
                 </button>
                 <div className="flex items-center gap-4">
                    <PartnerLogo src={selectedPartner.logo} alt={selectedPartner.name} fallbackText={selectedPartner.name} />
                    <div className="text-white">
                       <h3 className="font-bold text-lg md:text-xl">{selectedPartner.name}</h3>
                       <p className="text-white/80 text-xs md:text-sm">Suggested Questions</p>
                    </div>
                 </div>
              </div>

              {/* Questions List (Scrollable) */}
              <div className="p-5 md:p-6 overflow-y-auto">
                 <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Select a question to ask our AI Advisor instantly:</p>
                 <div className="space-y-3">
                    {selectedPartner.questions.map((q, idx) => (
                       <button
                         key={idx}
                         onClick={() => {
                           onAsk(q);
                           setSelectedPartner(null);
                         }}
                         className={`w-full text-left p-3 md:p-4 rounded-xl border transition-all flex items-center justify-between group ${
                           theme === 'dark' 
                             ? 'border-slate-700 hover:bg-indigo-900/30 hover:border-indigo-500/50 active:bg-slate-800' 
                             : 'border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 active:bg-slate-50'
                         }`}
                       >
                          <span className={`font-medium text-sm leading-snug pr-2 ${theme === 'dark' ? 'text-slate-200 group-hover:text-indigo-400' : 'text-slate-700 group-hover:text-indigo-700'}`}>{q}</span>
                          <MessageCircle size={18} className="text-slate-300 group-hover:text-indigo-500 flex-shrink-0" />
                       </button>
                    ))}
                 </div>
              </div>

              {/* Manual Input Footer */}
              <div className={`p-4 border-t flex-shrink-0 safe-area-bottom ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                 <button 
                   onClick={() => {
                      onAsk(`Tell me about ${selectedPartner.name}`);
                      setSelectedPartner(null);
                   }}
                   className={`w-full py-3 border rounded-xl font-bold transition-colors text-sm ${
                     theme === 'dark'
                       ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                       : 'bg-white border-slate-200 text-slate-600 hover:bg-white hover:text-indigo-600 hover:border-indigo-300'
                   }`}
                 >
                    Ask something else...
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};
