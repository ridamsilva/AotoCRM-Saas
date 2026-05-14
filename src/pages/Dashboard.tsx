import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Car, 
  MessageSquare, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { formatCurrency, formatNumber } from '../lib/utils';

const data = [
  { name: 'Seg', sales: 4, leads: 12 },
  { name: 'Ter', sales: 3, leads: 15 },
  { name: 'Qua', sales: 5, leads: 10 },
  { name: 'Qui', sales: 2, leads: 18 },
  { name: 'Sex', sales: 6, leads: 22 },
  { name: 'Sáb', sales: 8, leads: 25 },
  { name: 'Dom', sales: 1, leads: 8 },
];

interface DashboardProps {
  onTabChange?: (tab: string) => void;
}

export function Dashboard({ onTabChange }: DashboardProps) {
  const stats = [
    { id: 'reports', label: 'Vendas do Mês', value: 'R$ 2.450.000', change: '+12.5%', isUp: true, icon: TrendingUp, color: 'bg-emerald-500' },
    { id: 'leads', label: 'Novos Leads', value: '142', change: '+18.2%', isUp: true, icon: Users, color: 'bg-blue-500' },
    { id: 'inventory', label: 'Estoque Atual', value: '48', change: '-2.4%', isUp: false, icon: Car, color: 'bg-indigo-500' },
    { id: 'chat', label: 'Conversas Ativas', value: '26', change: '+5.1%', isUp: true, icon: MessageSquare, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Painel de Controle</h1>
        <p className="text-slate-400">Bem-vindo de volta! Aqui está um resumo do seu desempenho.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            onClick={() => onTabChange?.(stat.id)}
            className="bg-bento-card p-6 rounded-3xl border border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.change}
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bento-card p-6 rounded-3xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white tracking-tight">Desempenho de Vendas</h3>
            <button className="text-slate-600 hover:text-slate-400 transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F1117', borderRadius: '16px', border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-bento-card p-6 rounded-3xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white tracking-tight">Geração de Leads</h3>
            <button className="text-slate-600 hover:text-slate-400 transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F1117', borderRadius: '16px', border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{fill: '#1e293b'}}
                />
                <Bar dataKey="leads" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-bento-card rounded-3xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white tracking-tight">Últimos Veículos Adicionados</h3>
          <button 
            onClick={() => onTabChange?.('inventory')}
            className="text-blue-500 text-sm font-bold uppercase tracking-widest hover:text-blue-400 transition-colors"
          >
            Ver todos
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                <th className="px-6 py-4 border-b border-slate-800">Veículo</th>
                <th className="px-6 py-4 border-b border-slate-800">Ano</th>
                <th className="px-6 py-4 border-b border-slate-800">Preço</th>
                <th className="px-6 py-4 border-b border-slate-800">Status</th>
                <th className="px-6 py-4 border-b border-slate-800 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {[
                { name: 'BMW 320i M Sport', year: '2023', price: 'R$ 289.900', status: 'available', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                { name: 'Porsche Macan T', year: '2022', price: 'R$ 540.000', status: 'available', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                { name: 'Toyota Corolla Altis', year: '2021', price: 'R$ 135.500', status: 'reserved', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
                { name: 'Honda Civic Touring', year: '2022', price: 'R$ 178.000', status: 'sold', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
              ].map((car, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors group">
                  <td className="px-6 py-4 font-semibold text-slate-200">{car.name}</td>
                  <td className="px-6 py-4 text-slate-400">{car.year}</td>
                  <td className="px-6 py-4 font-bold text-white">{car.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${car.color}`}>
                      {car.status === 'available' ? 'Disponível' : car.status === 'reserved' ? 'Reservado' : 'Vendido'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-600 hover:text-white transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
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
