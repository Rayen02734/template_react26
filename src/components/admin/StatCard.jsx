import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ icon: Icon, value, label, delta, positive = true, accent = 'bg-[#3B5BFF]' }) {
    return (
        <div className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent} text-white`}>
                    <Icon className="h-5 w-5" />
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {positive ? <TrendingUp className="mr-1 inline h-3.5 w-3.5" /> : <TrendingDown className="mr-1 inline h-3.5 w-3.5" />}
                    {delta}
                </span>
            </div>
            <p className="mt-5 text-3xl font-semibold text-[#0F172A]">{value}</p>
            <p className="mt-1 text-sm text-[#64748B]">{label}</p>
        </div>
    );
}
