
import React from 'react';
import { Home, Wallet, Users, BookOpen, Trophy, Settings, Bot, Zap, Repeat, BadgeCheck, X } from 'lucide-react';
import { ViewState, User } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  currentUser: User;
  onToggleUser: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, currentUser, onToggleUser, isOpen, onClose }) => {
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
    onClose(); // Close sidebar on mobile when item clicked
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container - Z-Index 60 to be top-most */}
      <div className={`
        fixed inset-y-0 left-0 z-[60] w-64 bg-white border-r border-slate-200 flex flex-col 
        transform transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}>
        {/* Logo Area */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">ELIXIR</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        <div className="px-6 py-2 flex-1 overflow-y-auto">
          <p className="text-xs font-semibold text-slate-400 mb-4 px-4">CORE MENU</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-medium shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className={isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}>
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
            className="w-full mb-4 flex items-center justify-center space-x-2 py-2 border border-dashed border-slate-300 rounded-lg text-xs text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
          >
            <Repeat size={14} />
            <span>Switch Role (Demo)</span>
          </button>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                      <img 
                          src={currentUser.avatar} 
                          alt="Profile" 
                          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      {currentUser.isVerified && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-0.5 border-2 border-white">
                          <BadgeCheck size={10} />
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="overflow-hidden">
                      <p className="text-sm font-bold text-slate-800 truncate">{currentUser.name}</p>
                      <p className="text-xs text-indigo-600 font-medium truncate">
                        {currentUser.role === 'AGENCY' ? 'Verified Agency' : 'Policy Holder'}
                      </p>
                  </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-slate-400 font-medium">Wallet Connected</span>
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                    {currentUser.walletAddress?.slice(0, 6)}...
                  </span>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};
