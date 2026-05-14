import React, { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile, 
  CheckCheck, 
  User, 
  Phone, 
  Video, 
  Info,
  Car,
  Calendar,
  DollarSign,
  Sparkles,
  Bot,
  Zap,
  Mic,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const chats = [
  { id: 1, name: 'Ricardo Silva', lastMsg: 'Qual o valor mínimo para o BMW 320i?', time: '14:35', unread: 2, online: true, avatar: 'RS' },
  { id: 2, name: 'Maria Fernanda', lastMsg: 'Manda as fotos do Porsche por favor', time: '13:20', unread: 0, online: false, avatar: 'MF' },
  { id: 3, name: 'João Paulo', lastMsg: 'Vou passar na loja amanhã cedo', time: '11:45', unread: 0, online: true, avatar: 'JP' },
  { id: 4, name: 'Ana Beatriz', lastMsg: 'Áudio (0:15)', time: 'Ontem', unread: 0, online: false, avatar: 'AB' },
  { id: 5, name: 'Carlos Eduardo', lastMsg: 'Aprovou o financiamento?', time: 'Ontem', unread: 1, online: true, avatar: 'CE' },
];

const messages = [
  { id: 1, text: 'Olá, gostaria de saber mais sobre a BMW 320i 2023.', sender: 'client', time: '14:30', status: 'read' },
  { id: 2, text: 'Claro, Ricardo! Excelente escolha. É a versão M Sport com apenas 12.000km.', sender: 'agent', time: '14:31', status: 'read' },
  { id: 3, text: 'O carro está impecável, único dono e todas as revisões na concessionária.', sender: 'agent', time: '14:31', status: 'read' },
  { id: 4, text: 'Qual o valor mínimo para o BMW 320i?', sender: 'client', time: '14:35', status: 'received' },
];

export function Chat() {
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [message, setMessage] = useState('');
  const [isAiSuggesting, setIsAiSuggesting] = useState(false);

  const aiSuggestions = [
    "Ricardo, o valor de tabela é R$ 289.900, mas consigo fazer R$ 285.000 à vista para fecharmos hoje.",
    "Para esse veículo conseguimos taxas a partir de 0,99% ao mês. Deseja uma simulação?",
    "Que tal marcar um test-drive amanhã? Tenho horário livre às 14h."
  ];

  return (
    <div className="h-[calc(100vh-100px)] bg-bento-card rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex">
      {/* Search & Chat List */}
      <div className="w-1/3 border-r border-slate-800 flex flex-col bg-slate-900/20">
        <div className="p-5 bg-bento-card border-b border-slate-800">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-white tracking-tight">Atendimento</h2>
            <div className="flex gap-1.5">
              <button className="p-2.5 rounded-xl hover:bg-slate-800 text-blue-400 border border-transparent hover:border-slate-700 transition-all">
                <Bot className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-500 border border-transparent hover:border-slate-700 transition-all">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar conversas..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-xs font-medium"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/30 invisible-scrollbar">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={cn(
                "p-5 flex items-center gap-4 cursor-pointer transition-all hover:bg-slate-800/40 relative group",
                selectedChat.id === chat.id ? "bg-blue-600/5" : ""
              )}
            >
              {selectedChat.id === chat.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
              )}
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-slate-300 border border-slate-700 shadow-xl text-lg group-hover:scale-105 transition-transform">
                  {chat.avatar}
                </div>
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-lg"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold text-slate-200 truncate text-sm tracking-tight group-hover:text-white transition-colors">{chat.name}</h4>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-500 truncate font-medium">{chat.lastMsg}</p>
                  {chat.unread > 0 && (
                    <span className="bg-blue-600 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-lg font-bold shadow-lg shadow-blue-600/20">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-900/30 relative">
        {/* Header */}
        <div className="p-4 bg-bento-card border-b border-slate-800 flex items-center justify-between shadow-lg shadow-black/20 z-10">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-slate-200 border border-slate-700 shadow-md">
              {selectedChat.avatar}
            </div>
            <div>
              <h3 className="font-bold text-white text-sm tracking-tight">{selectedChat.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Ativo</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
             <button className="p-3 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-2xl transition-all border border-transparent hover:border-slate-800 active:scale-95">
                <Phone className="w-5 h-5" />
             </button>
             <button className="p-3 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-2xl transition-all border border-transparent hover:border-slate-800 active:scale-95">
                <Video className="w-5 h-5" />
             </button>
             <div className="w-px h-6 bg-slate-800 mx-2"></div>
             <button className="p-3 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-2xl transition-all border border-transparent hover:border-slate-800 active:scale-95">
                <Info className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 invisible-scrollbar">
           {messages.map((msg) => (
             <div key={msg.id} className={cn(
               "flex",
               msg.sender === 'agent' ? "justify-end" : "justify-start"
             )}>
                <div className={cn(
                  "max-w-[75%] p-4 rounded-3xl shadow-xl relative group transition-transform hover:scale-[1.01]",
                  msg.sender === 'agent' 
                    ? "bg-blue-600 text-white rounded-tr-none shadow-blue-900/10" 
                    : "bg-bento-card text-slate-200 rounded-tl-none border border-slate-800 shadow-black/10"
                )}>
                  <p className="text-sm leading-relaxed font-medium">{msg.text}</p>
                  <div className={cn(
                    "flex items-center gap-1.5 mt-2 justify-end",
                    msg.sender === 'agent' ? "text-blue-200" : "text-slate-500"
                  )}>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{msg.time}</span>
                    {msg.sender === 'agent' && <CheckCheck className="w-3.5 h-3.5" />}
                  </div>
                </div>
             </div>
           ))}
        </div>

        {/* AI Suggestion Bar */}
        <AnimatePresence>
          {isAiSuggesting && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="px-6 pb-2"
            >
              <div className="bg-indigo-600/10 backdrop-blur-md border border-indigo-500/30 rounded-3xl p-5 shadow-2xl">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">AutoAssist Intelligence</span>
                </div>
                <div className="flex gap-2.5 overflow-x-auto pb-1 invisible-scrollbar">
                  {aiSuggestions.map((suggestion, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        setMessage(suggestion);
                        setIsAiSuggesting(false);
                      }}
                      className="bg-slate-900/50 border border-slate-700/50 px-5 py-3 rounded-2xl text-[11px] text-slate-300 font-bold hover:border-indigo-500 hover:bg-slate-800 transition-all whitespace-nowrap text-left max-w-[320px] truncate shadow-lg"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="p-5 bg-bento-card border-t border-slate-800">
           <div className="flex items-center gap-3 mb-4">
              <button 
                onClick={() => setIsAiSuggesting(!isAiSuggesting)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg border",
                  isAiSuggesting 
                    ? "bg-indigo-600 text-white border-indigo-400" 
                    : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20"
                )}
              >
                <Zap className="w-3.5 h-3.5" />
                Auto-Assist
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-all shadow-lg">
                <Car className="w-3.5 h-3.5" />
                Anexar Veículo
              </button>
           </div>
           <div className="flex items-end gap-3">
              <div className="flex items-center gap-1.5 pb-1">
                 <button className="p-2.5 text-slate-500 hover:text-white transition-all hover:bg-slate-800 rounded-xl active:scale-90">
                   <Smile className="w-6 h-6" />
                 </button>
                 <button className="p-2.5 text-slate-500 hover:text-white transition-all hover:bg-slate-800 rounded-xl active:scale-90">
                   <Paperclip className="w-6 h-6" />
                 </button>
              </div>
              <div className="flex-1 relative">
                <textarea 
                  rows={1}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua resposta..."
                  className="w-full py-3.5 px-5 bg-slate-900/50 border border-slate-700 rounded-2xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-slate-900 transition-all text-sm font-medium resize-none"
                />
              </div>
              <div className="p-1 flex gap-2">
                 {message.trim() ? (
                   <button className="p-3.5 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-500 active:scale-95 transition-all">
                      <Send className="w-6 h-6" />
                   </button>
                 ) : (
                   <button className="p-3.5 bg-slate-800 text-slate-400 rounded-2xl border border-slate-700 hover:bg-slate-700 hover:text-white transition-all active:scale-95">
                      <Mic className="w-6 h-6" />
                   </button>
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* Info Sidebar (Optional, maybe hidden by default) */}
      <div className="w-1/4 border-l border-slate-800 bg-bento-card p-6 overflow-y-auto hidden xl:block invisible-scrollbar">
        <div className="flex flex-col items-center text-center mb-10">
           <div className="w-28 h-28 rounded-3xl bg-slate-800 flex items-center justify-center border border-slate-700 mb-5 shadow-2xl font-bold text-3xl text-white group hover:scale-105 transition-all cursor-pointer">
             RS
           </div>
           <h3 className="font-bold text-white text-lg tracking-tight">Ricardo Silva</h3>
           <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">{selectedChat.id === 1 ? '(11) 98765-4321' : '(11) 91234-5678'}</p>
        </div>

        <div className="space-y-8">
           <div>
             <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Interesse Atual</h4>
             <div className="p-4 bg-slate-900 rounded-3xl border border-slate-800 shadow-lg group hover:border-slate-600 transition-all cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                   <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
                      <Car className="w-5 h-5" />
                   </div>
                   <div>
                      <h5 className="font-bold text-slate-200 text-sm tracking-tight group-hover:text-blue-400 transition-colors">BMW 320i M Sport</h5>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">2023 • 12.000km</p>
                   </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                   <span className="font-bold text-blue-400 text-sm tracking-tight">R$ 289.900</span>
                   <button className="text-[10px] font-bold uppercase tracking-widest bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl hover:bg-slate-700 hover:text-white transition-all">Detalhes</button>
                </div>
             </div>
           </div>

           <div>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Dados do Cliente</h4>
              <div className="space-y-4">
                 <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/50">
                    <Calendar className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">Cliente desde</p>
                      <p className="text-xs text-slate-300 font-bold tracking-tight">Maio, 2024</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/50">
                    <DollarSign className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">Financiamento</p>
                      <p className="text-xs text-emerald-400 font-bold tracking-tight">PRÉ-APROVADO</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-3">
             <button className="w-full py-4 bg-orange-500/10 text-orange-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all border border-orange-500/20 active:scale-95 shadow-lg">
                Agendar Test-Drive
             </button>
             <button className="w-full py-4 bg-emerald-500/10 text-emerald-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20 active:scale-95 shadow-lg">
                Gerar Proposta PDF
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
