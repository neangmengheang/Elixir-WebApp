
import React, { useState, useContext } from 'react';
import { Copy, Check, Shield, FileCheck, ArrowUpRight, ArrowDownLeft, Wallet, ExternalLink, Zap } from 'lucide-react';
import { User, SmartContractPolicy, Transaction } from '../types';
import { ThemeContext } from '../App';

interface SmartWalletProps {
  currentUser: User;
}

const MOCK_POLICIES: SmartContractPolicy[] = [
  {
    id: 'pol_001',
    policyNumber: 'ELX-AUTO-2025-8821',
    type: 'Telematic Auto Insurance',
    coverageAmount: 15000,
    premium: 120,
    status: 'ACTIVE',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    blockchainHash: '0x8f...2a9b'
  },
  {
    id: 'pol_002',
    policyNumber: 'ELX-SME-FLOOD-23',
    type: 'Parametric Flood (SME)',
    coverageAmount: 5000,
    premium: 450,
    status: 'ACTIVE',
    startDate: '2024-05-01',
    endDate: '2025-05-01',
    blockchainHash: '0x3c...11fd'
  }
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx_1', type: 'REWARD_EARNED', amount: 50, date: '2024-03-10', hash: '0x12...ab' },
  { id: 'tx_2', type: 'PREMIUM_PAYMENT', amount: -120, date: '2024-03-01', hash: '0x56...cd' },
  { id: 'tx_3', type: 'CLAIM_PAYOUT', amount: 450, date: '2023-11-30', hash: '0x99...ef' },
];

export const SmartWallet: React.FC<SmartWalletProps> = ({ currentUser }) => {
  const { theme } = useContext(ThemeContext);
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';

  const handleCopy = () => {
    if (currentUser.walletAddress) {
      navigator.clipboard.writeText(currentUser.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-24 md:pb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl md:text-3xl font-bold">Smart Wallet</h1>
           <p className={`text-sm md:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Secure Digital ID • Token Management • Immutable Policies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column: Wallet & Transactions */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Main Wallet Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-slate-700/50">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Wallet size={120} />
             </div>
             
             <div className="relative z-10">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Balance</p>
                <div className="flex items-baseline gap-2 mb-6">
                   <h2 className="text-4xl md:text-5xl font-bold text-yellow-400">{currentUser.balance}</h2>
                   <span className="text-lg md:text-xl font-medium">ELX Tokens</span>
                </div>

                <div className="bg-white/10 rounded-xl p-3 border border-white/10 mb-4 backdrop-blur-sm">
                   <p className="text-xs text-slate-400 mb-1">Public Wallet Address</p>
                   <div className="flex items-center justify-between">
                      <code className="text-xs md:text-sm font-mono text-slate-200 truncate mr-2">
                        {currentUser.walletAddress}
                      </code>
                      <button onClick={handleCopy} className="text-indigo-400 hover:text-white transition-colors">
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                   <button className="bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2">
                      <ArrowUpRight size={16} /> Send
                   </button>
                   <button className="bg-white/10 hover:bg-white/20 py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2">
                      <ArrowDownLeft size={16} /> Receive
                   </button>
                </div>
             </div>
          </div>

          {/* Transaction Log */}
          <div className={`rounded-2xl border shadow-sm p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
             <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                <FileCheck size={18} className="text-slate-400" />
                Transaction History
             </h3>
             <div className="space-y-4">
                {MOCK_TRANSACTIONS.map(tx => (
                   <div key={tx.id} className={`flex items-center justify-between pb-3 border-b last:border-0 last:pb-0 ${isDark ? 'border-slate-700' : 'border-slate-50'}`}>
                      <div className="flex items-center gap-3">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            tx.type === 'REWARD_EARNED' ? (isDark ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-600') :
                            tx.type === 'CLAIM_PAYOUT' ? (isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600') :
                            (isDark ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500')
                         }`}>
                            {tx.type === 'REWARD_EARNED' ? <Zap size={14} /> : 
                             tx.type === 'CLAIM_PAYOUT' ? <Shield size={14} /> : <ArrowUpRight size={14} />}
                         </div>
                         <div>
                            <p className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                               {tx.type.replace('_', ' ')}
                            </p>
                            <p className="text-[10px] text-slate-400">{tx.date}</p>
                         </div>
                      </div>
                      <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-500' : (isDark ? 'text-slate-400' : 'text-slate-700')}`}>
                         {tx.amount > 0 ? '+' : ''}{tx.amount} ELX
                      </span>
                   </div>
                ))}
             </div>
             <button className="w-full mt-4 text-xs text-indigo-500 font-bold hover:underline hover:text-indigo-400">View on Blockchain Explorer</button>
          </div>
        </div>

        {/* Right Column: Smart Contracts Policies */}
        <div className="lg:col-span-2 space-y-6">
           <div className={`rounded-2xl border shadow-sm p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>My Policies</h2>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Digitized Smart Contracts on the Blockchain</p>
                 </div>
                 <button className={`px-3 py-2 rounded-lg text-xs md:text-sm font-bold transition-colors ${
                    isDark ? 'bg-indigo-900/50 text-indigo-400 hover:bg-indigo-900' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                 }`}>
                    + Add Policy
                 </button>
              </div>

              <div className="space-y-4">
                 {MOCK_POLICIES.map(policy => (
                    <div key={policy.id} className={`border rounded-xl p-5 md:p-6 transition-colors relative group ${
                       isDark ? 'border-slate-700 hover:border-indigo-500/50 bg-slate-800/50' : 'border-slate-200 hover:border-indigo-300 bg-white'
                    }`}>
                       <div className="absolute top-5 right-5 flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${
                             isDark ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                             {policy.status}
                          </span>
                       </div>

                       <div className="flex items-start gap-4 mb-4">
                          <div className={`p-3 rounded-lg ${isDark ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                             <Shield size={24} />
                          </div>
                          <div className="pr-16 md:pr-0">
                             <h3 className={`font-bold text-base md:text-lg leading-tight ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{policy.type}</h3>
                             <p className="text-xs md:text-sm text-slate-500 font-mono mt-1">{policy.policyNumber}</p>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                          <div>
                             <p className="text-[10px] md:text-xs text-slate-400 uppercase">Coverage</p>
                             <p className={`font-bold text-sm md:text-base ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>${policy.coverageAmount.toLocaleString()}</p>
                          </div>
                          <div>
                             <p className="text-[10px] md:text-xs text-slate-400 uppercase">Premium</p>
                             <p className={`font-bold text-sm md:text-base ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>${policy.premium}/yr</p>
                          </div>
                          <div>
                             <p className="text-[10px] md:text-xs text-slate-400 uppercase">Start Date</p>
                             <p className={`font-bold text-sm md:text-base ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{policy.startDate}</p>
                          </div>
                          <div>
                             <p className="text-[10px] md:text-xs text-slate-400 uppercase">End Date</p>
                             <p className={`font-bold text-sm md:text-base ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{policy.endDate}</p>
                          </div>
                       </div>

                       <div className={`rounded-lg p-3 flex flex-col md:flex-row items-start md:items-center justify-between border gap-2 ${
                          isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-100'
                       }`}>
                          <div className="flex items-center gap-2 overflow-hidden w-full md:w-auto">
                             <div className={`p-1 rounded flex-shrink-0 ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-500'}`}>
                                <ExternalLink size={12} />
                             </div>
                             <span className="text-xs text-slate-500 truncate">Contract Hash: <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{policy.blockchainHash}</span></span>
                          </div>
                          <button className="text-xs text-indigo-500 font-bold hover:underline whitespace-nowrap">Verify Integrity</button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
