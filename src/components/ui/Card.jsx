export default function Card({ children, className = '', padded = true }) {
    return (
        <div className={`rounded-2xl border border-card-border bg-card-bg shadow-card-sm ${padded ? 'p-6' : ''} ${className}`}>
            {children}
        </div>
    );
}
