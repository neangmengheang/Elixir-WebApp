
import React, { useState, useContext } from 'react';
import { Shield, Lock, Bell, CheckCircle, Moon, Sun, LogOut } from 'lucide-react';
import { PrivacySetting } from '../types';
import { ThemeContext } from '../App';

interface SettingsProps {
  onLogout?: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

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
    <div className={`p-4 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8 pb-24 md:pb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl md:text-3xl font-bold mb-1">Settings & Control</h1>
           <p className={`text-sm md:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Manage your data privacy, security, and verification.</p>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-rose-500 hover:text-rose-600 font-bold text-sm bg-rose-50 px-4 py-2 rounded-xl hover:bg-rose-100 transition-colors"
        >
           <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Main Control Panel */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Appearance */}
           <div className={`rounded-2xl border shadow-sm p-4 md:p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                       {isDark ? <Moon size={20} /> : <Sun size={20} />}
                    </div>
                    <div>
                       <h3 className="font-bold">Appearance</h3>
                       <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Switch between Light and Dark mode.</p>
                    </div>
                 </div>
                 <button 
                   onClick={toggleTheme}
                   className={`relative w-14 h-7 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${isDark ? 'bg-indigo-600' : 'bg-slate-300'}`}
                 >
                    <span className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out flex items-center justify-center ${isDark ? 'translate-x-7' : 'translate-x-0'}`}>
                       {isDark ? <Moon size={12} className="text-indigo-600" /> : <Sun size={12} className="text-orange-400" />}
                    </span>
                 </button>
              </div>
           </div>

           {/* Privacy Ledger */}
           <div className={`rounded-2xl border shadow-sm overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className={`p-4 md:p-6 border-b ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                 <h2 className="font-bold text-lg flex items-center gap-2">
                    <Shield className="text-indigo-600" />
                    Privacy Control Center
                 </h2>
                 <p className={`text-xs md:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    You have full control. Toggle data sharing permissions below. Changes are logged on your private ledger.
                 </p>
              </div>
              <div className={`divide-y ${isDark ? 'divide-slate-700' : 'divide-slate-100'}`}>
                 {privacySettings.map(setting => (
                    <div key={setting.id} className={`p-4 md:p-6 flex items-start justify-between transition-colors gap-4 ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-50'}`}>
                       <div className="max-w-md">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                             <h3 className="font-bold text-sm md:text-base">{setting.label}</h3>
                             {setting.isEssential && <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>Required</span>}
                          </div>
                          <p className={`text-xs md:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{setting.description}</p>
                       </div>
                       
                       <button 
                          onClick={() => toggleSetting(setting.id)}
                          disabled={setting.isEssential}
                          className={`flex-shrink-0 relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${setting.isEnabled ? 'bg-emerald-500' : isDark ? 'bg-slate-600' : 'bg-slate-300'} ${setting.isEssential ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                       >
                          <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${setting.isEnabled ? 'translate-x-6' : 'translate-x-0'}`}></span>
                       </button>
                    </div>
                 ))}
              </div>
           </div>

           {/* Security */}
           <div className={`rounded-2xl border shadow-sm p-4 md:p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <h2 className="font-bold text-lg flex items-center gap-2 mb-4">
                 <Lock className="text-rose-500" />
                 Security & Biometrics
              </h2>
              <div className={`flex items-center justify-between p-4 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                 <div>
                    <h3 className="font-bold text-sm md:text-base">Biometric Login</h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Use FaceID or Fingerprint for Smart Wallet access.</p>
                 </div>
                 <button className={`text-xs md:text-sm font-bold border px-3 py-2 rounded-lg ${isDark ? 'text-indigo-400 border-indigo-900 bg-indigo-900/20' : 'text-indigo-600 border-indigo-200 hover:bg-indigo-50'}`}>
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
           </div>

           <div className={`rounded-2xl border shadow-sm p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                 <Bell className="text-yellow-500" />
                 Notification Preferences
              </h3>
              <div className="space-y-3">
                 <label className={`flex items-center space-x-3 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <input type="checkbox" checked className="rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>Policy Renewal Alerts</span>
                 </label>
                 <label className={`flex items-center space-x-3 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <input type="checkbox" checked className="rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>Claim Status Updates</span>
                 </label>
                 <label className={`flex items-center space-x-3 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
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
