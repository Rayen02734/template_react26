export default function AdminStatistics() {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Statistics</h1>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Weekly engagement</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">+24%</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Completion rate</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">94%</p>
                </div>
            </div>
        </div>
    );
}
