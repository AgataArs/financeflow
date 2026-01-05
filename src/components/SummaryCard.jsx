import { Wallet, TrendingUp, Lock, ShoppingBag } from 'lucide-react';

const formatCurrency = (amount) => new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 2 }).format(amount);

export const SummaryCard = ({ totalIncome, totalExpenses, fixedExpenses, variableExpenses, balance }) => {
  const isPositive = balance >= 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-2xl p-5"><div className="flex items-center justify-between"><div><p className="text-emerald-400 text-sm font-medium mb-1">Przychody</p><p className="text-2xl font-bold text-white">{formatCurrency(totalIncome)}</p></div><div className="bg-emerald-500/20 p-3 rounded-xl"><TrendingUp className="w-6 h-6 text-emerald-400" /></div></div></div>
      <div className="bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-500/30 rounded-2xl p-5"><div className="flex items-center justify-between"><div><p className="text-rose-400 text-sm font-medium mb-1 flex items-center gap-1"><Lock className="w-3 h-3" />Wydatki stałe</p><p className="text-2xl font-bold text-white">{formatCurrency(fixedExpenses)}</p></div><div className="bg-rose-500/20 p-3 rounded-xl"><Lock className="w-6 h-6 text-rose-400" /></div></div></div>
      <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-2xl p-5"><div className="flex items-center justify-between"><div><p className="text-orange-400 text-sm font-medium mb-1 flex items-center gap-1"><ShoppingBag className="w-3 h-3" />Wydatki zmienne</p><p className="text-2xl font-bold text-white">{formatCurrency(variableExpenses)}</p></div><div className="bg-orange-500/20 p-3 rounded-xl"><ShoppingBag className="w-6 h-6 text-orange-400" /></div></div></div>
      <div className={`bg-gradient-to-br ${isPositive ? 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30' : 'from-red-500/20 to-red-600/10 border-red-500/30'} border rounded-2xl p-5`}><div className="flex items-center justify-between"><div><p className={`${isPositive ? 'text-indigo-400' : 'text-red-400'} text-sm font-medium mb-1`}>Bilans</p><p className="text-2xl font-bold text-white">{formatCurrency(balance)}</p></div><div className={`${isPositive ? 'bg-indigo-500/20' : 'bg-red-500/20'} p-3 rounded-xl`}><Wallet className={`w-6 h-6 ${isPositive ? 'text-indigo-400' : 'text-red-400'}`} /></div></div></div>
    </div>
  );
};
