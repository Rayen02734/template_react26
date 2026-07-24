export default function KpiCard({
    label,
    value,
    description,
    trend,
    trendType = 'positive',
    accent = 'lavender',
    monogram,
    className = '',
}) {
    const accentClasses = {
        lavender: 'bg-kpi-lavender text-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
        mint: 'bg-kpi-mint text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
        peach: 'bg-kpi-peach text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
        pink: 'bg-kpi-pink text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
        slate: 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100',
    };

    const trendClasses = {
        positive: 'bg-status-success-bg text-status-success-text dark:bg-emerald-900/25 dark:text-emerald-300',
        negative: 'bg-status-danger-bg text-status-danger-text dark:bg-rose-900/25 dark:text-rose-300',
    };

    const monogramText = monogram ||
        String(label || '')
            .split(' ')
            .map((word) => word[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

    return (
        <div className={`rounded-3xl border border-card-border bg-card-bg p-5 shadow-card-sm ${className}`}>
            <div className="flex items-start justify-between gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-semibold ${accentClasses[accent] || accentClasses.slate}`}>
                    {monogramText}
                </div>
                {trend ? (
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${trendClasses[trendType] || trendClasses.positive}`}>
                        {trend}
                    </span>
                ) : null}
            </div>

            <p className="mt-6 text-h1-lg font-semibold text-text-primary">{value}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.22em] text-text-secondary">{label}</p>
            {description ? <p className="mt-3 text-sm text-text-secondary">{description}</p> : null}
        </div>
    );
}
