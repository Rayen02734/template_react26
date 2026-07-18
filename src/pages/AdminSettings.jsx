export default function AdminSettings() {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Settings</h1>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/70">
                <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-white">Email notifications</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Notify admins about new signups and payments.</p>
                        </div>
                        <button className="rounded-full bg-cyan-500 px-3 py-1 text-sm font-semibold text-slate-950">On</button>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-white">Maintenance mode</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Temporarily pause public access.</p>
                        </div>
                        <button className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300">Off</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
