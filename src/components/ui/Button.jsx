import { forwardRef } from 'react';

const variants = {
    primary: 'bg-primary text-white shadow-card-sm hover:bg-primary-hover',
    secondary: 'bg-surface-strong border border-card-border text-text-primary hover:bg-surface',
    ghost: 'bg-transparent text-text-primary hover:bg-surface transition-colors',
};

const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
};

const Button = forwardRef(function Button(
    { children, className = '', variant = 'primary', size = 'md', as = 'button', ...props },
    ref,
) {
    const sharedClassName = `inline-flex items-center justify-center rounded-xl font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;

    if (as === 'a') {
        return (
            <a ref={ref} className={sharedClassName} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button ref={ref} className={sharedClassName} {...props}>
            {children}
        </button>
    );
});

export default Button;
