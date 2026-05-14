import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Car, 
  Calendar, 
  Gauge, 
  ChevronDown,
  Trash2,
  Edit2
} from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export function Inventory() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  
  const vehicles = [
    { id: 1, make: 'BMW', model: '320i', version: 'M Sport', year: 2023, price: 289900, mileage: 12000, status: 'available', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800' },
    { id: 2, make: 'Porsche', model: 'Macan', version: 'T', year: 2022, price: 540000, mileage: 8500, status: 'available', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800' },
    { id: 3, make: 'Toyota', model: 'Corolla', version: 'Altis Premium', year: 2021, price: 135500, mileage: 45000, status: 'reserved', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800' },
    { id: 4, make: 'Honda', model: 'Civic', version: 'Touring', year: 2022, price: 178000, mileage: 22000, status: 'sold', image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=800' },
    { id: 5, make: 'Mercedes-Benz', model: 'C 300', version: 'AMG Line', year: 2023, price: 385000, mileage: 5000, status: 'available', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800' },
    { id: 6, make: 'Audi', model: 'Q5', version: 'Performance', year: 2021, price: 295000, mileage: 38000, status: 'available', image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Estoque de Veículos</h1>
          <p className="text-slate-400">Gerencie seus veículos e publicações em marketplaces.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Plus className="w-5 h-5" />
          Novo Veículo
        </button>
      </div>

      <div className="bg-bento-card p-4 rounded-3xl border border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por marca, modelo, ano ou placa..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-slate-900 transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-5 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-slate-300 hover:bg-slate-700 transition-all font-bold text-sm uppercase tracking-widest">
            <Filter className="w-4 h-4" />
            Filtros
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="h-10 w-px bg-slate-800 mx-1 hidden md:block"></div>
          <div className="bg-slate-900/80 p-1.5 rounded-2xl flex gap-1 border border-slate-800">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-slate-800 shadow-lg text-blue-400 border border-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-slate-800 shadow-lg text-blue-400 border border-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-bento-card rounded-3xl border border-slate-800 shadow-sm overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500">
              <div className="relative h-56">
                <img src={v.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={v.model} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-xl border ${
                    v.status === 'available' ? 'bg-emerald-500/90 text-white border-emerald-400' : 
                    v.status === 'reserved' ? 'bg-orange-500/90 text-white border-orange-400' : 'bg-blue-500/90 text-white border-blue-400'
                  }`}>
                    {v.status === 'available' ? 'Disponível' : v.status === 'reserved' ? 'Reservado' : 'Vendido'}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                   <button className="bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl text-slate-200 hover:bg-blue-600 hover:text-white active:scale-95 transition-all shadow-2xl border border-slate-700">
                      <Edit2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-blue-400 transition-colors">{v.make} {v.model}</h3>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">{v.version}</p>
                  </div>
                  <h4 className="font-bold text-blue-400 text-xl tracking-tight">{formatCurrency(v.price)}</h4>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-5 border-t border-slate-800/50">
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-slate-900/30 border border-slate-800/50">
                    <Calendar className="w-4 h-4 text-slate-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{v.year}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-slate-900/30 border border-slate-800/50">
                    <Gauge className="w-4 h-4 text-slate-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{Math.round(v.mileage / 100) / 10}k km</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-slate-900/30 border border-slate-800/50">
                    <Car className="w-4 h-4 text-slate-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Auto</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-bento-card rounded-3xl border border-slate-800 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                <th className="px-6 py-4 border-b border-slate-800">Veículo</th>
                <th className="px-6 py-4 border-b border-slate-800">Ano</th>
                <th className="px-6 py-4 border-b border-slate-800">Km</th>
                <th className="px-6 py-4 border-b border-slate-800">Preço</th>
                <th className="px-6 py-4 border-b border-slate-800 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-900/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-xl overflow-hidden shadow-lg border border-slate-800">
                        <img src={v.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={v.model} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{v.make} {v.model}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{v.version}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-medium">{v.year}</td>
                  <td className="px-6 py-4 text-slate-400 font-medium">{v.mileage.toLocaleString()} km</td>
                  <td className="px-6 py-4 font-bold text-white">{formatCurrency(v.price)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      <button className="p-2.5 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all border border-transparent hover:border-blue-400/20">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all border border-transparent hover:border-rose-400/20">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
