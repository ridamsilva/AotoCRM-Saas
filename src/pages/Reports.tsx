import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const data = [
  { name: 'Jan', sales: 4000, leads: 2400 },
  { name: 'Fev', sales: 3000, leads: 1398 },
  { name: 'Mar', sales: 2000, leads: 9800 },
  { name: 'Abr', sales: 2780, leads: 3908 },
  { name: 'Mai', sales: 1890, leads: 4800 },
  { name: 'Jun', sales: 2390, leads: 3800 },
];

const pieData = [
  { name: 'Novos', value: 400 },
  { name: 'Seminovos', value: 300 },
  { name: 'Premium', value: 100 },
];

const COLORS = ['#3b82f6', '#6366f1', '#a855f7'];

export function Reports() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Relatórios & Insights</h1>
          <p className="text-slate-400">Análise detalhada de performance da sua loja.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-700 transition-all uppercase tracking-widest">
            <Calendar className="w-4 h-4" />
            Últimos 30 dias
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-widest shadow-lg shadow-blue-600/20">
            <Download className="w-4 h-4" />
            Exportar dados
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Conversão', value: '4.2%', change: '+0.5%', isUp: true, icon: TrendingUp, color: 'bg-indigo-500' },
          { label: 'Ticket Médio', value: 'R$ 142k', change: '+12%', isUp: true, icon: DollarSign, color: 'bg-blue-500' },
          { label: 'Tempo Médio Lead', value: '18 min', change: '-5%', isUp: true, icon: Users, color: 'bg-emerald-500' },
          { label: 'Novos Veículos', value: '24', change: '-2', isUp: false, icon: BarChart3, color: 'bg-rose-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-bento-card p-6 rounded-3xl border border-slate-800 shadow-sm">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg shadow-black/20`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.change}
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-xl font-bold text-white mt-1 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-bento-card p-6 rounded-3xl border border-slate-800 shadow-sm h-[400px]">
          <h3 className="font-bold text-white mb-6 tracking-tight uppercase text-xs text-slate-500">Crescimento de Vendas vs Leads</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 600}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 600}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F1117', borderRadius: '16px', border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={0.1} fill="#3b82f6" />
              <Area type="monotone" dataKey="leads" stroke="#6366f1" strokeWidth={3} fillOpacity={0.1} fill="#6366f1" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-bento-card p-6 rounded-3xl border border-slate-800 shadow-sm h-[400px] flex flex-col">
          <h3 className="font-bold text-white mb-6 tracking-tight uppercase text-xs text-slate-500">Distribuição do Estoque</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
