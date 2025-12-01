
import React, { useContext } from 'react';
import { Home, Wallet, Users, BookOpen, Trophy, Settings, Bot, Zap, Repeat, BadgeCheck, X } from 'lucide-react';
import { ViewState, User } from '../types';
import { ThemeContext } from '../App';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  currentUser: User | null;
  onToggleUser: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, currentUser, onToggleUser, isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const navItems = [
    { id: ViewState.HOME, label: 'Home', icon: <Home size={20} /> },
    { id: ViewState.SMART_WALLET, label: 'Smart Wallet', icon: <Wallet size={20} /> },
    { id: ViewState.SOCIALFY, label: 'Socialfy', icon: <Users size={20} /> },
    { id: ViewState.EDUCATION, label: 'Education', icon: <BookOpen size={20} /> },
    { id: ViewState.GAME, label: 'Game & Rewards', icon: <Trophy size={20} /> },
    { id: ViewState.SETTINGS, label: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleNavClick = (view: ViewState) => {
    onChangeView(view);
    onClose(); 
  };

  if (!currentUser) return null; // Don't show sidebar if not logged in

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-[60] w-64 border-r flex flex-col 
        transform transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
        ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}
      `}>
        {/* Logo Area */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>ELIXIR</span>
          </div>
          <button onClick={onClose} className={`lg:hidden hover:text-indigo-500 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
            <X size={24} />
          </button>
        </div>

        <div className="px-6 py-2 flex-1 overflow-y-auto">
          <p className={`text-xs font-semibold mb-4 px-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>CORE MENU</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? (isDark ? 'bg-indigo-900/50 text-indigo-400' : 'bg-indigo-50 text-indigo-600 font-medium shadow-sm')
                      : (isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900')
                  }`}
                >
                  <span className={isActive ? (isDark ? 'text-indigo-400' : 'text-indigo-600') : (isDark ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-400 group-hover:text-slate-600')}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 px-4">
               <button
                  onClick={() => handleNavClick(ViewState.AI_ADVISOR)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 bg-indigo-600 text-white hover:bg-indigo-700 shadow-md`}
                >
                  <Bot size={20} />
                  <span>ELIXIR-AI</span>
                </button>
          </div>
        </div>

        <div className="mt-auto p-6">
          {/* Role Switcher for Demo */}
          <button 
            onClick={onToggleUser}
            className={`w-full mb-4 flex items-center justify-center space-x-2 py-2 border border-dashed rounded-lg text-xs transition-colors ${
              isDark 
                ? 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-indigo-400' 
                : 'border-slate-300 text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
            }`}
          >
            <Repeat size={14} />
            <span>Switch Role (Demo)</span>
          </button>

          <div className={`rounded-2xl p-4 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                      <img 
                          src={currentUser.avatar} 
                          alt="Profile" 
                          className={`w-10 h-10 rounded-full object-cover border-2 shadow-sm ${isDark ? 'border-slate-600' : 'border-white'}`}
                      />
                      {currentUser.isVerified && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-0.5 border-2 border-white">
                          <BadgeCheck size={10} />
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="overflow-hidden">
                      <p className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{currentUser.name}</p>
                      <p className="text-xs text-indigo-500 font-medium truncate">
                        {currentUser.role === 'AGENCY' ? 'Verified Agency' : 'Policy Holder'}
                      </p>
                  </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Wallet Connected</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>
                    {currentUser.walletAddress?.slice(0, 6)}...
                  </span>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};
