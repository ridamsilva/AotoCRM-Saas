import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  UserPlus, 
  Phone, 
  Mail, 
  MoreHorizontal,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Facebook,
  Instagram,
  Globe
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Leads() {
  const [viewMode, setViewMode] = useState<'pipeline' | 'list'>('pipeline');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const stages = [
    { id: 'new', label: 'Novos', color: 'bg-blue-500' },
    { id: 'contacted', label: 'Em Contato', color: 'bg-indigo-500' },
    { id: 'negotiation', label: 'Negociação', color: 'bg-orange-500' },
    { id: 'closing', label: 'Fechamento', color: 'bg-emerald-500' },
  ];

  const leads = [
    { id: 1, name: 'Ricardo Silva', phone: '(11) 98765-4321', vehicle: 'BMW 320i', score: 85, stage: 'new', source: 'Facebook', createdAt: '2 horas atrás' },
    { id: 2, name: 'Maria Fernanda', phone: '(11) 91234-5678', vehicle: 'Porsche Macan', score: 92, stage: 'new', source: 'Webmotors', createdAt: '3 horas atrás' },
    { id: 3, name: 'João Paulo', phone: '(21) 97766-5544', vehicle: 'Toyota Corolla', score: 64, stage: 'contacted', source: 'Instagram', createdAt: 'Ontem' },
    { id: 4, name: 'Ana Beatriz', phone: '(31) 98877-6655', vehicle: 'Honda Civic', score: 78, stage: 'negotiation', source: 'Site Próprio', createdAt: '2 dias atrás' },
    { id: 5, name: 'Carlos Eduardo', phone: '(41) 99911-2233', vehicle: 'Mercedes-Benz C300', score: 45, stage: 'closing', source: 'Google', createdAt: '3 dias atrás' },
  ];

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Facebook': return <Facebook className="w-3 h-3 text-blue-600" />;
      case 'Instagram': return <Instagram className="w-3 h-3 text-pink-600" />;
      case 'Google': return <Globe className="w-3 h-3 text-slate-600" />;
      default: return <Globe className="w-3 h-3 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Gestão de Leads</h1>
          <p className="text-slate-400">Acompanhe e converta seus leads em vendas.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-5 py-2.5 rounded-2xl font-bold text-slate-300 hover:bg-slate-700 transition-all text-sm uppercase tracking-widest shadow-lg">
            Importar
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95 text-sm uppercase tracking-widest">
            <Plus className="w-5 h-5" />
            Novo Lead
          </button>
        </div>
      </div>

      <div className="bg-bento-card p-4 rounded-3xl border border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por nome, telefone ou email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-slate-900 transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <select 
            className="px-5 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm uppercase tracking-widest hover:bg-slate-700 transition-colors"
            onChange={(e) => setViewMode(e.target.value as any)}
          >
            <option value="pipeline">Funil de Vendas</option>
            <option value="list">Lista de Leads</option>
          </select>
        </div>
      </div>

      {viewMode === 'pipeline' ? (
        <div className="flex gap-6 overflow-x-auto pb-6 -mx-8 px-8 min-h-[600px] invisible-scrollbar">
          {stages.map((stage) => (
            <div key={stage.id} className="flex-1 min-w-[320px] space-y-5">
              <div className="flex items-center justify-between mb-2 p-1">
                <div className="flex items-center gap-2.5">
                  <div className={`w-3 h-3 rounded-full ${stage.color} shadow-[0_0_8px_rgba(0,0,0,0.5)]`}></div>
                  <h3 className="font-bold text-slate-200 tracking-tight">{stage.label}</h3>
                  <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded-lg border border-slate-700 font-bold uppercase tracking-widest">
                    {filteredLeads.filter(l => l.stage === stage.id).length}
                  </span>
                </div>
                <button className="text-slate-600 hover:text-white transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {filteredLeads.filter(l => l.stage === stage.id).map((lead) => (
                  <div key={lead.id} className="bg-bento-card p-5 rounded-3xl border border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 px-2 py-1 bg-slate-900 rounded-lg border border-slate-800">
                        {getSourceIcon(lead.source)}
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lead.source}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                         <Star className="w-3.5 h-3.5 fill-current" />
                         <span className="text-[11px] font-bold">{lead.score}</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-white mb-1 tracking-tight group-hover:text-blue-400 transition-colors">{lead.name}</h4>
                    <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">{lead.vehicle}</p>
                    
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-800/50">
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all active:scale-95 border border-blue-500/20">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95 border border-emerald-500/20">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {lead.createdAt}
                      </span>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-5 border-2 border-dashed border-slate-800 rounded-3xl text-slate-600 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 group"
                >
                  <Plus className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Adicionar Lead</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-bento-card rounded-3xl border border-slate-800 shadow-sm overflow-hidden">
           <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                <th className="px-6 py-4 border-b border-slate-800">Lead</th>
                <th className="px-6 py-4 border-b border-slate-800">Origem</th>
                <th className="px-6 py-4 border-b border-slate-800">Veículo</th>
                <th className="px-6 py-4 border-b border-slate-800">Score</th>
                <th className="px-6 py-4 border-b border-slate-800 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-900/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-white transition-colors">{lead.name}</div>
                      <div className="text-[11px] font-bold text-slate-600 tracking-wider mt-0.5">{lead.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/50 rounded-lg border border-slate-800 w-fit">
                        {getSourceIcon(lead.source)}
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lead.source}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-bold text-[11px] uppercase tracking-widest">{lead.vehicle}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border shadow-lg",
                      lead.score > 80 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                      lead.score > 50 ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    )}>
                      {lead.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2.5 text-slate-600 hover:text-white hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-700">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Placeholder */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-bento-card w-full max-w-2xl rounded-[2.5rem] border border-slate-800 shadow-2xl p-10 overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <UserPlus className="text-white w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Novo Lead</h2>
                  <p className="text-slate-500 text-sm">Adicione um novo potencial comprador manualmente.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="space-y-4">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Nome Completo</label>
                     <input type="text" placeholder="Ex: João Silva" className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Telefone / WhatsApp</label>
                     <input type="text" placeholder="(00) 00000-0000" className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                   </div>
                </div>
                <div className="space-y-4">
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Veículo de Interesse</label>
                     <input type="text" placeholder="Ex: BMW 320i" className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Origem</label>
                     <select className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                        <option>WhatsApp Direct</option>
                        <option>Facebook Ads</option>
                        <option>Instagram Ads</option>
                        <option>Site Próprio</option>
                        <option>Outros</option>
                     </select>
                   </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-slate-800 text-slate-300 font-bold rounded-2xl border border-slate-700 hover:bg-slate-700 transition-all uppercase tracking-widest text-sm"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all uppercase tracking-widest text-sm"
                >
                  Cadastrar Lead
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
