import React from 'react';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Globe, 
  MessageSquare, 
  Users, 
  Bell, 
  CreditCard,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { cn } from '../lib/utils';

export function Settings() {
  const settingsGroups = [
    {
      title: 'Loja & Identidade',
      items: [
        { id: 'profile', label: 'Perfil da Loja', description: 'Logo, nome e informações básicas', icon: Monitor },
        { id: 'branding', label: 'Identidade Visual', description: 'Cores, fontes e domínio personalizado', icon: Palette },
        { id: 'domains', label: 'Domínios', description: 'Configure seu domínio próprio (sua-loja.com)', icon: Globe },
      ]
    },
    {
      title: 'Integrações & Automação',
      items: [
        { id: 'whatsapp', label: 'WhatsApp Business API', description: 'Conecte seu número oficial e configure chatbot', icon: MessageSquare },
        { id: 'crm', label: 'Funis de Venda', description: 'Personalize as etapas do seu pipeline', icon: SettingsIcon },
        { id: 'notifications', label: 'Notificações', description: 'Configure alertas de novos leads e follow-up', icon: Bell },
      ]
    },
    {
      title: 'Assinatura & Equipe',
      items: [
        { id: 'users', label: 'Usuários & Permissões', description: 'Gerencie sua equipe de vendedores e admins', icon: Users },
        { id: 'billing', label: 'Assinatura & Faturamento', description: 'Gerencie seu plano e métodos de pagamento', icon: CreditCard },
      ]
    }
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Configurações</h1>
        <p className="text-slate-400">Gerencie todos os aspectos da sua loja e conta.</p>
      </div>

      <div className="space-y-10">
        {settingsGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-2">{group.title}</h3>
            <div className="bg-bento-card rounded-3xl border border-slate-800 shadow-sm overflow-hidden">
               <div className="divide-y divide-slate-800/50">
                 {group.items.map((item) => (
                   <button 
                    key={item.id}
                    className="w-full flex items-center gap-4 p-5 hover:bg-slate-800/40 transition-all group text-left relative"
                   >
                     <div className="p-3 bg-slate-800 text-slate-500 rounded-2xl group-hover:bg-blue-600/10 group-hover:text-blue-400 border border-transparent group-hover:border-blue-500/20 transition-all duration-300">
                        <item.icon className="w-5 h-5" />
                     </div>
                     <div className="flex-1">
                        <h4 className="font-bold text-slate-200 text-sm tracking-tight group-hover:text-white transition-colors">{item.label}</h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{item.description}</p>
                     </div>
                     <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                   </button>
                 ))}
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-900/20 border border-blue-500/20 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700"></div>
         <div className="space-y-4 relative z-10 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
               <CreditCard className="w-5 h-5 opacity-80" />
               <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Seu Plano Atual</span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight">Plano Professional</h3>
            <p className="text-blue-100/70 text-sm font-medium">Próximo faturamento em 15 de Junho de 2026.</p>
         </div>
         <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-xl shadow-black/20 active:scale-95 relative z-10 text-sm uppercase tracking-widest">
            Fazer Upgrade
         </button>
      </div>
    </div>
  );
}
