
import React, { useState } from 'react';
import { Wallet, ShieldCheck, Zap, ArrowRight, Lock, Mail, ChevronLeft, Loader2 } from 'lucide-react';
import { User } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

type LoginStep = 'INITIAL' | 'EMAIL' | 'OTP' | 'CREATING_WALLET';

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [step, setStep] = useState<LoginStep>('INITIAL');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWalletConnect = () => {
    setIsConnecting(true);
    // Simulate wallet connection delay
    setTimeout(() => {
      finishLogin();
    }, 2000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep('OTP');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = () => {
    if (otp.join('').length === 6) {
      setStep('CREATING_WALLET');
      setTimeout(() => {
        finishLogin();
      }, 2500);
    }
  };

  const finishLogin = () => {
    const mockUser: User = {
      id: 'u1',
      name: 'Sopheak Dey',
      role: 'USER',
      avatar: 'https://picsum.photos/seed/sopheak/200/200',
      walletAddress: '0x71C8...9A23',
      balance: 1250,
      isVerified: true,
      isLoggedIn: true
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[128px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[128px]"></div>

      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl max-w-md w-full relative z-10 overflow-hidden">
        
        {/* Step: CREATING_WALLET (Loading State) */}
        {step === 'CREATING_WALLET' ? (
          <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in duration-300">
             <div className="w-20 h-20 mx-auto relative">
                <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Wallet className="text-indigo-400" size={32} />
                </div>
             </div>
             <div>
                <h2 className="text-2xl font-bold text-white mb-2">Creating Embedded Wallet</h2>
                <p className="text-slate-400 text-sm">Securing your digital identity on the blockchain...</p>
             </div>
             <div className="flex gap-2 justify-center mt-4">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
             </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-900/50">
                <Zap size={32} className="text-white" fill="currentColor" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome to ELIXIR</h1>
              <p className="text-slate-400 text-sm">The future of InsurTech. Secure, Transparent, and AI-Powered.</p>
            </div>

            {/* Step: INITIAL */}
            {step === 'INITIAL' && (
              <div className="space-y-4 animate-in slide-in-from-right duration-300">
                <button 
                  onClick={handleWalletConnect}
                  disabled={isConnecting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-bold flex items-center justify-between group transition-all duration-300 shadow-lg shadow-indigo-900/50 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Wallet size={20} className="text-white" />
                    </div>
                    <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                  </div>
                  {isConnecting ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  )}
                </button>

                <button 
                  onClick={() => setStep('EMAIL')}
                  className="w-full bg-white text-slate-900 hover:bg-slate-50 p-4 rounded-xl font-bold flex items-center justify-between group transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-200 p-2 rounded-lg">
                      <Mail size={20} className="text-slate-700" />
                    </div>
                    <span>Login with Email</span>
                  </div>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-slate-400" />
                </button>
              </div>
            )}

            {/* Step: EMAIL */}
            {step === 'EMAIL' && (
              <form onSubmit={handleEmailSubmit} className="space-y-6 animate-in slide-in-from-right duration-300">
                <div>
                   <label className="block text-slate-400 text-xs font-bold uppercase mb-2">Email Address</label>
                   <input 
                      type="email" 
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-600 transition-all"
                      placeholder="name@example.com"
                   />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/50"
                >
                  <span>Send Login Code</span>
                  <ArrowRight size={20} />
                </button>
                <button 
                  type="button"
                  onClick={() => setStep('INITIAL')}
                  className="w-full text-slate-500 hover:text-white text-sm py-2 flex items-center justify-center gap-2 transition-colors"
                >
                   <ChevronLeft size={16} /> Back
                </button>
              </form>
            )}

            {/* Step: OTP */}
            {step === 'OTP' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                 <div className="text-center">
                    <p className="text-slate-300 text-sm">Enter the code sent to <span className="text-white font-bold">{email}</span></p>
                    <p className="text-emerald-400 text-xs mt-2 font-mono bg-emerald-900/30 inline-block px-2 py-1 rounded border border-emerald-500/30">
                      Test Mode: Enter any 6 digits (e.g. 123456)
                    </p>
                 </div>
                 <div className="flex justify-between gap-2">
                    {otp.map((digit, idx) => (
                       <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          className="w-12 h-14 bg-slate-800 border border-slate-700 rounded-xl text-center text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                       />
                    ))}
                 </div>
                 <button 
                  onClick={handleOtpSubmit}
                  disabled={otp.join('').length !== 6}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Verify & Create Wallet</span>
                  <ArrowRight size={20} />
                </button>
                <button 
                  type="button"
                  onClick={() => setStep('EMAIL')}
                  className="w-full text-slate-500 hover:text-white text-sm py-2 flex items-center justify-center gap-2 transition-colors"
                >
                   <ChevronLeft size={16} /> Change Email
                </button>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-2">
                <Lock size={12} />
                <span>Secured by Blockchain Technology</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
