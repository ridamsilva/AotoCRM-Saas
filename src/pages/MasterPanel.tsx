import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CreditCard, 
  Activity, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Plus, 
  Shield, 
  PauseCircle, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { cn } from '../lib/utils';

export function MasterPanel() {
  const [activeTab, setActiveTab] = useState<'stores' | 'subscriptions' | 'plans'>('stores');

  const stores = [
    { id: 1, name: 'Auto Premium SP', owner: 'marcos@auto.com', plan: 'Pro', status: 'active', revenue: 'R$ 1.250,00', users: 8, vehicles: 45 },
    { id: 2, name: 'Litoral Veículos', owner: 'contato@litoral.com', plan: 'Basic', status: 'active', revenue: 'R$ 450,00', users: 3, vehicles: 12 },
    { id: 3, name: 'Grand Motors', owner: 'adm@grand.com', plan: 'Enterprise', status: 'past_due', revenue: 'R$ 3.500,00', users: 25, vehicles: 120 },
    { id: 4, name: 'Classic Cars', owner: 'julio@classic.com', plan: 'Pro', status: 'suspended', revenue: 'R$ 0,00', users: 5, vehicles: 22 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            Painel Master
          </h1>
          <p className="text-slate-400 mt-2">Controle total sobre a plataforma SaaS e suas assinaturas.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95 text-sm uppercase tracking-widest">
          <Plus className="w-5 h-5" />
          Nova Loja
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-bento-card p-6 rounded-3xl border border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1.5">Total de Lojas</p>
              <h3 className="text-2xl font-bold text-white tracking-tight leading-none">128</h3>
            </div>
          </div>
        </div>
        <div className="bg-bento-card p-6 rounded-3xl border border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1.5">Usuários Ativos</p>
              <h3 className="text-2xl font-bold text-white tracking-tight leading-none">842</h3>
            </div>
          </div>
        </div>
        <div className="bg-bento-card p-6 rounded-3xl border border-slate-800 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1.5">MRR Total</p>
              <h3 className="text-2xl font-bold text-white tracking-tight leading-none">R$ 84.500</h3>
            </div>
          </div>
        </div>
        <div className="bg-bento-card p-6 rounded-3xl border border-slate-800 shadow-sm hover:shadow-xl hover:shadow-orange-900/5 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-orange-500/10 text-orange-400 rounded-2xl border border-orange-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1.5">Log de Erros</p>
              <h3 className="text-2xl font-bold text-white tracking-tight leading-none">12</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bento-card rounded-3xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/20">
           <div className="flex gap-1.5 p-1.5 bg-slate-900 rounded-2xl border border-slate-700/50">
             {['stores', 'subscriptions', 'plans'].map((tab) => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab as any)}
                 className={cn(
                   "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg",
                   activeTab === tab 
                     ? "bg-slate-800 text-indigo-400 border border-slate-700" 
                     : "text-slate-500 hover:text-slate-300"
                 )}
               >
                 {tab === 'stores' ? 'Lojas' : tab === 'subscriptions' ? 'Faturamento' : 'Planos'}
               </button>
             ))}
           </div>
           <div className="flex gap-2">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="pl-11 pr-5 py-2.5 bg-slate-900 border border-slate-700 rounded-2xl text-xs font-bold uppercase tracking-widest text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-xl" 
                />
             </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                <th className="px-6 py-5 border-b border-slate-800">Loja / Proprietário</th>
                <th className="px-6 py-5 border-b border-slate-800 text-center">Assinatura</th>
                <th className="px-6 py-5 border-b border-slate-800 text-center">Métricas</th>
                <th className="px-6 py-5 border-b border-slate-800 text-center">Receita Mês</th>
                <th className="px-6 py-5 border-b border-slate-800">Status</th>
                <th className="px-6 py-5 border-b border-slate-800 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {stores.map((store) => (
                <tr key={store.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-200 text-sm tracking-tight group-hover:text-indigo-400 transition-colors">{store.name}</span>
                      <span className="text-[10px] font-bold text-slate-600 tracking-wider mt-0.5 uppercase">{store.owner}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold rounded-lg uppercase tracking-widest border border-indigo-500/20 shadow-lg">
                      {store.plan}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-center justify-center gap-3">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{store.users}</span>
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Users</span>
                      </div>
                      <div className="w-px h-6 bg-slate-800"></div>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{store.vehicles}</span>
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Cars</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-bold text-white tracking-tight">{store.revenue}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-800 w-fit">
                      {store.status === 'active' && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                      {store.status === 'past_due' && <AlertCircle className="w-3.5 h-3.5 text-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />}
                      {store.status === 'suspended' && <PauseCircle className="w-3.5 h-3.5 text-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />}
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest",
                        store.status === 'active' ? "text-emerald-400" : 
                        store.status === 'past_due' ? "text-orange-400" : "text-rose-400"
                      )}>
                        {store.status === 'active' ? 'Ativa' : store.status === 'past_due' ? 'Vencida' : 'Suspensa'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                       <button className="p-2.5 text-slate-500 hover:text-indigo-400 hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-indigo-500/20 active:scale-95" title="Acessar conta">
                          <Activity className="w-5 h-5" />
                       </button>
                       <button className="p-2.5 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-700 active:scale-95">
                          <MoreHorizontal className="w-5 h-5" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
