
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Menu, Zap } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { AIAdvisor } from './components/AIAdvisor';
import { Socialfy } from './components/Socialfy';
import { Education } from './components/Education';
import { GameCenter } from './components/GameCenter';
import { SmartWallet } from './components/SmartWallet';
import { Settings } from './components/Settings';
import { Dashboard } from './components/Dashboard';
import { LoginScreen } from './components/LoginScreen';
import { ViewState, User, Theme, ThemeContextType } from './types';

// Theme Context Definition
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

// Mock Users for Demo
const MOCK_USERS: Record<string, User> = {
  USER: {
    id: 'u1',
    name: 'Sopheak Dey',
    role: 'USER',
    avatar: 'https://picsum.photos/seed/sopheak/200/200',
    walletAddress: '0x71C8...9A23',
    balance: 1250,
    isVerified: true,
    isLoggedIn: true
  },
  AGENCY: {
    id: 'a1',
    name: 'Forte Insurance Support',
    role: 'AGENCY',
    companyName: 'Forte Insurance',
    avatar: 'https://picsum.photos/seed/forte/200/200',
    walletAddress: '0x88B1...11CC',
    balance: 50000,
    isVerified: true,
    isLoggedIn: true
  }
};

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LOGIN);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [advisorPrompt, setAdvisorPrompt] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  // Toggle Dark Mode
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Apply theme class to html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView(ViewState.HOME);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView(ViewState.LOGIN);
  };

  const toggleUser = () => {
    if (currentUser) {
      setCurrentUser(prev => prev?.role === 'USER' ? MOCK_USERS.AGENCY : MOCK_USERS.USER);
    }
  };

  const handleAskQuestion = (question: string) => {
    setAdvisorPrompt(question);
    setCurrentView(ViewState.AI_ADVISOR);
  };

  // Render Logic
  if (currentView === ViewState.LOGIN || !currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

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
        return <Settings onLogout={handleLogout} />;
      case ViewState.AI_ADVISOR:
        return <AIAdvisor initialMessage={advisorPrompt} onClearInitialMessage={() => setAdvisorPrompt('')} />;
      default:
        return <Dashboard onAsk={handleAskQuestion} currentUser={currentUser} />;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>
        <Sidebar 
          currentView={currentView} 
          onChangeView={setCurrentView} 
          currentUser={currentUser}
          onToggleUser={toggleUser}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col min-w-0 lg:ml-64 relative">
          
          {/* Mobile Header */}
          <div className={`lg:hidden h-16 border-b flex items-center justify-between px-4 z-[51] flex-shrink-0 shadow-sm ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
             <div className="flex items-center space-x-3">
                 <button onClick={() => setIsSidebarOpen(true)} className={`p-2 -ml-2 rounded-lg ${theme === 'dark' ? 'text-slate-200 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <Menu size={24} />
                 </button>
                 <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white">
                       <Zap size={14} fill="currentColor" />
                    </div>
                    <span className={`font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>ELIXIR</span>
                 </div>
             </div>
             <img src={currentUser.avatar} className="w-8 h-8 rounded-full border border-slate-200 object-cover" alt="profile" />
          </div>

          {/* Scrollable Main Content Area */}
          <main className={`flex-1 overflow-y-auto relative ${theme === 'dark' ? 'bg-slate-900' : 'bg-[#F8FAFC]'}`}>
            {renderView()}
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
