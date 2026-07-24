export default function SectionTitle({ eyebrow, title, description, align = 'left' }) {
    const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';

    return (
        <div className={`max-w-2xl ${alignment}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-secondary">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">{description}</p>
        </div>
    );
}
