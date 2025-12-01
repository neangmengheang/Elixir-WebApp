
import React, { useState } from 'react';
import { Shield, Lock, Eye, Bell, Upload, CheckCircle } from 'lucide-react';
import { PrivacySetting } from '../types';

export const Settings: React.FC = () => {
  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([
    { id: '1', label: 'Identity Verification (KYC)', description: 'Required for Claim Payouts and Policy Activation', isEnabled: true, isEssential: true },
    { id: '2', label: 'Share Telematics Data', description: 'Share driving/location data for "Safe Driver" discounts. Revoke anytime.', isEnabled: true, isEssential: false },
    { id: '3', label: 'Health App Sync', description: 'Sync step count for Health Insurance rewards.', isEnabled: false, isEssential: false },
    { id: '4', label: 'Marketing Offers', description: 'Receive promotions from partner brands.', isEnabled: false, isEssential: false },
  ]);

  const toggleSetting = (id: string) => {
    setPrivacySettings(prev => prev.map(setting => {
      if (setting.id === id && !setting.isEssential) {
        return { ...setting, isEnabled: !setting.isEnabled };
      }
      return setting;
    }));
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8 pb-24 md:pb-8">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Settings & Control</h1>
           <p className="text-sm md:text-base text-slate-500">Manage your data privacy, security, and verification.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Main Control Panel */}
        <div className="lg:col-span-2 space-y-6">
           {/* Privacy Ledger */}
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 md:p-6 border-b border-slate-100 bg-slate-50">
                 <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <Shield className="text-indigo-600" />
                    Privacy Control Center
                 </h2>
                 <p className="text-xs md:text-sm text-slate-500 mt-1">
                    You have full control. Toggle data sharing permissions below. Changes are logged on your private ledger.
                 </p>
              </div>
              <div className="divide-y divide-slate-100">
                 {privacySettings.map(setting => (
                    <div key={setting.id} className="p-4 md:p-6 flex items-start justify-between hover:bg-slate-50 transition-colors gap-4">
                       <div className="max-w-md">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                             <h3 className="font-bold text-slate-800 text-sm md:text-base">{setting.label}</h3>
                             {setting.isEssential && <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">Required</span>}
                          </div>
                          <p className="text-xs md:text-sm text-slate-500">{setting.description}</p>
                       </div>
                       
                       <button 
                          onClick={() => toggleSetting(setting.id)}
                          disabled={setting.isEssential}
                          className={`flex-shrink-0 relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${setting.isEnabled ? 'bg-emerald-500' : 'bg-slate-300'} ${setting.isEssential ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                       >
                          <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${setting.isEnabled ? 'translate-x-6' : 'translate-x-0'}`}></span>
                       </button>
                    </div>
                 ))}
              </div>
           </div>

           {/* Security */}
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6">
              <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-4">
                 <Lock className="text-rose-500" />
                 Security & Biometrics
              </h2>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                 <div>
                    <h3 className="font-bold text-slate-700 text-sm md:text-base">Biometric Login</h3>
                    <p className="text-xs text-slate-500">Use FaceID or Fingerprint for Smart Wallet access.</p>
                 </div>
                 <button className="text-xs md:text-sm font-bold text-indigo-600 border border-indigo-200 px-3 py-2 rounded-lg hover:bg-indigo-50">
                    Enabled
                 </button>
              </div>
           </div>
        </div>

        {/* Sidebar: KYC Status */}
        <div className="space-y-6">
           <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <CheckCircle size={100} />
              </div>
              <h3 className="font-bold text-lg mb-2 relative z-10">Account Verification</h3>
              <div className="flex items-center gap-2 mb-4 relative z-10">
                 <span className="bg-white/20 px-2 py-1 rounded text-sm font-bold flex items-center gap-1">
                    <CheckCircle size={14} /> Level 2 Verified
                 </span>
              </div>
              <p className="text-indigo-100 text-sm relative z-10 mb-6">
                 Your identity is verified. You are eligible for instant claim payouts up to $5,000.
              </p>
              
              <div className="bg-white/10 rounded-xl p-4 relative z-10 border border-white/20">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white text-indigo-600 p-2 rounded-lg">
                       <Upload size={16} />
                    </div>
                    <div>
                       <p className="text-xs font-bold uppercase opacity-80">Update Document</p>
                       <p className="text-sm font-bold">National ID / Passport</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Bell className="text-yellow-500" />
                 Notification Preferences
              </h3>
              <div className="space-y-3">
                 <label className="flex items-center space-x-3 text-sm text-slate-600">
                    <input type="checkbox" checked className="rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>Policy Renewal Alerts</span>
                 </label>
                 <label className="flex items-center space-x-3 text-sm text-slate-600">
                    <input type="checkbox" checked className="rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>Claim Status Updates</span>
                 </label>
                 <label className="flex items-center space-x-3 text-sm text-slate-600">
                    <input type="checkbox" checked className="rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>New Reward Challenges</span>
                 </label>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
