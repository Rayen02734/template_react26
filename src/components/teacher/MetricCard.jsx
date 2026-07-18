export default function MetricCard({ title, value, note, accent = 'cyan' }) {
    const accentClasses = {
        cyan: 'border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900/60 dark:bg-cyan-950/40 dark:text-cyan-300',
        violet: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300',
        emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300',
        amber: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300',
        slate: 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300',
    };

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${accentClasses[accent]}`}>
                {title}
            </div>
            <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">{value}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{note}</p>
        </div>
    );
}
