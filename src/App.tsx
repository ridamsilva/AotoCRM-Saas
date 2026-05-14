import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Leads } from './pages/Leads';
import { Chat } from './pages/Chat';
import { MasterPanel } from './pages/MasterPanel';
import { Settings } from './pages/Settings';
import { Car, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { user, profile, loading, signIn } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-bento-bg">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-bento-bg flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-bento-card rounded-3xl shadow-2xl p-10 border border-slate-800"
        >
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-600/20">
              <Car className="text-white w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">AutoCRM SaaS</h1>
            <p className="text-slate-400 mt-3 text-sm">Gestão automotiva moderna e inteligente para sua loja</p>
          </div>

          <button
            onClick={signIn}
            className="w-full flex items-center justify-center gap-3 bg-slate-800 border border-slate-700 py-4 px-4 rounded-2xl font-bold text-slate-200 hover:bg-slate-700 transition-all duration-200 shadow-lg shadow-black/20"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            <span>Entrar com Google</span>
          </button>

          <p className="mt-10 text-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            Powered by AutoSaaS Intelligence
          </p>
        </motion.div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'inventory': return <Inventory />;
      case 'leads': return <Leads />;
      case 'chat': return <Chat />;
      case 'master': return <MasterPanel />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-bento-bg flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-64 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
