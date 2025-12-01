
import React, { useState } from 'react';
import { Menu, Zap } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { AIAdvisor } from './components/AIAdvisor';
import { Socialfy } from './components/Socialfy';
import { Education } from './components/Education';
import { GameCenter } from './components/GameCenter';
import { SmartWallet } from './components/SmartWallet';
import { Settings } from './components/Settings';
import { Dashboard } from './components/Dashboard';
import { ViewState, User } from './types';

// Mock Users for Demo
const MOCK_USERS: Record<string, User> = {
  USER: {
    id: 'u1',
    name: 'Sopheak Dey',
    role: 'USER',
    avatar: 'https://picsum.photos/seed/sopheak/200/200',
    walletAddress: '0x71C8...9A23',
    balance: 1250,
    isVerified: true
  },
  AGENCY: {
    id: 'a1',
    name: 'Forte Insurance Support',
    role: 'AGENCY',
    companyName: 'Forte Insurance',
    avatar: 'https://picsum.photos/seed/forte/200/200',
    walletAddress: '0x88B1...11CC',
    balance: 50000,
    isVerified: true
  }
};

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS.USER);
  const [advisorPrompt, setAdvisorPrompt] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleUser = () => {
    setCurrentUser(prev => prev.role === 'USER' ? MOCK_USERS.AGENCY : MOCK_USERS.USER);
  };

  const handleAskQuestion = (question: string) => {
    setAdvisorPrompt(question);
    setCurrentView(ViewState.AI_ADVISOR);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Dashboard onAsk={handleAskQuestion} currentUser={currentUser} />;
      case ViewState.SMART_WALLET:
        return <SmartWallet currentUser={currentUser} />;
      case ViewState.SOCIALFY:
        return <Socialfy currentUser={currentUser} />;
      case ViewState.EDUCATION:
        return <Education />;
      case ViewState.GAME:
        return <GameCenter />;
      case ViewState.SETTINGS:
        return <Settings />;
      case ViewState.AI_ADVISOR:
        return <AIAdvisor initialMessage={advisorPrompt} onClearInitialMessage={() => setAdvisorPrompt('')} />;
      default:
        return <Dashboard onAsk={handleAskQuestion} currentUser={currentUser} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        currentUser={currentUser}
        onToggleUser={toggleUser}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Wrapper - Flex Column to handle Header + Content flow */}
      {/* Removed transition-all to prevent stacking context issues with fixed modals */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 relative">
        
        {/* Mobile Header - z-51 ensures it stays ON TOP of the modal backdrop (z-50) */}
        <div className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-[51] flex-shrink-0 shadow-sm">
           <div className="flex items-center space-x-3">
               <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                  <Menu size={24} />
               </button>
               <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white">
                     <Zap size={14} fill="currentColor" />
                  </div>
                  <span className="font-bold text-slate-800 tracking-tight">ELIXIR</span>
               </div>
           </div>
           <img src={currentUser.avatar} className="w-8 h-8 rounded-full border border-slate-200 object-cover" alt="profile" />
        </div>

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto relative bg-[#F8FAFC]">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;
