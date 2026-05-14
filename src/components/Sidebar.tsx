import React from 'react';
import { 
  BarChart3, 
  Car, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { profile, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Painel', icon: LayoutDashboard },
    { id: 'inventory', label: 'Estoque', icon: Car },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'chat', label: 'Atendimento', icon: MessageSquare },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  if (profile?.role === 'master') {
    menuItems.unshift({ id: 'master', label: 'Painel Master', icon: ShieldCheck });
  }

  return (
    <div className="w-64 bg-bento-card h-screen border-r border-slate-800 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Car className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">AutoCRM</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                activeTab === item.id 
                  ? "bg-slate-800 text-blue-400 shadow-sm" 
                  : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-300"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                activeTab === item.id ? "text-blue-400" : "text-slate-500 group-hover:text-slate-400"
              )} />
              <span className="font-semibold text-sm">{item.label}</span>
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="ml-auto"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 overflow-hidden">
             <span className="text-sm font-bold text-slate-300 uppercase">
               {profile?.name.substring(0, 2)}
             </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate">{profile?.name}</span>
            <span className="text-xs text-slate-500 capitalize">{profile?.role}</span>
          </div>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-rose-400 hover:bg-rose-400/5 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold text-sm">Sair</span>
        </button>
      </div>
    </div>
  );
}
