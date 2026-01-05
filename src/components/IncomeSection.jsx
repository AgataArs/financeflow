import { useState } from 'react';
import { TrendingUp, Plus, Pencil, Trash2, Check, X } from 'lucide-react';

const formatCurrency = (amount) => new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 2 }).format(amount);

export const IncomeSection = ({ incomes, addIncome, updateIncome, deleteIncome }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const handleAdd = () => { if (newName.trim() && newAmount) { addIncome(newName.trim(), newAmount); setNewName(''); setNewAmount(''); setIsAdding(false); } };
  const handleEdit = (income) => { setEditingId(income.id); setEditName(income.name); setEditAmount(income.amount.toString()); };
  const handleSaveEdit = (id) => { if (editName.trim() && editAmount) { updateIncome(id, editName.trim(), editAmount); setEditingId(null); } };

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3"><div className="bg-emerald-500/20 p-2.5 rounded-xl"><TrendingUp className="w-5 h-5 text-emerald-400" /></div><h3 className="text-lg font-semibold text-white">Przychody</h3></div>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-xl transition-all font-medium"><Plus className="w-4 h-4" />Dodaj</button>
      </div>
      {isAdding && <div className="mb-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/50"><div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3"><input type="text" placeholder="Źródło przychodu" value={newName} onChange={(e) => setNewName(e.target.value)} className="px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500" autoFocus /><input type="number" placeholder="Kwota (PLN)" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} className="px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500" step="0.01" min="0" /></div><div className="flex gap-2 justify-end"><button onClick={() => { setIsAdding(false); setNewName(''); setNewAmount(''); }} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all font-medium">Anuluj</button><button onClick={handleAdd} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all font-medium">Zapisz</button></div></div>}
      <div className="space-y-3">{incomes.length === 0 ? <p className="text-slate-500 text-center py-8">Brak przychodów w tym miesiącu</p> : incomes.map(income => (
        <div key={income.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-emerald-500/30 transition-all">
          {editingId === income.id ? <div className="flex-1 flex flex-col md:flex-row gap-3"><input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500" /><input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} className="w-full md:w-32 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500" step="0.01" /><div className="flex gap-2"><button onClick={() => handleSaveEdit(income.id)} className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all"><Check className="w-4 h-4" /></button><button onClick={() => setEditingId(null)} className="p-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-all"><X className="w-4 h-4" /></button></div></div> : <><p className="font-medium text-white">{income.name}</p><div className="flex items-center gap-4"><span className="text-emerald-400 font-semibold">{formatCurrency(income.amount)}</span><div className="flex gap-1"><button onClick={() => handleEdit(income)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-all"><Pencil className="w-4 h-4" /></button><button onClick={() => deleteIncome(income.id)} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button></div></div></>}
        </div>
      ))}</div>
    </div>
  );
};
