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
        lavender: 'bg-[var(--color-kpi-lavender)] text-[var(--color-kpi-lavender-text)] dark:bg-[var(--color-kpi-lavender-bg-dark)] dark:text-[var(--color-kpi-lavender-text-dark)]',
        mint: 'bg-[var(--color-kpi-mint)] text-[var(--color-kpi-mint-text)] dark:bg-[var(--color-kpi-mint-bg-dark)] dark:text-[var(--color-kpi-mint-text-dark)]',
        peach: 'bg-[var(--color-kpi-peach)] text-[var(--color-kpi-peach-text)] dark:bg-[var(--color-kpi-peach-bg-dark)] dark:text-[var(--color-kpi-peach-text-dark)]',
        pink: 'bg-[var(--color-kpi-pink)] text-[var(--color-kpi-pink-text)] dark:bg-[var(--color-kpi-pink-bg-dark)] dark:text-[var(--color-kpi-pink-text-dark)]',
        slate: 'bg-[var(--color-kpi-slate)] text-[var(--color-kpi-slate-text)] dark:bg-[var(--color-kpi-slate-bg-dark)] dark:text-[var(--color-kpi-slate-text-dark)]',
    };

    const trendClasses = {
        positive: 'bg-status-success-bg text-status-success-text',
        negative: 'bg-status-danger-bg text-status-danger-text',
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
