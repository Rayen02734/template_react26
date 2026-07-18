export default function CourseCard({ title, description, category, badge, icon, instructor, level, duration, rating }) {
    return (
        <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 transition hover:-translate-y-1 hover:border-cyan-500/40 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-950/20">
            <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl text-cyan-500">
                    {icon}
                </div>
                <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    {category}
                </span>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-500">{instructor} · {level}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{description}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-3">
                    <span>{duration}</span>
                    <span>·</span>
                    <span>⭐ {rating}</span>
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-500">{badge}</span>
            </div>
            <div className="mt-6 flex items-center justify-between">
                <button className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                    Enroll Now
                </button>
            </div>
        </article>
    );
}
