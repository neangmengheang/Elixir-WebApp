
import React, { useState, useContext } from 'react';
import { Trophy, Star, Gift, ShoppingBag, Lock, CheckCircle2 } from 'lucide-react';
import { Quest, RewardItem } from '../types';
import { ThemeContext } from '../App';

const mockQuests: Quest[] = [
  { id: '1', title: 'Complete "Smart Contract 101"', reward: 50, completed: true },
  { id: '2', title: 'Connect Health App', reward: 100, completed: false },
  { id: '3', title: 'Verify Email Address', reward: 20, completed: false },
];

const mockRewards: RewardItem[] = [
  { id: '1', title: '$5 Premium Credit', cost: 500, type: 'CREDIT' },
  { id: '2', title: 'Coffee Voucher', cost: 300, type: 'VOUCHER' },
  { id: '3', title: 'Home Security Cam', cost: 5000, type: 'GIFT' },
];

export const GameCenter: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-24 md:pb-8">
      {/* Header with Points Balance */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl border border-slate-700">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <Trophy size={180} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                 <Star fill="currentColor" size={20} />
                 <span className="font-bold tracking-wider text-sm uppercase">Loyalty & Rewards</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Silver Tier</h1>
              <p className="text-slate-400 text-sm max-w-md">
                 Earn ELIXIR Tokens by learning and engaging. Spend them here for real value.
              </p>
           </div>
           <div className="text-left md:text-right">
              <p className="text-sm text-slate-400 font-medium uppercase mb-1">Spendable Balance</p>
              <p className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-tight">1,250 <span className="text-xl text-white">ELX</span></p>
           </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-8 relative pt-6">
           <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-500 uppercase mb-2 absolute top-0 w-full">
              <span>Bronze</span>
              <span>Silver (Current)</span>
              <span>Gold (Next: -450pts)</span>
              <span>Platinum</span>
           </div>
           <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 w-[60%]"></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
         {/* Daily Quests */}
         <div className={`rounded-2xl border shadow-sm p-6 h-full ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <h2 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
               <CheckCircle2 className="text-indigo-600" />
               Earn Tokens
            </h2>
            <div className="space-y-3">
               {mockQuests.map((quest) => (
                  <div key={quest.id} className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                    quest.completed 
                      ? (isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200')
                      : (isDark ? 'bg-slate-800 border-slate-700 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-300')
                  }`}>
                     <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                           quest.completed ? 'bg-emerald-500 border-emerald-500 text-white' : (isDark ? 'border-slate-600' : 'border-slate-300')
                        }`}>
                           {quest.completed && <CheckCircle2 size={12} />}
                        </div>
                        <span className={`text-sm ${
                           quest.completed ? 'text-slate-500 line-through' : (isDark ? 'text-slate-300 font-medium' : 'text-slate-700 font-medium')
                        }`}>{quest.title}</span>
                     </div>
                     <span className="text-xs font-bold text-yellow-600 bg-yellow-400/20 px-2 py-1 rounded-lg flex-shrink-0">+{quest.reward} ELX</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Rewards Marketplace */}
         <div className={`md:col-span-2 rounded-2xl border shadow-sm p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center mb-6">
               <h2 className={`font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  <ShoppingBag className="text-rose-500" />
                  Spend Tokens
               </h2>
               <button className="text-sm font-bold text-indigo-500 hover:underline">View All</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {mockRewards.map((item) => (
                  <div key={item.id} className={`border rounded-xl p-4 hover:shadow-md transition-all group ${isDark ? 'border-slate-700 hover:border-indigo-500/50' : 'border-slate-100'}`}>
                     <div className={`h-24 rounded-lg mb-3 flex items-center justify-center transition-colors ${
                        isDark ? 'bg-slate-900 text-slate-600 group-hover:bg-indigo-900/30 group-hover:text-indigo-400' : 'bg-slate-50 text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-300'
                     }`}>
                        <Gift size={32} />
                     </div>
                     <h3 className={`font-bold text-sm mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{item.title}</h3>
                     <p className={`text-xs mb-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{item.type}</p>
                     <button className="w-full py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition-colors flex justify-center items-center gap-1 border border-slate-700 group-hover:border-indigo-600">
                        <span>Redeem</span>
                        <span className="text-yellow-400">{item.cost} ELX</span>
                     </button>
                  </div>
               ))}
               
               {/* Locked Item Example */}
               <div className={`border rounded-xl p-4 opacity-60 relative overflow-hidden ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                  <div className={`absolute inset-0 flex items-center justify-center z-10 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50/50'}`}>
                     <Lock className="text-slate-400" />
                  </div>
                  <div className={`h-24 rounded-lg mb-3 ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}></div>
                  <h3 className={`font-bold text-sm mb-1 ${isDark ? 'text-slate-600' : 'text-slate-800'}`}>Premium Partner Deal</h3>
                  <button className={`w-full py-2 rounded-lg text-xs font-bold ${isDark ? 'bg-slate-700 text-slate-500' : 'bg-slate-200 text-slate-500'}`}>Gold Tier Only</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
