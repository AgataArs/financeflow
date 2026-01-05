import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export const MonthSelector = ({ selectedMonth, setSelectedMonth, months, year }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3"><div className="bg-indigo-500/20 p-2 rounded-lg"><Calendar className="w-5 h-5 text-indigo-400" /></div><h2 className="text-lg font-semibold text-white">Rok {year}</h2></div>
        <div className="flex items-center gap-2">
          <button onClick={() => setSelectedMonth(prev => (prev === 0 ? 11 : prev - 1))} className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"><ChevronLeft className="w-5 h-5" /></button>
          <span className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-lg font-medium min-w-[140px] text-center">{months[selectedMonth]}</span>
          <button onClick={() => setSelectedMonth(prev => (prev === 11 ? 0 : prev + 1))} className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-2">{months.map((month, index) => (<button key={month} onClick={() => setSelectedMonth(index)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedMonth === index ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-700/30 text-slate-400 hover:bg-slate-700/50 hover:text-white'}`}>{month.substring(0, 3)}</button>))}</div>
    </div>
  );
};
