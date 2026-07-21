export default function Card({ children, className = '', padded = true }) {
    return (
        <div className={`rounded-[24px] border border-slate-200/80 bg-white/80 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.24)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.5)] ${padded ? 'p-6' : ''} ${className}`}>
            {children}
        </div>
    );
}
