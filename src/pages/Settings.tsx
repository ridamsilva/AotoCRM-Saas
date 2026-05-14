import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Globe, 
  MessageSquare, 
  Users, 
  Bell, 
  CreditCard,
  ChevronRight,
  Monitor,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Building2,
  Mail,
  Smartphone,
  MapPin,
  Save
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Settings() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

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
                    onClick={() => setActiveItem(item.id)}
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
         <button 
           onClick={() => setActiveItem('billing')}
           className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-xl shadow-black/20 active:scale-95 relative z-10 text-sm uppercase tracking-widest"
         >
            Fazer Upgrade
         </button>
      </div>

      <AnimatePresence>
        {activeItem && (
          <SettingsModal 
            id={activeItem} 
            onClose={() => setActiveItem(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingsModal({ id, onClose }: { id: string, onClose: () => void }) {
  const renderContent = () => {
    switch (id) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-slate-800">
              <div className="w-24 h-24 bg-slate-800 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-blue-500 transition-colors cursor-pointer group">
                <Monitor className="w-8 h-8 text-slate-600 group-hover:text-blue-400 mb-1" />
                <span className="text-[10px] font-bold text-slate-600 group-hover:text-blue-500 uppercase">Logo</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold mb-1">Logotipo da Loja</h3>
                <p className="text-slate-500 text-xs">Recomendado: 512x512px em PNG ou SVG transparente.</p>
                <div className="mt-4 flex gap-3">
                  <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-700 transition-all">Alterar</button>
                  <button className="px-4 py-2 text-rose-500 hover:bg-rose-500/10 rounded-xl text-xs font-bold transition-all">Remover</button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Nome Comercial</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-4 w-4 h-4 text-slate-600" />
                  <input type="text" defaultValue="Auto Premium SP" className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 pl-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">E-mail de Contato</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 w-4 h-4 text-slate-600" />
                  <input type="email" defaultValue="contato@autopremium.com" className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 pl-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-4 w-4 h-4 text-slate-600" />
                  <input type="text" defaultValue="(11) 99999-8888" className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 pl-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Endereço Físico</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-slate-600" />
                  <input type="text" defaultValue="Av. Europa, 1200 - Jardins" className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 pl-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'branding':
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-300">Cores da Identidade</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['#3b82f6', '#10b981', '#8b5cf6', '#f43f5e'].map((color) => (
                  <button key={color} className="flex flex-col items-center gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all group">
                    <div className="w-10 h-10 rounded-full shadow-lg" style={{ backgroundColor: color }} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{color}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-300">Tema da Interface</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 bg-slate-900 border-2 border-blue-600 rounded-2xl text-left relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Modern Dark</span>
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-12 h-2 bg-slate-800 rounded-full" />
                    <div className="w-8 h-2 bg-blue-600 rounded-full" />
                  </div>
                </button>
                <button className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-left opacity-50 hover:bg-slate-800 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clean Light</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-12 h-2 bg-slate-200 rounded-full" />
                    <div className="w-8 h-2 bg-slate-400 rounded-full" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      case 'domains':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-500/10 text-green-500 rounded-2xl">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">autopremium.vercel.app</h4>
                  <p className="text-xs text-green-500 font-medium">Domínio Principal Verificado</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-slate-800 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-widest">SSL Ativo</span>
                <span className="px-3 py-1 bg-slate-800 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-widest">HTTP/3</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Conectar Domínio Próprio</label>
              <div className="flex gap-3">
                <input type="text" placeholder="ex: estoque.minhalojaveiculos.com" className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                <button className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all text-xs uppercase tracking-widest active:scale-95">Conectar</button>
              </div>
              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-[10px] text-amber-500/80 leading-relaxed font-medium">Você precisará configurar os registros CNAME ou A na sua zona de DNS para completar a ativação.</p>
              </div>
            </div>
          </div>
        );
      case 'whatsapp':
        return (
          <div className="space-y-6">
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Conectar WhatsApp API</h3>
              <p className="text-slate-500 text-sm max-w-xs mb-8">Escaneie o QR Code abaixo com seu WhatsApp Business para conectar a API oficial.</p>
              
              <div className="w-48 h-48 bg-white p-4 rounded-3xl shadow-2xl mb-8 relative group">
                <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all hover:bg-emerald-500">Gerar Novo QR</button>
                </div>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=AUTOSAAS_CONNECT_${Date.now()}`} alt="QR Code" className="w-full h-full grayscale opacity-80" />
              </div>
              
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
                <div className="w-2 h-2 rounded-full bg-slate-700 animate-pulse" />
                Aguardando Conexão
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Configurações Avançadas</h4>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Resposta Automática (AI)</span>
                <div className="w-10 h-6 bg-blue-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'crm':
        return (
          <div className="space-y-6">
            <h3 className="text-white font-bold mb-4">Pipeline de Vendas</h3>
            <div className="space-y-3">
              {['Novo Lead', 'Qualificados', 'Visita Agendada', 'Proposta Enviada', 'Fechamento'].map((stage, i) => (
                <div key={stage} className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-2xl group">
                  <div className="w-8 h-8 bg-slate-800 rounded-xl flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-white transition-colors">{i + 1}</div>
                  <input type="text" defaultValue={stage} className="flex-1 bg-transparent border-none text-slate-200 text-sm font-bold focus:outline-none" />
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-600 hover:text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
                    <button className="p-2 text-slate-600 hover:text-white transition-colors cursor-grab"><ChevronRight className="w-4 h-4 rotate-90" /></button>
                  </div>
                </div>
              ))}
              <button className="w-full p-4 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 text-xs font-bold hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Adicionar Etapa
              </button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Alertas do Sistema</h4>
              {[
                { label: 'Novos Leads (WhatsApp)', desc: 'Envie um alerta para o gerente quando um novo lead entrar.' },
                { label: 'Follow-up Atrasado', desc: 'Notifique o vendedor via push quando houver tarefas pendentes.' },
                { label: 'Relatório Diário', desc: 'Resumo das vendas e leads às 08:00 diariamente.' }
              ].map((item) => (
                <div key={item.label} className="flex items-start justify-between p-5 bg-slate-900 border border-slate-800 rounded-3xl">
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold text-slate-200">{item.label}</h5>
                    <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                  </div>
                  <div className="w-10 h-6 bg-slate-800 rounded-full relative cursor-pointer hover:bg-slate-700 transition-colors shrink-0">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Equipe da Loja (4)</h4>
              <button className="p-2 bg-blue-600/10 text-blue-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600/20 transition-all flex items-center gap-2">
                <Plus className="w-3 h-3" /> Convidar
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Marcos Oliveira', role: 'Proprietário', email: 'marcos@auto.com' },
                { name: 'Juliana Silva', role: 'Gerente Comercial', email: 'juliana@auto.com' },
                { name: 'Rodrigo Santos', role: 'Vendedor Sênior', email: 'rodrigo@auto.com' },
                { name: 'Ana Paula', role: 'Vendedora', email: 'ana@auto.com' }
              ].map((user) => (
                <div key={user.email} className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800/40 transition-colors group">
                  <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-sm font-bold text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-600/10 transition-all">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold text-slate-200">{user.name}</h5>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-0.5">{user.role}</p>
                  </div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest hidden md:block">Ativo há 2h</div>
                  <ChevronRight className="w-4 h-4 text-slate-800 group-hover:text-slate-400 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/10 border border-blue-500/20 rounded-[2rem] p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Plano Profissional</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">R$ 297,00<span className="text-slate-500 text-sm font-medium">/mês</span></h3>
                </div>
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-black/20 hover:bg-indigo-50 transition-all active:scale-95">Upgrade para Enterprise</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-blue-500/10">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Leads em 30d</p>
                  <p className="text-lg font-bold text-white">452 / 1000</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Vendedores</p>
                  <p className="text-lg font-bold text-white">4 / 8</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Armazenamento</p>
                  <p className="text-lg font-bold text-white">12 GB / 50 GB</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Forma de Pagamento</h4>
              <div className="flex items-center justify-between p-6 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-black rounded-lg flex items-center justify-center p-2 border border-slate-800">
                    <CreditCard className="w-full h-full text-slate-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-200">Visa Final 4421</h5>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Expira em 12/28</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest">Editar</button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    const titles: Record<string, string> = {
      profile: 'Perfil da Loja',
      branding: 'Identidade Visual',
      domains: 'Domínios',
      whatsapp: 'WhatsApp Business API',
      crm: 'Funis de Vendas',
      notifications: 'Notificações',
      users: 'Usuários & Permissões',
      billing: 'Assinatura & Faturamento'
    };
    return titles[id] || 'Configurações';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-bento-card w-full max-w-2xl rounded-[3rem] border border-slate-800 shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between p-8 md:p-10 border-b border-slate-800 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{getTitle()}</h2>
            <p className="text-slate-500 text-xs mt-1 font-medium">Preencha as informações necessárias para sua loja.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-slate-900 border border-slate-800 text-slate-500 hover:text-white rounded-2xl hover:bg-slate-800 transition-all group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-1">
          {renderContent()}
        </div>

        <div className="p-8 md:p-10 border-t border-slate-800 shrink-0 flex gap-4">
           <button 
            onClick={onClose}
            className="flex-1 py-4 bg-slate-900 text-slate-400 font-bold rounded-2xl border border-slate-800 hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px]"
          >
            Descartar
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 active:scale-95"
          >
            <Save className="w-4 h-4" /> Salvar Alterações
          </button>
        </div>
      </motion.div>
    </div>
  );
}
