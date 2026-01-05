import { Shield, AlertTriangle, Sparkles } from 'lucide-react';

const formatCurrency = (amount) => new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

export const FinancialRunway = ({ financialRunway }) => {
  const { totalSavings, avgMonthlyExpenses, months, hasData } = financialRunway;
  const getStatus = () => {
    if (!hasData) return { color: 'slate', icon: Shield, message: 'Dodaj dane, aby obliczyć' };
    if (months >= 6) return { color: 'emerald', icon: Sparkles, message: 'Świetna poduszka!' };
    if (months >= 3) return { color: 'amber', icon: Shield, message: 'Dobra pozycja' };
    return { color: 'rose', icon: AlertTriangle, message: 'Warto zwiększyć oszczędności' };
  };
  const status = getStatus();
  const StatusIcon = status.icon;
  const colors = { emerald: { bg: 'from-emerald-500/20 via-emerald-500/10 to-teal-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20', bar: 'from-emerald-500 to-teal-400' }, amber: { bg: 'from-amber-500/20 via-amber-500/10 to-yellow-500/20', border: 'border-amber-500/30', text: 'text-amber-400', iconBg: 'bg-amber-500/20', bar: 'from-amber-500 to-yellow-400' }, rose: { bg: 'from-rose-500/20 via-rose-500/10 to-red-500/20', border: 'border-rose-500/30', text: 'text-rose-400', iconBg: 'bg-rose-500/20', bar: 'from-rose-500 to-red-400' }, slate: { bg: 'from-slate-500/20 via-slate-500/10 to-slate-600/20', border: 'border-slate-500/30', text: 'text-slate-400', iconBg: 'bg-slate-500/20', bar: 'from-slate-500 to-slate-400' } };
  const c = colors[status.color];
  const getMonthsLabel = (m) => m === 1 ? 'miesiąc' : m < 5 ? 'miesiące' : 'miesięcy';
  return (
    <div className={`bg-gradient-to-r ${c.bg} border ${c.border} rounded-2xl p-6 mb-6`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4"><div className={`${c.iconBg} p-4 rounded-2xl`}><StatusIcon className={`w-8 h-8 ${c.text}`} /></div><div><p className="text-slate-400 text-sm font-medium mb-1">Twoja poduszka bezpieczeństwa wystarczy na</p><div className="flex items-baseline gap-2"><span className={`text-4xl font-bold ${c.text}`}>{hasData ? months.toFixed(1) : '—'}</span><span className="text-xl text-slate-300">{hasData ? getMonthsLabel(months) : ''}</span></div><p className={`text-sm ${c.text} mt-1`}>{status.message}</p></div></div>
        <div className="flex gap-6 md:gap-8"><div className="text-center md:text-right"><p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Oszczędności</p><p className="text-lg font-semibold text-white">{hasData ? formatCurrency(totalSavings) : '—'}</p></div><div className="text-center md:text-right"><p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Śr. wydatki/mies.</p><p className="text-lg font-semibold text-white">{hasData ? formatCurrency(avgMonthlyExpenses) : '—'}</p></div></div>
      </div>
      {hasData && <div className="mt-4"><div className="h-2 bg-slate-700/50 rounded-full overflow-hidden"><div className={`h-full rounded-full bg-gradient-to-r ${c.bar} transition-all duration-500`} style={{ width: `${Math.min(100, (months / 12) * 100)}%` }} /></div><div className="flex justify-between mt-1 text-xs text-slate-500"><span>0</span><span>3 mies.</span><span>6 mies.</span><span>12 mies.</span></div></div>}
    </div>
  );
};
