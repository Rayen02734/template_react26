export default function SectionHeader({ eyebrow, title, description, action }) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">{eyebrow}</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{title}</h1>
                {description ? (
                    <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">{description}</p>
                ) : null}
            </div>
            {action ? <div>{action}</div> : null}
        </div>
    );
}
