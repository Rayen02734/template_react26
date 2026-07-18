export default function EmptyState({ title, description, action }) {
    return (
        <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center dark:border-slate-700 dark:bg-slate-950/40">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
            {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
        </div>
    );
}
