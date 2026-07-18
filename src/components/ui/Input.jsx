export default function Input({ label, className = '', ...props }) {
    return (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {label ? <span className="mb-2 block">{label}</span> : null}
            <input
                className={`w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white ${className}`}
                {...props}
            />
        </label>
    );
}
