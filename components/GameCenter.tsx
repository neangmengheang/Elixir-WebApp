
import React, { useState } from 'react';
import { Trophy, Star, Gift, ShoppingBag, Lock, CheckCircle2 } from 'lucide-react';
import { Quest, RewardItem } from '../types';

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
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-24 md:pb-8">
      {/* Header with Points Balance */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
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
           <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 w-[60%]"></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
         {/* Daily Quests */}
         <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-full">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
               <CheckCircle2 className="text-indigo-600" />
               Earn Tokens
            </h2>
            <div className="space-y-3">
               {mockQuests.map((quest) => (
                  <div key={quest.id} className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${quest.completed ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                     <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${quest.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}>
                           {quest.completed && <CheckCircle2 size={12} />}
                        </div>
                        <span className={`text-sm ${quest.completed ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>{quest.title}</span>
                     </div>
                     <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg flex-shrink-0">+{quest.reward} ELX</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Rewards Marketplace */}
         <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <ShoppingBag className="text-rose-500" />
                  Spend Tokens
               </h2>
               <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {mockRewards.map((item) => (
                  <div key={item.id} className="border border-slate-100 rounded-xl p-4 hover:shadow-md transition-all group">
                     <div className="h-24 bg-slate-50 rounded-lg mb-3 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-300 transition-colors">
                        <Gift size={32} />
                     </div>
                     <h3 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h3>
                     <p className="text-xs text-slate-400 mb-3">{item.type}</p>
                     <button className="w-full py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition-colors flex justify-center items-center gap-1">
                        <span>Redeem</span>
                        <span className="text-yellow-400">{item.cost} ELX</span>
                     </button>
                  </div>
               ))}
               
               {/* Locked Item Example */}
               <div className="border border-slate-100 rounded-xl p-4 opacity-60 relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-50/50 flex items-center justify-center z-10">
                     <Lock className="text-slate-400" />
                  </div>
                  <div className="h-24 bg-slate-100 rounded-lg mb-3"></div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">Premium Partner Deal</h3>
                  <button className="w-full py-2 rounded-lg bg-slate-200 text-slate-500 text-xs font-bold">Gold Tier Only</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
