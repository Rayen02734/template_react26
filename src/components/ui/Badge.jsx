export default function Badge({ children, variant = 'neutral', size = 'sm', className = '' }) {
    const base = 'inline-flex items-center gap-2 font-semibold rounded-full';
    const sizes = {
        sm: 'px-3 py-1 text-xs',
        md: 'px-3.5 py-1.5 text-sm',
    };

    const variants = {
        success: 'bg-status-success-bg text-status-success-text',
        pending: 'bg-status-pending-bg text-status-pending-text',
        danger: 'bg-status-danger-bg text-status-danger-text',
        primary: 'bg-primary/10 text-primary',
        neutral: 'bg-surface text-text-primary',
    };

    return (
        <span className={`${base} ${sizes[size] || sizes.sm} ${variants[variant] || variants.neutral} ${className}`}>
            {children}
        </span>
    );
}
