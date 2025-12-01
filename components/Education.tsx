
import React, { useState } from 'react';
import { BookOpen, Search, PlayCircle, FileText, CheckCircle, Lightbulb, ArrowRight, BrainCircuit } from 'lucide-react';
import { explainPolicyTerm } from '../services/geminiService';

export const Education: React.FC = () => {
  const [term, setTerm] = useState('');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if(!term) return;
    setLoading(true);
    const result = await explainPolicyTerm(term);
    setExplanation(result);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-slate-800 mb-2">Education & Risk Management</h1>
           <p className="text-slate-500 max-w-2xl">Master your policy, understand risks, and earn rewards for boosting your financial literacy.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Learning Area */}
         <div className="lg:col-span-2 space-y-8">
            
            {/* AI Policy Translator */}
            <section className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
               <div className="flex items-start gap-4 mb-6">
                  <div className="bg-white/20 p-3 rounded-xl">
                     <BrainCircuit size={32} className="text-white" />
                  </div>
                  <div>
                     <h2 className="text-xl font-bold">AI Policy Translator</h2>
                     <p className="text-indigo-100 text-sm">Confused by insurance jargon? Type a term (e.g., "Deductible", "Premium") and our AI will explain it simply.</p>
                  </div>
               </div>
               
               <div className="relative">
                  <input 
                    type="text" 
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Enter a term (e.g. Exclusion, Premium)..."
                    className="w-full px-4 py-4 rounded-xl text-slate-800 outline-none focus:ring-4 focus:ring-indigo-300 shadow-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleExplain()}
                  />
                  <button 
                    onClick={handleExplain}
                    disabled={loading}
                    className="absolute right-2 top-2 bottom-2 bg-indigo-800 hover:bg-indigo-900 text-white px-6 rounded-lg font-bold transition-colors disabled:opacity-70"
                  >
                    {loading ? 'Thinking...' : 'Explain'}
                  </button>
               </div>

               {explanation && (
                 <div className="mt-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 mb-2 text-yellow-300 font-bold text-sm">
                       <Lightbulb size={16} />
                       <span>AI Definition</span>
                    </div>
                    <p className="text-white leading-relaxed">{explanation}</p>
                 </div>
               )}
            </section>

            {/* Micro-Learning Modules */}
            <section>
               <h3 className="font-bold text-slate-800 text-lg mb-4">Recommended for You</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Module 1 */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all cursor-pointer group">
                     <div className="relative h-32 bg-slate-200 rounded-lg mb-4 overflow-hidden">
                        <img src="https://picsum.photos/seed/insure/400/200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                           <PlayCircle size={40} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded font-bold">1:20</span>
                     </div>
                     <h4 className="font-bold text-slate-800 mb-1">How to Maximize Claims</h4>
                     <p className="text-xs text-slate-500 mb-3">Learn the 3 steps to ensure your claim is approved instantly.</p>
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-600">+50 Points</span>
                        <div className="h-4 w-4 border-2 border-slate-300 rounded-full"></div>
                     </div>
                  </div>

                  {/* Module 2 */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all cursor-pointer group">
                     <div className="relative h-32 bg-slate-200 rounded-lg mb-4 overflow-hidden">
                        <img src="https://picsum.photos/seed/risk/400/200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Cover" />
                     </div>
                     <h4 className="font-bold text-slate-800 mb-1">Fire Safety Checklist</h4>
                     <p className="text-xs text-slate-500 mb-3">Interactive guide to fire-proofing your small business.</p>
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-600">+100 Points</span>
                        <div className="text-emerald-500"><CheckCircle size={16} /></div>
                     </div>
                  </div>
               </div>
            </section>
         </div>

         {/* Sidebar: Progress & Risk Calculator */}
         <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <h3 className="font-bold text-slate-800 mb-4">Your Progress</h3>
               <div className="space-y-4">
                  <div>
                     <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-600">Financial Literacy</span>
                        <span className="font-bold text-indigo-600">75%</span>
                     </div>
                     <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-3/4"></div>
                     </div>
                  </div>
                  <div>
                     <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-600">Risk Awareness</span>
                        <span className="font-bold text-emerald-600">40%</span>
                     </div>
                     <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-2/5"></div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
               <h3 className="font-bold text-orange-900 mb-2">Risk Calculator</h3>
               <p className="text-xs text-orange-700 mb-4">See how safety measures affect your premium.</p>
               
               <div className="space-y-3 mb-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                     <input type="checkbox" className="form-checkbox text-orange-600 rounded" checked />
                     <span className="text-sm text-orange-800">Install Smoke Detector</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                     <input type="checkbox" className="form-checkbox text-orange-600 rounded" />
                     <span className="text-sm text-orange-800">Security Camera</span>
                  </label>
               </div>
               
               <div className="bg-white/50 p-3 rounded-xl text-center">
                  <p className="text-xs text-orange-600 uppercase font-bold">Estimated Savings</p>
                  <p className="text-2xl font-bold text-orange-900">$12.50 <span className="text-sm font-normal">/ year</span></p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};